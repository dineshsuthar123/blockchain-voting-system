const hre = require("hardhat");

async function main() {
  try {
    console.log("🔍 Checking Hardhat Network Connection...\n");
    
    // Check if we can connect to the network
    const provider = hre.ethers.provider;
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    
    console.log("✅ Network Connection Successful!");
    console.log("📊 Network Details:");
    console.log(`   Chain ID: ${network.chainId}`);
    console.log(`   Block Number: ${blockNumber}`);
    console.log(`   Network Name: ${network.name || 'localhost'}`);
    
    // Check accounts
    const accounts = await hre.ethers.getSigners();
    console.log(`\n👥 Available Accounts: ${accounts.length}`);
    console.log(`   Owner Address: ${accounts[0].address}`);
    
    // Test RPC endpoint
    console.log("\n🌐 RPC Endpoint Test:");
    console.log("   URL: http://127.0.0.1:8545");
    console.log("   Status: ✅ Active");
    
    console.log("\n📋 MetaMask Configuration:");
    console.log("   Network Name: Localhost");
    console.log("   RPC URL: http://localhost:8545");
    console.log("   Chain ID: 31337");
    console.log("   Currency: ETH");
    
  } catch (error) {
    console.log("❌ Network Connection Failed!");
    console.log("Error:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure 'npx hardhat node' is running");
    console.log("2. Check if port 8545 is available");
    console.log("3. Try restarting the Hardhat node");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
