const hre = require("hardhat");

async function main() {
  const [deployer, ...otherAccounts] = await hre.ethers.getSigners();
  
  console.log("\n=== HARDHAT LOCAL NETWORK ACCOUNTS ===");
  console.log("Use these accounts in MetaMask:\n");
  
  console.log("🚀 OWNER/DEPLOYER ACCOUNT (Use this one!):");
  console.log("Address:", deployer.address);
  console.log("Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  
  console.log("\n📝 OTHER AVAILABLE ACCOUNTS:");
  const privateKeys = [
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
    "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6"
  ];
  
  for (let i = 1; i < Math.min(4, otherAccounts.length + 1); i++) {
    console.log(`Account ${i}: ${otherAccounts[i-1].address}`);
    console.log(`Private Key: ${privateKeys[i-1]}`);
    console.log("");
  }
  
  console.log("\n=== METAMASK SETUP INSTRUCTIONS ===");
  console.log("1. Open MetaMask");
  console.log("2. Click the network dropdown (usually shows 'Ethereum Mainnet')");
  console.log("3. Click 'Add Network' or 'Add a network manually'");
  console.log("4. Enter these details:");
  console.log("   - Network Name: Hardhat Local");
  console.log("   - New RPC URL: http://127.0.0.1:8545");
  console.log("   - Chain ID: 31337");
  console.log("   - Currency Symbol: ETH");
  console.log("5. Click 'Save'");
  console.log("6. Switch to the 'Hardhat Local' network");
  console.log("7. Import the OWNER account using the private key above");
  console.log("\n✅ After setup, refresh your browser and try creating a proposal!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
