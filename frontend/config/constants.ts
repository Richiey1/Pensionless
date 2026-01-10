/**
 * Contract Addresses and Network Configuration
 * Base Mainnet Deployment
 */

// Contract Addresses (Base Mainnet)
export const FACTORY_ADDRESS = "0x025800b47F319C87091b455814475c496DC72219" as const;
export const NFT_ADDRESS = "0xc319b525592725194cA6254EE09866AA7b1bD5Ab" as const;

// Network Configuration
export const NETWORK_CONFIG = {
  name: "base",
  chainId: 8453,
  rpcUrl: "https://mainnet.base.org",
  explorerName: "BaseScan",
  explorerUrl: "https://basescan.org",
} as const;

// Contract Explorer Links
export const CONTRACT_LINKS = {
  factory: `${NETWORK_CONFIG.explorerUrl}/address/${FACTORY_ADDRESS}`,
  nft: `${NETWORK_CONFIG.explorerUrl}/address/${NFT_ADDRESS}`,
} as const;

// Deployment Information
export const DEPLOYMENT_INFO = {
  deployer: "0xC1e4453d98fEe92504A2dC2114e6613053880A30",
  timestamp: "2025-12-29T15:30:57.959Z",
} as const;
