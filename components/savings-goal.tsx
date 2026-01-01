"use client"

import { Zap, TrendingUp } from "lucide-react"

interface SavingsGoalProps {
  goal: any
  onContribute: (amount: number) => void
}

export default function SavingsGoal({ goal, onContribute }: SavingsGoalProps) {
  const progress = (goal.current / goal.target) * 100
  const remaining = goal.target - goal.current
  const streakDays = goal.streak || 0

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{goal.name}</h3>
          <p className="text-sm text-muted-foreground">Savings Goal</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-lg">
          <Zap size={16} className="text-primary" />
          <span className="text-sm font-semibold text-primary">{streakDays} days</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-3xl font-bold">${goal.current.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">of ${goal.target.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${remaining.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">remaining</p>
          </div>
        </div>

        <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
      </div>

      {progress < 100 && (
        <div className="flex gap-2">
          <button
            onClick={() => onContribute(10)}
            className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
          >
            +$10
          </button>
          <button
            onClick={() => onContribute(25)}
            className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
          >
            +$25
          </button>
          <button
            onClick={() => onContribute(50)}
            className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            +$50
          </button>
        </div>
      )}

      {progress >= 100 && (
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
          <TrendingUp size={20} className="text-success" />
          <div>
            <p className="font-semibold text-success">Goal Achieved!</p>
            <p className="text-sm text-success/80">Congratulations on reaching your target!</p>
          </div>
        </div>
      )}
    </div>
  )
}
