"use client"

import { useState, useEffect } from "react"
import { getGoals, getTransactions } from "@/hooks/use-local-storage"
import { useConfetti } from "@/hooks/use-confetti"
import AchievementBadge from "./achievement-badge"

interface Achievement {
  id: string
  type: "goal" | "streak" | "milestone"
  title: string
  description: string
  unlockedAt?: Date
}

export default function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const { triggerConfetti } = useConfetti()

  useEffect(() => {
    const checkAchievements = () => {
      const goals = getGoals()
      const transactions = getTransactions()
      const newAchievements: Achievement[] = []

      // Check for completed goals
      goals.forEach((goal) => {
        if (goal.current >= goal.target && !achievements.find((a) => a.id === `goal-${goal.id}`)) {
          newAchievements.push({
            id: `goal-${goal.id}`,
            type: "goal",
            title: "Goal Achieved!",
            description: `You completed "${goal.name}"`,
            unlockedAt: new Date(),
          })
          triggerConfetti()
        }
      })

      // Check for streaks
      goals.forEach((goal) => {
        const streaks = [7, 14, 30, 60, 90, 365]
        streaks.forEach((streak) => {
          if (goal.streak >= streak && !achievements.find((a) => a.id === `streak-${goal.id}-${streak}`)) {
            newAchievements.push({
              id: `streak-${goal.id}-${streak}`,
              type: "streak",
              title: `${streak} Day Streak!`,
              description: `Keep contributing to "${goal.name}" for ${streak} consecutive days`,
              unlockedAt: new Date(),
            })
            triggerConfetti()
          }
        })
      })

      // Check for milestones
      const milestones = [10, 50, 100, 500, 1000]
      milestones.forEach((milestone) => {
        if (transactions.length >= milestone && !achievements.find((a) => a.id === `milestone-${milestone}`)) {
          newAchievements.push({
            id: `milestone-${milestone}`,
            type: "milestone",
            title: `${milestone} Transactions!`,
            description: `You've tracked ${milestone} transactions`,
            unlockedAt: new Date(),
          })
          triggerConfetti()
        }
      })

      if (newAchievements.length > 0) {
        const allAchievements = [...achievements, ...newAchievements]
        setAchievements(allAchievements)
        localStorage.setItem("achievements", JSON.stringify(allAchievements))
      }
    }

    // Load existing achievements
    const saved = localStorage.getItem("achievements")
    if (saved) {
      setAchievements(JSON.parse(saved))
    }

    checkAchievements()
  }, [])

  if (achievements.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {achievements
        .sort((a, b) => {
          const aDate = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0
          const bDate = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0
          return bDate - aDate
        })
        .slice(0, 3)
        .map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            type={achievement.type}
            title={achievement.title}
            description={achievement.description}
          />
        ))}
    </div>
  )
}
