"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

interface RecentTransactionsProps {
  transactions: any[]
  categories: any[]
}

export default function RecentTransactions({ transactions, categories }: RecentTransactionsProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((txn) => {
            const category = categoryMap[txn.categoryId]
            const isIncome = txn.type === "income"

            return (
              <div key={txn.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category?.color + "20" || "#ffffff20" }}
                  >
                    {isIncome ? (
                      <TrendingUp size={18} className="text-success" />
                    ) : (
                      <TrendingDown size={18} className="text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{category?.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-semibold ${isIncome ? "text-success" : "text-foreground"}`}>
                  {isIncome ? "+" : "-"}${Number.parseFloat(txn.amount).toFixed(2)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
