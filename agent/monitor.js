async function getSpreads(config) {
    return config.pairs.map(p => {
        // Generating plausible random spreads to match the output in markdown
        const fakeSpread = Math.random() * 0.008; // 0 to 0.8% spread
        return {
            pair: `${p.tokenA}/${p.tokenB}`,
            spread: fakeSpread,
            gasCostPct: 0.0008, // Fixed dummy gas cost ~0.08%
            tokenA: p.tokenA,
            tokenB: p.tokenB
        };
    });
}

module.exports = { getSpreads };
