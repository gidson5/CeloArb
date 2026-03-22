# CeloArb — Autonomous Stablecoin Arbitrage Agent on Celo

> **Hackathon project for the Synthesis × Celo Hackathon · March 2026**
> Track: Best Agent on Celo | Uniswap | Self Protocol | MetaMask Delegation | Filecoin

---

## 🪙 One-Line Description
CeloArb is an autonomous stablecoin arbitrage agent that monitors price spreads between **USDT**, **cUSD**, and **USDC** across Uniswap pools on Celo — and executes profitable trades automatically, 24/7, without human intervention.

---

## 🛡️ Key Features
- **Real-Time Spread Monitoring**: Polls Uniswap V3 TWAP every 30 seconds
- **Autonomous Trade Execution**: Executes swaps via Uniswap Trading API on Celo
- **MetaMask Delegation Layer**: On-chain daily spending limits, per-transaction caps, and approved contract white-listing
- **Self Protocol Identity**: Verified human-backed agent via ZK-SNARKs (Groth16) proof
- **AgentNS Integration**: Identity: `celoarb.agent.eth` · ERC-8004 Profile
- **Live P&L Dashboard**: Real-time terminal output and HTML dashboard for visual monitoring

---

## 🛠️ Tech Stack
- **Blockchain**: Celo Mainnet / Sepolia Testnet
- **DEX**: Uniswap V3 (Celo deployment)
- **Identity**: AgentNS ENS · `celoarb.agent.eth` · ERC-8004
- **Verification**: Self Protocol ZK-ID
- **Delegation**: MetaMask Smart Accounts Kit
- **Storage**: IPFS · Filecoin (Trade history)
- **Language**: Node.js · ethers.js (v6)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18+
- Celo wallet funded with **CELO** for gas

### 2. Installation
```bash
git clone https://github.com/gidson5/CeloArb.git
cd CeloArb
npm install
```

### 3. Configuration
Copy `.env.example` to `.env` and fill in your details:
```bash
cp .env.example .env
```
Ensure you have an **Alchemy API Key** and your **Private Key** added.

### 4. Deploy & Start
First, deploy your on-chain trade registry:
```bash
npm run deploy    # deploys ArbRegistry to Celo Mainnet
```

Then, start the autonomous agent loop:
```bash
npm start
```

---

## 📊 Live Dashboard
Open [`index.html`](index.html) in your browser to view the real-time arbitrage dashboard showing:
- Active spreads (TWAP 5m)
- Current scan status
- Cumulative P&L
- Trade execution history (confirmed on-chain)

---

## 📁 Repository Structure
```
celoarb/
├── agent/             # Core agent logic (Monitor, Strategy, Executor, Risk)
├── contracts/         # ArbRegistry.sol (On-chain logs)
├── scripts/           # Deployment and start scripts
├── dashboard/         # Dashboard data feed
├── index.html         # Live UI
├── package.json       # Dependencies and commands
└── hardhat.config.js  # Network configuration
```

---

## 📝 License
MIT
