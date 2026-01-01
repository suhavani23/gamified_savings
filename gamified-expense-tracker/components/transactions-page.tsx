"use client"

import { useState, useEffect } from "react"
import { Plus, Download } from "lucide-react"
import { getTransactions, getCategories } from "@/hooks/use-local-storage"
import AddTransactionModal from "./add-transaction-modal"
import TransactionFilters from "./transaction-filters"
import TransactionList from "./transaction-list"

export default function TransactionsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateFrom: null,
    dateTo: null,
  })

  useEffect(() => {
    const loadData = () => {
      const txns = getTransactions()
      const cats = getCategories()
      setTransactions(txns)
      setCategories(cats)
      applyFilters(txns, filters)
    }
    loadData()
  }, [])

  const applyFilters = (txns: any[], currentFilters: any) => {
    let filtered = txns

    if (currentFilters.type !== "all") {
      filtered = filtered.filter((t) => t.type === currentFilters.type)
    }

    if (currentFilters.category !== "all") {
      filtered = filtered.filter((t) => t.categoryId === currentFilters.category)
    }

    if (currentFilters.dateFrom) {
      filtered = filtered.filter((t) => new Date(t.date) >= new Date(currentFilters.dateFrom))
    }

    if (currentFilters.dateTo) {
      filtered = filtered.filter((t) => new Date(t.date) <= new Date(currentFilters.dateTo))
    }

    setFilteredTransactions(filtered.reverse())
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    applyFilters(transactions, newFilters)
  }

  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id)
    localStorage.setItem("transactions", JSON.stringify(updated))
    setTransactions(updated)
    applyFilters(updated, filters)
  }

  const handleExport = () => {
    const csv = [
      ["Date", "Type", "Category", "Amount", "Note"],
      ...filteredTransactions.map((t) => {
        const cat = categories.find((c) => c.id === t.categoryId)
        return [t.date, t.type, cat?.name || "Unknown", t.amount, t.note || ""]
      }),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your transactions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Download size={20} />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters categories={categories} onFilterChange={handleFilterChange} />

      {/* Transactions List */}
      <TransactionList transactions={filteredTransactions} categories={categories} onDelete={handleDeleteTransaction} />

      {/* Add Modal */}
      {showAddModal && (
        <AddTransactionModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            const updated = getTransactions()
            setTransactions(updated)
            applyFilters(updated, filters)
          }}
        />
      )}
    </div>
  )
}
