"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getTransactions, getCategories } from "@/hooks/use-local-storage"
import ExpenseBreakdown from "./expense-breakdown"
import IncomeExpenseComparison from "./income-expense-comparison"
import CategoryExpenseList from "./category-expense-list"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function Analytics() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadData = () => {
      setTransactions(getTransactions())
      setCategories(getCategories())
    }
    loadData()
  }, [])

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

  const categoryBreakdown = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const categoryId = t.categoryId
      const amount = Number.parseFloat(t.amount)
      acc[categoryId] = (acc[categoryId] || 0) + amount
      return acc
    }, {})

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Monthly Analytics</h1>

        {/* Month Selector */}
        <div className="flex items-center gap-4 glass rounded-lg p-4 w-fit">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-muted rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <div className="text-lg font-semibold min-w-48 text-center">
            {months[currentMonth]} {currentYear}
          </div>
          <button onClick={handleNextMonth} className="p-1 hover:bg-muted rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income vs Expenses */}
        <IncomeExpenseComparison income={monthIncome} expense={monthExpense} />

        {/* Expense Breakdown Chart */}
        <ExpenseBreakdown categoryBreakdown={categoryBreakdown} categories={categories} />
      </div>

      {/* Category List */}
      <CategoryExpenseList categoryBreakdown={categoryBreakdown} categories={categories} monthTotal={monthExpense} />
    </div>
  )
}
