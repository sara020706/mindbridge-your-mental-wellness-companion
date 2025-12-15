import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Send, User, Bot, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAIChat } from "@/hooks/useAIChat";
import { toast } from "sonner";

const conversationStarters = [
  { emoji: "🧠", title: "Cognitive Behavioral Therapy", desc: "Explore thought patterns" },
  { emoji: "😰", title: "Stress Management", desc: "Learn coping techniques" },
  { emoji: "😴", title: "Sleep Support", desc: "Improve sleep quality" },
  { emoji: "🎯", title: "Goal Setting", desc: "Set achievable goals" },
];

const quickPrompts = [
  { emoji: "😟", text: "I need help with anxiety" },
  { emoji: "🌬️", text: "Guide me through a breathing exercise" },
  { emoji: "💬", text: "I want to talk about my day" },
  { emoji: "🧘", text: "Help me practice mindfulness" },
];

export default function AIAssistant() {
  const { messages, isLoading, sendMessage, clearMessages } = useAIChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput("");
    await sendMessage(messageText);
  };

  const handleClearChat = () => {
    clearMessages();
    toast.success("Conversation cleared");
  };

  return (
    <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Header */}
          <div
            className="rounded-t-2xl p-6 text-primary-foreground flex items-center justify-between"
            style={{ background: "var(--gradient-success)" }}
          >
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">AI Wellness Assistant</h1>
              <p className="opacity-90 text-sm">24/7 support powered by AI</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={handleClearChat}
                title="Clear conversation"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Volume2 className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 bg-primary-foreground/20 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-card border-x border-border overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-accent-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-4 rounded-2xl",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-card-foreground rounded-bl-none"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-2",
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="bg-muted p-4 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="bg-card border-x border-border px-4 py-3">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickPrompts.map((prompt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => handleSend(prompt.text)}
                  disabled={isLoading}
                >
                  <span className="mr-2">{prompt.emoji}</span>
                  {prompt.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-card rounded-b-2xl border border-border p-4">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              If you're in crisis, call{" "}
              <a href="tel:988" className="text-primary hover:underline font-medium">
                988
              </a>{" "}
              (Suicide & Crisis Lifeline) or your local emergency services.
            </p>
          </div>
        </div>

        {/* Conversation Starters */}
        <div className="hidden lg:block space-y-4">
          <h3 className="font-semibold text-foreground">Conversation Starters</h3>
          <div className="space-y-3">
            {conversationStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() =>
                  handleSend(`I'd like to explore ${starter.title.toLowerCase()}`)
                }
                disabled={isLoading}
                className="w-full p-4 bg-card rounded-xl border border-border hover:border-primary transition-colors text-left group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{starter.emoji}</span>
                  <div>
                    <p className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                      {starter.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{starter.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <p className="text-xs text-muted-foreground">
              <strong className="text-card-foreground">Disclaimer:</strong> This AI
              assistant provides emotional support and wellness guidance. It is not
              a substitute for professional mental health care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
