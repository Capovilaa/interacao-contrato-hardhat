// testes podem ser autimatizados para ter certeza que o código irá funcionar
// nesta parte usamos uma nova funcionalidade -> beforeEach

// beforeEach( ()=>{
//})
// it() 

// para rodar -> yarn hardhat test
// para rodar um it específico (ele vai buscar essa string pelas descrições) -> yarn hardhat test --grep string

const { assert } = require("chai") // assert é usado para verificar, chai é o pacote que contém o assert e o expect (ambos servem para a mesma coisa)
const {ethers} = require("hardhat") // biblioteca essencial

// describe é usado para os testes
// recebe 2 parâmetros string e uma função
describe("SimpleStorage", function (){
    let simpleStorageFactory, simpleStorage

    // realizar isso antes de seguir com o it
    beforeEach( async function (){
        simpleStorageFactory = await ethers.getContractFactory("Armazenamento")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    // testar se o valor inicial é 0
    it("Should start with a favorite number of 0", async function (){
        const currentValue = await simpleStorage.leNumero() // obter o valor pós criação de contrato
        const expectedValue = "0" // número esperado

        // verificar se o número bate com o esperado
        assert.equal(currentValue.toString(), expectedValue)
    })

    // testar se o valor está sendo atualizado quando ele é armazenado
    it("Should update when we call salvaNumero", async function() {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.salvaNumero(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.leNumero()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
