const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying ArbRegistry with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "CELO");

  if (balance === 0n) {
    throw new Error("Account has no CELO. Visit faucet.celo.org to top up.");
  }

  console.log("\n📦 Deploying ArbRegistry.sol...");
  const ArbRegistry = await ethers.getContractFactory("ArbRegistry");
  const registry = await ArbRegistry.deploy();
  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log("✅ ArbRegistry deployed to:", address);

  // Save address to deployment.json for the agent to pick up
  const deploymentPath = path.join(__dirname, "..", "deployment.json");
  const deployment = {
    network: "celo",
    chainId: 42220,
    arbRegistry: address,
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
  };
  fs.writeFileSync(deploymentPath, JSON.stringify(deployment, null, 2));
  console.log("📝 Deployment info saved to deployment.json");
  console.log("\n🎯 Next step: run  node scripts/start-agent.js");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error.message);
  process.exitCode = 1;
});
