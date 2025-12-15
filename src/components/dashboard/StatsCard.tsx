import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: "primary" | "secondary" | "accent" | "warning";
}

const colorStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-chart-4/10 text-chart-4",
};

export function StatsCard({ icon: Icon, label, value, trend, color = "primary" }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", colorStyles[color])}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-card-foreground">{value}</span>
        {trend && <span className="text-xs text-accent font-medium">{trend}</span>}
      </div>
    </div>
  );
}
