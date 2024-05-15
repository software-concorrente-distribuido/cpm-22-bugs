pragma solidity^0.8.7;

import "./Simples.sol";

contract Criador {

    address public endereco;

    function CriaPadrao() public {

        Simples novoSimples = new Simples();
        endereco = address(novoSimples);

    }
}

// Contrato para criar instâncias do outro contrato Simples.sol, capaz de retornar o endereço de cada instância
// "let instanceCriador = await Criador.deployed()" cria uma instância deste contrato
// "await instanceCriador.CriaPadrao()" gera um novo contrado Simples.sol
// "let endereco = await instanceCriador.endereco()" e depois "endereco" obtemos o endereço onde foi criado o novo Simples.sol


// mas como pegar uma instância de um contrato tendo o endereço dele usando o truffle?
// "let instance2 = await Simples.at('endereço')", ex:'0x936d229802475482Ec4D810Dc9Db557c48E72BD0'
// "nome2 = await instance2.name()" para verificar o nome nesse contrato referenciado
// "await instance2.mudaNome("Serjão")"para mudar o valor do nome nesse contrato