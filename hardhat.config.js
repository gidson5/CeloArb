require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    // Celo Mainnet via Alchemy
    celo: {
      url: (process.env.ALCHEMY_URL || "https://forno.celo.org").trim(),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY.trim()] : ["0x0000000000000000000000000000000000000000000000000000000000000001"],
      chainId: 42220,
    },
  },
};
