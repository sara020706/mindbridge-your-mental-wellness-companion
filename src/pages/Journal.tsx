import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const prompts = [
  { emoji: "💭", text: "Reflect on your emotional journey today", color: "from-primary to-secondary" },
  { emoji: "🎯", text: "What goals did you work towards?", color: "from-secondary to-chart-5" },
  { emoji: "✨", text: "Celebrate a small win from today", color: "from-chart-4 to-chart-4" },
];

export default function Journal() {
  const [enableAI, setEnableAI] = useState(true);
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSave = () => {
    if (!content.trim()) {
      toast.error("Please write something before saving");
      return;
    }
    toast.success("Journal entry saved!", {
      description: "Your thoughts have been recorded.",
    });
    setContent("");
    setSelectedPrompt(null);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-12 lg:pt-0">
      {/* Header */}
      <div
        className="rounded-2xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(310, 70%, 55%) 100%)" }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-3xl font-bold">AI-Assisted Journal</h1>
          <p className="opacity-90 mt-1">Express yourself freely with personalized prompts</p>
        </div>
        <div className="absolute right-6 top-6 w-16 h-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      </div>

      {/* AI Prompts */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-card-foreground">AI Writing Prompts</h2>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="ai-suggestions"
              checked={enableAI}
              onCheckedChange={(checked) => setEnableAI(checked as boolean)}
            />
            <label htmlFor="ai-suggestions" className="text-sm text-muted-foreground cursor-pointer">
              Enable AI suggestions
            </label>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {prompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedPrompt(prompt.text);
                setContent(`${prompt.text}\n\n`);
              }}
              className={cn(
                "p-4 rounded-xl text-primary-foreground text-left transition-all hover:scale-[1.02]",
                `bg-gradient-to-br ${prompt.color}`
              )}
            >
              <span className="text-2xl mb-2 block">{prompt.emoji}</span>
              <span className="text-sm font-medium">{prompt.text}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-card-foreground">Daily Reflection Prompt:</span>
          </p>
          <p className="text-card-foreground mt-1">What made you smile today?</p>
        </div>
      </div>

      {/* Journal Entry */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{today}</span>
          </div>
          {enableAI && (
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Grammar Check
            </Button>
          )}
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts..."
          className="min-h-64 resize-none text-base leading-relaxed"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Entry
        </Button>
      </div>
    </div>
  );
}
