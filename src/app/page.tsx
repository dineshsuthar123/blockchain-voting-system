'use client';
import { useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import votingAbi from "../../artifacts/contracts/Voting.sol/Voting.json";

declare global {
  interface Window {
    ethereum?: import('ethers').Eip1193Provider;
  }
}

const VOTING_CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // TODO: Replace with actual deployed address

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [proposals, setProposals] = useState<{ description: string; voteCount: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [votedProposal, setVotedProposal] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Owner-only: Create a new proposal
  const [newProposal, setNewProposal] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  async function createProposal() {
    if (!window.ethereum || !account || !newProposal.trim()) return;
    setCreateLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, votingAbi.abi, signer);
      const tx = await contract.addProposal(newProposal);
      setTxHash(tx.hash);
      await tx.wait();
      setNewProposal("");
      await fetchProposals();
      setError(null);
    } catch {
      setError("Failed to create proposal. Are you the contract owner?");
    }
    setCreateLoading(false);
  }

  // Connect to MetaMask wallet
  async function connectWallet() {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        setError(null);
      } catch {
        setError("Wallet connection failed");
      }
    } else {
      setError("MetaMask not detected");
    }
  }

  // Fetch proposals from the contract
  async function fetchProposals() {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, votingAbi.abi, provider);
      const proposals = await contract.getProposals();
      setProposals(
        (proposals as { description: string; voteCount: bigint }[]).map((p) => ({
          description: p.description,
          voteCount: Number(p.voteCount),
        }))
      );
      setError(null);
    } catch {
      setError("Failed to fetch proposals");
    }
    setLoading(false);
  }

  // Vote for a proposal
  async function vote(proposalId: number) {
    if (!window.ethereum || !account) return;
    setVoteLoading(true);
    setTxHash(null);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, votingAbi.abi, signer);
      const tx = await contract.vote(proposalId);
      setTxHash(tx.hash);
      await tx.wait();
      setVotedProposal(proposalId);
      await fetchProposals();
      setError(null);
    } catch {
      setError("Voting failed or already voted");
    }
    setVoteLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-2xl px-6 py-12 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <div className="flex flex-col items-center gap-4">
          <Image src="/globe.svg" alt="Blockchain Voting" width={80} height={80} className="mb-2" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Decentralized Blockchain Voting
          </h1>
          <p className="mt-4 text-lg md:text-xl text-center text-white/80 max-w-xl">
            Secure, transparent, and tamper-proof voting for everyone. Powered by blockchain technology and a legendary, award-winning UI.
          </p>
          <div className="mt-8 flex gap-4">
            <input
              type="text"
              value={newProposal}
              onChange={e => setNewProposal(e.target.value)}
              placeholder="Proposal description"
              className="px-4 py-2 rounded-full bg-white/10 border border-cyan-400 text-white placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={createLoading}
            />
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-purple-600 font-semibold shadow-lg transition-all duration-300"
              onClick={createProposal}
              disabled={createLoading || !newProposal.trim()}
            >
              {createLoading ? "Creating..." : "Create Proposal"}
            </button>
            <button
              className="px-6 py-3 rounded-full border border-cyan-400 text-cyan-300 hover:bg-cyan-900/30 font-semibold transition-all duration-300"
              onClick={fetchProposals}
              disabled={loading}
            >
              {loading ? "Loading..." : "View Results"}
            </button>
          </div>
          <div className="mt-8">
            {account ? (
              <span className="text-green-400 font-mono">Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
            ) : (
              <button
                onClick={connectWallet}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 font-semibold shadow-md transition-all duration-300"
              >
                Connect Wallet
              </button>
            )}
            {error && <div className="text-red-400 mt-2">{error}</div>}
          </div>
          {proposals.length > 0 && (
            <div className="mt-8 w-full">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Proposals</h2>
              <ul className="space-y-2">
                {proposals.map((p, i) => (
                  <li key={i} className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-2">
                    <span>{p.description}</span>
                    <span className="font-mono text-cyan-300">{p.voteCount} votes</span>
                    <button
                      className={`ml-4 px-4 py-1 rounded-full font-semibold transition-all duration-300 ${votedProposal === i ? 'bg-green-500 text-white' : 'bg-cyan-700 hover:bg-cyan-500 text-white'}`}
                      onClick={() => vote(i)}
                      disabled={voteLoading || votedProposal !== null}
                    >
                      {votedProposal === i ? 'Voted' : 'Vote'}
                    </button>
                  </li>
                ))}
              </ul>
              {txHash && (
                <div className="mt-4 text-xs text-green-300">Vote submitted! Tx: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline">{txHash.slice(0, 10)}...</a></div>
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="mt-16 text-white/40 text-xs text-center">
        &copy; {new Date().getFullYear()} Legendary Blockchain Voting. All rights reserved.
      </footer>
    </main>
  );
}
