// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const name = "Root NFT";
  const symbol = "Root";

  //   Gas used:            2468621 of 30000000
  const nft = await hre.ethers.deployContract("RootNFT", [name, symbol]);
  console.log('pre deploy...')
  await nft.waitForDeployment();
  console.log('post deploy...')

  console.log(
   `${name} deployed to ${nft.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
