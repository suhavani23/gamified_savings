"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface ExpenseBreakdownProps {
  categoryBreakdown: Record<string, number>
  categories: any[]
}

const COLORS = ["#8B5CF6", "#06B6D4", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#6366F1"]

export default function ExpenseBreakdown({ categoryBreakdown, categories }: ExpenseBreakdownProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

  const data = Object.entries(categoryBreakdown)
    .map(([categoryId, amount]) => ({
      name: categoryMap[categoryId]?.name || "Unknown",
      value: Number(amount.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value)

  if (data.length === 0) {
    return (
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Expense Breakdown</h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">No expenses this month</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Expense Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
