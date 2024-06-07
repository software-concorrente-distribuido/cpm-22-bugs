// SPDX-License-Identifier: MIT
pragma solidity^0.8.7;

contract SimpleCoin {

    uint public valor = 2000;
    mapping(address => uint) public balanceOf;

    //queremos que o valor seja da conta que criou o contrato

    constructor() {
        balanceOf[msg.sender] = valor;
    }
}