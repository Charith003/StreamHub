"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Maximize, Settings, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl?: string;
  isLoading?: boolean;
}

const qualityOptions = [
  { label: "Auto", value: "auto" },
  { label: "1080p", value: "1080" },
  { label: "720p", value: "720" },
  { label: "480p", value: "480" },
  { label: "360p", value: "360" },
];

export function VideoPlayer({
  videoUrl = "https://www.youtube.com/embed/jfKfPfyJRdk",
  isLoading = false,
}: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showQuality, setShowQuality] = useState(false);
  const [quality, setQuality] = useState("auto");
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        setShowControls(false);
        setShowQuality(false);
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-secondary animate-pulse flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <span className="text-sm text-muted-foreground">Loading stream...</span>
          </div>
        </div>
      )}
      <iframe
        src={`${videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
        title="Live Stream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setLoaded(true)}
      />
      
      {/* Live badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-live text-white text-xs font-bold uppercase tracking-wide shadow-lg">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Live
        </span>
      </div>

      {/* Custom controls overlay */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 z-20",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Quality selector */}
            <div className="relative">
              <button
                onClick={() => setShowQuality(!showQuality)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center gap-1"
              >
                <Settings className="w-5 h-5 text-white" />
                <span className="text-xs text-white font-medium">{quality === "auto" ? "Auto" : quality + "p"}</span>
              </button>
              {showQuality && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded-lg py-1 min-w-[120px] shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setQuality(option.value);
                        setShowQuality(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-between",
                        quality === option.value && "text-primary"
                      )}
                    >
                      {option.label}
                      {quality === option.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none border border-border/10 rounded-xl" />
    </div>
  );
}
