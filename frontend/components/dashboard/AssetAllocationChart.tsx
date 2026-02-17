'use client'

import React from 'react'
import { Card } from '@/components/ui/Card'
import { BarChart3, TrendingUp, Wallet, ShieldCheck, ArrowUpRight } from 'lucide-react'

// Mock data for initial implementation
const assetData = [
  { name: 'USDC', balance: '$8,450.00', yield: '12.4%', color: 'bg-blue-500' },
  { name: 'USDT', balance: '$2,200.00', yield: '11.8%', color: 'bg-green-500' },
  { name: 'ETH', balance: '$1,800.00', yield: '4.2%', color: 'bg-purple-500' }
]

export function AssetAllocationChart() {
  return (
    <Card className="p-8 bg-white/5 border-white/10 rounded-[2.5rem] group hover:border-mint/30 transition-all">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-3xl bg-mint/10">
            <BarChart3 className="w-6 h-6 text-mint" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Asset Allocation</h3>
            <p className="text-sm text-gray-400">Distribution across stablecoins and ETH.</p>
          </div>
        </div>
        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
          <ArrowUpRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Simple visual bar representing allocation */}
        <div className="flex h-4 w-full rounded-full overflow-hidden bg-white/5">
          <div className="w-[65%] bg-blue-500" />
          <div className="w-[20%] bg-green-500" />
          <div className="w-[15%] bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 gap-3 pt-4">
          {assetData.map((asset, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-3xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                <span className="font-bold text-white text-sm">{asset.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{asset.balance}</p>
                <div className="flex items-center gap-1 justify-end text-[10px] text-mint font-bold uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" /> {asset.yield}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
