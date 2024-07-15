// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelBooking {
    address public guest;
    string public hotel;
    uint256 public roomNumber;
    uint256 public amount;
    string public checkInDate;
    string public checkOutDate;
    bool public isCancelled;

    event BookingCancelled(address indexed guest, uint256 refundAmount);

    modifier onlyGuest() {
        require(msg.sender == guest, "Erro, so pode ser feito pelo hospede");
        _;
    }

    constructor(address _guest, string memory _hotel, uint256 _amount, string memory _checkInDate, string memory _checkOutDate, uint256 _roomNumber) {
        guest = _guest;
        hotel = _hotel;
        amount = _amount;
        roomNumber = _roomNumber;
        checkInDate = _checkInDate;
        checkOutDate = _checkOutDate;
        isCancelled = false;
    }

    function cancelBooking(address _caller) public onlyGuest {
        require(!isCancelled, "Reserva ja cancelada");
        require(_caller == guest, "Apenas o hospede pode cancelar a reserva");

        isCancelled = true;
        uint256 refundAmount = calculateRefund();
        payable(guest).transfer(refundAmount);

        emit BookingCancelled(guest, refundAmount);
    }

    function calculateRefund() internal view returns (uint256) {
        // Lógica para calcular reembolso baseada na política de cancelamento
        // Uma ideia: podemos assumir que o reembolso é proporcional aos dias restantes antes do check-in.
        // Por exemplo, 100% se cancelado com mais de 30 dias de antecedência, 50% se entre 30 e 7 dias, 0% se menos de 7 dias.
        // Assumindo 100% de reembolso
        return amount;
    }

    function getBookingDetails() public view returns (
        address,
        string memory,
        uint256,
        uint256,
        string memory,
        string memory,
        bool
    ) {
        return (
            guest,
            hotel,
            roomNumber,
            amount,
            checkInDate,
            checkOutDate,
            isCancelled
        );
    }

    function getGuest() public view returns (address) {
        return guest;
    }

    function getHotel() public view returns (string memory) {
        return hotel;
    }

    function getRoomNumber() public view returns (uint256) {
        return roomNumber;
    }

    function getAmount() public view returns (uint256) {
        return amount;
    }

    function getCheckInDate() public view returns (string memory) {
        return checkInDate;
    }

    function getCheckOutDate() public view returns (string memory) {
        return checkOutDate;
    }

    function getIsCancelled() public view returns (bool) {
        return isCancelled;
    }
    
}
