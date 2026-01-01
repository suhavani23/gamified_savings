"use client"

import { useState, useEffect } from "react"
import { Plus, Target, TrendingDown } from "lucide-react"
import { getGoals, saveGoal, updateGoal, getTransactions } from "@/hooks/use-local-storage"
import SavingsGoal from "./savings-goal"
import BudgetGoal from "./budget-goal"
import AddGoalModal from "./add-goal-modal"

export default function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [activeTab, setActiveTab] = useState("savings")

  useEffect(() => {
    const loadData = () => {
      setGoals(getGoals())
      setTransactions(getTransactions())
    }
    loadData()
  }, [])

  const savingsGoals = goals.filter((g) => g.type === "savings")
  const budgetGoals = goals.filter((g) => g.type === "budget")

  const handleAddGoal = (newGoal) => {
    saveGoal(newGoal)
    setGoals(getGoals())
    setShowAddModal(false)
  }

  const handleContributeToGoal = (goalId: string, amount: number) => {
    const goal = goals.find((g) => g.id === goalId)
    if (goal) {
      const today = new Date().toDateString()
      const lastContributionDate = goal.lastContributionDate ? new Date(goal.lastContributionDate).toDateString() : null

      let newStreak = goal.streak || 0
      if (lastContributionDate !== today) {
        // Check if contribution was yesterday
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        if (lastContributionDate === yesterday.toDateString()) {
          newStreak += 1
        } else if (lastContributionDate !== today) {
          newStreak = 1
        }
      }

      updateGoal(goalId, {
        current: Math.min(goal.current + amount, goal.target),
        streak: newStreak,
        lastContributionDate: new Date().toISOString(),
      })
      setGoals(getGoals())
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Goals & Budgets</h1>
          <p className="text-muted-foreground">Set targets and track your financial progress</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("savings")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "savings" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <Target size={18} />
          Savings Goals ({savingsGoals.length})
        </button>
        <button
          onClick={() => setActiveTab("budget")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "budget" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <TrendingDown size={18} />
          Budget Limits ({budgetGoals.length})
        </button>
      </div>

      {/* Savings Goals */}
      {activeTab === "savings" && (
        <div className="space-y-4">
          {savingsGoals.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <Target size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No savings goals yet. Create one to get started!</p>
            </div>
          ) : (
            savingsGoals.map((goal) => (
              <SavingsGoal
                key={goal.id}
                goal={goal}
                onContribute={(amount) => handleContributeToGoal(goal.id, amount)}
              />
            ))
          )}
        </div>
      )}

      {/* Budget Goals */}
      {activeTab === "budget" && (
        <div className="space-y-4">
          {budgetGoals.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <TrendingDown size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No budget limits yet. Create one to get started!</p>
            </div>
          ) : (
            budgetGoals.map((goal) => <BudgetGoal key={goal.id} goal={goal} transactions={transactions} />)
          )}
        </div>
      )}

      {showAddModal && (
        <AddGoalModal onClose={() => setShowAddModal(false)} onSuccess={(newGoal) => handleAddGoal(newGoal)} />
      )}
    </div>
  )
}
