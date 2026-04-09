"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, Users, Filter, ChevronDown, ArrowDown } from "lucide-react";
import { ChatMessage, getRandomAvatarColor, type ChatMessageData } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const fakeUsernames = [
  "CodeVibes",
  "StreamScout",
  "BasslineFan",
  "NightOwl_88",
  "ChillVibes",
  "TechWatcher",
  "MusicLover99",
  "GamerPro",
  "CozyCorner",
  "StarGazer",
  "DreamCatcher",
  "WaveRider",
  "SunnyDays",
  "MoonChild",
  "CloudNine",
  "FireStorm",
  "IceQueen",
  "ThunderBolt",
  "SilverFox",
  "GoldenHeart",
];

const fakeMessages = [
  "This beat is immaculate 🔥",
  "Love the live ambience tonight ✨",
  "This is my favorite stream to focus to.",
  "Anyone watching from New York?",
  "Camera quality looks so clean!",
  "Hello everyone!",
  "The vibes are immaculate",
  "Best stream ever!",
  "Who else is watching at night?",
  "This is so relaxing",
  "Keep up the great work!",
  "Greetings from Germany!",
  "Just joined, what did I miss?",
  "The audio quality is perfect",
  "This is exactly what I needed today",
  "Sending good vibes to everyone",
  "The chat is so wholesome",
  "Been watching for hours",
  "This never gets old 💜",
  "Perfect background for work",
  "❤️ from Brazil",
  "Finally found this stream again!",
  "This makes my day better",
];

type FilterMode = "all" | "subscribers" | "highlighted";

interface ChatPanelProps {
  isLoading?: boolean;
  viewerCount?: number;
}

export function ChatPanel({ isLoading = false, viewerCount = 12453 }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [missedMessages, setMissedMessages] = useState(0);
  const [chattingCount, setChatttingCount] = useState(983);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((force = false) => {
    if (!isPaused || force) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      if (force) {
        setIsPaused(false);
        setMissedMessages(0);
      }
    }
  }, [isPaused]);

  const generateFakeMessage = useCallback((): ChatMessageData => {
    const isMod = Math.random() < 0.1;
    const isSub = Math.random() < 0.3;
    return {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      username: fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)],
      message: fakeMessages[Math.floor(Math.random() * fakeMessages.length)],
      timestamp: new Date(),
      avatarColor: getRandomAvatarColor(),
      isModerator: isMod,
      isSubscriber: isSub || isMod,
    };
  }, []);

  useEffect(() => {
    const initialMessages: ChatMessageData[] = Array.from({ length: 8 }, () => {
      const msg = generateFakeMessage();
      msg.timestamp = new Date(Date.now() - Math.random() * 300000);
      return msg;
    }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    setMessages(initialMessages);
  }, [generateFakeMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = generateFakeMessage();
      setMessages((prev) => [...prev.slice(-49), newMessage]);
      setNewMessageIds((prev) => new Set([...prev, newMessage.id]));
      
      // Update chatting count
      setChatttingCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      
      if (isPaused) {
        setMissedMessages((prev) => prev + 1);
      }
      
      setTimeout(() => {
        setNewMessageIds((prev) => {
          const next = new Set(prev);
          next.delete(newMessage.id);
          return next;
        });
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [generateFakeMessage, isPaused]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle scroll to detect if user scrolled up
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsPaused(!isAtBottom);
    if (isAtBottom) {
      setMissedMessages(0);
    }
  };

  // Close filter menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessageData = {
      id: `msg-${Date.now()}-user`,
      username: "You",
      message: text,
      timestamp: new Date(),
      avatarColor: "from-primary to-violet-600",
      isSubscriber: true,
    };
    setMessages((prev) => [...prev.slice(-49), newMessage]);
    setNewMessageIds((prev) => new Set([...prev, newMessage.id]));
    setIsPaused(false);
    setMissedMessages(0);
    
    setTimeout(() => {
      setNewMessageIds((prev) => {
        const next = new Set(prev);
        next.delete(newMessage.id);
        return next;
      });
    }, 300);
  };

  const filteredMessages = messages.filter((msg) => {
    if (filterMode === "subscribers") return msg.isSubscriber;
    if (filterMode === "highlighted") return msg.isModerator;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="p-4 border-b border-border">
          <div className="h-6 w-32 bg-secondary animate-pulse rounded" />
        </div>
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
                <div className="h-12 w-full bg-secondary animate-pulse rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-card to-secondary/30">
        <div>
          <h2 className="font-bold text-foreground text-lg">Live Chat</h2>
          <p className="text-xs text-muted-foreground">{chattingCount.toLocaleString()} chatting</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                filterMode !== "all" 
                  ? "bg-primary/20 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {filterMode === "all" ? "All" : filterMode === "subscribers" ? "Subs" : "Mods"}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-1 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl py-1 z-20 min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-150">
                {[
                  { value: "all", label: "All Messages" },
                  { value: "subscribers", label: "Subscribers" },
                  { value: "highlighted", label: "Moderators" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setFilterMode(option.value as FilterMode);
                      setShowFilterMenu(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm transition-colors",
                      filterMode === option.value
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scrollbar-thin bg-gradient-to-b from-card via-card to-secondary/10"
      >
        <div className="py-2">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No messages to show</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isNew={newMessageIds.has(msg.id)}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to bottom indicator */}
      {isPaused && missedMessages > 0 && (
        <div className="px-4 pb-2">
          <Button
            onClick={() => scrollToBottom(true)}
            variant="secondary"
            size="sm"
            className="w-full gap-2 shadow-lg bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
          >
            <ArrowDown className="w-4 h-4" />
            {missedMessages} new message{missedMessages > 1 ? "s" : ""}
          </Button>
        </div>
      )}

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
