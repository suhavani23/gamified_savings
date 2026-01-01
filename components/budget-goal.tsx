"use client"

import { AlertCircle, CheckCircle } from "lucide-react"

interface BudgetGoalProps {
  goal: any
  transactions: any[]
}

export default function BudgetGoal({ goal, transactions }: BudgetGoalProps) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  // Calculate spent this month for this category
  const spent = transactions
    .filter((t) => {
      const date = new Date(t.date)
      return (
        t.type === "expense" &&
        t.categoryId === goal.categoryId &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      )
    })
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)

  const progress = (spent / goal.target) * 100
  const remaining = goal.target - spent
  const isOverBudget = spent > goal.target

  let statusColor = "success"
  if (progress > 80) statusColor = "warning"
  if (isOverBudget) statusColor = "destructive"

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{goal.name}</h3>
          <p className="text-sm text-muted-foreground">Monthly Budget</p>
        </div>
        {isOverBudget ? (
          <AlertCircle size={24} className="text-destructive" />
        ) : (
          <CheckCircle size={24} className="text-success" />
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-3xl font-bold">${spent.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">spent this month</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Budget: ${goal.target.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${isOverBudget ? "text-destructive" : "text-success"}`}>
              {isOverBudget ? `Over by $${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)} left`}
            </p>
          </div>
        </div>

        <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isOverBudget ? "bg-destructive" : progress > 80 ? "bg-yellow-500" : "bg-success"
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% of budget used</p>
      </div>

      {isOverBudget && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-semibold">Budget exceeded</p>
          <p className="text-xs text-destructive/80">You've spent more than your budget for this category</p>
        </div>
      )}
    </div>
  )
}
