const HotelBookingManager = artifacts.require("HotelBookingManager");

module.exports = function (deployer){
    deployer.deploy(HotelBookingManager);
};
