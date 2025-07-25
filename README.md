# 🗳️ Blockchain Voting System

A secure, transparent, and decentralized voting platform built on Ethereum. This project combines modern web technologies with blockchain infrastructure to create a trustless voting system where every vote is verifiable and tamper-proof.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-363636.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black.svg)
![Hardhat](https://img.shields.io/badge/Hardhat-2.24.0-yellow.svg)

## 🚀 Features

- **🔒 Secure Voting**: Smart contract-based voting with cryptographic security
- **🌐 Decentralized**: No central authority - runs on Ethereum blockchain
- **✅ Transparent**: All votes are publicly verifiable on the blockchain
- **🎨 Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **👛 Wallet Integration**: Connect with MetaMask, Coinbase Wallet, and other Web3 wallets
- **⚡ Real-time Results**: Live vote counting and results display
- **🔐 One Vote Per Address**: Prevents double voting through smart contract logic
- **📱 Mobile Responsive**: Works seamlessly across all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with TypeScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Ethers.js 6** - Ethereum library for blockchain interaction
- **React 19** - Latest React with modern features

### Blockchain
- **Solidity ^0.8.0** - Smart contract programming language
- **Hardhat** - Ethereum development environment
- **OpenZeppelin** - Security-focused smart contract library

### Networks
- **Ethereum Mainnet** - Production deployment
- **Sepolia Testnet** - Development and testing
- **Localhost** - Local development with Hardhat Network

## 📁 Project Structure

```
blockchain_voting-system/
├── contracts/                 # Smart contracts
│   ├── Voting.sol            # Main voting contract
│   └── Lock.sol              # Example contract
├── src/
│   └── app/                  # Next.js app directory
│       ├── layout.tsx        # Root layout
│       ├── page.tsx          # Home page
│       └── globals.css       # Global styles
├── scripts/                  # Deployment scripts
│   ├── deploy.js             # Contract deployment
│   ├── testNetwork.js        # Network testing
│   └── showAccounts.js       # Account utilities
├── test/                     # Contract tests
├── artifacts/                # Compiled contracts
├── cache/                    # Hardhat cache
├── hardhat.config.cjs        # Hardhat configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **MetaMask** or compatible Web3 wallet
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blockchain_voting-system.git
   cd blockchain_voting-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your values:
   ```env
   PRIVATE_KEY=your_private_key_here
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

4. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

5. **Run tests**
   ```bash
   npx hardhat test
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Smart Contract Development

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy to Local Network
```bash
# Start local Hardhat network
npx hardhat node

# Deploy contracts (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia Testnet
```bash
# Test network connection
npx hardhat run scripts/testNetwork.js --network sepolia

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

### Get Sepolia Test ETH
For testing on Sepolia, you'll need test ETH. Use these faucets:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

### Verify Contract on Etherscan
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "Constructor" "Arguments"
```

## 🌐 Network Configuration

The project supports multiple networks:

| Network | Chain ID | Purpose |
|---------|----------|---------|
| Hardhat | 31337 | Local development |
| Localhost | 31337 | Local Hardhat node |
| Sepolia | 11155111 | Ethereum testnet |

## 🗳️ How to Vote

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **View Proposals**: Browse available voting proposals
3. **Cast Vote**: Select your choice and confirm the transaction
4. **Verify**: Your vote is recorded on the blockchain and publicly verifiable

## 📖 Smart Contract Details

### Voting Contract Functions

- `vote(uint proposalId)` - Cast a vote for a proposal
- `openVoting()` - Owner-only function to start voting
- `closeVoting()` - Owner-only function to end voting
- `getProposal(uint id)` - Get proposal details
- `hasVoted(address voter)` - Check if address has voted
- `getProposalCount()` - Get total number of proposals
- `getWinner()` - Get proposal with most votes

### Events

- `Voted(address voter, uint proposalId)` - Emitted when a vote is cast
- `VotingOpened()` - Emitted when voting starts
- `VotingClosed()` - Emitted when voting ends
- `ProposalCreated(uint proposalId, string description)` - Emitted when proposal is created

### Security Features

- **Access Control**: Only owner can open/close voting
- **One Vote Per Address**: Mapping prevents double voting
- **Vote Validation**: Checks for valid proposal IDs
- **State Management**: Voting can only occur when open

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
npx hardhat test
```

For gas reporting:
```bash
REPORT_GAS=true npx hardhat test
```

For test coverage:
```bash
npx hardhat coverage
```

## 🚀 Deployment

### Local Development

1. **Start Hardhat network**
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Start frontend**
   ```bash
   npm run dev
   ```

### Testnet Deployment (Sepolia)

1. **Set up environment variables** in `.env`:
   ```env
   PRIVATE_KEY=your_sepolia_private_key
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_key
   ETHERSCAN_API_KEY=your_etherscan_key
   ```

2. **Get Sepolia ETH** from faucets (see above)

3. **Test network connection**
   ```bash
   npx hardhat run scripts/testNetwork.js --network sepolia
   ```

4. **Deploy to Sepolia**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

5. **Verify contract** (optional but recommended)
   ```bash
   npx hardhat verify --network sepolia CONTRACT_ADDRESS "Proposal 1" "Proposal 2" "Proposal 3"
   ```

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy smart contracts** to mainnet (with proper security measures)

3. **Update frontend configuration** with deployed contract addresses

4. **Deploy frontend** to Vercel, Netlify, or your preferred hosting platform

## 🔒 Security Considerations

- **Private Keys**: Never commit private keys to version control
- **Environment Variables**: Use `.env` for sensitive data
- **Contract Auditing**: Consider professional audits before mainnet deployment
- **Gas Limits**: Test thoroughly to avoid out-of-gas errors
- **Reentrancy**: Smart contracts use best practices to prevent attacks
- **Access Control**: Proper role-based permissions implemented

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx hardhat compile` | Compile smart contracts |
| `npx hardhat test` | Run contract tests |
| `npx hardhat node` | Start local blockchain |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commits
- Update documentation
- Follow Solidity style guide

## 🐛 Troubleshooting

### Common Issues

**"Insufficient funds for gas"**
- Solution: Get test ETH from Sepolia faucets

**"Network not found"**
- Solution: Check `hardhat.config.cjs` network configuration

**"Contract not deployed"**
- Solution: Run deployment script first

**"MetaMask connection failed"**
- Solution: Install MetaMask and switch to correct network

### Getting Help

- Check the [Issues](https://github.com/yourusername/blockchain_voting-system/issues) page
- Join our [Discord community](https://discord.gg/votingdapp)
- Read [Hardhat documentation](https://hardhat.org/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries
- [Hardhat](https://hardhat.org/) for the excellent development environment
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Ethereum Foundation](https://ethereum.org/) for the decentralized platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 🔮 Roadmap

- [ ] Multi-signature wallet integration
- [ ] IPFS integration for proposal metadata
- [ ] Advanced voting mechanisms (ranked choice, quadratic voting)
- [ ] Mobile app (React Native)
- [ ] DAO governance features
- [ ] Integration with other blockchains (Polygon, BSC)
- [ ] Voting analytics dashboard
- [ ] Email notifications for voting events

---

**⚠️ Disclaimer**: This is experimental software. Use at your own risk. Always test thoroughly before deploying to mainnet. The developers are not responsible for any loss of funds or security breaches.

**🔐 Security Note**: Never share your private keys. Always use hardware wallets for mainnet deployments. This software has not been audited - use at your own risk.