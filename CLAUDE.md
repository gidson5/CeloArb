# CeloArb — Autonomous Stablecoin Arbitrage Agent on Celo

> Hackathon project for the Synthesis × Celo Hackathon · March 2026
> Track: Best Agent on Celo | Uniswap | Self Protocol | MetaMask Delegation | Filecoin

---

## One-Line Description

CeloArb is an autonomous stablecoin arbitrage agent that monitors price spreads between USDT, cUSD, and USDC across Uniswap pools on Celo — and executes profitable trades automatically, 24/7, without human intervention.

---

## Problem Statement

Stablecoin prices are not perfectly synchronized across DEX pools. On any given block, cUSD might trade at $1.002 on one pool and $0.998 on another — a 0.4% spread that represents pure profit for anyone fast enough to capture it. Today this opportunity is exclusively exploited by sophisticated MEV bots running on centralized infrastructure, inaccessible to regular users.

CeloArb democratizes stablecoin arbitrage on Celo — a fully autonomous, transparent, verifiable agent that anyone can deploy and monitor.

---

## How It Works

### Strategy Logic
```
Every 30 seconds:
  1. Fetch live prices for cUSD/USDT, cUSD/USDC, USDT/USDC
     from Uniswap V3 pools on Celo via TWAP
  2. Calculate spread between each pair
  3. Subtract estimated gas cost in CELO
  4. If net profit > 0.3% (configurable threshold):
       → Confirm with RSI — avoid trading into momentum
       → Check delegation rules (daily limit, slippage cap)
       → Execute arbitrage swap via Uniswap Trading API
       → Confirm tx receipt
       → Log trade to HedgeRegistry on-chain
       → Emit ArbitrageExecuted event
  5. Update cumulative P&L tracker
```

### Arbitrage Example
```
Block 18,420,311 — Opportunity detected:

  cUSD/USDT on Pool A:  1.0042
  cUSD/USDT on Pool B:  0.9981
  Spread:               0.61%
  Gas cost (est.):      0.08%
  Net profit:           0.53% ✅ above 0.3% threshold

  → Buying cUSD on Pool B
  → Selling cUSD on Pool A
  → Profit: $5.30 on $1,000 trade
  → TX: 0x3f2a...b1c4 confirmed in 2.1s
```

### Technical Indicators
- **TWAP** — 5-minute time-weighted average price to filter noise
- **RSI** — avoids entering trades when momentum is strongly directional
- **Spread calculator** — real-time bid/ask spread across 3 stablecoin pairs
- **Gas estimator** — factors current Celo gas price into profitability check
- **Slippage model** — estimates price impact based on trade size vs pool liquidity

