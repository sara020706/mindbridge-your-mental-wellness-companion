import { Bell, Clock } from "lucide-react";

const notifications = [
  { id: 1, message: "Time for your evening meditation", time: "2h ago", icon: "🧘" },
  { id: 2, message: "Great job! You've logged 7 days in a row", time: "5h ago", icon: "🎉" },
  { id: 3, message: "New community post needs your support", time: "1d ago", icon: "💬" },
];

export function NotificationsCard() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-card-foreground">Notifications</h3>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{notification.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
