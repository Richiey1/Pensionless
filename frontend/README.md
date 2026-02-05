# Freelancer Savings Platform — Frontend

A modern Next.js frontend for the Freelancer Savings Platform - a decentralized savings and retirement infrastructure for independent workers on the Base blockchain.

## 🎯 Overview

The Freelancer Savings Platform provides a secure, non-custodial interface for freelancers to automate their financial security. It features programmable savings vaults, income allocation tools, and a built-in **Deadman Switch** security module for automated inheritance.

### Key Features

- **Automated Savings**: Set and forget your financial goals with smart contract enforced savings.
- **Income Allocation**: Automatically split your income into spendable and savings portions.
- **Inheritance Security**: Integrated Deadman Switch ensures your savings are passed to loved ones if you become inactive.
- **Proof of Claim NFTs**: Beneficiaries receive verifiable on-chain certificates upon successful inheritance.
- **Modern Dashboard**: Track your savings progress, yield, and retirement projections in real-time.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Web3:** wagmi v2, viem v2, Reown AppKit (WalletConnect)
- **State Management:** TanStack Query + React Hooks

## 🎨 Design Theme

The platform uses a professional **Blue and Mint Green** color palette, combining the security of deep ocean tones with the growth signals of mint.

- **Primary:** Deep Ocean (#0F172A), Royal Blue (#3B82F6)
- **Accent:** Deep Teal (#14B8A6), Mint (#5EEAD4)
- **Highlights:** Gold (#FFD700) for certificates and milestones.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
freelancer-savings-frontend/
├── app/                    # Dashboard, Creation, and Claim pages
├── components/             # Reusable UI & Vault-specific components
├── hooks/                  # Custom hooks for contract & timer logic
├── lib/                    # Contract ABIs, addresses, and utilities
└── config/                 # Wagmi & network configuration
```

## 🔐 Security & Inheritance

Before the inheritance features are fully active, ensure the Factory contract is authorized to mint NFTs:
1. Navigate to the NFT contract on BaseScan.
2. Call `setAuthorizedMinter` with the Factory address: `0x025800b47F319C87091b455814475c496DC72219`.

## 📝 License
MIT License - See main project LICENSE file.

---
**Building the default financial safety net for the global freelance workforce.**
