import { useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { DeadmanVaultFactoryABI } from "@/lib/abi/DeadmanVaultFactory";
import { FACTORY_ADDRESS } from "@/config/constants";
import type { Address } from "viem";

/**
 * Hook for interacting with the DeadmanVaultFactory contract
 */
export function useFactory() {
  // Write functions
  const { writeContract, data: hash, isPending, isSuccess, error } = useWriteContract();

  /**
   * Create a new vault
   * @param beneficiary - Address of the beneficiary
   * @param timeout - Timeout period in seconds
   */
  const createVault = async (beneficiary: Address, timeout: bigint) => {
    return writeContract({
      address: FACTORY_ADDRESS,
      abi: DeadmanVaultFactoryABI,
      functionName: "createVault",
      args: [beneficiary, timeout],
    });
  };

  return {
    createVault,
    hash,
    isPending,
    isSuccess,
    error,
  };
}

/**
 * Hook to get user's vaults from the factory
 */
export function useUserVaults(userAddress?: Address) {
  const { data: vaults, isLoading, error, refetch } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: DeadmanVaultFactoryABI,
    functionName: "getUserVaults",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    vaults: vaults as Address[] | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get total number of vaults created
 */
export function useTotalVaults() {
  const { data: totalVaults, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: DeadmanVaultFactoryABI,
    functionName: "getTotalVaults",
  });

  return {
    totalVaults: totalVaults as bigint | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to get vault count for a specific user
 */
export function useUserVaultCount(userAddress?: Address) {
  const { data: vaultCount, isLoading, error } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: DeadmanVaultFactoryABI,
    functionName: "getUserVaultCount",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    vaultCount: vaultCount as bigint | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to get MIN and MAX timeout constants
 */
export function useTimeoutLimits() {
  const { data: minTimeout } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: DeadmanVaultFactoryABI,
    functionName: "MIN_TIMEOUT",
  });

  const { data: maxTimeout } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: DeadmanVaultFactoryABI,
    functionName: "MAX_TIMEOUT",
  });

  return {
    minTimeout: minTimeout as bigint | undefined,
    maxTimeout: maxTimeout as bigint | undefined,
  };
}

/**
 * Hook to watch for VaultCreated events
 */
export function useWatchVaultCreated(
  onVaultCreated: (owner: Address, vault: Address, beneficiary: Address, timeout: bigint) => void
) {
  useWatchContractEvent({
    address: FACTORY_ADDRESS,
    abi: DeadmanVaultFactoryABI,
    eventName: "VaultCreated",
    onLogs(logs) {
      logs.forEach((log) => {
        if (log.args.owner && log.args.vault && log.args.beneficiary && log.args.timeout) {
          onVaultCreated(log.args.owner, log.args.vault, log.args.beneficiary, log.args.timeout);
        }
      });
    },
  });
}
