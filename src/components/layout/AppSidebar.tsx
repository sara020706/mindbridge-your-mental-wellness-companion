import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Heart,
  BookOpen,
  MessageCircle,
  Sparkles,
  Target,
  Users,
  BarChart3,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Heart, label: "Mood Tracker", path: "/mood" },
  { icon: BookOpen, label: "Journal", path: "/journal" },
  { icon: MessageCircle, label: "AI Assistant", path: "/assistant" },
  { icon: Sparkles, label: "Meditation", path: "/meditation" },
  { icon: Target, label: "Goals", path: "/goals" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface AppSidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function AppSidebar({ darkMode, setDarkMode }: AppSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
              🌉
            </div>
            <div>
              <h1 className="font-semibold text-lg text-sidebar-foreground">MindBridge</h1>
              <p className="text-xs text-primary">Your Mental Wellness Companion</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Dark mode toggle */}
          <div className="pt-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
