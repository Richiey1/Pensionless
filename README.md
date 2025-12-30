# Deadman Vault - Digital Inheritance System

A secure, decentralized vault system on Base blockchain that enables digital inheritance through a "deadman switch" mechanism.

## 🎯 Overview

The Deadman Vault allows users to safely store ETH with automatic inheritance features. If the owner fails to "ping" the contract within their custom timeout period, a designated beneficiary can claim all funds.

## 📦 Deployed Contracts (Base Mainnet)

### Mainnet Deployment
- **ProofOfClaimNFT**: `0xc319b525592725194cA6254EE09866AA7b1bD5Ab`
  - [View on BaseScan](https://basescan.org/address/0xc319b525592725194cA6254EE09866AA7b1bD5Ab)
- **DeadmanVaultFactory**: `0x025800b47F319C87091b455814475c496DC72219`
  - [View on BaseScan](https://basescan.org/address/0x025800b47F319C87091b455814475c496DC72219)
- **Network**: Base Mainnet
- **Chain ID**: 8453
- **Deployed**: December 29, 2025

## 🏗️ Architecture

### Smart Contracts (Solidity on Base)

- **DeadmanVault.sol** - Individual vault contract with deadman switch functionality
- **DeadmanVaultFactory.sol** - Factory contract for creating user vaults
- **ProofOfClaimNFT.sol** - ERC-721 NFT certificate for beneficiaries
- **IDeadmanVault.sol** - Vault interface

### Factory Pattern

Each user can create their own vault instance:

```
┌──────────────────────────────────────────┐
│  DeadmanVaultFactory.sol                 │
├──────────────────────────────────────────┤
│                                          │
│  User A creates vault → Vault #1         │
│    ├─ Owner: User A                      │
│    ├─ Beneficiary: User A's heir         │
│    └─ Deadman switch for User A          │
│                                          │
│  User B creates vault → Vault #2         │
│    ├─ Owner: User B                      │
│    ├─ Beneficiary: User B's heir         │
│    └─ Deadman switch for User B          │
│                                          │
│  User C creates vault → Vault #3         │
│    └─ ... and so on                      │
└──────────────────────────────────────────┘
```

## 🔑 Key Features

### For Owners
- **Deposit ETH** - Securely store funds in your vault
- **Set Beneficiary** - Designate who inherits if you don't ping
- **Custom Timeout** - Set your own ping schedule (1 hour to 10 years)
- **Ping** - Reset the timer to prove you're active
- **Withdraw** - Access your funds anytime

### For Beneficiaries
- **Claim All** - After timeout expires, claim all owner's funds
- **Automatic Ownership** - Become the new owner after claiming
- **NFT Certificate** - Mint proof-of-claim NFT as permanent record

### For Admins (NFT Contract)
- **Authorize Vaults** - Control which vaults can mint certificates

## 📖 How It Works

### Setup
1. User calls `DeadmanVaultFactory.createVault(beneficiary, timeout)`
2. Factory deploys a new `DeadmanVault` instance
3. User deposits ETH into their vault
4. Vault tracks last ping timestamp

### Normal Operation
- Owner pings regularly (before timeout expires)
- Funds remain secure in the vault
- Owner can withdraw anytime
- Ping timer resets on withdrawal

### Inheritance Scenario
1. Owner stops pinging (deceased, incapacitated, etc.)
2. Timeout period passes without a ping
3. Beneficiary calls `claimAll()` on the vault
4. Beneficiary receives all funds
5. Beneficiary becomes new owner
6. Beneficiary can mint proof-of-claim NFT certificate

## 🛠️ Usage Examples

### Creating a Vault
```solidity
// Create vault with 30-day timeout
address vault = factory.createVault(beneficiaryAddress, 30 days);
```

### Depositing Funds
```solidity
// Deposit 1 ETH
vault.deposit{value: 1 ether}();

// Or send ETH directly
(bool success, ) = vaultAddress.call{value: 1 ether}("");
```

### Setting Custom Timeout
```solidity
// Set 1 week timeout
vault.setTimeout(7 days);

// Set 1 month timeout
vault.setTimeout(30 days);

// Set 1 year timeout
vault.setTimeout(365 days);
```

### Pinging (Resetting Timer)
```solidity
vault.ping();
```

### Claiming Funds (Beneficiary)
```solidity
// After timeout expires, beneficiary can claim
vault.claimAll();

// Optional: Mint proof-of-claim NFT
nft.mint(beneficiaryAddress, vaultAddress, claimedAmount);
```

## 📊 View Functions

### Check Vault State
```solidity
IDeadmanVault.VaultState memory state = vault.getVaultState();
// Returns: {owner, beneficiary, lastPing, timeout, hasClaimed, balance}
```

### Check Balance
```solidity
uint256 balance = vault.getBalance();
```

### Check If Timeout Reached
```solidity
bool canClaim = vault.isTimeoutReached();
```

### Get User's Vaults
```solidity
address[] memory vaults = factory.getUserVaults(userAddress);
```

## ⏰ Timeout Reference

| Period | Seconds | Solidity Constant |
|--------|---------|-------------------|
| 1 hour | 3,600 | `1 hours` |
| 1 day | 86,400 | `1 days` |
| 1 week | 604,800 | `7 days` |
| 1 month | 2,592,000 | `30 days` |
| 1 year | 31,536,000 | `365 days` |

**Constraints:**
- Minimum: 1 hour
- Maximum: 10 years
- Default: 30 days

## 🔒 Security Features

- **Owner-Only Actions**: Only owner can deposit, withdraw, ping, set beneficiary/timeout
- **Beneficiary Verification**: Only designated beneficiary can claim after timeout
- **Timeout Protection**: Beneficiary cannot claim before timeout expires
- **Reentrancy Protection**: All ETH transfers protected with ReentrancyGuard
- **Transparent State**: All vault state is publicly readable on-chain
- **Custom Errors**: Gas-efficient error handling
- **Soulbound NFTs**: Proof-of-claim certificates are non-transferable

## 🎫 Proof of Claim NFT

**ProofOfClaimNFT.sol** - ERC-721 certificate that beneficiaries can mint as proof of claim.

### Features
- On-chain SVG certificate design (gold/black theme)
- Stores beneficiary address, claim timestamp, vault address, and amount
- Can only be minted by authorized vault contracts
- Soulbound (non-transferable) after minting
- Serves as permanent on-chain proof of inheritance

### NFT Metadata
Each certificate includes:
- Beneficiary address
- Claim timestamp
- Vault address
- Amount claimed (in ETH)

## 💡 Use Cases

1. **Digital Inheritance** - Pass crypto assets to family
2. **Business Continuity** - Partner access if you're unavailable
3. **Trust Funds** - Automated release after inactivity
4. **Emergency Access** - Backup access for loved ones
5. **Estate Planning** - Decentralized will execution

## 🚀 Deployment

### Prerequisites
- Node.js v18+
- Hardhat
- Base network RPC URL
- Deployer wallet with ETH on Base

### Deploy Contracts
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy to Base Mainnet
npx hardhat run scripts/deploy-deadman-vault.ts --network base
```

### Verify Contracts
```bash
npx hardhat verify --network base 0xc319b525592725194cA6254EE09866AA7b1bD5Ab
npx hardhat verify --network base 0x025800b47F319C87091b455814475c496DC72219
```

## 🧪 Testing

```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/DeadmanVault.test.ts

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run with coverage
npx hardhat coverage
```

## 📁 Project Structure

```
contracts/mock/
├── DeadmanVault.sol           # Main vault contract
├── DeadmanVaultFactory.sol    # Factory for creating vaults
├── ProofOfClaimNFT.sol        # NFT certificate contract
├── IDeadmanVault.sol          # Vault interface
├── TODO.md                    # Project issues and roadmap
├── README.md                  # This file
├── deployment-base.json       # Deployment addresses
└── frontend/                  # Frontend application (Next.js)
```

## 🎨 Frontend

A Next.js application with Web3 integration for interacting with the Deadman Vault system.

### Features
- Wallet connection (Reown AppKit)
- Create new vaults
- Manage existing vaults
- Deposit/withdraw funds
- Ping vaults
- Claim inheritance
- View NFT certificates
- Dashboard with analytics

### Tech Stack
- Next.js 16 (App Router)
- TypeScript
- TailwindCSS
- wagmi + viem
- Reown AppKit
- Blue/Orange color theme

## 🎨 Design Theme

**Color Palette:**
- Primary (Blue): Deep Ocean (#0F172A), Royal Blue (#3B82F6), Sky Blue (#60A5FA)
- Accent (Mint/Teal): Deep Teal (#14B8A6), Mint (#5EEAD4), Light Mint (#99F6E4)
- Background: Dark Navy (#0F172A, #1E293B)
- Highlights: Gold (#FFD700)

Blue and mint green create a modern, trustworthy palette perfect for financial applications - combining security (blue) with growth and prosperity (mint green).

## 📝 License

MIT License - Feel free to use and modify

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Always test with small amounts first. Not audited - use in production at your own risk.

## 🔗 Links

- **Network**: Base (Ethereum L2)
- **Chain ID**: 8453 (Mainnet)
- **Block Explorer**: https://basescan.org
- **RPC**: https://mainnet.base.org
- **GitHub**: https://github.com/Richiey1/deadman-vault

## 📞 Support

For issues and feature requests, please open an issue in the repository.

---

**Built with ❤️ for decentralized inheritance**

**Version**: 1.0.0  
**Last Updated**: December 29, 2025  
**Deployed By**: 0xC1e4453d98fEe92504A2dC2114e6613053880A30