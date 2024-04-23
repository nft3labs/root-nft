// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RootNFT is ERC721, Ownable {
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    // Allows minting of a new NFT 
    function mintCollectionNFT(address collector, uint256 tokenId) public onlyOwner() {
        _safeMint(collector, tokenId); 
    }

    struct Participant {
        address collector;
        uint256 tokenId;
    }

    // Allows minting of a new NFT 
    function mintBatchCollectionNFT(Participant[] calldata ps) public onlyOwner() {
        for(uint i=0; i< ps.length; i++){
            Participant calldata p = ps[i];
            _safeMint(p.collector, p.tokenId); 
        }
    }
}