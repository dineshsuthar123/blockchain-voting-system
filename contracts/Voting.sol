// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public hasVoted;
    Proposal[] public proposals;
    bool public votingOpen;

    event ProposalCreated(uint proposalId, string description);
    event Voted(address indexed voter, uint proposalId);
    event VotingOpened();
    event VotingClosed();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier whenVotingOpen() {
        require(votingOpen, "Voting is closed");
        _;
    }

    constructor(string[] memory proposalDescriptions) {
        owner = msg.sender;
        for (uint i = 0; i < proposalDescriptions.length; i++) {
            proposals.push(Proposal({description: proposalDescriptions[i], voteCount: 0}));
            emit ProposalCreated(i, proposalDescriptions[i]);
        }
        votingOpen = false;
    }

    function openVoting() public onlyOwner {
        votingOpen = true;
        emit VotingOpened();
    }

    function closeVoting() public onlyOwner {
        votingOpen = false;
        emit VotingClosed();
    }

    function vote(uint proposalId) public whenVotingOpen {
        require(!hasVoted[msg.sender], "Already voted");
        require(proposalId < proposals.length, "Invalid proposal");
        proposals[proposalId].voteCount++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, proposalId);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function addProposal(string memory description) public onlyOwner {
        proposals.push(Proposal({description: description, voteCount: 0}));
        emit ProposalCreated(proposals.length - 1, description);
    }
}
