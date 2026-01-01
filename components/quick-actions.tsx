"use client"

import { Utensils, Music, ShoppingBag, Plane } from "lucide-react"

const ICON_MAP = {
  Utensils,
  Music,
  ShoppingBag,
  Plane,
}

interface QuickActionsProps {
  categories: any[]
  onAddTransaction: () => void
}

export default function QuickActions({ categories, onAddTransaction }: QuickActionsProps) {
  const expenseCategories = categories.filter((c) => c.type === "expense").slice(0, 4)

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-muted-foreground mb-4">Quick Add</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {expenseCategories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Music
          return (
            <button
              key={cat.id}
              onClick={onAddTransaction}
              className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center gap-2"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: cat.color + "20" }}
              >
                <IconComponent size={18} style={{ color: cat.color }} />
              </div>
              <span className="text-xs font-medium text-center">{cat.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
