# Freelancer Savings Platform - Frontend Roadmap

This roadmap details the comprehensive UI/UX development path for the Freelancer Savings Platform. Our goal is to provide a seamless, intuitive dashboard that makes financial planning effortless for independent workers.

## ✅ Phase 1: Core Interface (Completed)

### Issue #1: Legacy Inheritance Dashboard
- **Status**: ✅ COMPLETED
- **Description**: Established the basic infrastructure for vault management and deadman switch logic.
- [x] **Web3 Integration**: Wagmi/Viem/Reown AppKit setup for secure wallet interaction.
- [x] **Vault Management**: UI for Ping, Deposit, Withdraw (ETH support).
- [x] **Beneficiary Flow**: Claim interface for heirs and ProofOfClaimNFT certificate viewer.
- [x] **Responsive UI**: Professional Blue & Mint Green theme optimized for all screen sizes.

---

## 🚀 Phase 2: Savings Intelligence (High Priority)

### Issue #2: Global Savings Dashboard
- **Status**: ❌ PENDING | **Priority**: CRITICAL
- **Description**: A unified view of the freelancer's financial health across all vaults and tokens.
- [ ] **Stats Overview**: Create high-level cards for "Total Balance (USD)", "Net Yield Earned", and "Monthly Savings Rate".
- [ ] **Asset Allocation Chart**: Implement a visual breakdown (Pie Chart using Recharts) of Stablecoins (USDC/USDT) vs. ETH.
- [ ] **Growth Projections**: Develop an interactive line chart showing projected retirement savings over 5, 10, and 20 years based on current DeFi APY.

### Issue #3: Allocation Engine UI
- **Status**: ❌ PENDING | **Priority**: HIGH
- **Description**: User-friendly controls for the auto-income-splitting mechanism.
- [ ] **Interactive Sliders**: Develop a precision slider component to adjust "Spendable" vs. "Savings" percentages.
- [ ] **Income Routing Instructions**: Design a prominent "Client Payment Portal" section showing the unique vault address and QR code for direct income routing.
- [ ] **Split History**: Create a dedicated ledger listing all recent auto-splits and their final destinations.

---

## 📈 Phase 3: Financial Empowerment (Medium Priority)

### Issue #4: DeFi Strategy Manager
- **Status**: ❌ PENDING | **Priority**: HIGH
- **Description**: Interface for users to select and monitor their yield generation strategies.
- [ ] **Strategy Tiers**: Design comparative cards for Conservative (Stablecoin Lending), Balanced (Index tokens), and Growth (Liquidity Provision).
- [ ] **Performance Monitor**: Add real-time APY tracking for each deployed strategy.
- [ ] **Emergency Liquidate**: Implement a high-visibility button to instantly exit all DeFi positions and return funds to the secure vault.

### Issue #5: Retirement Goal Tracker
- **Status**: ❌ PENDING | **Priority**: MEDIUM
- **Description**: Gamified progress tracking for long-term financial milestones.
- [ ] **Goal Wizard**: An onboarding flow to define a target savings amount (e.g., "$500k for retirement").
- [ ] **Milestone Visualization**: Progress bars and circular gauges showing how close the user is to their target.
- [ ] **Reward Badges**: Integration to display "Milestone NFTs" earned through consistent saving habits.

---

## 🛠️ Phase 4: System Robustness & UX

### Issue #6: Notification & Reminder System
- **Status**: ❌ PENDING | **Priority**: HIGH
- **Description**: Ensure users never miss a "Ping" or an inheritance claim window.
- [ ] **Security Alerts**: Integration with Push Protocol or XMTP for browser-based "Inactivity Warnings".
- [ ] **Reminders**: Configurable email/SMS alerts to remind users to reset their deadman switch timer.
- [ ] **Transaction Feedback**: Enhance real-time toast notifications for multi-stage transactions (Approve -> Deposit -> Route).

### Issue #7: Subgraph & High-Speed Data
- **Status**: ❌ PENDING | **Priority**: MEDIUM
- **Description**: Migrate to GraphQL queries for instantaneous dashboard loading and historical data.
- [ ] **Unified Activity Feed**: A consolidated list of all on-chain actions (Deposits, Splits, Pings, Claims).
- [ ] **Global Leaderboard**: An optional, privacy-focused ranking system for the most disciplined savers.

---

## 📱 Future Extensions
- [ ] **Mobile App**: Native iOS/Android experience for on-the-go savings monitoring and quick "Pings".
- [ ] **Fiat On-Ramp**: Direct integration with Stripe or MoonPay for easy stablecoin entry.
- [ ] **Tax Reporting**: One-click generation of exportable CSV files for freelancer annual tax filings.

---
**Building the default financial safety net for the global freelance workforce.**
