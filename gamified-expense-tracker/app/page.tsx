"use client"

import { useState, useEffect } from "react"
import { Home, BarChart3, Target, Settings, List } from "lucide-react"
import Dashboard from "@/components/dashboard"
import Analytics from "@/components/analytics"
import GoalsPage from "@/components/goals-page"
import TransactionsPage from "@/components/transactions-page"
import SettingsPage from "@/components/settings"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize localStorage
  useLocalStorage()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 bg-card border-r border-border flex flex-col items-center md:items-start p-4 md:p-6 gap-2">
        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-4 hidden md:block">
          ExpenseFlow
        </div>
        <div className="w-full flex flex-col gap-2">
          <NavButton
            icon={<Home size={20} />}
            label="Dashboard"
            active={currentPage === "dashboard"}
            onClick={() => setCurrentPage("dashboard")}
          />
          <NavButton
            icon={<List size={20} />}
            label="Transactions"
            active={currentPage === "transactions"}
            onClick={() => setCurrentPage("transactions")}
          />
          <NavButton
            icon={<BarChart3 size={20} />}
            label="Analytics"
            active={currentPage === "analytics"}
            onClick={() => setCurrentPage("analytics")}
          />
          <NavButton
            icon={<Target size={20} />}
            label="Goals"
            active={currentPage === "goals"}
            onClick={() => setCurrentPage("goals")}
          />
          <NavButton
            icon={<Settings size={20} />}
            label="Settings"
            active={currentPage === "settings"}
            onClick={() => setCurrentPage("settings")}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "transactions" && <TransactionsPage />}
        {currentPage === "analytics" && <Analytics />}
        {currentPage === "goals" && <GoalsPage />}
        {currentPage === "settings" && <SettingsPage />}
      </main>
    </div>
  )
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg transition-colors ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="hidden md:inline text-sm font-medium">{label}</span>
    </button>
  )
}
