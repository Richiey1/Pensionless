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
import Tooltip from "@/components/ui/Tooltip";
import { HelpCircle, Clock, Shield, ArrowUpCircle, Settings as SettingsIcon } from "lucide-react";

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

  const countdown = useCountdown(vaultState?.lastPing ?? 0n, vaultState?.timeout ?? 0n);

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

  return (
    <div
      className={`bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
        countdown.isExpired
          ? "border-red-500/40 shadow-lg shadow-red-500/5"
          : "border-[#3B82F6]/20 hover:border-[#14B8A6]/40 shadow-md"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-white">
              Vault {shortAddress(address)}
            </h3>
            {countdown.isExpired ? (
              <Tooltip content="This vault has timed out. The beneficiary can now claim all funds.">
                <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded font-bold uppercase tracking-wider flex items-center gap-1">
                  ⚠️ Expired
                </span>
              </Tooltip>
            ) : (
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded font-bold uppercase tracking-wider">
                Active
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last ping: {formatTimeAgo(vaultState.lastPing)}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 text-right">
          <div className="text-2xl font-bold text-[#5EEAD4]">
            {formatEther(vaultState.balance)} ETH
          </div>
          <div
            className={`text-sm font-semibold flex items-center justify-end gap-1 ${
              countdown.isExpired ? "text-red-400" : "text-[#14B8A6]"
            }`}
          >
            {!countdown.isExpired && <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />}
            {formatCountdown(countdown)}
            <Tooltip content="Time remaining before the beneficiary becomes eligible to claim the vault's balance.">
              <HelpCircle className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="mb-6 p-3 bg-[#0F172A]/50 rounded-lg border border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-0.5">Beneficiary</p>
          <p className="text-white font-mono text-sm">
            {shortAddress(vaultState.beneficiary)}
          </p>
        </div>
        <Shield className="w-5 h-5 text-[#3B82F6]/40" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onDeposit}
          className="px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
        >
          Deposit
        </button>
        <button
          onClick={onWithdraw}
          disabled={vaultState.balance === BigInt(0)}
          className="px-4 py-2.5 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg hover:border-[#14B8A6] hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
        >
          Withdraw
        </button>
        <Tooltip content="Reset the timer to prevent your beneficiary from claiming funds. Do this periodically.">
          <button
            onClick={onPing}
            className="w-full px-4 py-2.5 bg-[#14B8A6] text-white rounded-lg hover:bg-teal-600 transition-all text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-95"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Ping
          </button>
        </Tooltip>
        <button
          onClick={onSettings}
          className="px-4 py-2.5 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg hover:border-[#14B8A6] hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2 active:scale-95"
        >
          <SettingsIcon className="w-4 h-4" />
          Settings
        </button>
      </div>

      <a
        href={`${NETWORK_CONFIG.explorerUrl}/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1 group"
      >
        View on {NETWORK_CONFIG.explorerName} 
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
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
        <div className="bg-yellow-50/5 border border-yellow-200/20 rounded-xl p-8 text-center backdrop-blur-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-yellow-500 mb-2">
            Wallet Not Connected
          </h3>
          <p className="text-yellow-200/60">
            Please connect your wallet to view and manage your vaults
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
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8 text-center backdrop-blur-sm">
          <div className="text-5xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-red-500 mb-2">
            Error Loading Vaults
          </h3>
          <p className="text-red-200/60 mb-4">
            {errorVaults?.message || "Failed to load vaults"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">My Vaults</h2>
        <div className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
          {vaultAddresses?.length ?? 0} Vaults Found
        </div>
      </div>

      {!vaultAddresses || vaultAddresses.length === 0 ? (
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-16 border border-dashed border-[#3B82F6]/30 text-center">
          <div className="text-6xl mb-6 opacity-50 grayscale">🔐</div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            No Vaults Yet
          </h3>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            You haven't created any deadman vaults yet. Secure your digital legacy today.
          </p>
          <a
            href="/?tab=create"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95"
          >
            Create Your First Vault
          </a>
        </div>
      ) : (
        <div className="space-y-6">
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
