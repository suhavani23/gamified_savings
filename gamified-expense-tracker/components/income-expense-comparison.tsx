"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface IncomeExpenseComparisonProps {
  income: number
  expense: number
}

export default function IncomeExpenseComparison({ income, expense }: IncomeExpenseComparisonProps) {
  const data = [
    {
      name: "This Month",
      Income: income,
      Expenses: expense,
    },
  ]

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Income vs Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
            formatter={(value) => `$${Number(value).toFixed(2)}`}
          />
          <Legend />
          <Bar dataKey="Income" fill="#10B981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Expenses" fill="#EF4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
