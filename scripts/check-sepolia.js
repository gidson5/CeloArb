const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const sepoliaRpc = "https://celo-sepolia.g.alchemy.com/v2/CBagg5wsIJj_msYQqFSTz";
  const provider = new ethers.JsonRpcProvider(sepoliaRpc);
  const address = "0xBfe28369BBFF6D47D52AC33e9F0B633589d23Af3";
  const balance = await provider.getBalance(address);
  console.log("Sepolia Balance:", ethers.formatEther(balance), "CELO");
}

main().catch(console.error);
