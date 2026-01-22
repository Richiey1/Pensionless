"use client";

import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { useDeadmanVault, useVaultState } from "@/hooks/useDeadmanVault";
import { useToast } from "@/context/ToastContext";
import { isAddress, type Address } from "viem";
import { NETWORK_CONFIG } from "@/config/constants";

interface SettingsModalProps {
  vaultAddress: Address;
  onClose: () => void;
}

type SettingType = "beneficiary" | "timeout" | null;

export default function SettingsModal({
  vaultAddress,
  onClose,
}: SettingsModalProps) {
  const { vaultState, isLoading: isLoadingVault } = useVaultState(vaultAddress);
  const {
    setBeneficiary,
    setTimeout: setTimeoutFn,
    hash,
    isPending,
    error,
  } = useDeadmanVault(vaultAddress);
  const { addToast } = useToast();

  const [activeSetting, setActiveSetting] = useState<SettingType>(null);
  const [beneficiaryInput, setBeneficiaryInput] = useState("");
  const [timeoutInput, setTimeoutInput] = useState("");

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const isLoading = isPending || isConfirming || isLoadingVault;

  // Show toast notifications
  useEffect(() => {
    if (isConfirmed) {
      if (activeSetting === "beneficiary") {
        addToast("Beneficiary updated successfully", "success");
      } else if (activeSetting === "timeout") {
        addToast("Timeout updated successfully", "success");
      }
    }
  }, [isConfirmed, activeSetting, addToast]);

  useEffect(() => {
    if (error) {
      addToast(`Error: ${error.message}`, "error", 5000);
    }
  }, [error, addToast]);

  useEffect(() => {
    if (isPending) {
      addToast("Transaction pending...", "info", 0);
    }
  }, [isPending, addToast]);

  const handleSetBeneficiary = async () => {
    if (!isAddress(beneficiaryInput)) {
      addToast("Please enter a valid Ethereum address", "warning");
      return;
    }

    try {
      await setBeneficiary(beneficiaryInput as Address);
      setBeneficiaryInput("");
      setActiveSetting(null);
    } catch (err) {
      console.error("Error setting beneficiary:", err);
      addToast("Failed to set beneficiary", "error", 5000);
    }
  };

  const handleSetTimeout = async () => {
    if (
      !timeoutInput ||
      isNaN(Number(timeoutInput)) ||
      Number(timeoutInput) <= 0
    ) {
      addToast("Please enter a valid timeout in seconds", "warning");
      return;
    }

    try {
      await setTimeoutFn(BigInt(timeoutInput));
      setTimeoutInput("");
      setActiveSetting(null);
    } catch (err) {
      console.error("Error setting timeout:", err);
      addToast("Failed to set timeout", "error", 5000);
    }
  };

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const formatSeconds = (seconds: bigint) => {
    const days = Number(seconds) / (24 * 60 * 60);
    return days < 1
      ? `${Math.floor(Number(seconds) / 3600)} hours`
      : `${Math.floor(days)} days`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F172A] rounded-xl p-6 max-w-md w-full mx-4 border border-[#3B82F6]/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Vault Settings</h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white text-2xl disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {isConfirmed ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-green-300 font-semibold">Settings Updated!</p>
              <p className="text-sm text-green-200 mt-2">
                Your vault settings have been changed
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Settings */}
            {vaultState && (
              <div className="space-y-3">
                {/* Beneficiary */}
                <div className="p-3 bg-[#1E293B] border border-[#3B82F6]/20 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">
                    Current Beneficiary
                  </p>
                  <p className="text-white font-mono text-sm mb-2">
                    {formatAddress(vaultState.beneficiary)}
                  </p>
                  {activeSetting !== "beneficiary" ? (
                    <button
                      onClick={() => {
                        setActiveSetting("beneficiary");
                        setBeneficiaryInput(vaultState.beneficiary);
                      }}
                      disabled={isLoading}
                      className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-50"
                    >
                      Change →
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={beneficiaryInput}
                        onChange={(e) => setBeneficiaryInput(e.target.value)}
                        placeholder="0x..."
                        disabled={isLoading}
                        className="w-full px-2 py-2 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-50"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSetBeneficiary}
                          disabled={isLoading}
                          className="flex-1 px-2 py-1 bg-[#3B82F6] text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setActiveSetting(null)}
                          disabled={isLoading}
                          className="flex-1 px-2 py-1 bg-[#3B82F6]/20 text-white rounded text-sm hover:bg-[#3B82F6]/30 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeout */}
                <div className="p-3 bg-[#1E293B] border border-[#3B82F6]/20 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Current Timeout</p>
                  <p className="text-white font-semibold text-sm mb-2">
                    {formatSeconds(vaultState.timeout)}
                  </p>
                  {activeSetting !== "timeout" ? (
                    <button
                      onClick={() => {
                        setActiveSetting("timeout");
                        setTimeoutInput(vaultState.timeout.toString());
                      }}
                      disabled={isLoading}
                      className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-50"
                    >
                      Change →
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="number"
                        value={timeoutInput}
                        onChange={(e) => setTimeoutInput(e.target.value)}
                        placeholder="Timeout in seconds"
                        disabled={isLoading}
                        className="w-full px-2 py-2 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-50"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSetTimeout}
                          disabled={isLoading}
                          className="flex-1 px-2 py-1 bg-[#3B82F6] text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setActiveSetting(null)}
                          disabled={isLoading}
                          className="flex-1 px-2 py-1 bg-[#3B82F6]/20 text-white rounded text-sm hover:bg-[#3B82F6]/30 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {hash && (
              <a
                href={`${NETWORK_CONFIG.explorerUrl}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-blue-400 hover:text-blue-300"
              >
                View transaction →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
