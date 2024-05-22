const Migrations = artifacts.require("Migrations");
//const Simples = artifacts.require("Simples");

module.exports = function (deployer){
    deployer.deploy(Migrations);
    //deployer.deploy(Simples);
};

//Não é necessário criar um novo arquivo de migração para cada contrato, podemos fazer o deploy de mais de 1 usando o mesmo arquivo
//Como estamos usando o mesmo arquivo, se ele já estiver no deploy, faça o migrate usando "truffle migrate --reset"