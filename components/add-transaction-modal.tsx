"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { saveTransaction } from "@/hooks/use-local-storage"

interface AddTransactionModalProps {
  categories: any[]
  onClose: () => void
  onSuccess: () => void
}

export default function AddTransactionModal({ categories, onClose, onSuccess }: AddTransactionModalProps) {
  const [type, setType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [note, setNote] = useState("")

  const filteredCategories = categories.filter((c) => c.type === type)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount || !categoryId) return

    const transaction = {
      id: Date.now().toString(),
      type,
      amount: Number.parseFloat(amount),
      categoryId,
      date,
      note,
    }

    saveTransaction(transaction)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Transaction</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType("expense")
                setCategoryId("")
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                type === "expense" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => {
                setType("income")
                setCategoryId("")
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                type === "income" ? "bg-success text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              Income
            </button>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="">Select a category</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              rows={3}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
