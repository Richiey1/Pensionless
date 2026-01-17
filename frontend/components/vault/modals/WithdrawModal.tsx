'use client';

import { useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useDeadmanVault, useVaultBalance } from '@/hooks/useDeadmanVault';
import { parseEther, formatEther, type Address } from 'viem';
import { NETWORK_CONFIG } from '@/config/constants';

interface WithdrawModalProps {
  vaultAddress: Address;
  onClose: () => void;
}

export default function WithdrawModal({ vaultAddress, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const { balance, isLoading: isLoadingBalance } = useVaultBalance(vaultAddress);
  const { withdraw, hash, isPending, isSuccess, error } = useDeadmanVault(vaultAddress);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isLoading = isPending || isConfirming || isLoadingBalance;
  const maxBalance = balance ? formatEther(balance) : '0';

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (balance && parseEther(amount) > balance) {
      alert('Amount exceeds vault balance');
      return;
    }

    try {
      await withdraw(parseEther(amount));
    } catch (err) {
      console.error('Error withdrawing:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F172A] rounded-xl p-6 max-w-md w-full mx-4 border border-[#3B82F6]/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Withdraw ETH</h3>
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
              <p className="text-green-300 font-semibold">Withdrawal Successful!</p>
              <p className="text-sm text-green-200 mt-2">{amount} ETH withdrawn</p>
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
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-300">{error.message}</p>
              </div>
            )}

            <div className="p-3 bg-[#1E293B] border border-[#3B82F6]/20 rounded-lg">
              <p className="text-sm text-gray-400">Available Balance</p>
              <p className="text-lg font-semibold text-[#5EEAD4]">{isLoadingBalance ? '...' : maxBalance} ETH</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Amount (ETH)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.5"
                step="0.01"
                min="0"
                max={maxBalance}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#1E293B] border border-[#3B82F6]/30 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => setAmount(maxBalance)}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300"
              >
                Max
              </button>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={isLoading || !amount}
              className="w-full px-4 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  {isConfirming ? 'Confirming...' : 'Withdrawing...'}
                </span>
              ) : (
                'Withdraw'
              )}
            </button>

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
