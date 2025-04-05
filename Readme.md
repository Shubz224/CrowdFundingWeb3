# Crowdfunding Using Blockchain
![Flow Daigram](/assets/Fundchain.png)
![Crowdfunding Project Screenshot](/assets/Screenshot%20From%202025-04-05%2014-25-40.png)

## 🔗 Introduction
Crowdfunding platforms are essential for raising funds, but traditional systems often lack transparency and involve high fees. Our **Crowdfunding Using Blockchain** project leverages the decentralized, immutable, and transparent nature of blockchain to provide a secure and cost-efficient crowdfunding experience.

Built using **Next.js**, **Tailwind CSS**, **Solidity**, **Hardhat**, **Firebase**, and **Thirdweb**, this dApp allows users to create and fund campaigns on the Ethereum blockchain (Arbitrum testnet) and includes an **Admin Panel** to moderate campaigns.




## 📝 About the Project
This dApp offers a platform where:
- Users can **create**, **fund**, and **explore** campaigns.
- Admins can **accept/reject** campaigns to maintain legitimacy.
- Rejected campaigns display a **reason for rejection** publicly.

---

## 🚀 Features

### 🧑‍💼 General User
- 🔐 **Wallet-based Authentication**: Users connect their wallets via MetaMask.
- 🖼 **Campaign Management**: Create, view, and fund campaigns.
- 📊 **Live Campaign Display**: View campaign status in real-time.
- 🧾 **Funding History**: Display of who donated and how much.
- 🛑 **Rejected Campaign View**: Users can see reasons behind rejection.

### 🛠 Admin Panel
- 🗃 **Admin Login** via Firebase.
- ✅ **Accept Campaigns**: Admins can mark campaigns as “Approved” so users can fund them.
- ❌ **Reject Campaigns**: Admins can reject campaigns with a specific reason, displayed publicly.
- 🧮 **Campaign Status**: Each campaign shows a status tag (Pending, Approved, Rejected).

---

## 🏗 Tech Stack

### 🖥 Frontend
- `Next.js` – React framework for optimized rendering
- `Tailwind CSS` – Utility-first styling
- `Thirdweb SDK` – Wallet connection & contract integration
- `TypeScript` – For type safety and better dev experience

### 🔐 Backend / Blockchain
- `Solidity` – Smart contract development
- `Hardhat` – Testing and deploying smart contracts
- `Thirdweb CLI` – Deployment on Arbitrum Sepolia
- `Firebase` – Admin authentication & campaign metadata

---

## 🧪 How It Works

1. **Connect Wallet**: Users connect their Ethereum wallet via MetaMask.
2. **Create Campaign**: Fill form with title, description, image, target amount, and deadline.
3. **Await Admin Approval**: Campaigns are set to "Pending" status until verified.
4. **Admin Actions**:
   - **Accept** → Campaign goes live and fundable.
   - **Reject** → Campaign displays rejection reason and remains unfundable.
5. **Fund Campaign**: Approved campaigns accept ETH donations from any wallet.
6. **Withdraw**: Campaign owner can withdraw collected funds.

---

## 📷 Screenshots

### Homepage
![Homepage](/assets/Screenshot%20From%202025-04-05%2014-25-40.png)

### Create Campaign
![Create Campaign](/assets/Screenshot%20From%202025-04-05%2014-25-46.png)

### Fund Campaign
![Fund Campaign](/assets/Screenshot%20From%202025-04-05%2014-27-15.png)

### Admin Panel
![Admin Panel](/assets/Screenshot%20From%202025-04-05%2014-25-55.png)

---

## 🧩 Project Structure

```
├── smart_contracts/
│   └── CrowdFunding.sol
├── pages/
│   ├── index.tsx
│   ├── create-campaign.tsx
│   └── admin.tsx
├── components/
│   └── CampaignCard.tsx
│   └── Navbar.tsx
├── utils/
│   └── blockchain.ts
│   └── firebase.ts
```

---

## 💡 Difficulties Faced
- Setting up **smart contract interactions** with thirdweb.
- Understanding the **asynchronous nature** of blockchain transactions.
- Implementing **admin moderation** without centralizing the platform too much.
- Building a balance between **security**, **trust**, and **usability**.

---

## 🌱 Future Scope

- 🔁 **Multi-chain Support**: Support Polygon, Base, or other L2 chains.
- 🪙 **Token-Based Incentives**: Reward funders with utility tokens.
- 📈 **Campaign Analytics**: Dashboard for insights into views, funders, and engagement.
- 📤 **Email Notifications**: Notify users about campaign updates.
- 💬 **Community Comments**: Allow discussions under each campaign.

---

## 🧪 Running Locally

```bash
git clone https://github.com/your-username/crowdfunding-blockchain
cd crowdfunding-blockchain

# Install dependencies
npm install

# Add .env file with:
# VITE_CONTRACT_ADDRESS=
# VITE_THIRDWEB_CLIENT_ID=
# FIREBASE_API_KEY=...

# Run the app
npm run dev
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [Thirdweb](https://thirdweb.com/)
- [Hardhat](https://hardhat.org/)
- [Firebase](https://firebase.google.com/)
- [Arbitrum Sepolia](https://arbitrum.io/)
