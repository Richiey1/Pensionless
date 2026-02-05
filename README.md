# Pension<

On-chain savings and retirement infrastructure for freelancers and independent workers, featuring automated inheritance security via the **Deadman Switch**.

## 🎯 Overview

**pensionless** is a decentralized vault system on the Base blockchain designed to help freelancers build long-term financial security. It addresses the lack of traditional retirement infrastructure for independent workers by providing programmable savings, auto-allocation of income, and automated inheritance modules.

## 🚀 Problem

Freelancers and gig workers face unique financial hurdles:
- **Irregular Income**: Unpredictable cash flow makes consistent saving difficult.
- **No Employer Benefits**: Lack of automatic 401k or pension contributions.
- **Inflationary Pressure**: Local currencies can be volatile; saving in stable assets is a priority.
- **Legacy Risk**: Digital assets are often lost if an owner becomes incapacitated without a plan.

## 💡 Solution

**pensionless** provides a smart contract-based vault system that automatically allocates incoming funds to savings and retirement strategies. By integrating a **Deadman Switch** mechanism, **pensionless** ensures that your hard-earned savings are safely transferred to a designated beneficiary if you become inactive.

## ✨ Core Features

### 🏦 Stablecoin Savings Vaults
- Securely store and grow assets in **USDC/USDT**.
- Non-custodial, user-controlled funds anchored on the Base network.

### 🔁 Auto-Savings Allocation
- Automatically split incoming income stream (e.g., 70% spendable, 30% savings).
- Smart contract enforced financial discipline with configurable percentages.

### 🛡️ Deadman Inheritance (Security Module)
- **Automatic Inheritance**: If you fail to "ping" the contract within a custom timeout (1 hour to 10 years), your designated beneficiary can claim the funds.
- **Proof of Claim NFT**: Beneficiaries receive an on-chain soulbound certificate upon successful inheritance.

### 📈 Retirement & Yield Strategies
- Optional yield routing to DeFi protocols (Aave, Compound).
- Conservative, balanced, and growth risk tiers for compounding savings.

## 🧱 Architecture Overview

- **Vault Contracts**: Manage secure deposits, withdrawals, and logic.
- **Allocation Engine**: Handles the automatic splitting of incoming income.
- **Deadman Module**: Monitors activity and manages inheritance triggers.
- **Credential NFT**: Issues proof-of-claim certificates for beneficiaries.
- **Dashboard**: Modern interface for tracking savings progress and projections.

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity ^0.8.20 (Hardhat)
- **Blockchain**: Base (Ethereum L2)
- **Frontend**: Next.js 16, TypeScript, TailwindCSS
- **Web3**: wagmi, viem, Reown AppKit
- **Indexing**: The Graph / Custom Indexer

## 📖 How It Works

### 1. Setup & Goal
Create your personal savings vault and define your savings goal and allocation percentage within **pensionless**.

### 2. Fund & Save
Deposit assets or route your income through the **Allocation Engine**. A portion is saved instantly while the rest remains liquid.

### 3. Security Check (The Deadman Switch)
**pensionless** monitors your "pings" (activity). As long as you stay active, your funds are yours. 

### 4. Inheritance
If you stop pinging for your chosen duration, the **Deadman Module** activates, allowing your beneficiary to claim the total savings balance and take ownership of the vault.

## 🚀 Deployment

### Mainnet Contracts (Base)
- **DeadmanVaultFactory**: `0x025800b47F319C87091b455814475c496DC72219`
- **ProofOfClaimNFT**: `0xc319b525592725194cA6254EE09866AA7b1bD5Ab`

## 📝 License
MIT License - Feel free to use and modify.

---
**Building the default financial safety net for the global freelance workforce with pensionless.**