### Execution Flow
```
CeloArb Agent
     │
     ├── Price Monitor
     │       └── cUSD/USDT, cUSD/USDC, USDT/USDC
     │       └── Uniswap V3 TWAP on Celo
     │       └── 30-second polling interval
     │
     ├── Opportunity Detector
     │       └── spread calculation
     │       └── gas cost subtraction
     │       └── RSI signal confirmation
     │       └── net profit threshold check (>0.3%)
     │
     ├── Risk Guard
     │       └── MetaMask Delegation rules check
     │       └── daily limit enforcement
     │       └── slippage cap (max 0.5%)
     │       └── approved contract verification
     │
     ├── Executor
     │       └── Uniswap Trading API swap on Celo
     │       └── tx confirmation + receipt
     │       └── on-chain trade log
     │
     └── Identity Layer
             └── Self Protocol ZK verification
             └── AgentNS ENS: celoarb.agent.eth
             └── ERC-8004 profile on Filecoin
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Celo Mainnet / Alfajores Testnet |
| DEX / Swaps | Uniswap Trading API (Celo deployment) |
| Price Feeds | Uniswap V3 TWAP on Celo |
| Identity | AgentNS ENS · `celoarb.agent.eth` · ERC-8004 |
| ZK Verification | Self Protocol · zk-SNARK / Groth16 |
| Delegation | MetaMask Delegation Toolkit · Smart Accounts Kit |
| Storage | IPFS · Filecoin (trade logs + agent profile) |
| RPC Provider | Alchemy (Celo Alfajores) |
| Runtime | Node.js · ethers.js v6 |
| Dashboard | HTML · CSS · JS (live P&L + trade feed) |

---

## Features

### 1. Real-Time Spread Monitoring
- Polls cUSD/USDT, cUSD/USDC, USDT/USDC prices every 30 seconds
- Uses Uniswap V3 TWAP to filter single-block noise
- Calculates net profit after gas on every tick
- Visual spread chart on live dashboard

### 2. Autonomous Trade Execution
- Executes via Uniswap Trading API on Celo
- Slippage protection (configurable, default 0.5%)
- RSI confirmation prevents buying into momentum spikes
- Full tx receipt logging on-chain

### 3. MetaMask Delegation Safety Layer
- Daily spending cap enforced on-chain
- Per-transaction maximum
- Only Uniswap Router and approved contracts can be called
- Time window restrictions
- Rules stored in ENS text record — auditable by anyone

### 4. Self Protocol ZK Verification
- Agent verified as human-backed via passport ZK proof (Groth16)
- One human, one agent — sybil-resistant
- Attestation stored on-chain and in ENS text record

### 5. AgentNS Identity Integration
- ENS name: `celoarb.agent.eth`
- ERC-8004 profile stored on Filecoin/IPFS
- Discoverable via A2A capability search on AgentNS
- Capabilities: `swap, arbitrage, uniswap-api, self-zk-id, metamask-delegation`

### 6. Live P&L Dashboard
- Real-time spread percentage per pair
- Trade history with profit per trade
- Cumulative P&L tracker
- Agent status (scanning / executing / paused)
- Current delegation rules display

### 7. On-Chain Trade Registry
- Every arbitrage trade logged to `ArbRegistry.sol` on Celo
- Events: `ArbitrageOpportunity`, `ArbitrageExecuted`, `ProfitRecorded`
- Full auditability — anyone can verify the agent's history

---

## Configuration

```javascript
const ARB_CONFIG = {
  // Stablecoin pairs to monitor
  pairs: [
    { tokenA: "cUSD",  tokenB: "USDT",  poolFee: 500  },
    { tokenA: "cUSD",  tokenB: "USDC",  poolFee: 500  },
    { tokenA: "USDT",  tokenB: "USDC",  poolFee: 100  },
  ],

  // Profitability thresholds
  minNetProfitPct:   0.003,  // 0.3% minimum net profit after gas
  maxSlippage:       0.005,  // 0.5% max slippage tolerance
  rsiOverbought:     70,     // skip trade if RSI > 70
  twapWindow:        300,    // 5-minute TWAP in seconds

  // Execution
  tradeAmountUSDT:   1000,   // base trade size in USDT
  pollInterval:      30000,  // check every 30 seconds
  maxGasPriceGwei:   50,     // skip if gas > 50 gwei

  // Risk (MetaMask Delegation)
  dailyLimitUSDT:    5000,
  perTxMaxUSDT:      1000,
  approvedContracts: ["uniswap-v3-router-celo", "uniswap-quoter-celo"],
};
```

---

## ERC-8004 Profile

```json
{
  "name": "celoarb.agent.eth",
  "type": "ArbitrageAgent",
  "version": "1.0.0",
  "network": "celo",
  "capabilities": ["swap", "arbitrage", "uniswap-api", "self-zk-id", "metamask-delegation", "filecoin-storage"],
  "strategy": {
    "pairs": ["cUSD/USDT", "cUSD/USDC", "USDT/USDC"],
    "min_profit_threshold": "0.3%",
    "indicators": ["RSI-14", "TWAP-5m", "gas-estimator"],
    "dex": "Uniswap V3 on Celo",
    "poll_interval": "30s"
  },
  "self_protocol": {
    "verified": true,
    "proof_type": "groth16"
  },
  "delegation": {
    "daily_limit": "5000 USDT",
    "per_tx_max": "1000 USDT",
    "approved": ["uniswap-v3-router-celo"],
    "enforce_onchain": true
  },
  "erc8004": true
}
```

---

## Bounty Alignment

| Bounty | Prize | Qualification |
|---|---|---|
| **Best Agent on Celo** | $3K | Fully autonomous stablecoin arbitrage agent on Celo — explicitly name-dropped by @CeloDevs as an ideal Uniswap bounty submission |
| **Uniswap** | +bounty | Uses Uniswap Trading API for all swaps on Celo — stablecoin arbitrage is the exact use case Uniswap highlighted |
| **Self Protocol** | +$1K | Human-backed ZK verification via Self Protocol SDK integrated into agent identity |
| **MetaMask Delegation** | +bounty | Daily limits, slippage caps, and approved contracts enforced via Smart Accounts Kit |
| **Filecoin** | +prize | Agent profile and full trade log history stored on Filecoin via IPFS |

**Total stackable prize potential: $3,500+ across 5 bounties.**

---

## Project Structure

```
celoarb/
├── CLAUDE.md                    # This file
├── index.html                   # Live P&L dashboard
├── package.json
├── .env.example
├── contracts/
│   └── ArbRegistry.sol          # On-chain trade log + agent config
├── agent/
│   ├── index.js                 # Main agent loop (runs continuously)
│   ├── monitor.js               # Price feed polling + spread calculation
│   ├── strategy.js              # RSI, TWAP, profitability logic
│   ├── executor.js              # Uniswap swap execution
│   └── risk.js                  # Delegation rules + slippage enforcement
├── scripts/
│   ├── deploy.js                # Deploy ArbRegistry to Celo Alfajores
│   └── start-agent.js           # Start the autonomous arbitrage loop
└── dashboard/
    └── feed.js                  # Real-time trade feed for dashboard
