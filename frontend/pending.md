# Deadman Vault Frontend - Analysis & Requirements

## 📋 Current State

### ✅ What's Already Built

**Tech Stack:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Web3: wagmi v2, viem v2, Reown AppKit (WalletConnect)
- TanStack Query for state management

**Existing Components:**
- ✅ Header with wallet connection
- ✅ Hero section with call-to-action
- ✅ Tab navigation (Create, My Vaults, Claim)
- ✅ Basic UI components (Button, Card)
- ✅ Web3Provider setup
- ✅ Three main tabs:
  - CreateVaultTab
  - MyVaultsTab
  - ClaimTab

**Design System:**
- Blue & Mint Green color palette
- Modern, trustworthy aesthetic
- Responsive layout

### 📍 Deployed Contracts (Base Mainnet)
```
Factory: 0x025800b47F319C87091b455814475c496DC72219
NFT:     0xc319b525592725194cA6254EE09866AA7b1bD5Ab
```

## 🔧 What Needs to Be Done

### 1. Environment Configuration
- [ ] Create `.env.local` file with:
  - [ ] `NEXT_PUBLIC_REOWN_PROJECT_ID` (WalletConnect)
  - [x] Contract addresses (already in contracts.ts)
  - [x] Network configuration (already in wagmi.ts)

### 2. Contract Integration
- [ ] Add contract ABIs to `lib/abi/`
  - [ ] DeadmanVault.json
  - [ ] DeadmanVaultFactory.json
  - [ ] ProofOfClaimNFT.json
- [x] Create `lib/contracts.ts` with addresses and configs ✅
- [ ] Implement custom hooks in `hooks/`:
  - [ ] `useFactory.ts` - Factory contract interactions
  - [ ] `useDeadmanVault.ts` - Vault contract interactions
  - [ ] `useNFT.ts` - NFT contract interactions

### 3. Core Features to Implement

#### Create Vault Tab
- [ ] Form to create new vault:
  - [ ] Beneficiary address input
  - [ ] Timeout period selector (presets: 1 day, 7 days, 30 days, 90 days, custom)
  - [ ] Optional initial deposit amount
- [ ] Deploy vault via Factory contract
- [ ] Show transaction status and confirmation
- [ ] Display newly created vault address

#### My Vaults Tab
- [ ] Fetch all vaults owned by connected wallet
- [ ] Display vault cards showing:
  - [ ] Vault address
  - [ ] Balance
  - [ ] Beneficiary
  - [ ] Last ping time
  - [ ] Timeout status (active/expired)
  - [ ] Time until timeout
- [ ] Vault actions:
  - [ ] Deposit ETH
  - [ ] Withdraw ETH
  - [ ] Ping (reset timer)
  - [ ] Update beneficiary
  - [ ] Update timeout
- [ ] Real-time countdown timers
- [ ] Empty state when no vaults

#### Claim Tab
- [ ] Fetch vaults where user is beneficiary
- [ ] Show claimable vaults with:
  - [ ] Owner address
  - [ ] Balance
  - [ ] Timeout status
  - [ ] Countdown to claim eligibility
- [ ] Claim functionality:
  - [ ] Check if timeout reached
  - [ ] Claim all funds
  - [ ] Mint proof-of-claim NFT
- [ ] Show claim history
- [ ] Empty state when no claimable vaults

### 4. UI/UX Enhancements
- [ ] Loading states for all async operations
- [ ] Error handling and user-friendly error messages
- [ ] Success notifications
- [ ] Transaction pending indicators
- [ ] Responsive design for mobile
- [ ] Tooltips for complex features
- [ ] Input validation

### 5. Smart Contract Setup
⚠️ **CRITICAL:** Before frontend works fully:
- [ ] Authorize Factory to mint NFTs:
  - Go to NFT contract on BaseScan
  - Call `setAuthorizedMinter(0x025800b47F319C87091b455814475c496DC72219, true)`
  - This allows Factory to mint certificates when beneficiaries claim

### 6. Testing & Validation
- [ ] Test wallet connection
- [ ] Test vault creation
- [ ] Test deposit/withdraw
- [ ] Test ping functionality
- [ ] Test beneficiary claim
- [ ] Test NFT minting
- [ ] Cross-browser testing
- [ ] Mobile responsiveness

## 🎯 Priority Order

### Phase 1: Foundation (Critical)
1. [ ] Set up environment variables
2. [ ] Add contract ABIs
3. [x] Create contract configuration file ✅
4. [ ] Authorize Factory to mint NFTs

### Phase 2: Core Functionality
1. [ ] Implement useFactory hook
2. [ ] Implement Create Vault feature
3. [ ] Implement My Vaults display
4. [ ] Implement basic vault actions (deposit, withdraw, ping)

### Phase 3: Advanced Features
1. [ ] Implement Claim functionality
2. [ ] Implement NFT minting
3. [ ] Add real-time countdowns
4. [ ] Add vault management (update beneficiary/timeout)

### Phase 4: Polish
1. [ ] Error handling
2. [ ] Loading states
3. [ ] Success notifications
4. [ ] Mobile optimization
5. [ ] Final testing

## 📝 Key Files to Create/Update

### To Create:
- [ ] `lib/abi/DeadmanVault.json`
- [ ] `lib/abi/DeadmanVaultFactory.json`
- [ ] `lib/abi/ProofOfClaimNFT.json`
- [x] `lib/contracts.ts` ✅
- [ ] `hooks/useFactory.ts`
- [ ] `hooks/useDeadmanVault.ts`
- [ ] `hooks/useNFT.ts`
- [ ] `.env.local`

### To Update:
- [ ] `components/vault/CreateVaultTab.tsx` - Implement form and logic
- [ ] `components/vault/MyVaultsTab.tsx` - Implement vault list and actions
- [ ] `components/vault/ClaimTab.tsx` - Implement claim interface
- [x] `config/wagmi.ts` - Network configuration ✅

## 🚀 Getting Started

1. [x] Check if dev server is running ✅ (it is)
2. [ ] Create `.env.local` with required variables
3. [ ] Add contract ABIs from the smart contract project
4. [ ] Authorize Factory to mint NFTs on BaseScan
5. [ ] Start implementing hooks for contract interactions
6. [ ] Build out tab components one by one

## 💡 Notes

- The frontend is well-structured and ready for implementation
- Main work is connecting the UI to smart contracts
- Focus on user experience - make complex blockchain operations simple
- Test thoroughly on Base Mainnet before launch
