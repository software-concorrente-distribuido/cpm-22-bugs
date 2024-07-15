// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HotelBooking.sol";

contract HotelBookingManager {
    address public owner;
    uint256 public bookingCount = 0;
    address[] public bookingContracts;
    //lista de endereços de contratos de reserva

    struct BookingInfo {
        address bookingContract;
        address guest;
        string hotel;
        uint256 amount;
        bool isActive;
        uint256 roomNumber;
    }

    mapping(uint256 => BookingInfo) public bookings;

    event BookingCreated(
        uint256 indexed bookingId,
        address bookingContract,
        address indexed guest,
        string hotel,
        uint256 amount,
        uint256 roomNumber
    );
    /*Notifica qualquer sistema externo que uma nova reserva foi feita, incluindo detalhes como o ID da reserva, o endereço do contrato
    da reserva, o endereço do hóspede, o nome do hotel e o valor pago. Sistemas que monitoram a blockchain podem capturar esse evento e
    atualizar a interface do usuário ou realizar outras ações com base nas informações fornecidas.*/
    
    //"Indexed" permite a busca e filtragem de eventos no log da blockchain pelo 'bookingId' e 'guest'

    event BookingCancelled(
        uint256 indexed bookingId,
        address indexed guest
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Erro, disponivel apenas o criador do contrato");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createBooking(string memory _hotel, uint256 _amount,string memory  _checkInDate, string memory _checkOutDate, uint256 _roomNumber) public payable {
        // Verifica se o valor enviado na transação é igual ao valor esperado da reserva, caso não seja, a transação falha e exibe a mensagem
        require(msg.value == _amount, "Valor de pagamento incorreto");

        // Cria uma instância de um novo contrato de reserva individual (HotelBooking)
        HotelBooking newBooking = new HotelBooking(
        msg.sender, //endereço do hóspede
        _hotel, //nome do hotel
        _amount, //valor pago
        _checkInDate,
        _checkOutDate,
        _roomNumber
    );

    // Incrementa o contador de reservas para gerar um novo ID de reserva
    bookingCount++;

    // Registra as informações da nova reserva no mapeamento 'bookings' usando o novo ID de reserva como chave
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

    // Emite o evento 'BookingCreated' para notificar sobre a nova reserva
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
        //retorna os contratos de reserva da lista
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
}
