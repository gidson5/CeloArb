// Mock feed setup
const dashboardFeed = {
  getLatestTrades: () => [
    { time: '08:01:03', pair: 'cUSD/USDT', profit: '$5.30', hash: '0x3f2a...b1c4' }
  ],
  getLiveSpreads: () => [
    { pair: 'cUSD/USDT', spread: '+0.41%' },
    { pair: 'cUSD/USDC', spread: '+0.11%' },
    { pair: 'USDT/USDC', spread: '+0.03%' }
  ]
};

if (typeof window !== "undefined") {
    window.dashboardFeed = dashboardFeed;
} else if (typeof module !== "undefined") {
    module.exports = dashboardFeed;
}
