const HelloWorld = artifacts.require("HelloWorld");

//artifacts é o nome dado ao arquivo que possui as informações sobre o contrato
//dentro do require, coloque o nome do contrato

module.exports = function (deployer){
    deployer.deploy(HelloWorld);
};