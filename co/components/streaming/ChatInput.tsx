"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Smile, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  maxLength?: number;
}

const emojiCategories = [
  { name: "Smileys", emojis: ["😀", "😂", "🥹", "😊", "😍", "🤩", "😎", "🥳", "😇", "🤗"] },
  { name: "Gestures", emojis: ["👍", "👏", "🙌", "🔥", "❤️", "💯", "✨", "🎉", "👀", "💪"] },
  { name: "Reactions", emojis: ["😮", "🤯", "😱", "🤔", "👋", "🙏", "💀", "😭", "🤣", "😤"] },
];

export function ChatInput({ onSendMessage, maxLength = 180 }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmojis(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const addEmoji = (emoji: string) => {
    if (message.length + emoji.length <= maxLength) {
      setMessage((prev) => prev + emoji);
      inputRef.current?.focus();
    }
  };

  const characterCount = message.length;
  const isNearLimit = characterCount >= maxLength * 0.8;
  const isAtLimit = characterCount >= maxLength;

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4 relative">
      {/* Emoji Picker */}
      {showEmojis && (
        <div
          ref={emojiRef}
          className="absolute bottom-full left-4 right-4 mb-2 bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200 z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Quick Reactions</span>
            <button
              onClick={() => setShowEmojis(false)}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-4">
            {emojiCategories.map((category) => (
              <div key={category.name}>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block font-medium">
                  {category.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {category.emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="w-9 h-9 flex items-center justify-center text-xl hover:bg-secondary rounded-xl transition-all hover:scale-110 active:scale-95"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div
          className={cn(
            "relative flex items-center gap-2 rounded-2xl bg-secondary/60 backdrop-blur-sm border-2 transition-all duration-200",
            isFocused ? "border-primary/50 shadow-lg shadow-primary/10" : "border-transparent"
          )}
        >
          {/* Emoji avatar button */}
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className={cn(
              "ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xl shadow-md transition-transform hover:scale-105 active:scale-95",
              showEmojis && "ring-2 ring-primary ring-offset-2 ring-offset-card"
            )}
            aria-label="Add emoji"
          >
            😊
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Say something nice..."
            className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            maxLength={maxLength}
          />
          
          {/* Character count */}
          <span
            className={cn(
              "text-xs font-medium transition-colors mr-2",
              isAtLimit
                ? "text-destructive"
                : isNearLimit
                  ? "text-warning"
                  : "text-muted-foreground"
            )}
          >
            {characterCount}/{maxLength}
          </span>
          
          <Button
            type="submit"
            disabled={!message.trim()}
            className={cn(
              "mr-2 rounded-xl px-5 py-2 h-auto font-semibold transition-all duration-200",
              message.trim()
                ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25"
                : "bg-muted text-muted-foreground"
            )}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
