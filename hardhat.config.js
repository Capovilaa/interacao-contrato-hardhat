require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config() // acessar variáveis de ambiente
require("./tasks/block-number") // plugin para ver número do bloco
require("hardhat-gas-reporter") // plugin para mostrar informações do gás de uma transação
require("solidity-coverage") // plugin para verificar se todo o código está sendo testado

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  defaultNetwork: "hardhat", // --network

  // networks podem ser adicionadas para o deploy
  // neste caso está indo para a Sepolia
  // arquivo .env está sendo usado para aramzenar as chaves
  networks:{
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId:11155111,
    },
  },

  // versão do solidity
  // pode ser alterado a qualquer momento
  solidity: "0.8.18",

  // para trabalhar com a etherscan
  etherscan:{
    apiKey: ETHERSCAN_API_KEY,
  },

  // exibe informações de gás no terminal
  // essas informações ainda podem ser salvas em um txt
  // é possível personalizar o que vai aparecer
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "BRL",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  }
};
