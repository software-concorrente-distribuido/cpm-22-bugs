pragma solidity^0.8.7;

contract Simples {

    string public name;

    function mudaNome(string memory _name) public {
        name = _name;
    }
}

// interagindo com o contrato pelo truffle console
// let instance = await Simples.deployed()
// instance -> retorna a instância do contrato

// let name = await instance.name()
// name -> faz uma busca e obtém o nome, o que não conta como transação

// await instance.mudaNome("João") -> realiza uma transação pois altera o estado da Blockchain