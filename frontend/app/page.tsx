'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import TabNavigation from '@/components/layout/TabNavigation';
import CreateVaultTab from '@/components/vault/CreateVaultTab';
import MyVaultsTab from '@/components/vault/MyVaultsTab';
import ClaimTab from '@/components/vault/ClaimTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('create');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateVaultTab />;
      case 'vaults':
        return <MyVaultsTab />;
      case 'claim':
        return <ClaimTab />;
      default:
        return <CreateVaultTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <Header />
      <Hero />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-8">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            Built on Base blockchain • Powered by Smart Contracts
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Secure your digital legacy today
          </p>
        </div>
      </footer>
    </div>
  );
}
