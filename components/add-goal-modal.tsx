"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { getCategories } from "@/hooks/use-local-storage"

interface AddGoalModalProps {
  onClose: () => void
  onSuccess: (goal: any) => void
}

export default function AddGoalModal({ onClose, onSuccess }: AddGoalModalProps) {
  const [goalType, setGoalType] = useState("savings")
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const categories = getCategories().filter((c) => c.type === "expense")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !target) return

    const newGoal = {
      id: Date.now().toString(),
      type: goalType,
      name,
      target: Number.parseFloat(target),
      current: 0,
      categoryId: goalType === "budget" ? categoryId : null,
      streak: 0,
      lastContributionDate: null,
      completed: false,
    }

    onSuccess(newGoal)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Goal</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Goal Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setGoalType("savings")
                  setCategoryId("")
                }}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  goalType === "savings" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Savings
              </button>
              <button
                type="button"
                onClick={() => setGoalType("budget")}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  goalType === "budget" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Budget
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-2 block">Goal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Save for vacation"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="text-sm font-medium mb-2 block">Target Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          {/* Category (Budget only) */}
          {goalType === "budget" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
