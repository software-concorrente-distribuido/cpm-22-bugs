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
    address payable public hotelAddress;

    event BookingCancelled(address indexed guest, uint256 refundAmount);
    event BookingStarted(address indexed guest, address indexed hotel, uint256 amount);

    modifier onlyGuest() {
        require(msg.sender == guest, "Erro, so pode ser feito pelo hospede");
        _;
    }

    constructor(
        address _guest,
        string memory _hotel,
        uint256 _amount,
        string memory _checkInDate,
        string memory _checkOutDate,
        uint256 _roomNumber,
        address payable _hotelAddress
    ) payable {
        guest = _guest;
        hotel = _hotel;
        amount = _amount;
        roomNumber = _roomNumber;
        checkInDate = _checkInDate;
        checkOutDate = _checkOutDate;
        isCancelled = false;
        hotelAddress = _hotelAddress;
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
        return amount;
    }

    function startBooking(string memory currentDate) public {
        require(!isCancelled, "Reserva ja cancelada");
        require(isCheckInDate(currentDate), "Ainda nao e o dia do check-in");

        hotelAddress.transfer(amount);
        emit BookingStarted(guest, hotelAddress, amount);
    }

    function isCheckInDate(string memory currentDate) internal view returns (bool) {
        return keccak256(abi.encodePacked(checkInDate)) == keccak256(abi.encodePacked(currentDate));
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
