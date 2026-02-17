'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Split, ArrowRight, Wallet, PieChart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AllocationSlider() {
  const [allocation, setAllocation] = useState(20)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 2000)
  }

  return (
    <Card className="p-8 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8 group hover:border-mint/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-3xl bg-mint/10">
          <Split className="w-6 h-6 text-mint" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Income Allocation</h3>
          <p className="text-sm text-gray-400">Automate your savings with pensionless logic.</p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="relative pt-6">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={allocation} 
            onChange={(e) => setAllocation(parseInt(e.target.value))}
            className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-mint hover:accent-mint/80 transition-all"
          />
          <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span>Spendable ({100 - allocation}%)</span>
            <span>Savings ({allocation}%)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Wallet className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Liquid</span>
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">{(100 - allocation)}%</p>
          </div>
          <div className="p-6 bg-mint/5 border border-mint/10 rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-mint">
              <PieChart className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Pension</span>
            </div>
            <p className="text-2xl font-bold text-mint tracking-tight">{allocation}%</p>
          </div>
        </div>

        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full h-14 bg-mint text-slate-900 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-mint/90 transition-all shadow-xl shadow-mint/10"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          {isSaving ? "Updating Strategy..." : "Update Allocation"}
        </Button>
      </div>
    </Card>
  )
}
