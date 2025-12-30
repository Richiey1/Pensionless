/**
 * Utility Functions for Deadman Vault
 */

/**
 * Format ETH amount with specified decimals
 */
export function formatEth(wei: bigint, decimals: number = 4): string {
  const eth = Number(wei) / 1e18;
  return eth.toFixed(decimals);
}

/**
 * Format address to short form (0x1234...5678)
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format timestamp to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Format timeout duration to readable string
 */
export function formatTimeout(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${seconds} seconds`;
}

/**
 * Calculate time remaining until timeout
 */
export function getTimeRemaining(lastPing: number, timeout: number): {
  isExpired: boolean;
  remaining: number;
  formatted: string;
} {
  const now = Date.now() / 1000;
  const elapsed = now - lastPing;
  const remaining = timeout - elapsed;
  
  if (remaining <= 0) {
    return {
      isExpired: true,
      remaining: 0,
      formatted: 'Expired',
    };
  }
  
  return {
    isExpired: false,
    remaining,
    formatted: formatTimeout(remaining),
  };
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * Get status color based on time remaining
 */
export function getStatusColor(timeRemaining: number, timeout: number): string {
  const percentage = (timeRemaining / timeout) * 100;
  
  if (percentage <= 0) return 'text-red-500';
  if (percentage <= 10) return 'text-orange-500';
  if (percentage <= 25) return 'text-yellow-500';
  return 'text-green-500';
}
