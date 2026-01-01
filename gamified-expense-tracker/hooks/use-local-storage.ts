"use client"

import { useEffect } from "react"

export const useLocalStorage = () => {
  useEffect(() => {
    // Initialize default data if not exists
    const initializeData = () => {
      if (!localStorage.getItem("transactions")) {
        localStorage.setItem("transactions", JSON.stringify([]))
      }
      if (!localStorage.getItem("categories")) {
        const defaultCategories = [
          { id: "1", name: "Food & Drink", icon: "Utensils", color: "#FF6B6B", type: "expense" },
          { id: "2", name: "Entertainment", icon: "Music", color: "#4ECDC4", type: "expense" },
          { id: "3", name: "Clothes & Shoes", icon: "ShoppingBag", color: "#FFD93D", type: "expense" },
          { id: "4", name: "Travel", icon: "Plane", color: "#A8E6CF", type: "expense" },
          { id: "5", name: "Bills", icon: "FileText", color: "#FF8B94", type: "expense" },
          { id: "6", name: "Salary", icon: "DollarSign", color: "#95E1D3", type: "income" },
          { id: "7", name: "Freelance", icon: "Briefcase", color: "#C7CEEA", type: "income" },
          { id: "8", name: "Other", icon: "MoreHorizontal", color: "#B5EAD7", type: "expense" },
        ]
        localStorage.setItem("categories", JSON.stringify(defaultCategories))
      }
      if (!localStorage.getItem("goals")) {
        localStorage.setItem("goals", JSON.stringify([]))
      }
      if (!localStorage.getItem("userBalance")) {
        localStorage.setItem("userBalance", JSON.stringify({ total: 0, lastUpdated: new Date().toISOString() }))
      }
    }

    initializeData()
  }, [])

  return null
}

export const getTransactions = () => {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("transactions") || "[]")
}

export const saveTransaction = (transaction: any) => {
  if (typeof window === "undefined") return
  const transactions = getTransactions()
  transactions.push(transaction)
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

export const getCategories = () => {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("categories") || "[]")
}

export const saveCategory = (category: any) => {
  if (typeof window === "undefined") return
  const categories = getCategories()
  categories.push(category)
  localStorage.setItem("categories", JSON.stringify(categories))
}

export const getGoals = () => {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("goals") || "[]")
}

export const saveGoal = (goal: any) => {
  if (typeof window === "undefined") return
  const goals = getGoals()
  goals.push(goal)
  localStorage.setItem("goals", JSON.stringify(goals))
}

export const updateGoal = (goalId: string, updates: any) => {
  if (typeof window === "undefined") return
  const goals = getGoals()
  const index = goals.findIndex((g) => g.id === goalId)
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updates }
    localStorage.setItem("goals", JSON.stringify(goals))
  }
}
