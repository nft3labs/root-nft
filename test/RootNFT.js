const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RootNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const name = "Root NFT";
    const symbol = "Root";
  
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("RootNFT");
    const nft = await NFT.deploy(name, symbol);

    return { nft, name, symbol, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right value", async function () {
      const { nft, name, symbol } = await loadFixture(deployOneYearLockFixture);

      expect(await nft.name()).to.equal(name);
      expect(await nft.symbol()).to.equal(symbol);
    });

    // it("Should mint", async function () {
    //   const { nft, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
    //   let tokenId = 1;
    //   console.log(await nft.mintCollectionNFT(otherAccount, tokenId))

    //   expect(await nft.balanceOf(otherAccount)).to.equal(1);
    //   expect(await nft.ownerOf(tokenId)).to.equal(otherAccount.address);

    //   await expect(nft.connect(otherAccount).mintCollectionNFT(owner, tokenId++)).revertedWith(`Ownable: caller is not the owner`);
    // });

    it("Should mint batch", async function () {
      const { nft, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
      let tokenId = 1;
      let participants = [];
      let total = 100;

      for (i = 0; i < total; i++) {
        let randomWallet = ethers.Wallet.createRandom();
        participants.push({
          collector: randomWallet.address,
          tokenId: tokenId++,
        });
      }

      //  Gas used:            5140107 of 30000000
      console.log(await nft.mintBatchCollectionNFT(participants))

      for (i = 0; i < total; i++) {
        let p = participants[i];
        console.log(p.collector, p.tokenId)
        expect(await nft.balanceOf(p.collector)).to.equal(1);
        expect(await nft.ownerOf(i+1)).to.equal(p.collector);
      }
    });
  });
});
