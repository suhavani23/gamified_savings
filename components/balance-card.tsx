"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

interface BalanceCardProps {
  balance: number
  income: number
  expense: number
}

export default function BalanceCard({ balance, income, expense }: BalanceCardProps) {
  return (
    <div className="glass rounded-2xl p-6 h-full">
      <h2 className="text-sm font-semibold text-muted-foreground mb-4">Total Balance</h2>
      <div className="mb-6">
        <div className="text-4xl font-bold mb-2">${balance.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">This month</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <span className="font-semibold text-success">${income.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
              <TrendingDown size={16} className="text-destructive" />
            </div>
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
          <span className="font-semibold text-destructive">${expense.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
