import { Flame, Award, TrendingUp, Activity } from "lucide-react";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MoodChart } from "@/components/dashboard/MoodChart";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-12 lg:pt-0">
      <WelcomeCard />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Flame} label="Current Streak" value="12 days" color="primary" />
        <StatsCard icon={Award} label="Badges Earned" value={8} color="secondary" />
        <StatsCard icon={TrendingUp} label="Mood Trend" value="+15%" trend="↑" color="accent" />
        <StatsCard icon={Activity} label="Activities" value={24} color="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoodChart />
        </div>
        <NotificationsCard />
      </div>
    </div>
  );
}
