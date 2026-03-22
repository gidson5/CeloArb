# CeloArb Pro — Advanced AI Arbitrage Agent on Celo

> **Synthesis × Celo Hackathon 2026 · Best Agent on Celo | Uniswap | Self Protocol | MetaMask Delegation**

---

## 🪙 Overview
**CeloArb Pro** is an autonomous, high-frequency arbitrage agent designed for the Celo ecosystem. It monitors deep liquidity pools on **Uniswap V3**, identifying price spreads between **CELO**, **WETH**, **WBTC**, and **USDC** with sub-5-second latency. When a profitable opportunity arises, the agent executes ZK-verified trades backed by a secure **MetaMask Delegation** layer.

---

## 🛡️ Key Features
- **High-Frequency Monitoring**: Real-time polling of Uniswap V3 pools every **3 seconds** for ultra-low latency detection.
- **ZK-Verified Execution**: Every trade is cryptographically verified using **ZK-SNARKs (Groth16)** proofs, ensuring computational integrity.
- **AgentNS Identity**: Fully integrated with **AgentNS** (`celoarb.agent.eth`) and ERC-8004 for cross-chain identity and trust.
- **MetaMask Delegation**: Secure on-chain daily spending limits and recursive transaction approval via MetaMask Smart Accounts.
- **Pro Dashboard**: A premium, dark-themed analytics interface featuring:
  - **Real-Time P&L Charting** via Chart.js
  - **Market Sentiment Engine** (RSI & Flow Analysis)
  - **Live Execution Console** with terminal logs
  - **Token Portfolio** with live CoinGecko price feeds

---

## 🛠️ Tech Stack
- **Blockchain**: Celo Mainnet (Optimized for low gas and high speed)
- **DEX Architecture**: Uniswap V3 Quoter & SwapRouter
- **Identity & Trust**: [AgentNS](https://agent-ns.vercel.app) (`celoarb.agent.eth`) · [Self Protocol](https://self.xyz) (ZK-ID)
- **Security**: MetaMask Delegation (Smart Account Kit)
- **Frontend**: Vanilla HTML5/CSS3 · Chart.js · Ethers.js v6
- **Data**: CoinGecko API (Market Prices) · Alchemy (RPC)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A Celo wallet funded with **CELO** for gas and **USDC** for trading liquidity.

### 2. Installation
```bash
git clone https://github.com/gidson5/CeloArb.git
cd CeloArb
npm install
```

### 3. Configuration
Rename `.env.example` to `.env` and configure your credentials:
```bash
cp .env.example .env
```
Key required fields: `PRIVATE_KEY`, `ALCHEMY_API_KEY`, and `CE_API_KEY`.

### 4. Running the Dashboard
The visual command center is entirely client-side. Simply open:
👉 **[`index.html`](index.html)** in any modern browser.

---

## 📊 Performance & Strategy
- **Scan Frequency**: 3s Refresh
- **Min. Profit Threshold**: 0.3% (Configurable)
- **Execution Model**: Static-Call Pre-Verification → ZK Proof Generation → On-chain Swap
- **Slippage Tolerance**: Dynamic (0.1% - 0.5%)

---

## 📁 Project Structure
```text
celoarb/
├── agent/             # Autonomous strategy & execution logic
├── contracts/         # ArbRegistry.sol & ZK Verifier
├── scripts/           # Deployment & balance management
├── index.html         # Premium Pro Dashboard UI
├── erc8004.json       # AgentNS Identity Metadata
└── hardhat.config.js  # Celo Network Multi-chain Config
```

---

## 📜 License
Released under the **MIT License**. Built with ❤️ for the Celo Community.
