const hre = require("hardhat");

async function main() {
    console.log("🔍 Testing Network Connection...\n");

    try {
        // Test 1: Check if we can get the provider
        console.log("✓ Step 1: Getting provider...");
        const provider = hre.ethers.provider;

        // Test 2: Check network details
        console.log("✓ Step 2: Getting network info...");
        const network = await provider.getNetwork();
        console.log(`   Network Name: ${network.name}`);
        console.log(`   Chain ID: ${network.chainId}`);

        // Test 3: Check block number
        console.log("✓ Step 3: Getting latest block...");
        const blockNumber = await provider.getBlockNumber();
        console.log(`   Latest Block: ${blockNumber}`);

        // Test 4: Check if accounts are available
        console.log("✓ Step 4: Checking accounts...");
        const accounts = await hre.ethers.getSigners();
        console.log(`   Available Accounts: ${accounts.length}`);
        if (accounts.length > 0) {
            console.log(`   Account 0: ${accounts[0].address}`);

            // Test 5: Check balance
            const balance = await provider.getBalance(accounts[0].address);
            console.log(`   Balance: ${hre.ethers.formatEther(balance)} ETH`);
        }

        console.log("\n🎉 All tests passed! Network is ready for deployment.");

    } catch (error) {
        console.log("\n❌ Network test failed!");
        console.log("Error:", error.message);

        if (error.message.includes("Invalid JSON-RPC")) {
            console.log("\n🔧 Possible solutions:");
            console.log("1. The RPC endpoint might be down");
            console.log("2. Try a different RPC endpoint");
            console.log("3. Check your internet connection");
        }

        if (error.message.includes("private key")) {
            console.log("\n🔧 Private key issue:");
            console.log("1. Check your .env file");
            console.log("2. Make sure PRIVATE_KEY is set correctly");
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
