"use client"

import type React from "react"

import { Trophy, Flame } from "lucide-react"

interface AchievementBadgeProps {
  type: "goal" | "streak" | "milestone"
  title: string
  description: string
  icon?: React.ReactNode
}

export default function AchievementBadge({ type, title, description, icon }: AchievementBadgeProps) {
  const colors = {
    goal: "from-yellow-500 to-orange-500",
    streak: "from-red-500 to-pink-500",
    milestone: "from-purple-500 to-blue-500",
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${colors[type]} shadow-lg`}>
      <div className="absolute inset-0 opacity-10 bg-pattern" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex-shrink-0">{icon || (type === "streak" ? <Flame size={40} /> : <Trophy size={40} />)}</div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}
