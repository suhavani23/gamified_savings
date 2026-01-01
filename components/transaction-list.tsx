"use client"

import { TrendingUp, TrendingDown, Trash2 } from "lucide-react"

interface TransactionListProps {
  transactions: any[]
  categories: any[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, categories, onDelete }: TransactionListProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

  if (transactions.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((txn) => {
        const category = categoryMap[txn.categoryId]
        const isIncome = txn.type === "income"
        const date = new Date(txn.date)

        return (
          <div
            key={txn.id}
            className="glass rounded-xl p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: category?.color + "20" || "#ffffff20" }}
              >
                {isIncome ? (
                  <TrendingUp size={20} className="text-success" />
                ) : (
                  <TrendingDown size={20} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{category?.name || "Unknown"}</p>
                <p className="text-sm text-muted-foreground">{date.toLocaleDateString()}</p>
                {txn.note && <p className="text-xs text-muted-foreground mt-1">{txn.note}</p>}
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <div className="text-right">
                <p className={`text-lg font-bold ${isIncome ? "text-success" : "text-foreground"}`}>
                  {isIncome ? "+" : "-"}${Number.parseFloat(txn.amount).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => onDelete(txn.id)}
                className="p-2 hover:bg-destructive/20 rounded-lg text-destructive transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
