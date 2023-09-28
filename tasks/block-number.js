// tasks são como scripts, executam algo que for programado
// esses recebem o nome da task, a descrição e o código em si
// para uma task poder ser vista no console, ela tem que ser adicionada em "hardhat.config"

// toda task para ser criada precisa requirir "hardhat/config"
const {task} = require("hardhat/config")

// cração de uma task chamada "block-number"
task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}