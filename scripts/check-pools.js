const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://forno.celo.org");
    const factoryAddr = "0xAfE208a311B21f13EF87E33A90049fC17A7acDEc"; // Celo Uniswap V3 Factory
    const abi = ["function getPool(address tokenA, address tokenB, uint24 fee) view returns (address)"];
    const factory = new ethers.Contract(factoryAddr, abi, provider);

    const cUSD = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
    const USDT = "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e";
    const USDC = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C";
    const CELO = "0x471EcE3750Da237f93B8E339c536989b8978a438";

    const fees = [100, 500, 3000, 10000];

    async function check(t1, t2, f) {
        const pool = await factory.getPool(t1, t2, f);
        if (pool !== "0x0000000000000000000000000000000000000000") {
            console.log(`Pool found: ${t1}-${t2} fee ${f} -> ${pool}`);
        }
    }

    console.log("Checking pools...");
    for (const f of fees) {
        await check(cUSD, USDT, f);
        await check(cUSD, USDC, f);
        await check(USDT, USDC, f);
        await check(CELO, cUSD, f);
    }
}

main();
