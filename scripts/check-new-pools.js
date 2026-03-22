const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://forno.celo.org");
    const factoryAddr = "0xAfE208a311B21f13EF87E33A90049fC17A7acDEc"; 
    const abi = ["function getPool(address tokenA, address tokenB, uint24 fee) view returns (address)"];
    const factory = new ethers.Contract(factoryAddr, abi, provider);

    const CELO = "0x471EcE3750Da237f93B8E339c536989b8978a438";
    const stCELO = "0xC668583dcbDc9ae6FA3CE46462758188adfdfC24";
    const WETH = "0xD221812de1BD094f35587EE8E174B07B6167D9Af";

    async function check(t1, t2, f) {
        const pool = await factory.getPool(t1, t2, f);
        if (pool !== "0x0000000000000000000000000000000000000000") {
            console.log(`Pool found: ${t1}-${t2} fee ${f} -> ${pool}`);
        }
    }

    const fees = [100, 500, 3000, 10000];
    for (const f of fees) {
        await check(stCELO, CELO, f);
        await check(WETH, CELO, f);
    }
}

main();
