// run permite acessar os comandos do terminal (compile, verify ...)
// network permite trabalahr com as redes (da blockchain)

const {ethers, run, network} = require("hardhat")

// async main
async function main() {

  // fazer o deploy do contrato
  const SimpleStorageFactory = await ethers.getContractFactory("Armazenamento") // Obtém o contrato
  console.log("Deploying contract ...")
  const simpleStorage = await SimpleStorageFactory.deploy() // realzia o deploy de fato
  await simpleStorage.waitForDeployment() // espera até ele ser realmente deployed
  console.log(`Deployed contract to: ${simpleStorage.target}`) // exibe o endereço do contrato (target é da nova atualização 6+)

  // verificar o contrato acessando informações da network
  // apenas verifica se for na rede da sepolia
  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
    await simpleStorage.waitForDeployment(6)
    await verify(simpleStorage.target, [])
  }

  // interagir com o contrato
  // para acessar funções do contrato basta usar a instância e chamar a função em seguida
  const currentValue = await simpleStorage.leNumero()
  console.log(`Current value: ${currentValue}`)

  // atualizar número
  const transactionResponse = await simpleStorage.salvaNumero(7)
  await transactionResponse.wait(1) // depois de toda transação, sempre esperar mais um pouco para confirmar

  // mostra número atualizado
  const updatedValue = await simpleStorage.leNumero()
  console.log(`Updated value ${updatedValue}`)


}

// verificar o contrato assim que for deployed
// caso dê erro, apagar as pastas artifacts e cache
async function verify(contractAddress, args){
  console.log("Verifying contract...")
  
  try{
    // run vai rodar o verify do console, passando algumas informações como parâmetro
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  }catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Contrato já verificado")
    }else{
      console.log(e)
    }
  }  
}

// main
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
