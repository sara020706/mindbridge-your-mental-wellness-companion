import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const meditations = [
  {
    id: 1,
    title: "Morning Calm",
    duration: "5 min",
    category: "Breathing",
    emoji: "🌅",
    gradient: "from-chart-4 to-chart-4/70",
  },
  {
    id: 2,
    title: "Stress Relief",
    duration: "10 min",
    category: "Guided",
    emoji: "🧘",
    gradient: "from-primary to-secondary",
  },
  {
    id: 3,
    title: "Deep Sleep",
    duration: "15 min",
    category: "Sleep",
    emoji: "🌙",
    gradient: "from-secondary to-chart-5",
  },
  {
    id: 4,
    title: "Focus Boost",
    duration: "7 min",
    category: "Focus",
    emoji: "🎯",
    gradient: "from-accent to-accent/70",
  },
  {
    id: 5,
    title: "Anxiety Relief",
    duration: "12 min",
    category: "Calming",
    emoji: "🌿",
    gradient: "from-accent to-primary",
  },
  {
    id: 6,
    title: "Body Scan",
    duration: "20 min",
    category: "Relaxation",
    emoji: "✨",
    gradient: "from-chart-5 to-primary",
  },
];

const breathingExercise = {
  inhale: 4,
  hold: 7,
  exhale: 8,
};

export default function Meditation() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);

  const startBreathing = () => {
    setIsBreathing(true);
    // Simple breathing animation cycle
    let currentPhase: "inhale" | "hold" | "exhale" = "inhale";
    const cycle = () => {
      if (currentPhase === "inhale") {
        setPhase("inhale");
        setTimeout(() => {
          currentPhase = "hold";
          cycle();
        }, breathingExercise.inhale * 1000);
      } else if (currentPhase === "hold") {
        setPhase("hold");
        setTimeout(() => {
          currentPhase = "exhale";
          cycle();
        }, breathingExercise.hold * 1000);
      } else {
        setPhase("exhale");
        setTimeout(() => {
          currentPhase = "inhale";
          if (isBreathing) cycle();
        }, breathingExercise.exhale * 1000);
      }
    };
    cycle();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-12 lg:pt-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Mindfulness & Meditation</h1>
        <p className="text-muted-foreground mt-1">Find your inner peace with guided exercises</p>
      </div>

      {/* Breathing Exercise */}
      <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Quick Breathing Exercise</h2>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={cn(
              "w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000",
              phase === "inhale" && "scale-125",
              phase === "hold" && "scale-125",
              phase === "exhale" && "scale-100"
            )}
            style={{
              background: "var(--gradient-primary)",
              boxShadow: isBreathing ? "var(--shadow-glow)" : "none",
            }}
          >
            <div className="text-center text-primary-foreground">
              <p className="text-4xl font-bold capitalize">{isBreathing ? phase : "Start"}</p>
              {isBreathing && (
                <p className="text-sm opacity-80 mt-1">
                  {phase === "inhale"
                    ? `${breathingExercise.inhale}s`
                    : phase === "hold"
                    ? `${breathingExercise.hold}s`
                    : `${breathingExercise.exhale}s`}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-8 mt-8 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{breathingExercise.inhale}s</p>
              <p className="text-sm text-muted-foreground">Inhale</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">{breathingExercise.hold}s</p>
              <p className="text-sm text-muted-foreground">Hold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{breathingExercise.exhale}s</p>
              <p className="text-sm text-muted-foreground">Exhale</p>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-6 gap-2"
            onClick={() => {
              if (isBreathing) {
                setIsBreathing(false);
                setPhase("inhale");
              } else {
                startBreathing();
              }
            }}
          >
            {isBreathing ? (
              <>
                <Pause className="h-5 w-5" /> Stop
              </>
            ) : (
              <>
                <Play className="h-5 w-5" /> Start Exercise
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Meditation Sessions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Guided Sessions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meditations.map((meditation) => (
            <button
              key={meditation.id}
              onClick={() => setSelectedMeditation(meditation.id)}
              className={cn(
                "relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-[1.02]",
                `bg-gradient-to-br ${meditation.gradient}`,
                selectedMeditation === meditation.id && "ring-2 ring-primary ring-offset-2"
              )}
            >
              <span className="text-4xl mb-4 block">{meditation.emoji}</span>
              <h3 className="text-lg font-semibold text-primary-foreground">{meditation.title}</h3>
              <p className="text-primary-foreground/80 text-sm">{meditation.category}</p>
              <div className="flex items-center gap-1 mt-3 text-primary-foreground/70">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{meditation.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
