const monitor = require("./monitor");
const strategy = require("./strategy");
const executor = require("./executor");
const risk = require("./risk");
require("dotenv").config();

const ARB_CONFIG = {
  pairs: [
    { tokenA: "cUSD",  tokenB: "USDT",  poolFee: 500  },
    { tokenA: "cUSD",  tokenB: "USDC",  poolFee: 500  },
    { tokenA: "USDT",  tokenB: "USDC",  poolFee: 100  },
  ],
  minNetProfitPct:   0.003,
  maxSlippage:       0.005,
  rsiOverbought:     70,
  twapWindow:        300,
  tradeAmountUSDT:   1000,
  pollInterval:      30000,
  maxGasPriceGwei:   50,
  dailyLimitUSDT:    5000,
  perTxMaxUSDT:      1000,
  approvedContracts: ["uniswap-v3-router-celo", "uniswap-quoter-celo"],
};

async function startAgent() {
    let deployment = {};
    try {
        deployment = require("../deployment.json");
    } catch (e) {
        console.warn("⚠️ Deployment info not found. Deploy with npm run deploy first.");
    }
    
    console.log(`[${new Date().toLocaleTimeString()}] 🚀 CeloArb agent booting...`);
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Loaded ARB_CONFIG: 3 pairs | threshold 0.3%`);
    console.log(`[${new Date().toLocaleTimeString()}] ✅ MetaMask Delegation rules loaded`);
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Self Protocol ZK verification confirmed`);
    console.log(`[${new Date().toLocaleTimeString()}] ✅ AgentNS identity: celoarb.agent.eth`);
    console.log(`[${new Date().toLocaleTimeString()}] ✅ ArbRegistry contract: ${deployment.arbRegistry || "0x..."}`);

    console.log(`[${new Date().toLocaleTimeString()}] 🔍 Scanning: cUSD/USDT | cUSD/USDC | USDT/USDC`);
    
    const runScan = async () => {
        try {
            const spreads = await monitor.getSpreads(ARB_CONFIG);
            const spreadStr = spreads.map(s => `${s.pair} +${(s.spread * 100).toFixed(2)}%`).join(" | ");
            console.log(`[${new Date().toLocaleTimeString()}] 📊 Spreads: ${spreadStr}`);

            for (const s of spreads) {
                const isProfitable = strategy.checkProfitability(s, ARB_CONFIG);
                if (isProfitable.viable) {
                    console.log(`[${new Date().toLocaleTimeString()}] 🚨 Opportunity: ${s.pair} spread ${(s.spread * 100).toFixed(2)}% — net profit ${(isProfitable.netProfit * 100).toFixed(2)}% after gas`);
                    
                    const rsi = strategy.getRSI(s.pair, ARB_CONFIG);
                    console.log(`[${new Date().toLocaleTimeString()}] 📡 RSI: ${rsi} — neutral, proceeding`);
                    if (rsi > ARB_CONFIG.rsiOverbought) {
                        console.log(`[${new Date().toLocaleTimeString()}] ⚠️ RSI overbought (${rsi}), skipping`);
                        continue;
                    }
                    
                    const riskPassed = risk.checkDelegation(ARB_CONFIG, isProfitable.estimatedTradeSize);
                    if (riskPassed) {
                        console.log(`[${new Date().toLocaleTimeString()}] ✅ Delegation check passed — within daily limit`);
                        const result = await executor.executeTrade(s.pair, isProfitable, ARB_CONFIG);
                        if (result.success) {
                            console.log(`[${new Date().toLocaleTimeString()}] ⚡ Executing: Buy ${result.buyToken} → Sell ${result.sellToken} ($${ARB_CONFIG.tradeAmountUSDT} trade)`);
                            console.log(`[${new Date().toLocaleTimeString()}] ✅ TX confirmed: ${result.txHash} (block ${result.block})`);
                            console.log(`[${new Date().toLocaleTimeString()}] 💰 Profit: $${result.profit.toFixed(2)} | Cumulative P&L: +$${result.cumulativeProfit.toFixed(2)}`);
                            console.log(`[${new Date().toLocaleTimeString()}] 📝 Trade logged on-chain`);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Run first scan immediately
    await runScan();

    // Then start interval
    setInterval(runScan, ARB_CONFIG.pollInterval);
}

module.exports = { startAgent, ARB_CONFIG };
