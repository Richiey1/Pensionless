export default function MyVaultsTab() {
  // Mock data - will be replaced with real data from Web3
  const vaults = [
    {
      address: '0x1234...5678',
      balance: '1.5',
      beneficiary: '0xabcd...efgh',
      lastPing: Date.now() - 86400000, // 1 day ago
      timeout: 2592000, // 30 days
    },
  ];

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    
    if (days > 0) return `${days}d ${hours}h ago`;
    return `${hours}h ago`;
  };

  const getTimeRemaining = (lastPing: number, timeout: number) => {
    const elapsed = (Date.now() - lastPing) / 1000;
    const remaining = timeout - elapsed;
    const days = Math.floor(remaining / 86400);
    
    if (remaining <= 0) return 'Expired';
    if (days > 0) return `${days} days left`;
    return `${Math.floor(remaining / 3600)} hours left`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">My Vaults</h2>

      {vaults.length === 0 ? (
        <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-12 border border-[#3B82F6]/20 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Vaults Yet</h3>
          <p className="text-gray-400 mb-6">Create your first vault to get started</p>
          <button className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#14B8A6] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Create Vault
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {vaults.map((vault, index) => (
            <div
              key={index}
              className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-6 border border-[#3B82F6]/20 hover:border-[#14B8A6]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Vault {vault.address}</h3>
                  <p className="text-sm text-gray-400">Last ping: {formatTimeAgo(vault.lastPing)}</p>
                </div>
                <div className="mt-3 sm:mt-0 text-right">
                  <div className="text-2xl font-bold text-[#5EEAD4]">{vault.balance} ETH</div>
                  <div className="text-sm text-gray-400">{getTimeRemaining(vault.lastPing, vault.timeout)}</div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-[#0F172A]/50 rounded-lg">
                <p className="text-sm text-gray-400">Beneficiary</p>
                <p className="text-white font-mono">{vault.beneficiary}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  Deposit
                </button>
                <button className="px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg hover:border-[#14B8A6] transition-colors text-sm font-medium">
                  Withdraw
                </button>
                <button className="px-4 py-2 bg-[#14B8A6] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  Ping
                </button>
                <button className="px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/30 text-white rounded-lg hover:border-[#14B8A6] transition-colors text-sm font-medium">
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
