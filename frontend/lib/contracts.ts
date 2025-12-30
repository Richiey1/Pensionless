/**
 * Contract Addresses and Configuration
 * Deployed on Base Mainnet
 */

export const CONTRACTS = {
  FACTORY: '0x025800b47F319C87091b455814475c496DC72219',
  NFT: '0xc319b525592725194cA6254EE09866AA7b1bD5Ab',
} as const;

export const NETWORK_CONFIG = {
  chainId: 8453,
  name: 'Base',
  rpcUrl: 'https://mainnet.base.org',
  explorerUrl: 'https://basescan.org',
  explorerName: 'BaseScan',
} as const;

// Timeout presets in seconds
export const TIMEOUT_PRESETS = {
  ONE_WEEK: 7 * 24 * 60 * 60,
  ONE_MONTH: 30 * 24 * 60 * 60,
  THREE_MONTHS: 90 * 24 * 60 * 60,
  SIX_MONTHS: 180 * 24 * 60 * 60,
  ONE_YEAR: 365 * 24 * 60 * 60,
} as const;

// Timeout constraints
export const TIMEOUT_CONSTRAINTS = {
  MIN: 1 * 60 * 60, // 1 hour
  MAX: 10 * 365 * 24 * 60 * 60, // 10 years
} as const;
