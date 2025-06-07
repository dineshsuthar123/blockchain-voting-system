import hre from "hardhat";
import votingArtifact from "../artifacts/contracts/Voting.sol/Voting.json" assert { type: "json" };

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const abi = votingArtifact.abi;
    const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    const Voting = new hre.ethers.Contract(contractAddress, abi, owner);
    const tx = await Voting.openVoting();
    await tx.wait();
    console.log("Voting is now open!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
