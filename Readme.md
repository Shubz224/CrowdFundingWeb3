# Crowdfunding Using Blockchain

![Crowdfunding Project Screenshot](/assets/Screenshot%20(166).png)

## Introduction
Crowdfunding platforms are essential tools for raising funds, but traditional systems often lack transparency and incur high fees. Our **Crowdfunding Using Blockchain** project leverages the transparency, immutability, and decentralized nature of blockchain to create a secure, low-fee platform for campaign management. Built with React, Solidity, Hardhat, and thirdweb SDK, this platform enables users to create campaigns, contribute to causes, and manage funds in a trustless environment.

## About the Project
This project provides a decentralized crowdfunding platform that allows users to securely fund and create campaigns using Ethereum blockchain technology. With thirdweb for smart contract management and deployment, we ensure seamless interactions between the frontend (React) and Ethereum blockchain.

## Problem We Solve
Many crowdfunding platforms face issues with trust, transaction fees, and intermediaries. By using blockchain:
- **Transparency**: All transactions and funding are recorded on the blockchain, ensuring open access to campaign data.
- **Security**: Smart contracts govern the release of funds, protecting both campaign creators and funders from potential fraud.
- **Cost Efficiency**: Reducing intermediary fees by using decentralized transactions.

## How It Works
1. **Connect Wallet**: Users connect their Ethereum wallet to interact with the platform.
2. **View Campaigns**: The homepage displays all ongoing campaigns, fetched directly from the blockchain.
3. **Create Campaign**: Authenticated users can create campaigns, defining a goal amount, description, and title. The campaign data is stored on the blockchain using a Solidity smart contract.
4. **Fund Campaign**: Any user can fund a campaign, with their contributions securely stored in the contract.
5. **Withdraw Funds**: Once the campaign goal is reached, the funds can be withdrawn by the campaign creator, as governed by the contract.

## Features
- **User Authentication**: Secure wallet-based authentication to ensure each user has their identity.
- **Campaign Management**: Create, fund, and view details of multiple campaigns directly on the blockchain.
- **Seamless Wallet Connection**: Connect to MetaMask or other wallets for Ethereum transactions.
- **Live Campaign Display**: Real-time display of all campaigns and their funding status.
- **Thirdweb Integration**: Use of thirdweb SDK to streamline contract interactions and deployment.

## Project Structure
### Frontend
- **React & Vite**: Handles UI with real-time interaction.
- **thirdweb SDK**: Enables wallet connection, contract read/write, and data fetching.
- **Tailwind CSS**: Provides responsive and fast styling for components.

### Backend (Contracts)
- **Solidity**: Used for writing smart contracts that govern campaign creation, funding, and withdrawal.
- **Hardhat**: Compiles, tests, and deploys Solidity contracts.
- **thirdweb**: Manages deployment, testing, and contract interaction during development.

## Screenshots
### Homepage
![Homepage](/assets/Screenshot%20(166).png)

### Create Campaign
![Create Campaign](/assets/Screenshot%20(167).png)

### Fund Campaign
![Fund Campaign](/assets/Screenshot%20(168).png)

## Difficulties Encountered
Learning blockchain and Solidity posed challenges, especially in understanding smart contracts and interacting with them through thirdweb. The complexity of decentralized systems also required a focus on security to avoid vulnerabilities.

## Future Scope
- **Multi-Chain Support**: Extend to other blockchains for broader accessibility.
- **Enhanced Security Features**: Introduce two-factor authentication for added security.
- **Campaign Analytics**: Provide users with more insights on campaign progress and funder demographics.
- **Token-Based Rewards**: Introduce token rewards for contributors to incentivize funding.

---


