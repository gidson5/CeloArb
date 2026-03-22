function checkDelegation(config, tradeAmount) {
    if (tradeAmount > config.perTxMaxUSDT) return false;
    // mock daily check and slippage enforcement
    return true; 
}

module.exports = { checkDelegation };
