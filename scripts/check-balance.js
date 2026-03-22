const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const balance = await provider.getBalance(wallet.address);
  const network = await provider.getNetwork();
  console.log("Address :", wallet.address);
  console.log("Network :", network.name, "(chainId", network.chainId.toString() + ")");
  console.log("Balance :", ethers.formatEther(balance), "CELO");
}

main().catch(console.error);
