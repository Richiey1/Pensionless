# GigID — Smart Contracts

Solidity smart contracts for GigID - a decentralized platform providing on-chain income credentials for gig workers to access financial services. Deployed on Base Mainnet.

## Overview

GigID enables gig workers to create verifiable, cryptographic proof of their income using blockchain attestations. This financial identity layer helps workers qualify for loans, rentals, and other services previously inaccessible to them.

GigID smart contracts implement:

### Income Registry Contract
- **On-Chain Attestations**: Record verified income events securely.
- **Immutable Ledger**: Tamper-resistant history of earnings.
- **Selective Disclosure**: Privacy-preserving mechanisms for income verification.

### Credential NFT Contract
- **Verifiable Tokens**: Mintable income proof certificates.
- **Portability**: Credentials that follow the user across the ecosystem.
- **Ownership**: User-controlled financial identity.

## Tech Stack

- **Language:** Solidity ^0.8.20
- **Framework:** Hardhat
- **Blockchain:** Base
- **Identity:** Ethereum Attestation Service (EAS) Integration

## Quick Start

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Base
npx hardhat run scripts/deploy.js --network base
```

## Project Structure

```
gigid-smartcontracts/
├── contracts/
│   ├── IncomeRegistry.sol      # Records verified earnings
│   ├── CredentialNFT.sol       # Issues verifiable certificates
│   └── interfaces/             # Contract interfaces
├── scripts/
│   ├── deploy.js               # Deployment scripts
│   └── verify.js               # Verification scripts
├── test/
│   ├── IncomeRegistry.test.js  # Registry tests
│   └── CredentialNFT.test.js   # NFT tests
├── hardhat.config.js           # Hardhat configuration
└── package.json                # Dependencies
```

## Contributing

We welcome contributions! To get started:

1. **Pick an issue** from [`TODO.md`](./TODO.md)
2. **Create a branch** using the issue number: `issue/<number>-short-description`
3. **Implement your changes** following the issue's acceptance criteria
4. **Write tests** for your changes
5. **Submit a PR** with the issue number in the title/description

## Security

- All contracts follow industry best practices.
- Privacy-preserving proofs ensure sensitive data remains protected.
- Comprehensive test coverage for all core logic.

## License

MIT License - see LICENSE file for details.
