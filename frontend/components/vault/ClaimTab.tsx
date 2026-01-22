"use client";

import { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { DeadmanVaultABI } from "@/lib/abi/DeadmanVault";
import {
  useVaultState,
  useIsTimeoutReached,
  useDeadmanVault,
  type VaultState,
} from "@/hooks/useDeadmanVault";
import { useVaultOwner } from "@/hooks/useFactory";
import { useNFT } from "@/hooks/useNFT";
import { formatEther, type Address } from "viem";
import { NETWORK_CONFIG } from "@/config/constants";

interface ClaimableVault {
  address: Address;
  owner: Address;
  balance: bigint;
  timeoutReached: boolean;
}

export default function ClaimTab() {
  const { address, isConnected } = useAccount();

  const [claimableVaults, setClaimableVaults] = useState<ClaimableVault[]>([]);
  const [isLoadingVaults, setIsLoadingVaults] = useState(false);
  const [claimingVault, setClaimingVault] = useState<Address | null>(null);
  const [vaultInputs, setVaultInputs] = useState<Address[]>([]);
  const [manualVaultInput, setManualVaultInput] = useState("");

  // For claiming
  const {
    claimAll,
    hash: claimHash,
    isPending: isClaimPending,
    error: claimError,
  } = useDeadmanVault(claimingVault || undefined);
  const { isLoading: isConfirmingClaim, isSuccess: isClaimConfirmed } =
    useWaitForTransactionReceipt({
      hash: claimHash,
    });

  // For minting NFT
  const [mintingVault, setMintingVault] = useState<ClaimableVault | null>(null);
  const { mintCertificate, hash: nftHash, isPending: isNFTPending } = useNFT();
  const { isLoading: isConfirmingNFT, isSuccess: isNFTConfirmed } =
    useWaitForTransactionReceipt({
      hash: nftHash,
    });

  const shortAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  // Fetch vault details for manually added vaults
  useEffect(() => {
    if (!address || !isConnected || vaultInputs.length === 0) {
      if (vaultInputs.length === 0) {
        setClaimableVaults([]);
      }
      return;
    }

    const fetchVaultDetails = async () => {
      setIsLoadingVaults(true);
      try {
        const vaults: ClaimableVault[] = [];

        for (const vaultAddress of vaultInputs) {
          try {
            const state = (await readContract(config, {
              address: vaultAddress,
              abi: DeadmanVaultABI,
              functionName: "getVaultState",
            })) as VaultState;

            const timeoutReached = (await readContract(config, {
              address: vaultAddress,
              abi: DeadmanVaultABI,
              functionName: "isTimeoutReached",
            })) as boolean;

            // Only add if user is beneficiary
            if (
              state.beneficiary.toLowerCase() === address.toLowerCase() &&
              !state.hasClaimed
            ) {
              vaults.push({
                address: vaultAddress,
                owner: state.owner,
                balance: state.balance,
                timeoutReached: timeoutReached,
              });
            }
          } catch (innerErr) {
            console.error(
              `Error fetching details for ${vaultAddress}:`,
              innerErr
            );
          }
        }
        setClaimableVaults(vaults);
        setIsLoadingVaults(false);
      } catch (err) {
        console.error("Error fetching vault details:", err);
        setIsLoadingVaults(false);
      }
    };

    fetchVaultDetails();
  }, [address, isConnected, vaultInputs]);

  const handleAddVault = () => {
    if (!manualVaultInput) return;

    if (!/^0x[a-fA-F0-9]{40}$/.test(manualVaultInput)) {
      alert("Please enter a valid vault address");
      return;
    }

    const newVault = manualVaultInput as Address;
    if (!vaultInputs.includes(newVault)) {
      setVaultInputs([...vaultInputs, newVault]);
    }
    setManualVaultInput("");
  };

  const handleClaim = async (vaultAddress: Address) => {
    if (!vaultAddress) return;

    setClaimingVault(vaultAddress);
    try {
      await claimAll();
    } catch (err) {
      console.error("Error claiming:", err);
      setClaimingVault(null);
    }
  };

  const handleMintNFT = async (vault: ClaimableVault) => {
    if (!vault.address || !address) return;

    setMintingVault(vault);
    try {
      await mintCertificate(address, vault.address, vault.balance);
    } catch (err) {
      console.error("Error minting NFT:", err);
      setMintingVault(null);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-yellow-900 mb-2">
            Wallet Not Connected
          </h3>
          <p className="text-yellow-800">
            Please connect your wallet to view claimable vaults
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Claim Inheritance</h2>

      {/* Add Vault Section */}
      <div className="mb-8 p-6 bg-[#1E293B]/50 border border-[#3B82F6]/20 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">
          Add Claimable Vault
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          💡 Enter the vault address where you are a beneficiary to check if you
          can claim it
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={manualVaultInput}
            onChange={(e) => setManualVaultInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddVault()}
            placeholder="0x..."
            className="flex-1 px-4 py-3 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
          <button
            onClick={handleAddVault}
            className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Add Vault
          </button>
        </div>
      </div>

      {/* Claimable Vaults List */}
      {isLoadingVaults ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#1E293B]/50 rounded-xl p-6 border border-[#FFD700]/20 animate-pulse"
            >
              <div className="h-6 bg-[#FFD700]/20 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-[#FFD700]/20 rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((j) => (
                  <div key={j} className="h-10 bg-[#FFD700]/20 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : claimableVaults.length === 0 && vaultInputs.length === 0 ? (
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-12 border border-[#3B82F6]/20 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Vaults Added Yet
          </h3>
          <p className="text-gray-400 mb-4">
            Add a vault address above to check if you can claim it
          </p>
          <div className="text-sm text-gray-500 bg-[#0F172A]/50 p-4 rounded-lg">
            <p className="font-semibold mb-2">
              ℹ️ How to find claimable vaults:
            </p>
            <ul className="text-left space-y-1">
              <li>
                • Check emails or messages where vaults were created for you
              </li>
              <li>• Ask vault creators to share the vault address</li>
              <li>
                • Look in blockchain explorers for events involving your address
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {claimableVaults.map((vault) => (
            <div
              key={vault.address}
              className={`bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 border transition-colors ${
                vault.timeoutReached
                  ? "border-[#FFD700]/40 hover:border-[#FFD700]/60"
                  : "border-[#3B82F6]/20 hover:border-[#3B82F6]/40"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">
                      Vault {shortAddress(vault.address)}
                    </h3>
                    {vault.timeoutReached && (
                      <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] rounded-full text-sm font-medium">
                        Ready to Claim 🎉
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    Owner: {shortAddress(vault.owner)}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-[#0F172A]/50 rounded-lg border border-[#FFD700]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Claimable Amount
                    </p>
                    <p className="text-3xl font-bold text-[#FFD700]">
                      {formatEther(vault.balance)} ETH
                    </p>
                  </div>
                  <div className="text-5xl">💰</div>
                </div>
              </div>

              {vault.timeoutReached ? (
                <div className="space-y-3">
                  {isClaimConfirmed && claimingVault === vault.address ? (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
                      <div className="text-3xl mb-2">✓</div>
                      <p className="text-green-300 font-semibold">
                        Claim Successful!
                      </p>
                      <p className="text-sm text-green-200 mt-1">
                        You are now the vault owner
                      </p>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleClaim(vault.address)}
                        disabled={isClaimPending || isConfirmingClaim}
                        className="w-full px-6 py-4 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-[#0F172A] font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#FFD700]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isClaimPending || isConfirmingClaim ? (
                          <span className="flex items-center justify-center">
                            <span className="animate-spin mr-2">⏳</span>
                            {isConfirmingClaim
                              ? "Confirming..."
                              : "Claiming..."}
                          </span>
                        ) : (
                          "Claim All Funds"
                        )}
                      </button>
                      <button
                        onClick={() => handleMintNFT(vault)}
                        disabled={isNFTPending || isConfirmingNFT}
                        className="w-full px-6 py-3 bg-[#0F172A] border border-[#14B8A6]/30 text-[#14B8A6] font-medium rounded-lg hover:border-[#14B8A6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isNFTPending || isConfirmingNFT
                          ? "Minting NFT..."
                          : "Mint Proof-of-Claim NFT"}
                      </button>
                    </>
                  )}

                  {claimHash && claimingVault === vault.address && (
                    <a
                      href={`${NETWORK_CONFIG.explorerUrl}/tx/${claimHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm text-blue-400 hover:text-blue-300"
                    >
                      View claim transaction →
                    </a>
                  )}

                  {nftHash && mintingVault?.address === vault.address && (
                    <a
                      href={`${NETWORK_CONFIG.explorerUrl}/tx/${nftHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm text-blue-400 hover:text-blue-300"
                    >
                      View NFT mint transaction →
                    </a>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-[#0F172A]/50 border border-[#3B82F6]/20 rounded-lg text-center">
                  <p className="text-gray-400">⏳ Timeout not reached yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Check back when the timer expires
                  </p>
                </div>
              )}

              <div className="mt-4 p-3 bg-[#0F172A]/30 rounded-lg">
                <p className="text-xs text-gray-400">
                  ℹ️ After claiming, you will become the new owner of this vault
                  and can manage it like your own
                </p>
              </div>

              <a
                href={`${NETWORK_CONFIG.explorerUrl}/address/${vault.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs text-blue-400 hover:text-blue-300 block"
              >
                View on BaseScan →
              </a>
            </div>
          ))}
        </div>
      )}

      {claimError && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-300">Error: {claimError.message}</p>
        </div>
      )}
    </div>
  );
}
