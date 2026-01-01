"use client"

import { useState, useEffect } from "react"
import { Plus, Save, X } from "lucide-react"
import { getCategories, saveCategory } from "@/hooks/use-local-storage"
import CategoryCard from "./category-card"
import AddCategoryModal from "./add-category-modal"

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

export default function SettingsPage() {
  const [categories, setCategories] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({})

  useEffect(() => {
    const loadData = () => {
      setCategories(getCategories())
    }
    loadData()
  }, [])

  const handleAddCategory = (newCategory) => {
    saveCategory(newCategory)
    setCategories(getCategories())
    setShowAddModal(false)
  }

  const handleUpdateCategory = (categoryId: string) => {
    if (!editValues[categoryId]) return

    const updated = categories.map((cat) => (cat.id === categoryId ? { ...cat, ...editValues[categoryId] } : cat))
    localStorage.setItem("categories", JSON.stringify(updated))
    setCategories(updated)
    setEditingId(null)
    setEditValues({})
  }

  const handleDeleteCategory = (categoryId: string) => {
    const isDefaultCategory = ["1", "2", "3", "4", "5", "6", "7", "8"].includes(categoryId)
    if (isDefaultCategory) {
      alert("Cannot delete default categories")
      return
    }

    const updated = categories.filter((cat) => cat.id !== categoryId)
    localStorage.setItem("categories", JSON.stringify(updated))
    setCategories(updated)
  }

  const expenseCategories = categories.filter((c) => c.type === "expense")
  const incomeCategories = categories.filter((c) => c.type === "income")

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage categories and preferences</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Sections */}
      <div className="space-y-8">
        {/* Expense Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Expense Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenseCategories.map((category) => (
              <div key={category.id} className="glass rounded-xl p-4">
                {editingId === category.id ? (
                  <EditCategoryForm
                    category={category}
                    editValues={editValues[category.id] || category}
                    onEdit={(key, value) => {
                      setEditValues({
                        ...editValues,
                        [category.id]: {
                          ...editValues[category.id],
                          [key]: value,
                        },
                      })
                    }}
                    onSave={() => handleUpdateCategory(category.id)}
                    onCancel={() => {
                      setEditingId(null)
                      setEditValues({})
                    }}
                  />
                ) : (
                  <CategoryCard
                    category={category}
                    onEdit={() => {
                      setEditingId(category.id)
                      setEditValues({ [category.id]: category })
                    }}
                    onDelete={() => handleDeleteCategory(category.id)}
                    isDefault={["1", "2", "3", "4", "5", "6", "7", "8"].includes(category.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Income Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Income Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomeCategories.map((category) => (
              <div key={category.id} className="glass rounded-xl p-4">
                {editingId === category.id ? (
                  <EditCategoryForm
                    category={category}
                    editValues={editValues[category.id] || category}
                    onEdit={(key, value) => {
                      setEditValues({
                        ...editValues,
                        [category.id]: {
                          ...editValues[category.id],
                          [key]: value,
                        },
                      })
                    }}
                    onSave={() => handleUpdateCategory(category.id)}
                    onCancel={() => {
                      setEditingId(null)
                      setEditValues({})
                    }}
                  />
                ) : (
                  <CategoryCard
                    category={category}
                    onEdit={() => {
                      setEditingId(category.id)
                      setEditValues({ [category.id]: category })
                    }}
                    onDelete={() => handleDeleteCategory(category.id)}
                    isDefault={["6", "7"].includes(category.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={(newCategory) => handleAddCategory(newCategory)}
        />
      )}
    </div>
  )
}

function EditCategoryForm({
  category,
  editValues,
  onEdit,
  onSave,
  onCancel,
}: {
  category: any
  editValues: any
  onEdit: (key: string, value: any) => void
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={editValues.name || ""}
        onChange={(e) => onEdit("name", e.target.value)}
        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
        placeholder="Category name"
      />

      <input
        type="color"
        value={editValues.color || "#888888"}
        onChange={(e) => onEdit("color", e.target.value)}
        className="w-full h-10 rounded-lg cursor-pointer"
      />

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-success text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Save size={16} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  )
}
