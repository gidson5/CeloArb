const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://forno.celo.org");
    const abi = ["function decimals() view returns (uint8)", "function symbol() view returns (string)"];
    
    const tokens = [
        "0x765DE816845861e75A25fCA122bb6898B8B1282a", // cUSD
        "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e", // USDT
        "0xcebA9300f2b948710d2653dD7B07f33A8B32118C", // USDC (Native)
        "0x471EcE3750Da237f93B8E339c536989b8978a438"  // CELO
    ];

    for (const addr of tokens) {
        try {
            const contract = new ethers.Contract(addr, abi, provider);
            const symbol = await contract.symbol();
            const decimals = await contract.decimals();
            console.log(`${symbol} (${addr}): ${decimals} decimals`);
        } catch (e) {
            console.log(`Failed for ${addr}: ${e.message}`);
        }
    }
}

main();
