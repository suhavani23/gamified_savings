"use client"

import { Edit2, Trash2 } from "lucide-react"

interface CategoryCardProps {
  category: any
  onEdit: () => void
  onDelete: () => void
  isDefault: boolean
}

export default function CategoryCard({ category, onEdit, onDelete, isDefault }: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: category.color + "20" }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: category.color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{category.name}</p>
          <p className="text-xs text-muted-foreground">{category.type === "expense" ? "Expense" : "Income"}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
        >
          <Edit2 size={16} />
          Edit
        </button>
        {!isDefault && (
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
