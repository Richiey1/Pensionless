'use client'

import React from 'react'
import { Card } from '@/components/ui/Card'
import { DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change?: string
  icon: React.ElementType
  color: string
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="p-6 bg-white/5 border-white/10 rounded-3xl group hover:border-mint/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {change && (
          <span className="text-xs font-bold text-mint bg-mint/10 px-2 py-1 rounded-lg">
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </Card>
  )
}

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Balance (USD)" 
        value="$12,450.00" 
        change="+2.4%" 
        icon={DollarSign} 
        color="bg-blue-500" 
      />
      <StatCard 
        title="Net Yield Earned" 
        value="$432.12" 
        change="+12.5%" 
        icon={TrendingUp} 
        color="bg-mint" 
      />
      <StatCard 
        title="Monthly Savings Rate" 
        value="25.4%" 
        icon={PieChart} 
        color="bg-purple-500" 
      />
      <StatCard 
        title="Active Vaults" 
        value="3" 
        icon={BarChart3} 
        color="bg-orange-500" 
      />
    </div>
  )
}
