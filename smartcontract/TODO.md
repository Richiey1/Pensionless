# Freelancer Savings Platform - Smart Contract Roadmap

This document outlines the comprehensive development plan for the Freelancer Savings Platform smart contracts. The goal is to build a robust, secure, and automated financial infrastructure for the global freelance workforce.

## ✅ Phase 1: Core Security (Completed)

### Issue #1: Digital Inheritance (Deadman Switch)
- **Status**: ✅ COMPLETED
- **Description**: Implemented the foundational security layer that ensures assets are transferred to a beneficiary if the owner is inactive.
- [x] **DeadmanVault.sol**: Core logic for pinging, timeout monitoring, and claim execution.
- [x] **DeadmanVaultFactory.sol**: Factory pattern for permissionless, individual vault deployment.
- [x] **ProofOfClaimNFT.sol**: Soulbound ERC-721 certificate for on-chain inheritance proof.
- [x] **Deployment**: Successful deployment and verification on Base Mainnet.

---

## 🚀 Phase 2: Savings Infrastructure (High Priority)

### Issue #2: ERC-20 Multi-Asset Support
- **Status**: ❌ PENDING | **Priority**: CRITICAL
- **Description**: Transition the vault from ETH-only to a multi-token system supporting USDC, USDT, and DAI.
- [ ] **Interface Integration**: Add `IERC20` and `SafeERC20` support.
- [ ] **Asset Registry**: Implement a whitelist of supported stablecoins in the Factory.
- [ ] **Multi-Asset Withdrawals**: Update `withdraw()` and `claimAll()` to loop through or specify token addresses.
- [ ] **Internal Accounting**: Map `mapping(address => uint256)` to track balances for each token accurately.

### Issue #3: Allocation Engine (Income Auto-Split)
- **Status**: ❌ PENDING | **Priority**: CRITICAL
- **Description**: The "set and forget" engine that automates financial discipline.
- [ ] **Configurable Rules**: Store allocation percentages (e.g., 20% savings, 80% liquid) per user.
- [ ] **Income Router**: Create a `receiveIncome(address token, uint256 amount)` function.
- [ ] **Automated Transfer**: Instantly send the "liquid" portion to the user's primary wallet while locking the "savings" portion in the vault.
- [ ] **Fallback Mechanism**: Ensure standard deposits don't trigger the split unless specified.

---

## 📈 Phase 3: Wealth Generation (Medium Priority)

### Issue #4: DeFi Yield Strategies
- **Status**: ❌ PENDING | **Priority**: HIGH
- **Description**: Integration with lending protocols to ensure the freelancer's retirement fund grows.
- [ ] **Protocol Adapters**: Implement interfaces for Aave V3 and Compound V3 on Base.
- [ ] **Yield Routing**: Add logic to `supply` stablecoins to lending pools upon deposit.
- [ ] **Risk Tiers**: Implement conservative (Lending) and Growth (Index/LP) strategy modules.
- [ ] **Emergency Exit**: Add functions to instantly unwind DeFi positions and return funds to the vault.

### Issue #5: Yield Tracking & Compounding
- **Status**: ❌ PENDING | **Priority**: MEDIUM
- **Description**: On-chain logic to track how much interest has been generated.
- [ ] **Snapshotting**: Record total assets vs. initial principal on every interaction.
- [ ] **Performance Events**: Emit events with `principal` and `yield` values for indexing.
- [ ] **Auto-Compounding**: Ensure rewards (like AAVE/COMP) are claimed and swapped back into the base stablecoin.

---

## 🛠️ Phase 4: Platform Scalability & DX

### Issue #6: The Graph (Subgraph) Integration
- **Status**: ❌ PENDING | **Priority**: MEDIUM
- **Description**: Off-chain data indexing for a high-performance frontend.
- [ ] **Schema Definition**: Define `Vault`, `Transaction`, `Ping`, and `Inheritance` entities.
- [ ] **Event Mapping**: Write handlers for all contract events (Deposits, Splits, Claims).
- [ ] **Deployment**: Host on The Graph Studio and point the frontend to the new endpoint.

### Issue #7: Gas Optimization & Security Hardening
- **Status**: ❌ PENDING | **Priority**: HIGH
- **Description**: Ensure the platform is affordable for micro-savings and secure against edge cases.
- [ ] **Storage Packing**: Optimize `VaultState` struct to fit in fewer 256-bit slots.
- [ ] **Reentrancy Review**: Audit all external protocol calls for cross-contract reentrancy.
- [ ] **Emergency Admin**: Implement a "Guardian" role in the Factory for emergency pauses (if needed).

---

## 🧪 Testing & Validation
- [ ] **Unit Tests**: Achieve >95% coverage on new Allocation and Yield logic.
- [ ] **Fork Testing**: Run tests against a Base Mainnet fork to verify Aave/Compound interactions.
- [ ] **Stress Testing**: Simulate 10-year inactivity and multiple inheritance claims.

## 🔗 Tech Stack
- **Solidity**: ^0.8.20
- **Framework**: Hardhat / Foundry
- **Security**: OpenZeppelin, Slither
- **Network**: Base (L2)
