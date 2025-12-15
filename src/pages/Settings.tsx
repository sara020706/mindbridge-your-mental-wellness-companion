import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Bell,
  Palette,
  Shield,
  Database,
  Link,
  Download,
  Cloud,
  Trash2,
  Calendar,
  BarChart3,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    displayName: "Alex M.",
    email: "alex@example.com",
    moodReminders: true,
    meditationReminders: true,
    communityReplies: true,
    achievementAlerts: true,
    reminderTime: "09:00",
    darkMode: false,
    colorScheme: "purple",
    fontSize: "medium",
    anonymousPosts: true,
    twoFactor: false,
    biometric: false,
    encryption: true,
    autoBackup: true,
    offlineMode: true,
    appleHealth: false,
    googleFit: false,
    fitbit: false,
    spotify: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-12 lg:pt-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings & Preferences</h1>
        <p className="text-muted-foreground mt-1">Customize your MindBridge experience</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Profile Settings</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={settings.displayName}
              onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "moodReminders", label: "Daily Mood Reminders" },
            { key: "meditationReminders", label: "Meditation Reminders" },
            { key: "communityReplies", label: "Community Replies" },
            { key: "achievementAlerts", label: "Achievement Alerts" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <Label htmlFor={item.key}>{item.label}</Label>
              <Switch
                id={item.key}
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
              />
            </div>
          ))}
          <div className="pt-4 border-t border-border">
            <Label htmlFor="reminderTime">Reminder Time</Label>
            <Input
              id="reminderTime"
              type="time"
              value={settings.reminderTime}
              onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
              className="mt-1.5 w-40"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Appearance</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="colorScheme">Color Scheme</Label>
              <Select
                value={settings.colorScheme}
                onValueChange={(value) => setSettings({ ...settings, colorScheme: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Privacy & Security</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "twoFactor", label: "Two-Factor Authentication", icon: Lock },
            { key: "biometric", label: "Biometric Login", icon: User },
            { key: "encryption", label: "Data Encryption", icon: Shield },
            { key: "anonymousPosts", label: "Anonymous Community Posts", icon: User },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <Label htmlFor={item.key}>{item.label}</Label>
              <Switch
                id={item.key}
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Data & Storage */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Data & Storage</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Auto Backup</Label>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Offline Mode</Label>
            <Switch
              checked={settings.offlineMode}
              onCheckedChange={(checked) => setSettings({ ...settings, offlineMode: checked })}
            />
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Storage Used</span>
            <span className="font-medium">245 MB</span>
          </div>
          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="font-medium text-card-foreground">Data Management</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="gap-2">
                <Cloud className="h-4 w-4" />
                Backup Now
              </Button>
              <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Link className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Integrations</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: "appleHealth", label: "Apple Health" },
            { key: "googleFit", label: "Google Fit" },
            { key: "fitbit", label: "Fitbit" },
            { key: "spotify", label: "Spotify" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor={item.key}>{item.label}</Label>
              <Switch
                id={item.key}
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Offline Mode Banner */}
      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Cloud className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Offline Mode Enabled</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your data is synced locally and will automatically backup when you're online. All core
              features work without internet connection.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">Member Since</p>
            <p className="font-medium text-card-foreground">March 2024</p>
          </div>
          <div className="text-center">
            <BarChart3 className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">Total Entries</p>
            <p className="font-medium text-card-foreground">487 records</p>
          </div>
          <div className="text-center">
            <Cloud className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">Last Backup</p>
            <p className="font-medium text-card-foreground">2 hours ago</p>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} size="lg" className="w-full">
        Save All Changes
      </Button>
    </div>
  );
}
