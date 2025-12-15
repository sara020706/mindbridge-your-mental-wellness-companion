import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockData = [
  { day: "Mon", mood: 7, energy: 6 },
  { day: "Tue", mood: 6, energy: 5 },
  { day: "Wed", mood: 8, energy: 7 },
  { day: "Thu", mood: 7, energy: 8 },
  { day: "Fri", mood: 9, energy: 8 },
  { day: "Sat", mood: 8, energy: 7 },
  { day: "Sun", mood: 9, energy: 9 },
];

export function MoodChart() {
  const [period, setPeriod] = useState("7days");

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Emotional Trends</h3>
          <p className="text-sm text-muted-foreground">Your mood and energy levels this week</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="14days">Last 14 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="hsl(262, 83%, 58%)"
              strokeWidth={2}
              fill="url(#moodGradient)"
              name="Mood"
            />
            <Area
              type="monotone"
              dataKey="energy"
              stroke="hsl(170, 60%, 45%)"
              strokeWidth={2}
              fill="url(#energyGradient)"
              name="Energy"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Mood</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Energy</span>
        </div>
      </div>
    </div>
  );
}
