export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1E40AF] via-[#111827] to-[#EA580C]">
      <main className="flex flex-col gap-8 items-center max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#FB923C] bg-clip-text text-transparent">
            Deadman Vault
          </h1>
          <p className="text-2xl text-[#E5E7EB]">
            Digital Inheritance System
          </p>
          <p className="text-lg text-[#9CA3AF] max-w-2xl">
            Secure your digital assets with automated inheritance. Create vaults with deadman switch functionality - if you stop pinging, your beneficiary inherits everything.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
          <div className="bg-[#1F2937] p-6 rounded-lg border border-[#3B82F6] hover:border-[#60A5FA] transition-colors">
            <div className="text-[#60A5FA] text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2 text-[#F9FAFB]">Secure Vaults</h3>
            <p className="text-[#9CA3AF]">
              Store ETH safely with full control. Withdraw anytime, set custom timeouts.
            </p>
          </div>

          <div className="bg-[#1F2937] p-6 rounded-lg border border-[#F97316] hover:border-[#FB923C] transition-colors">
            <div className="text-[#FB923C] text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-2 text-[#F9FAFB]">Deadman Switch</h3>
            <p className="text-[#9CA3AF]">
              Automatic inheritance if you fail to ping within your custom timeout period.
            </p>
          </div>

          <div className="bg-[#1F2937] p-6 rounded-lg border border-[#FFD700] hover:border-[#FFF] transition-colors">
            <div className="text-[#FFD700] text-4xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2 text-[#F9FAFB]">NFT Certificates</h3>
            <p className="text-[#9CA3AF]">
              Beneficiaries receive proof-of-claim NFT certificates as permanent records.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 items-center mt-8">
          <button className="px-8 py-4 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold rounded-lg transition-colors">
            Connect Wallet
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-[#F97316] hover:bg-[#F97316] text-[#F97316] hover:text-white font-semibold rounded-lg transition-colors">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold text-[#60A5FA]">0</div>
            <div className="text-sm text-[#9CA3AF]">Vaults Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#FB923C]">0 ETH</div>
            <div className="text-sm text-[#9CA3AF]">Total Value Locked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#FFD700]">0</div>
            <div className="text-sm text-[#9CA3AF]">Claims Processed</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 w-full">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#F9FAFB]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2 text-[#F9FAFB]">Create Vault</h4>
              <p className="text-sm text-[#9CA3AF]">Deploy your personal vault with custom beneficiary and timeout</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2 text-[#F9FAFB]">Deposit Funds</h4>
              <p className="text-sm text-[#9CA3AF]">Store ETH securely in your vault</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2 text-[#F9FAFB]">Ping Regularly</h4>
              <p className="text-sm text-[#9CA3AF]">Reset timer to prove you're active</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4 text-[#111827] font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2 text-[#F9FAFB]">Auto Inherit</h4>
              <p className="text-sm text-[#9CA3AF]">Beneficiary claims after timeout</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-[#6B7280]">
          <p>Built on Base blockchain • Powered by Smart Contracts</p>
          <p className="mt-2">Secure your digital legacy today</p>
        </footer>
      </main>
    </div>
  );
}
