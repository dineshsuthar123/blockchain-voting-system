const hre = require("hardhat");

async function main() {
    try {
        console.log("🔓 Opening Voting...\n");

        // Get the contract address (same as in frontend)
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        // Get the contract
        const Voting = await hre.ethers.getContractFactory("Voting");
        const voting = Voting.attach(contractAddress);

        // Check current status
        const isOpenBefore = await voting.votingOpen();
        console.log(`📊 Current Voting Status: ${isOpenBefore ? "✅ OPEN" : "❌ CLOSED"}`);

        if (isOpenBefore) {
            console.log("✅ Voting is already open!");
            return;
        }

        // Open voting
        console.log("🔄 Opening voting...");
        const tx = await voting.openVoting();
        await tx.wait();

        // Verify it's open
        const isOpenAfter = await voting.votingOpen();
        console.log(`✅ Voting opened successfully! Status: ${isOpenAfter ? "OPEN" : "CLOSED"}`);
        console.log(`📋 Transaction Hash: ${tx.hash}`);

        console.log("\n🎉 Voting is now open! Users can vote on proposals.");

    } catch (error) {
        console.error("❌ Error opening voting:", error.message);

        if (error.message.includes("Only owner can call this function")) {
            console.log("\n🔧 Solution: Make sure you're using the owner account");
        } else if (error.message.includes("call revert exception")) {
            console.log("\n🔧 Solution: Check that the contract is deployed correctly");
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });