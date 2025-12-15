import { useState, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mental-health-chat`;

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI mental wellness assistant. How can I support you today? 💜",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Prepare messages for API (excluding the initial greeting and timestamps)
    const apiMessages = [...messages, userMsg]
      .filter((m) => m.id !== "1") // Exclude initial greeting
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    let assistantContent = "";

    const updateAssistantMessage = (content: string) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === "assistant" && lastMessage.id.startsWith("streaming-")) {
          // Update existing streaming message
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content } : m
          );
        }
        // Create new assistant message
        return [
          ...prev,
          {
            id: `streaming-${Date.now()}`,
            role: "assistant" as const,
            content,
            timestamp: new Date(),
          },
        ];
      });
    };

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              updateAssistantMessage(assistantContent);
            }
          } catch {
            // Incomplete JSON, put back in buffer
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              updateAssistantMessage(assistantContent);
            }
          } catch {
            /* ignore partial leftovers */
          }
        }
      }

      // Finalize the message with a permanent ID
      setMessages((prev) => {
        return prev.map((m) =>
          m.id.startsWith("streaming-")
            ? { ...m, id: Date.now().toString() }
            : m
        );
      });
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response";
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: `I'm sorry, I encountered an issue: ${errorMessage}. Please try again in a moment. If you're in crisis, please call 988 (Suicide & Crisis Lifeline) or your local emergency services.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI mental wellness assistant. How can I support you today? 💜",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