```

---

## Getting Started

### Prerequisites
```bash
node >= 18
npm >= 9
Celo wallet funded with CELO (faucet.celo.org for Alfajores)
Alchemy account → Celo Alfajores RPC URL
Self Protocol developer account
```

### Install
```bash
git clone https://github.com/yourhandle/celoarb
cd celoarb
npm install
cp .env.example .env
# Fill in ALCHEMY_URL and PRIVATE_KEY
```

### Deploy & Start
```bash
node scripts/deploy.js       # deploys ArbRegistry to Celo Alfajores
node scripts/start-agent.js  # starts the autonomous arbitrage loop
```

### Watch It Work
```
[08:00:00] 🔍 Scanning: cUSD/USDT | cUSD/USDC | USDT/USDC
[08:00:00] 📊 Spreads: cUSD/USDT +0.12% | cUSD/USDC +0.08% | USDT/USDC +0.04%
[08:00:30] 📊 Spreads: cUSD/USDT +0.41% | cUSD/USDC +0.11% | USDT/USDC +0.03%
[08:01:00] 🚨 Opportunity: cUSD/USDT spread 0.61% — net profit 0.53% after gas
[08:01:00] 📡 RSI: 48.2 — neutral, proceeding
[08:01:00] ✅ Delegation check passed — within daily limit
[08:01:01] ⚡ Executing: Buy cUSD → Sell USDT ($1,000 trade)
[08:01:03] ✅ TX confirmed: 0x3f2a...b1c4 (block 18420311)
[08:01:03] 💰 Profit: $5.30 | Cumulative P&L: +$47.80
[08:01:03] 📝 Trade logged on-chain
```

---

## Why CeloArb Wins

**Judges see it working in real time.** A live dashboard showing spreads ticking, a trade firing automatically, P&L updating — that's the demo moment that wins hackathons. It's visual, immediate, and undeniably autonomous.

**Celo explicitly name-dropped it.** The @CeloDevs announcement tweet specifically calls out "Stablecoin Arbitrage Agent" as an ideal Uniswap bounty submission. Judges are already expecting this category.

**It's genuinely useful.** Anyone holding Celo stablecoins benefits from tighter spreads. This agent provides a real market function, not just a demo.

**The builder's edge.** RSI, TWAP, spread thresholds, slippage caps, gas cost as a profitability factor — this is scalping logic already developed for the Volatility 25 Index, directly applicable here.

---

## Relationship to AgentNS

CeloArb is registered on **AgentNS** as `celoarb.agent.eth` — demonstrating the full AgentNS stack in production. AgentNS provides the identity layer; CeloArb provides the autonomous agent. Together they tell a complete story: AgentNS names and discovers the agents, CeloArb is one of those agents doing real work on Celo.

Submitting both projects together strengthens both submissions.

---

## Team
Built solo for the **Synthesis × Celo Hackathon** · March 2026

---

## Links
- 🌐 Live Dashboard: *[Insert URL]*
- 💻 GitHub: *[Insert GitHub URL]*
- 📍 Contract (Alfajores): *[Insert after deployment]*
- 🔗 CeloScan: *[Insert tx link]*

---

## License
MIT
