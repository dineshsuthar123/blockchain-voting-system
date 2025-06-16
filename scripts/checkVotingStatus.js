const hre = require("hardhat");

async function main() {
    try {
        console.log("🔍 Checking Voting Status...\n");

        // Get contract instance
        const Voting = await hre.ethers.getContractFactory("Voting");
        const contract = Voting.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Your deployed contract address

        // Check voting status
        const votingOpen = await contract.votingOpen();
        console.log(`📊 Voting Status: ${votingOpen ? "✅ OPEN" : "❌ CLOSED"}`);

        // Get owner
        const owner = await contract.owner();
        console.log(`👑 Contract Owner: ${owner}`);

        // Check if owner has voted
        const ownerHasVoted = await contract.hasVoted(owner);
        console.log(`🗳️  Owner Has Voted: ${ownerHasVoted ? "✅ YES" : "❌ NO"}`);

        // Get all proposals
        const proposals = await contract.getProposals();
        console.log(`\n📋 Total Proposals: ${proposals.length}`);

        for (let i = 0; i < proposals.length; i++) {
            console.log(`   ${i + 1}. "${proposals[i].description}" - ${proposals[i].voteCount} votes`);
        }

        // Get accounts and check voting status for first few
        const [deployer, account1, account2] = await hre.ethers.getSigners();

        console.log("\n👥 Account Voting Status:");
        console.log(`   ${deployer.address} (Owner): ${await contract.hasVoted(deployer.address) ? "✅ Voted" : "❌ Not Voted"}`);
        console.log(`   ${account1.address} (Account 1): ${await contract.hasVoted(account1.address) ? "✅ Voted" : "❌ Not Voted"}`);
        console.log(`   ${account2.address} (Account 2): ${await contract.hasVoted(account2.address) ? "✅ Voted" : "❌ Not Voted"}`);

        if (!votingOpen) {
            console.log("\n🔧 Solution: Run 'npx hardhat run scripts/openVoting.js --network localhost' to open voting");
        }

        if (ownerHasVoted) {
            console.log("\n🔧 Solution: Import a different account in MetaMask to vote:");
            console.log("   Account 1 Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d");
            console.log("   Account 2 Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a");
        }

    } catch (error) {
        console.log("❌ Error checking voting status!");
        console.log("Error:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
