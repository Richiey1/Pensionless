'use client';

import { useState, useEffect } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useDeadmanVault } from '@/hooks/useDeadmanVault';
import { useToast } from '@/context/ToastContext';
import { parseEther, isAddress, type Address } from 'viem';
import { NETWORK_CONFIG } from '@/config/constants';

interface DepositModalProps {
  vaultAddress: Address;
  onClose: () => void;
}

export default function DepositModal({ vaultAddress, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const { deposit, hash, isPending, isSuccess, error } = useDeadmanVault(vaultAddress);
  const { addToast } = useToast();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isLoading = isPending || isConfirming;

  // Show toast notifications for state changes
  useEffect(() => {
    if (isConfirmed) {
      addToast(`Successfully deposited ${amount} ETH`, 'success');
    }
  }, [isConfirmed, amount, addToast]);

  useEffect(() => {
    if (error) {
      addToast(`Error: ${error.message}`, 'error', 5000);
    }
  }, [error, addToast]);

  useEffect(() => {
    if (isPending) {
      addToast('Transaction pending...', 'info', 0);
    }
  }, [isPending, addToast]);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      addToast('Please enter a valid amount', 'warning');
      return;
    }

    try {
      await deposit(amount);
    } catch (err) {
      console.error('Error depositing:', err);
      addToast('Failed to initiate deposit', 'error', 5000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F172A] rounded-xl p-6 max-w-md w-full mx-4 border border-[#3B82F6]/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Deposit ETH</h3>
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
              <p className="text-green-300 font-semibold">Deposit Successful!</p>
              <p className="text-sm text-green-200 mt-2">{amount} ETH deposited</p>
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
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#1E293B] border border-[#3B82F6]/30 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              onClick={handleDeposit}
              disabled={isLoading || !amount}
              className="w-full px-4 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  {isConfirming ? 'Confirming...' : 'Depositing...'}
                </span>
              ) : (
                'Deposit'
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
