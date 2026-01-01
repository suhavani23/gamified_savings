"use client"

interface CategoryExpenseListProps {
  categoryBreakdown: Record<string, number>
  categories: any[]
  monthTotal: number
}

export default function CategoryExpenseList({ categoryBreakdown, categories, monthTotal }: CategoryExpenseListProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

  const categoryList = Object.entries(categoryBreakdown)
    .map(([categoryId, amount]) => ({
      id: categoryId,
      name: categoryMap[categoryId]?.name || "Unknown",
      color: categoryMap[categoryId]?.color || "#888888",
      amount: Number(amount),
      percentage: monthTotal > 0 ? ((Number(amount) / monthTotal) * 100).toFixed(1) : "0",
      count: 0, // Can be enhanced to count transactions
    }))
    .sort((a, b) => b.amount - a.amount)

  if (categoryList.length === 0) {
    return null
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Category Breakdown</h2>
      <div className="space-y-3">
        {categoryList.map((category) => (
          <div key={category.id} className="bg-muted/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                <div>
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${category.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{category.percentage}%</p>
              </div>
            </div>

            <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  backgroundColor: category.color,
                  width: `${category.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
