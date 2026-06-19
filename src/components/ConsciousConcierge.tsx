import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, MessageCircle, ArrowUpRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export default function ConsciousConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Welcome to Derma Dental. It is an absolute pleasure to assist you. Are you interested in exploring our bespoke smile artistry, such as hand-crafted Austrian veneers, or our curated facial aesthetics therapies?",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, loading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || loading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: userInput.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      // Reconstruct simple chat history for context
      const history = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch("/api/concierge/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsg.text,
          history
        })
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with representative.");
      }

      const data = await res.json();
      
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: "model",
        text: data.text || "I am always here to guide your journey. Let me know if you would like to arrange some bespoke care.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Concierge Error:", err);
      // Beautiful fallback
      const errorMsg: Message = {
        id: `msg-${Date.now()}-error`,
        role: "model",
        text: "I do apologize, my link is briefly resetting in our serene lounge. I encourage you to navigate directly to 'Bespoke Booking' inside our app, which is fully operational, or ask me again shortly.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="floating-concierge">
      {/* Floating launcher button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-charcoal text-white hover:text-champagne h-14 pl-5 pr-6 rounded-full shadow-lg border border-champagne/25 flex items-center gap-3 transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs uppercase tracking-widest font-semibold group"
          id="concierge-launcher-btn"
        >
          <div className="relative w-5 h-5 flex items-center justify-center bg-champagne/15 rounded-full text-champagne shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span>Conscious Concierge</span>
          <span className="w-1.5 h-1.5 bg-sage rounded-full animate-ping ml-1" />
        </button>
      )}

      {/* Exquisite popover window */}
      {isOpen && (
        <div
          className="w-[330px] md:w-[380px] h-[500px] bg-warm-ivory rounded-3xl overflow-hidden shadow-2xl border border-champagne/20 flex flex-col justify-between transform transition-all duration-500 ease-out animate-fadeIn origin-bottom-right"
          id="concierge-chat-panel"
        >
          {/* Header */}
          <div className="bg-charcoal text-white p-5 flex items-center justify-between border-b border-champagne/15">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white">
                  Sofia Vance
                </h4>
                <span className="text-[10px] text-champagne font-medium flex items-center gap-1.5 font-sans mt-0.5">
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
                  Bespoke Brand Ambassador
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full border border-white/10 hover:border-champagne/50 hover:text-champagne flex items-center justify-center text-white/50"
              id="concierge-close-btn"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Core */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-alabaster/70 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3.5 rounded-2.5xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-champagne text-white rounded-br-none"
                      : "bg-white text-charcoal border border-champagne/10 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-charcoal-light/40 mt-1.5 font-mono px-1">
                  {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {/* Typing Buffer state */}
            {loading && (
              <div className="flex flex-col max-w-[85%] mr-auto items-start">
                <div className="p-3 bg-white text-charcoal border border-champagne/10 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <span className="text-[10px] text-charcoal-light/50 italic flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-champagne rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-champagne rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-champagne rounded-full animate-bounce" />
                    </span>
                    Sofia is drafting bespoke advice...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-champagne/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about treatments, pricing, or comfort..."
              className="flex-1 bg-alabaster hover:bg-warm-ivory border border-champagne/10 hover:border-champagne/25 focus:border-champagne focus:outline-none rounded-2xl px-4 py-2.5 text-xs text-charcoal placeholder-charcoal/40 transition-all duration-300"
              id="concierge-input-text"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className="w-10 h-10 shrink-0 bg-charcoal text-white hover:text-champagne hover:bg-charcoal/90 rounded-2xl flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 shadow-sm"
              id="concierge-send-btn"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
