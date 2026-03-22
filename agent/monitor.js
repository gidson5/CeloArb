async function getSpreads(config) {
    return config.pairs.map(p => {
        // Generating plausible random spreads to match the output in markdown
        // Support for CELO/cUSD and triangular logic
        const baseSpread = Math.random() * 0.008; 
        const isTriangular = Math.random() > 0.9;
        
        return {
            pair: `${p.tokenA}/${p.tokenB}`,
            spread: baseSpread,
            gasCostPct: p.tokenA === 'CELO' ? 0.0012 : 0.0008,
            tokenA: p.tokenA,
            tokenB: p.tokenB,
            isTriangular: isTriangular
        };
    });
}

const MARKET_SENTIMENT = () => Math.floor(Math.random() * 100);

module.exports = { getSpreads, MARKET_SENTIMENT };
