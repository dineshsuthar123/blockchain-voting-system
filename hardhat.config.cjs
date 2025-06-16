require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // To load environment variables from .env file

/** @type import('hardhat/config').HardhatUserConfig */

// Default to a public Sepolia RPC URL if not set in .env
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

// Default to a Hardhat test private key if not set in .env
// IMPORTANT: REPLACE THIS WITH YOUR ACTUAL PRIVATE KEY IN THE .ENV FILE FOR DEPLOYMENT
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.24" },
      { version: "0.8.28" }
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // Use array of private keys
      chainId: 11155111,
      gasPrice: "auto", // Or set a specific gas price e.g., 20000000000 (20 Gwei)
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    }
  },
  sourcify: {
    // Disabled by default
    // enabled: true
  }
};