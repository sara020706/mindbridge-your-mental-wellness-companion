import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😢", label: "Very Sad", value: 1 },
  { emoji: "😞", label: "Sad", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "Happy", value: 4 },
  { emoji: "😄", label: "Very Happy", value: 5 },
];

const emotions = [
  { emoji: "😰", label: "Anxious" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😴", label: "Tired" },
  { emoji: "⚡", label: "Energetic" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "🥰", label: "Loved" },
  { emoji: "😫", label: "Stressed" },
  { emoji: "😊", label: "Content" },
  { emoji: "😟", label: "Worried" },
  { emoji: "🙏", label: "Grateful" },
  { emoji: "😔", label: "Disappointed" },
  { emoji: "🎉", label: "Excited" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleEmotion = (label: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]
    );
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error("Please select your overall mood");
      return;
    }
    toast.success("Mood logged successfully!", {
      description: "Your entry has been saved.",
    });
    setSelectedMood(null);
    setSelectedEmotions([]);
    setNotes("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-12 lg:pt-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">How are you feeling?</h1>
        <p className="text-muted-foreground mt-1">Select your current mood and emotions</p>
      </div>

      {/* Overall Mood */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-semibold text-card-foreground mb-6">Overall Mood</h2>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                selectedMood === mood.value
                  ? "bg-primary/10 ring-2 ring-primary scale-105"
                  : "hover:bg-muted"
              )}
            >
              <span className="text-5xl">{mood.emoji}</span>
              <span className="text-sm text-muted-foreground">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Emotions */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-semibold text-card-foreground mb-6">
          What else are you feeling?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {emotions.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => toggleEmotion(emotion.label)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                selectedEmotions.includes(emotion.label)
                  ? "bg-primary/10 ring-2 ring-primary"
                  : "bg-muted/50 hover:bg-muted"
              )}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="text-xs text-muted-foreground">{emotion.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Add notes (optional)
        </h2>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What's on your mind? Any triggers or highlights from today?"
          className="min-h-32 resize-none"
        />
      </div>

      <Button onClick={handleSubmit} size="lg" className="w-full">
        Save Mood Entry
      </Button>
    </div>
  );
}
