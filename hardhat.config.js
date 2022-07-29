require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",
  networks: {
    hardhat: {
      chainId: 31337 // We set 1337 to make interacting with MetaMask simpler
    },
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 5100000,
      gasPrice: 12000000000
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  }
};
