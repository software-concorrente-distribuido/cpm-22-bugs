const SimpleCoin = artifacts.require("SimpleCoin")

contract("SimpleCoin", (accounts) => {

    //ver se foi feito o deploy no contrato na Blockchain
    it("SimpleCoin foi migrado?", async () => {

        let instance = await SimpleCoin.deployed();
        assert(instance , "O contrato não foi migrado")
        //os parâmetros do assert são sempre (verdadeiro, falso)
    })

    //verificar se o valor atual do contrato é de 2000
    it("Valor inicial", async () => {

        let instance = await SimpleCoin.deployed();
        let valor = await instance.valor();
        assert(valor==2000 , "O valor é diferente de 2000");
    })

    //verificar se o valor atual do contrato é de 2000
    it("balanceOf do criador do contrato", async () => {

        let instance = await SimpleCoin.deployed();
        var contaCriou = accounts[0];

        let balance = await instance.balanceOf(contaCriou);
        assert(balance==2000 , "Quem criou o contrato não recebeu os 2000");
    })
})