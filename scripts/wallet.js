const hre = require("hardhat");


async function main() {
    // const wallet = hre.ethers.Wallet.fromPhrase(process.env.BSCMAINNET_PHRASEP);
    // console.log(wallet.address, wallet.privateKey)
    const newWallet = hre.ethers.Wallet.createRandom()
    console.log(newWallet.address, newWallet.privateKey)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});