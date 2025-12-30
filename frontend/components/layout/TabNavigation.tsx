'use client';

import { PlusCircle, Vault, Gift } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'create', label: 'Create Vault', icon: PlusCircle },
    { id: 'vaults', label: 'My Vaults', icon: Vault },
    { id: 'claim', label: 'Claim Inheritance', icon: Gift },
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  px-6 py-4 font-medium transition-all whitespace-nowrap border-b-2 flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? 'text-[#3B82F6] border-[#3B82F6]'
                      : 'text-gray-600 border-transparent hover:text-[#14B8A6] hover:border-gray-300'
                  }
                `}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
