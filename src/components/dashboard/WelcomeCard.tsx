import { Smile, BookOpen, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { icon: Smile, label: "Log Mood", path: "/mood", emoji: "😊" },
  { icon: BookOpen, label: "Write Journal", path: "/journal", emoji: "📝" },
  { icon: Sparkles, label: "Meditate", path: "/meditation", emoji: "🧘" },
  { icon: MessageCircle, label: "Chat", path: "/assistant", emoji: "💬" },
];

export function WelcomeCard({ userName = "Alex" }: { userName?: string }) {
  return (
    <div className="rounded-2xl p-6 lg:p-8 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
      <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {userName}!</h2>
      <p className="opacity-90 mb-6">How are you feeling today?</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="bg-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/30 transition-all rounded-xl p-4 flex flex-col items-center gap-2 text-center group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{action.emoji}</span>
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
