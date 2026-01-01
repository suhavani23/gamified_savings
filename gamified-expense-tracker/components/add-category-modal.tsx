"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AddCategoryModalProps {
  onClose: () => void
  onSuccess: (category: any) => void
}

const ICON_OPTIONS = [
  "Utensils",
  "Music",
  "ShoppingBag",
  "Plane",
  "FileText",
  "DollarSign",
  "Briefcase",
  "MoreHorizontal",
  "Home",
  "Heart",
  "Zap",
  "Gift",
  "Watch",
  "Book",
  "Coffee",
  "Car",
]

const DEFAULT_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#A8E6CF",
  "#FF8B94",
  "#95E1D3",
  "#C7CEEA",
  "#B5EAD7",
  "#FFDAC1",
  "#E2F0CB",
]

export default function AddCategoryModal({ onClose, onSuccess }: AddCategoryModalProps) {
  const [type, setType] = useState("expense")
  const [name, setName] = useState("")
  const [icon, setIcon] = useState("MoreHorizontal")
  const [color, setColor] = useState("#FF6B6B")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const newCategory = {
      id: Date.now().toString(),
      name: name.trim(),
      icon,
      color,
      type,
    }

    onSuccess(newCategory)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Category</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  type === "expense" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  type === "income" ? "bg-success text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Groceries"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-medium mb-2 block">Color</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {DEFAULT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg transition-all ${color === c ? "ring-2 ring-offset-2 ring-offset-card ring-foreground" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Buttons */}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
