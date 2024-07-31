// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HotelBooking.sol";

contract HotelBookingManager {
    address public owner;
    uint256 public bookingCount = 0;
    address[] public bookingContracts;
    
    struct BookingInfo {
        address bookingContract;
        address guest;
        string hotel;
        uint256 amount;
        bool isActive;
        uint256 roomNumber;
    }

    mapping(uint256 => BookingInfo) public bookings;
    mapping(string => mapping(uint256 => bool)) public roomLocked; // hotel => roomNumber => isLocked

    event BookingCreated(
        uint256 indexed bookingId,
        address bookingContract,
        address indexed guest,
        string hotel,
        uint256 amount,
        uint256 roomNumber
    );

    event BookingCancelled(
        uint256 indexed bookingId,
        address indexed guest
    );

    event RoomLocked(
        string indexed hotel,
        uint256 indexed roomNumber
    );

    event RoomUnlocked(
        string indexed hotel,
        uint256 indexed roomNumber
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Erro, disponivel apenas o criador do contrato");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createBooking(
        string memory _hotel,
        uint256 _amount,
        string memory _checkInDate,
        string memory _checkOutDate,
        uint256 _roomNumber,
        address payable _hotelAddress
    ) public payable {
        // Verifica se o valor enviado na transação é igual ao valor esperado da reserva
        require(msg.value == _amount, "Valor de pagamento incorreto");

        // Cria uma instância de um novo contrato de reserva individual (HotelBooking)
        HotelBooking newBooking;
        try new HotelBooking{value: msg.value}(
            msg.sender, // endereço do hóspede
            _hotel, // nome do hotel
            _amount, // valor pago
            _checkInDate,
            _checkOutDate,
            _roomNumber,
            _hotelAddress
        ) returns (HotelBooking booking) {
            newBooking = booking;
        } catch {

            revert("Falha ao criar contrato de reserva");
        }

        // Incrementa o contador de reservas para gerar um novo ID de reserva
        bookingCount++;

        // Registra as informações da nova reserva no mapeamento 'bookings'
        bookings[bookingCount] = BookingInfo({
            bookingContract: address(newBooking),
            guest: msg.sender,
            hotel: _hotel,
            amount: _amount,
            isActive: true,
            roomNumber: _roomNumber
        });

        // Adiciona o endereço do novo contrato de reserva à lista de contratos de reserva
        bookingContracts.push(address(newBooking));

        // Emite o evento 'BookingCreated'
        emit BookingCreated(
            bookingCount,
            address(newBooking),
            msg.sender,
            _hotel,
            _amount,
            _roomNumber
        );
    }

    function cancelBooking(uint256 _bookingId) public {
        BookingInfo storage booking = bookings[_bookingId];
        require(booking.isActive, "Reserva ja cancelada");
        require(
            msg.sender == booking.guest || msg.sender == owner,
            "Nao autorizado"
        );

        HotelBooking(booking.bookingContract).cancelBooking(msg.sender);
        booking.isActive = false;

        // Emite o evento 'BookingCancelled'
        emit BookingCancelled(_bookingId, msg.sender);
    }

    function getBooking(uint256 _bookingId)
        public
        view
        returns (BookingInfo memory)
    {
        return bookings[_bookingId];
    }

    function getBookingContracts() public view returns (address[] memory) {
        return bookingContracts;
    }

    function getActiveBookings() public view returns (BookingInfo[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= bookingCount; i++) {
            if (bookings[i].isActive) {
                activeCount++;
            }
        }

        BookingInfo[] memory activeBookings = new BookingInfo[](activeCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= bookingCount; i++) {
            if (bookings[i].isActive) {
                activeBookings[index] = bookings[i];
                index++;
            }
        }

        return activeBookings;
    }

    function getBookingsByUser(address _user) public view returns (BookingInfo[] memory) {
        uint256 userBookingCount = 0;
        for (uint256 i = 1; i <= bookingCount; i++) {
            if (bookings[i].guest == _user) {
                userBookingCount++;
            }
        }

        BookingInfo[] memory userBookings = new BookingInfo[](userBookingCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= bookingCount; i++) {
            if (bookings[i].guest == _user) {
                userBookings[index] = bookings[i];
                index++;
            }
        }

        return userBookings;
    }

    function isRoomLocked(string memory _hotel, uint256 _roomNumber) public view returns (bool) {
        return roomLocked[_hotel][_roomNumber];
    }

    // Método para bloquear um quarto manualmente
    function lockRoom(string memory _hotel, uint256 _roomNumber) public {
        require(!roomLocked[_hotel][_roomNumber], "Quarto ja esta bloqueado");
        roomLocked[_hotel][_roomNumber] = true;
        emit RoomLocked(_hotel, _roomNumber);
    }

    // Método para desbloquear um quarto manualmente
    function unlockRoom(string memory _hotel, uint256 _roomNumber) public {
        require(roomLocked[_hotel][_roomNumber], "Quarto nao esta bloqueado");
        roomLocked[_hotel][_roomNumber] = false;
        emit RoomUnlocked(_hotel, _roomNumber);
    }
}