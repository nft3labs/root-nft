require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

LOCALHOST_PRIVATE_KEY = process.env.LOCALHOST_PRIVATE_KEY
MINT_SEPOLIA_PRIVATE_KEY = process.env.MINT_SEPOLIA_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // for Sepolia testnet
    "mint-sepolia": {
      url: "https://sepolia-testnet-rpc.mintchain.io",
      accounts: [MINT_SEPOLIA_PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    localhost: {
      url: `http://127.0.0.1:8555`,
      chainId: 901,
      accounts: [LOCALHOST_PRIVATE_KEY]
    },
    "l2root-testnet": {
      url: `https://testnet-l2root.onebitdev.com`,
      chainId: 901,
      accounts: [LOCALHOST_PRIVATE_KEY]
    }
  },
  etherscan: {
   customChains: [
     {
      network: "mint-sepolia",
      chainId: 1686,
      urls: {
        apiURL: `https://mint-testnet-public.explorer.caldera.xyz/api/`,
        browserURL: `https://testnet-explorer.mintchain.io/`
      }
     }
   ],
   },
};
