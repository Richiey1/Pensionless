# Deadman Vault — Frontend

A modern Next.js frontend for Deadman Vault - a decentralized digital inheritance system enabling users to create vaults with deadman switch functionality. Built with TypeScript, Tailwind CSS, and wagmi for Base blockchain.

## Overview

Deadman Vault is a digital inheritance platform that allows users to:

- **Create Personal Vaults**: Each user can create their own vault with custom beneficiaries
- **Deadman Switch**: Automatic inheritance if owner fails to ping within timeout period
- **Secure Deposits**: Store ETH safely with full control
- **Customizable Timeouts**: Set your own ping schedule (1 hour to 10 years)
- **Proof of Claim NFTs**: Beneficiaries receive on-chain certificates
- **Factory Pattern**: Each vault is an independent smart contract instance

### Key Features

- **For Owners**:
  - Create vaults with designated beneficiaries
  - Deposit and withdraw ETH anytime
  - Set custom timeout periods
  - Ping to reset deadman timer
  - Update beneficiary or timeout settings

- **For Beneficiaries**:
  - View vaults where you're the beneficiary
  - Claim all funds after timeout expires
  - Become new owner after claiming
  - Mint proof-of-claim NFT certificate

- **For Everyone**:
  - Transparent on-chain state
  - Real-time countdown timers
  - Dashboard with all vaults
  - Analytics and statistics

Built for Base blockchain with Ethereum compatibility.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Web3:** wagmi v2, viem v2, Reown AppKit (WalletConnect)
- **State Management:** React Hooks + TanStack Query

## Design System

### Color Scheme

The Deadman Vault frontend uses a modern blue and mint green color palette:

- **Primary (Blue):** 
  - Deep Ocean: `#0F172A`
  - Royal Blue: `#3B82F6`
  - Sky Blue: `#60A5FA`
  
- **Accent (Mint/Teal):**
  - Deep Teal: `#14B8A6`
  - Mint: `#5EEAD4`
  - Light Mint: `#99F6E4`

- **Neutral Colors:**
  - Dark Navy: `#0F172A`, `#1E293B`
  - Light Text: `#F9FAFB`, `#E5E7EB`
  - Grey: `#6B7280`, `#9CA3AF`

- **Highlights:**
  - Gold: `#FFD700` (for certificates and success states)

This blue and mint green combination creates a modern, trustworthy aesthetic perfect for financial applications - combining security (blue) with growth and prosperity (mint green).

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Development

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
deadman-vault-frontend/
├── app/                    # Next.js app router pages
│   ├── dashboard/          # User dashboard with all vaults
│   ├── create/             # Create new vault page
│   ├── claim/              # Beneficiary claim interface
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── vault/              # Vault-related components
│   │   ├── VaultCard.tsx
│   │   ├── VaultList.tsx
│   │   └── VaultStats.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── layout/             # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Navigation.tsx
├── hooks/                  # Custom React hooks
│   ├── useDeadmanVault.ts  # Vault contract interactions
│   ├── useFactory.ts       # Factory contract interactions
│   └── useNFT.ts           # NFT contract interactions
├── lib/                    # Utilities and helpers
│   ├── abi/                # Contract ABIs
│   │   ├── DeadmanVault.json
│   │   ├── DeadmanVaultFactory.json
│   │   └── ProofOfClaimNFT.json
│   ├── contracts.ts        # Contract addresses and configs
│   └── utils.ts            # Helper functions
├── config/                 # Configuration files
│   └── wagmi.ts            # Wagmi and wallet configuration
└── public/                 # Static assets
```

## Environment Variables

Create a `.env.local` file:

```env
# Reown (WalletConnect) Project ID
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id

# Contract Addresses (Base Mainnet)
NEXT_PUBLIC_FACTORY_ADDRESS=0x025800b47F319C87091b455814475c496DC72219
NEXT_PUBLIC_NFT_ADDRESS=0xc319b525592725194cA6254EE09866AA7b1bD5Ab

# Network Configuration
NEXT_PUBLIC_NETWORK=base
NEXT_PUBLIC_CHAIN_ID=8453
```

**Note:** Contract addresses are already deployed on Base Mainnet.

## 🔐 Important: Authorize Factory to Mint NFTs

Before the frontend can fully work, you need to authorize the Factory contract to mint NFT certificates.

### 📋 Who Does What:

**YOU (the deployer/admin) need to:**
1. Go to the NFT contract on BaseScan
2. Call the `setAuthorizedMinter` function
3. Give the Factory contract permission to mint NFTs

**The Factory contract will then:**
- When a beneficiary claims a vault, the Factory can create an NFT certificate for them
- Without this permission, claiming works but NFT minting fails

### 🔧 How to Do It (Step by Step):

1. **Go to BaseScan**: [NFT Contract Write Functions](https://basescan.org/address/0xc319b525592725194cA6254EE09866AA7b1bD5Ab#writeContract)

2. **Connect your wallet** (the one that deployed the contracts)

3. **Find the `setAuthorizedMinter` function**

4. **Fill in:**
   - `minter` = `0x025800b47F319C87091b455814475c496DC72219` (Factory address)
   - `authorized` = `true`

5. **Click "Write"** and confirm the transaction

**That's it!** Now the Factory can mint NFT certificates when beneficiaries claim vaults.

---
NEXT_PUBLIC_NFT_ADDRESS=0x...

# Network Configuration
NEXT_PUBLIC_NETWORK=base
NEXT_PUBLIC_CHAIN_ID=8453
```

**Note:** Contract addresses will be provided after deployment to Base Mainnet.

## Network Configuration

- **Network:** Base Mainnet
- **Chain ID:** 8453
- **RPC:** https://mainnet.base.org
- **Explorer:** [BaseScan](https://basescan.org/)

**Testnet:**
- **Network:** Base Sepolia
- **Chain ID:** 84532
- **RPC:** https://sepolia.base.org
- **Explorer:** [BaseScan Sepolia](https://sepolia.basescan.org/)

## Features

### 1. Vault Creation
- Connect wallet
- Set beneficiary address
- Choose timeout period (presets or custom)
- Optional initial deposit
- Deploy personal vault contract

### 2. Dashboard
- View all owned vaults
- See vault balances
- Check timeout status
- Monitor last ping time
- Quick actions (deposit, withdraw, ping)

### 3. Vault Management
- Deposit ETH
- Withdraw funds
- Update beneficiary
- Adjust timeout period
- Ping to reset timer
- View vault details

### 4. Beneficiary Claims
- View claimable vaults
- Check eligibility status
- Countdown to claim availability
- Claim all funds
- Mint proof-of-claim NFT

### 5. Analytics
- Total vaults created
- Total value locked
- Active vs claimed vaults
- Ping activity history
- Platform statistics

## Contributing

We welcome contributions! To get started:

1. **Pick an issue** from the TODO.md
2. **Create a branch**: `feature/issue-description`
3. **Implement changes** following acceptance criteria
4. **Submit a PR** with clear description

## Wallet Support

Supported wallets via Reown AppKit:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow
- Trust Wallet
- And 300+ more

## License

MIT License - See main project LICENSE file

## Support

For issues and feature requests, please open an issue in the repository.

---

**Built with ❤️ for decentralized inheritance**

**Version**: 1.0.0  
**Last Updated**: December 29, 2025