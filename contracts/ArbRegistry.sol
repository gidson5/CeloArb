// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ArbRegistry {
    address public owner;
    
    event ArbitrageOpportunity(string pair1, string pair2, uint256 spread, uint256 estimatedProfit);
    event ArbitrageExecuted(string fromToken, string toToken, uint256 amountIn, uint256 amountOut, string txHash);
    event ProfitRecorded(uint256 profitAmount, uint256 cumulativeProfit);
    
    uint256 public cumulativeProfit;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function logOpportunity(string calldata pair1, string calldata pair2, uint256 spread, uint256 estimatedProfit) external onlyOwner {
        emit ArbitrageOpportunity(pair1, pair2, spread, estimatedProfit);
    }

    function logExecution(string calldata fromToken, string calldata toToken, uint256 amountIn, uint256 amountOut, string calldata txHash, uint256 profit) external onlyOwner {
        cumulativeProfit += profit;
        emit ArbitrageExecuted(fromToken, toToken, amountIn, amountOut, txHash);
        emit ProfitRecorded(profit, cumulativeProfit);
    }
}
