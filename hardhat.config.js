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
    // Celo Mainnet via Alchemy (already enabled in dashboard)
    celo: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
};
