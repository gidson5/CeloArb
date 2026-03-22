const { ethers } = require("ethers");
const wallet = ethers.Wallet.createRandom();
console.log("ADDRESS:  " + wallet.address);
console.log("PRIVKEY:  " + wallet.privateKey);
console.log("MNEMONIC: " + wallet.mnemonic.phrase);
