"use client"

interface ActiveGoalsProps {
  goals: any[]
}

export default function ActiveGoals({ goals }: ActiveGoalsProps) {
  const activeGoals = goals.filter((g) => !g.completed).slice(0, 3)

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Active Goals</h2>
      {activeGoals.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No active goals yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            const streakDays = goal.streak || 0

            return (
              <div key={goal.id} className="bg-muted/30 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{goal.name}</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{streakDays} day streak</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  ${goal.current.toFixed(2)} of ${goal.target.toFixed(2)}
                </p>
                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
