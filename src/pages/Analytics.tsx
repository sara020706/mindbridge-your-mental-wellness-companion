import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar, TrendingUp, Brain, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const moodData = [
  { week: "Week 1", avg: 6.2, entries: 7 },
  { week: "Week 2", avg: 6.8, entries: 7 },
  { week: "Week 3", avg: 7.1, entries: 6 },
  { week: "Week 4", avg: 7.5, entries: 7 },
];

const emotionDistribution = [
  { name: "Happy", value: 35, color: "hsl(45, 90%, 55%)" },
  { name: "Calm", value: 25, color: "hsl(170, 60%, 45%)" },
  { name: "Anxious", value: 15, color: "hsl(262, 83%, 58%)" },
  { name: "Stressed", value: 15, color: "hsl(0, 84%, 60%)" },
  { name: "Other", value: 10, color: "hsl(280, 60%, 55%)" },
];

const activityData = [
  { name: "Mon", meditation: 15, journaling: 10, mood: 3 },
  { name: "Tue", meditation: 20, journaling: 15, mood: 4 },
  { name: "Wed", meditation: 10, journaling: 20, mood: 2 },
  { name: "Thu", meditation: 25, journaling: 10, mood: 5 },
  { name: "Fri", meditation: 30, journaling: 25, mood: 4 },
  { name: "Sat", meditation: 20, journaling: 15, mood: 3 },
  { name: "Sun", meditation: 25, journaling: 20, mood: 5 },
];

const insights = [
  { icon: TrendingUp, title: "Mood improving", desc: "+15% over last month", color: "text-accent" },
  { icon: Brain, title: "Best time", desc: "You feel best in the morning", color: "text-primary" },
  { icon: Activity, title: "Triggers", desc: "Work stress most common", color: "text-destructive" },
  { icon: Calendar, title: "Consistency", desc: "12 day logging streak!", color: "text-chart-4" },
];

export default function Analytics() {
  const [period, setPeriod] = useState("month");

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-12 lg:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Insights into your mental wellness journey</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, i) => (
          <div key={i} className="bg-card rounded-xl p-5 shadow-sm border border-border">
            <insight.icon className={`h-6 w-6 ${insight.color} mb-3`} />
            <p className="font-semibold text-card-foreground">{insight.title}</p>
            <p className="text-sm text-muted-foreground">{insight.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood Trend */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Mood Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="hsl(262, 83%, 58%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(262, 83%, 58%)", strokeWidth: 2 }}
                  name="Average Mood"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emotion Distribution */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Emotion Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emotionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border lg:col-span-2">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Weekly Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="meditation" fill="hsl(262, 83%, 58%)" name="Meditation (min)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="journaling" fill="hsl(170, 60%, 45%)" name="Journaling (min)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
