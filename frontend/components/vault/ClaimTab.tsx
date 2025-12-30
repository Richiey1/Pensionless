export default function ClaimTab() {
  // Mock data - will be replaced with real data from Web3
  const claimableVaults = [
    {
      address: '0x9876...5432',
      owner: '0xdead...beef',
      balance: '2.3',
      timeoutReached: true,
      canClaim: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Claim Inheritance</h2>

      {claimableVaults.length === 0 ? (
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-12 border border-[#3B82F6]/20 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Claimable Vaults</h3>
          <p className="text-gray-400">You are not a beneficiary of any vaults yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {claimableVaults.map((vault, index) => (
            <div
              key={index}
              className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Vault {vault.address}</h3>
                  <p className="text-sm text-gray-400">Owner: {vault.owner}</p>
                </div>
                {vault.canClaim && (
                  <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] rounded-full text-sm font-medium">
                    Ready to Claim
                  </span>
                )}
              </div>

              <div className="mb-6 p-4 bg-[#0F172A]/50 rounded-lg border border-[#FFD700]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Claimable Amount</p>
                    <p className="text-3xl font-bold text-[#FFD700]">{vault.balance} ETH</p>
                  </div>
                  <div className="text-5xl">💰</div>
                </div>
              </div>

              {vault.canClaim ? (
                <div className="space-y-3">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-[#0F172A] font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#FFD700]/20">
                    Claim All Funds
                  </button>
                  <button className="w-full px-6 py-3 bg-[#0F172A] border border-[#14B8A6]/30 text-[#14B8A6] font-medium rounded-lg hover:border-[#14B8A6] transition-colors">
                    Mint Proof-of-Claim NFT
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-[#0F172A]/50 border border-[#3B82F6]/20 rounded-lg text-center">
                  <p className="text-gray-400">Timeout not reached yet</p>
                  <p className="text-sm text-gray-500 mt-1">Check back later</p>
                </div>
              )}

              <div className="mt-4 p-3 bg-[#0F172A]/30 rounded-lg">
                <p className="text-xs text-gray-400">
                  ℹ️ After claiming, you will become the new owner of this vault
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
