"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ChatMessageData {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  avatarColor: string;
  isModerator?: boolean;
  isSubscriber?: boolean;
}

interface ChatMessageProps {
  message: ChatMessageData;
  isNew?: boolean;
}

// Colorful avatar gradient colors matching the reference image
const avatarGradients = [
  "from-cyan-400 to-teal-500",
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-emerald-400 to-green-500",
  "from-blue-500 to-indigo-600",
  "from-fuchsia-500 to-pink-600",
  "from-teal-400 to-cyan-500",
  "from-rose-400 to-pink-500",
  "from-indigo-500 to-violet-600",
];

export function getRandomAvatarColor(): string {
  return avatarGradients[Math.floor(Math.random() * avatarGradients.length)];
}

const quickReactions = ["❤️", "😂", "🔥", "👏", "😮"];

export function ChatMessage({ message, isNew = false }: ChatMessageProps) {
  const [reaction, setReaction] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);

  // Get initials for avatar
  const initials = message.username
    .split(/[^a-zA-Z]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 px-4 py-3 transition-all duration-200",
        isNew && "animate-in slide-in-from-bottom-2 fade-in duration-300"
      )}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {/* Colorful gradient avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-lg bg-gradient-to-br ring-2 ring-white/10",
          message.avatarColor
        )}
      >
        {initials || message.username.charAt(0).toUpperCase()}
      </div>
      
      <div className="flex-1 min-w-0">
        {/* Username and timestamp row */}
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "font-semibold text-sm",
            message.username === "You" ? "text-primary" : "text-foreground"
          )}>
            {message.username}
          </span>
          {message.isModerator && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
              MOD
            </span>
          )}
          {message.isSubscriber && !message.isModerator && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-violet-500/20 text-violet-400 rounded border border-violet-500/30">
              SUB
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        
        {/* Chat bubble */}
        <div className="inline-block bg-secondary/80 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[90%] shadow-sm border border-white/5">
          <p className="text-sm text-foreground leading-relaxed break-words">
            {message.message}
          </p>
        </div>
        
        {reaction && (
          <span className="inline-block mt-1 ml-2 text-sm animate-in zoom-in duration-200">
            {reaction}
          </span>
        )}
      </div>

      {/* Quick reaction buttons */}
      {showReactions && !reaction && (
        <div className="absolute right-3 top-3 flex items-center gap-0.5 bg-card/95 backdrop-blur-sm border border-border rounded-full px-1.5 py-1 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          {quickReactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setReaction(emoji)}
              className="w-7 h-7 flex items-center justify-center text-sm hover:bg-secondary rounded-full transition-transform hover:scale-125 active:scale-100"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
