"use client";

import { useState, useEffect } from "react";
import { Eye, Clock, Share2, Heart, Bell, Check, Copy, Twitter, Facebook, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EventDescriptionProps {
  title?: string;
  description?: string;
  viewerCount?: number;
  tags?: string[];
  isLive?: boolean;
  isLoading?: boolean;
  startTime?: Date;
}

// Default start time as a constant outside the component to prevent re-creation
const DEFAULT_START_TIME = Date.now() - 3600000 * 5;

export function EventDescription({
  title = "lofi hip hop radio - beats to relax/study to",
  description = "Welcome to the live stream! Join us for relaxing beats and good vibes. This stream runs 24/7 with hand-picked lo-fi hip hop music perfect for studying, working, or just chilling out. Thank you for being part of our amazing community!",
  viewerCount = 12453,
  tags = ["lofi", "chill", "study", "relax", "music", "24/7"],
  isLive = true,
  isLoading = false,
  startTime,
}: EventDescriptionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(24521);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Memoize the start time to prevent re-renders
  const startTimeMs = startTime?.getTime() ?? DEFAULT_START_TIME;

  // Update duration every second
  useEffect(() => {
    const updateDuration = () => {
      const streamDuration = Math.floor((Date.now() - startTimeMs) / 1000);
      const hours = Math.floor(streamDuration / 3600);
      const minutes = Math.floor((streamDuration % 3600) / 60);
      const seconds = streamDuration % 60;
      setDuration({ hours, minutes, seconds });
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, [startTimeMs]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="h-8 w-3/4 bg-secondary animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-secondary animate-pulse rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-secondary animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-secondary animate-pulse rounded" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-secondary animate-pulse rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-5 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title and badges */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            {isLive && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-live text-white text-xs font-bold uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Live
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              {viewerCount.toLocaleString()} watching
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium font-mono">
              <Clock className="w-3.5 h-3.5" />
              {String(duration.hours).padStart(2, "0")}:{String(duration.minutes).padStart(2, "0")}:{String(duration.seconds).padStart(2, "0")}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight text-balance">
            {title}
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            className={cn(
              "gap-2 transition-all duration-200",
              isLiked 
                ? "bg-live/10 border-live text-live hover:bg-live/20 hover:text-live" 
                : "hover:bg-secondary"
            )}
          >
            <Heart className={cn("w-4 h-4 transition-transform", isLiked && "fill-current scale-110")} />
            <span className="font-medium">{likeCount.toLocaleString()}</span>
          </Button>
          
          {/* Share button with dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="gap-2 hover:bg-secondary"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            {showShareMenu && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-xl p-2 z-30 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-success">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm">
                  <Twitter className="w-4 h-4" />
                  <span>Share on X</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm">
                  <Facebook className="w-4 h-4" />
                  <span>Share on Facebook</span>
                </button>
              </div>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={cn(
              "gap-2 transition-all duration-200",
              isSubscribed
                ? "bg-secondary text-foreground hover:bg-secondary/80"
                : "bg-primary hover:bg-primary/90 shadow-md shadow-primary/25"
            )}
          >
            <Bell className={cn("w-4 h-4", isSubscribed && "fill-current")} />
            <span className="hidden sm:inline">{isSubscribed ? "Subscribed" : "Subscribe"}</span>
          </Button>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium",
              "bg-secondary text-secondary-foreground",
              "hover:bg-primary hover:text-primary-foreground",
              "transition-colors duration-200 cursor-pointer"
            )}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
