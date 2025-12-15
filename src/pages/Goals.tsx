import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Plus, Trophy, Target, Flame, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const badges = [
  { id: 1, emoji: "🌟", name: "First Step", desc: "Complete your first goal", earned: true },
  { id: 2, emoji: "🔥", name: "On Fire", desc: "7-day streak", earned: true },
  { id: 3, emoji: "🧘", name: "Zen Master", desc: "10 meditation sessions", earned: true },
  { id: 4, emoji: "📝", name: "Storyteller", desc: "Write 30 journal entries", earned: false },
  { id: 5, emoji: "💪", name: "Resilient", desc: "Complete all weekly goals", earned: false },
  { id: 6, emoji: "🌈", name: "Positivity Pro", desc: "Log positive mood 14 days", earned: false },
];

const initialGoals = [
  { id: 1, title: "Meditate daily", progress: 70, target: 7, current: 5, category: "mindfulness" },
  { id: 2, title: "Journal 3x per week", progress: 66, target: 3, current: 2, category: "journaling" },
  { id: 3, title: "Log mood every day", progress: 100, target: 7, current: 7, category: "tracking" },
  { id: 4, title: "Practice gratitude", progress: 40, target: 5, current: 2, category: "mindfulness" },
];

const weeklyChallenge = {
  title: "Mindfulness Week",
  description: "Complete 5 meditation sessions this week",
  progress: 60,
  reward: "🏆 Gold Badge",
  daysLeft: 3,
};

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([
      ...goals,
      {
        id: Date.now(),
        title: newGoal,
        progress: 0,
        target: 7,
        current: 0,
        category: "custom",
      },
    ]);
    setNewGoal("");
    toast.success("Goal added!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-12 lg:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mental Health Goals</h1>
          <p className="text-muted-foreground mt-1">Track your progress and earn badges</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
          <Flame className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">12 Day Streak</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Goals Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Challenge */}
          <div
            className="rounded-2xl p-6 text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5" />
                  <span className="text-sm font-medium opacity-90">Weekly Challenge</span>
                </div>
                <h3 className="text-xl font-bold">{weeklyChallenge.title}</h3>
                <p className="text-sm opacity-80 mt-1">{weeklyChallenge.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl">{weeklyChallenge.reward.split(" ")[0]}</span>
                <p className="text-xs opacity-80 mt-1">{weeklyChallenge.daysLeft} days left</p>
              </div>
            </div>
            <div className="bg-primary-foreground/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary-foreground h-full rounded-full transition-all"
                style={{ width: `${weeklyChallenge.progress}%` }}
              />
            </div>
            <p className="text-sm mt-2 opacity-90">{weeklyChallenge.progress}% complete</p>
          </div>

          {/* Add New Goal */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="font-semibold text-card-foreground mb-4">Add New Goal</h3>
            <div className="flex gap-3">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter your goal..."
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
              />
              <Button onClick={addGoal}>
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Active Goals */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 className="font-semibold text-card-foreground mb-4">Active Goals</h3>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="font-medium text-card-foreground">{goal.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  {goal.progress === 100 && (
                    <p className="text-xs text-accent mt-2 flex items-center gap-1">
                      <Star className="h-3 w-3" /> Goal completed!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-5 w-5 text-chart-4" />
            <h3 className="font-semibold text-card-foreground">Achievement Badges</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "p-4 rounded-xl text-center transition-all",
                  badge.earned
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/50 opacity-50"
                )}
              >
                <span className="text-3xl block mb-2">{badge.emoji}</span>
                <p className="text-sm font-medium text-card-foreground">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
