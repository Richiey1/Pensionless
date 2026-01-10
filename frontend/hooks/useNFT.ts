import { useReadContract, useWriteContract } from "wagmi";
import { ProofOfClaimNFTABI } from "@/lib/abi/ProofOfClaimNFT";
import { NFT_ADDRESS } from "@/config/constants";
import type { Address } from "viem";

export interface ClaimData {
  beneficiary: Address;
  claimedAt: bigint;
  vaultAddress: Address;
  amount: bigint;
}

/**
 * Hook for interacting with the ProofOfClaimNFT contract
 */
export function useNFT() {
  // Write functions
  const { writeContract, data: hash, isPending, isSuccess, error } = useWriteContract();

  /**
   * Mint a new proof of claim NFT certificate
   * @param beneficiary - Address of the beneficiary
   * @param vaultAddress - Address of the vault
   * @param amount - Amount claimed in wei
   */
  const mintCertificate = async (beneficiary: Address, vaultAddress: Address, amount: bigint) => {
    return writeContract({
      address: NFT_ADDRESS,
      abi: ProofOfClaimNFTABI,
      functionName: "mint",
      args: [beneficiary, vaultAddress, amount],
    });
  };

  return {
    mintCertificate,
    hash,
    isPending,
    isSuccess,
    error,
  };
}

/**
 * Hook to get NFT balance for an address
 */
export function useNFTBalance(ownerAddress?: Address) {
  const { data: balance, isLoading, error } = useReadContract({
    address: NFT_ADDRESS,
    abi: ProofOfClaimNFTABI,
    functionName: "balanceOf",
    args: ownerAddress ? [ownerAddress] : undefined,
    query: {
      enabled: !!ownerAddress,
    },
  });

  return {
    balance: balance as bigint | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to get total supply of NFTs
 */
export function useTotalNFTSupply() {
  const { data: totalSupply, isLoading, error } = useReadContract({
    address: NFT_ADDRESS,
    abi: ProofOfClaimNFTABI,
    functionName: "totalSupply",
  });

  return {
    totalSupply: totalSupply as bigint | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to get claim data for a specific token ID
 */
export function useClaimData(tokenId?: bigint) {
  const { data: claimData, isLoading, error, refetch } = useReadContract({
    address: NFT_ADDRESS,
    abi: ProofOfClaimNFTABI,
    functionName: "getClaimData",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });

  return {
    claimData: claimData as ClaimData | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get token URI for a specific token ID
 */
export function useTokenURI(tokenId?: bigint) {
  const { data: tokenURI, isLoading, error } = useReadContract({
    address: NFT_ADDRESS,
    abi: ProofOfClaimNFTABI,
    functionName: "tokenURI",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });

  return {
    tokenURI: tokenURI as string | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to check if an address is an authorized minter
 */
export function useIsAuthorizedMinter(minterAddress?: Address) {
  const { data: isAuthorized, isLoading, error } = useReadContract({
    address: NFT_ADDRESS,
    abi: ProofOfClaimNFTABI,
    functionName: "isAuthorizedMinter",
    args: minterAddress ? [minterAddress] : undefined,
    query: {
      enabled: !!minterAddress,
    },
  });

  return {
    isAuthorized: isAuthorized as boolean | undefined,
    isLoading,
    error,
  };
}
