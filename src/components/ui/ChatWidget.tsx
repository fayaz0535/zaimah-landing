"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm ZAIMAH AI. How can I help you today? Ask me about our services, products like funnl, or how to get started.",
};

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 12px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--text-muted)",
            display: "block",
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "Sorry, I had trouble with that. Please email us at fayaz@zaimahtech.ae" }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please email fayaz@zaimahtech.ae for assistance." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9998 }}
      aria-label="ZAIMAH AI chat widget"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.85, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            role="dialog"
            aria-label="Chat with ZAIMAH AI"
            style={{
              width: 320,
              height: 460,
              borderRadius: 16,
              background: "var(--bg-surface)",
              border: "1px solid var(--border-col)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#5B5BF6",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#00C9A7",
                    boxShadow: "0 0 6px #00C9A7",
                  }}
                  aria-hidden="true"
                />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                  Ask ZAIMAH AI
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  opacity: 0.8,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 280,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "82%",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      fontSize: 11,
                      lineHeight: 1.55,
                      background: msg.role === "user" ? "#5B5BF6" : "var(--bg-page)",
                      color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                      border: msg.role === "user" ? "none" : "1px solid var(--border-col)",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div
                    style={{
                      background: "var(--bg-page)",
                      border: "1px solid var(--border-col)",
                      borderRadius: 8,
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                borderTop: "1px solid var(--border-col)",
                padding: "10px 12px",
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything…"
                aria-label="Chat input"
                disabled={loading}
                style={{
                  flex: 1,
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-col)",
                  borderRadius: 6,
                  padding: "7px 10px",
                  fontSize: 11,
                  color: "var(--text-primary)",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: "#5B5BF6",
                  border: "none",
                  cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  opacity: !input.trim() || loading ? 0.5 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <Send size={13} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close ZAIMAH AI chat" : "Open ZAIMAH AI chat"}
        aria-expanded={open}
        animate={{ scale: open ? 1 : [1, 1.06, 1] }}
        transition={open ? {} : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#5B5BF6",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(91,91,246,0.4)",
          color: "#fff",
          transition: "background 0.2s",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
