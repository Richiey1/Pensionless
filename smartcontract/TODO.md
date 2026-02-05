# Freelancer Savings Platform - Contract Roadmap

This file tracks the development of the smart contracts for the Freelancer Savings Platform.

## ✅ Completed (Core Module: Deadman Vault)

### Issue #1: Deadman Switch Logic
- **Status**: ✅ COMPLETED
- **Description**: Core inheritance mechanism including pinging, timeout management, and claim logic.
- [x] Implementation of `DeadmanVault.sol`
- [x] Implementation of `DeadmanVaultFactory.sol`
- [x] Integration of `ProofOfClaimNFT.sol`
- [x] Mainnet deployment on Base.

---

## ❌ Pending (Upcoming Enhancements)

### Issue #2: Stablecoin Savings Support (USDC/USDT)
- **Status**: ❌ PENDING
- **Priority**: HIGH
- **Description**: Enable the vault to handle ERC-20 stablecoins natively alongside ETH.
- [ ] Add support for `IERC20` transfers in `DeadmanVault`.
- [ ] Implement asset-specific balance tracking.
- [ ] Update `claimAll()` to handle multi-asset payouts.

### Issue #3: Allocation Engine
- **Status**: ❌ PENDING
- **Priority**: HIGH
- **Description**: Develop a module that automatically splits incoming payments into "Spendable" and "Savings" based on user-defined percentages.
- [ ] Implement configurable allocation state in the vault.
- [ ] Create a `receiveIncome()` function to handle the auto-split logic.
- [ ] Ensure integration with existing deadman switch triggers.

### Issue #4: Strategy Module (DeFi Yield Integration)
- **Status**: ❌ PENDING
- **Priority**: MEDIUM
- **Description**: Route idle savings to DeFi protocols like Aave or Compound to generate yield for the freelancer's retirement.
- [ ] Research Aave/Compound integration for Base network.
- [ ] Implement `depositToStrategy` and `withdrawFromStrategy` functions.
- [ ] Add yield tracking and compounding logic.

### Issue #5: Subgraph & Indexing
- **Status**: ❌ PENDING
- **Priority**: MEDIUM
- **Description**: Implement a subgraph to index deposits, withdrawals, and inheritance events for a faster dashboard experience.
- [ ] Define GraphQL schema for vault activities.
- [ ] Implement mapping scripts for contract events.
- [ ] Deploy subgraph to The Graph Studio.

---

## 🛠️ Tech Stack & Dependencies
- Solidity ^0.8.20
- OpenZeppelin Contracts (AccessControl, ReentrancyGuard, ERC721)
- Hardhat Development Framework
- Base Mainnet
