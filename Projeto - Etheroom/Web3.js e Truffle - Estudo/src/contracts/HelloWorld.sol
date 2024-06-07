// SPDX-License-Identifier: MIT
pragma solidity^0.8.7;

contract HelloWorld {

    uint public meuNumero = 0;

    function setInt(uint _novoNumero) public {
        meuNumero = _novoNumero;
    }
}

// ao executar "truffle compile" no console, será criada uma pasta "build" com um JSON para cada contrato
// neste JSON, podemos encontrar a ABI do contrato, através dessa ABI, o dApp conseguirá interagir com os métodos do contrato na Blockchain
// no JSON também encontramos o bytecode, um código hexadecimal que será implementado na blockchain

// ao executar "truffle migrate", será feito o deploy de cada contrato para, nesse caso, a rede local definida no truffle-config.js, o Ganache
// para interagir com o contrato, podemos escrever um programa em JS ou usar o "truffle console"
// neste caso, podemos usar diretivas do próprio truffle ou da web3.js

// para gerar uma instância do contrato no truffle console, usamos "let instance = await NomeDoContrato.deployed()" e depois "instance"
// a partir desse ponto, podemos interagir com os métodos do contrato

// transação: interagir com alguma conta, seja conta de contato ou conta externa (carteira), alterando alguma variável de estado
// obter informações não conta como transação, pois não alteramos nada na Blockchain