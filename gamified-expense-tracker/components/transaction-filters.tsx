"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

interface TransactionFiltersProps {
  categories: any[]
  onFilterChange: (filters: any) => void
}

export default function TransactionFilters({ categories, onFilterChange }: TransactionFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange({
      ...newFilters,
      dateFrom: newFilters.dateFrom || null,
      dateTo: newFilters.dateTo || null,
    })
  }

  const handleReset = () => {
    const resetFilters = {
      type: "all",
      category: "all",
      dateFrom: "",
      dateTo: "",
    }
    setFilters(resetFilters)
    onFilterChange({
      type: "all",
      category: "all",
      dateFrom: null,
      dateTo: null,
    })
  }

  const isFiltered = filters.type !== "all" || filters.category !== "all" || filters.dateFrom || filters.dateTo

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          showFilters ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        <Filter size={18} />
        Filters {isFiltered && <span className="ml-1 text-xs">(Active)</span>}
      </button>

      {showFilters && (
        <div className="glass rounded-2xl p-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="text-sm font-medium mb-2 block">From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="text-sm font-medium mb-2 block">To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
          </div>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <X size={18} />
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
