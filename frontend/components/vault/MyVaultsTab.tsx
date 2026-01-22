"use client";

import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import { useUserVaults } from "@/hooks/useFactory";
import {
  useVaultState,
  useDeadmanVault,
  useIsTimeoutReached,
} from "@/hooks/useDeadmanVault";
import { useCountdown, formatCountdown } from "@/hooks/useCountdown";
import { formatEther, type Address } from "viem";
import { NETWORK_CONFIG } from "@/config/constants";
import DepositModal from "./modals/DepositModal";
import WithdrawModal from "./modals/WithdrawModal";
import PingModal from "./modals/PingModal";
import SettingsModal from "./modals/SettingsModal";

interface VaultCardData {
  address: Address;
  owner: Address;
  beneficiary: Address;
  lastPing: bigint;
  timeout: bigint;
  balance: bigint;
  isTimeoutReached: boolean;
}

// Individual vault card component that fetches its own data
function VaultCard({
  address,
  onDeposit,
  onWithdraw,
  onPing,
  onSettings,
}: {
  address: Address;
  onDeposit: () => void;
  onWithdraw: () => void;
  onPing: () => void;
  onSettings: () => void;
}) {
  const { vaultState, isLoading: isLoadingState } = useVaultState(address);
  const { isTimeoutReached, isLoading: isLoadingTimeout } =
    useIsTimeoutReached(address);

  const isLoading = isLoadingState || isLoadingTimeout;

  if (isLoading || !vaultState) {
    return (
      <div className="bg-[#1E293B]/50 rounded-xl p-6 border border-[#3B82F6]/20 animate-pulse">
        <div className="h-6 bg-[#3B82F6]/20 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-[#3B82F6]/20 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-10 bg-[#3B82F6]/20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const countdown = useCountdown(vaultState.lastPing, vaultState.timeout);

  const formatTimeAgo = (timestamp: bigint) => {
    const seconds = Math.floor((Date.now() - Number(timestamp) * 1000) / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);

    if (days > 0) return `${days}d ${hours}h ago`;
    return `${hours}h ago`;
  };

  const shortAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div
      className={`bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 border transition-colors ${
        countdown.isExpired
          ? "border-red-500/40 hover:border-red-500/60"
          : "border-[#3B82F6]/20 hover:border-[#14B8A6]/40"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-white">
              Vault {shortAddress(address)}
            </h3>
            {countdown.isExpired && (
              <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded font-medium">
                ⚠️ Expired
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">
            Last ping: {formatTimeAgo(vaultState.lastPing)}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 text-right">
          <div className="text-2xl font-bold text-[#5EEAD4]">
            {formatEther(vaultState.balance)} ETH
          </div>
          <div
            className={`text-sm font-semibold ${
              countdown.isExpired ? "text-red-400" : "text-[#14B8A6]"
            }`}
          >
            {formatCountdown(countdown)}
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-[#0F172A]/50 rounded-lg">
        <p className="text-sm text-gray-400">Beneficiary</p>
        <p className="text-white font-mono text-sm">
          {shortAddress(vaultState.beneficiary)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={onDeposit}
          className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Deposit
        </button>
        <button
          onClick={onWithdraw}
          disabled={vaultState.balance === BigInt(0)}
          className="px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg hover:border-[#14B8A6] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Withdraw
        </button>
        <button
          onClick={onPing}
          className="px-4 py-2 bg-[#14B8A6] text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
        >
          Ping
        </button>
        <button
          onClick={onSettings}
          className="px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg hover:border-[#14B8A6] transition-colors text-sm font-medium"
        >
          Settings
        </button>
      </div>

      <a
        href={`${NETWORK_CONFIG.explorerUrl}/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-xs text-blue-400 hover:text-blue-300 block"
      >
        View on BaseScan →
      </a>
    </div>
  );
}

export default function MyVaultsTab() {
  const { address, isConnected } = useAccount();
  const {
    vaults: vaultAddresses,
    isLoading: isLoadingVaults,
    error: errorVaults,
    refetch,
  } = useUserVaults(address);

  const [selectedVaultAddress, setSelectedVaultAddress] =
    useState<Address | null>(null);

  // Modal states
  const [activeModal, setActiveModal] = useState<
    "deposit" | "withdraw" | "ping" | "settings" | null
  >(null);

  const handleModalClose = () => {
    setActiveModal(null);
    setSelectedVaultAddress(null);
    // Refetch data after modal actions
    refetch();
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
            Please connect your wallet to view your vaults
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingVaults) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#1E293B]/50 rounded-xl p-6 border border-[#3B82F6]/20 animate-pulse"
            >
              <div className="h-6 bg-[#3B82F6]/20 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-[#3B82F6]/20 rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-10 bg-[#3B82F6]/20 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errorVaults) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-red-900 mb-2">
            Error Loading Vaults
          </h3>
          <p className="text-red-800 mb-4">
            {errorVaults?.message || "Failed to load vaults"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">My Vaults</h2>

      {!vaultAddresses || vaultAddresses.length === 0 ? (
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-12 border border-[#3B82F6]/20 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Vaults Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Create your first vault to get started
          </p>
          <a
            href="/?tab=create"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Vault
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {(vaultAddresses as Address[]).map((vaultAddress) => (
            <VaultCard
              key={vaultAddress}
              address={vaultAddress}
              onDeposit={() => {
                setSelectedVaultAddress(vaultAddress);
                setActiveModal("deposit");
              }}
              onWithdraw={() => {
                setSelectedVaultAddress(vaultAddress);
                setActiveModal("withdraw");
              }}
              onPing={() => {
                setSelectedVaultAddress(vaultAddress);
                setActiveModal("ping");
              }}
              onSettings={() => {
                setSelectedVaultAddress(vaultAddress);
                setActiveModal("settings");
              }}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedVaultAddress && (
        <>
          {activeModal === "deposit" && (
            <DepositModal
              vaultAddress={selectedVaultAddress}
              onClose={handleModalClose}
            />
          )}
          {activeModal === "withdraw" && (
            <WithdrawModal
              vaultAddress={selectedVaultAddress}
              onClose={handleModalClose}
            />
          )}
          {activeModal === "ping" && (
            <PingModal
              vaultAddress={selectedVaultAddress}
              onClose={handleModalClose}
            />
          )}
          {activeModal === "settings" && (
            <SettingsModal
              vaultAddress={selectedVaultAddress}
              onClose={handleModalClose}
            />
          )}
        </>
      )}
    </div>
  );
}
