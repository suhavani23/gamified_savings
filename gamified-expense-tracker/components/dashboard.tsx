"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { getTransactions, getCategories, getGoals } from "@/hooks/use-local-storage"
import BalanceCard from "./balance-card"
import QuickActions from "./quick-actions"
import ActiveGoals from "./active-goals"
import RecentTransactions from "./recent-transactions"
import AchievementSystem from "./achievement-system"
import AddTransactionModal from "./add-transaction-modal"

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [goals, setGoals] = useState([])
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const loadData = () => {
      const txns = getTransactions()
      const cats = getCategories()
      const gls = getGoals()
      setTransactions(txns)
      setCategories(cats)
      setGoals(gls)

      // Calculate balance
      const totalIncome = txns
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)
      const totalExpense = txns
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)
      setBalance(totalIncome - totalExpense)
    }

    loadData()
    // Listen for storage changes
    window.addEventListener("storage", loadData)
    return () => window.removeEventListener("storage", loadData)
  }, [])

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const monthIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)

  const monthExpense = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)

  const recentTxns = transactions.slice(-5).reverse()

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      <div className="mb-8">
        <AchievementSystem />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <BalanceCard balance={balance} income={monthIncome} expense={monthExpense} />
        </div>

        <div className="lg:col-span-2">
          <QuickActions categories={categories} onAddTransaction={() => setShowAddModal(true)} />
        </div>
      </div>

      {/* Active Goals and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveGoals goals={goals} />
        <RecentTransactions transactions={recentTxns} categories={categories} />
      </div>

      {showAddModal && (
        <AddTransactionModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            setTransactions(getTransactions())
            setBalance(
              getTransactions()
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0) -
                getTransactions()
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0),
            )
          }}
        />
      )}
    </div>
  )
}
