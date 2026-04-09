"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Radio, Menu, X } from "lucide-react";
import Link from "next/link";
import { VideoPlayer } from "@/components/streaming/VideoPlayer";
import { ChatPanel } from "@/components/streaming/ChatPanel";
import { EventDescription } from "@/components/streaming/EventDescription";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EventStreamPageProps {
  eventId: string;
}

// Sample event data - in production this would come from an API
const eventData: Record<string, {
  title: string;
  description: string;
  videoUrl: string;
  viewerCount: number;
  tags: string[];
  category: string;
}> = {
  // Music
  "1": {
    title: "lofi hip hop radio - beats to relax/study to",
    description: "Welcome to the live stream! Join us for relaxing beats and good vibes. This stream runs 24/7 with hand-picked lo-fi hip hop music perfect for studying, working, or just chilling out. Thank you for being part of our amazing community!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 12453,
    tags: ["lofi", "chill", "study", "relax", "music", "24/7"],
    category: "Music",
  },
  "2": {
    title: "Chill Electronic Beats - Work & Focus Music",
    description: "Electronic ambient music perfect for deep work sessions. Join thousands of professionals who tune in daily for focus-enhancing beats.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 8234,
    tags: ["electronic", "ambient", "focus", "work", "productivity"],
    category: "Music",
  },
  "3": {
    title: "Jazz Cafe Radio - Smooth Jazz 24/7",
    description: "Your virtual jazz cafe experience. Smooth jazz, coffee shop ambiance, and a relaxing atmosphere for any time of day.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 5621,
    tags: ["jazz", "cafe", "smooth", "relaxing", "coffee"],
    category: "Music",
  },
  "4": {
    title: "Classical Piano Live Performance",
    description: "Experience the beauty of classical piano with live performances from talented musicians around the world.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 2156,
    tags: ["classical", "piano", "live", "performance"],
    category: "Music",
  },
  "5": {
    title: "Synthwave Radio - Retro Vibes 24/7",
    description: "Take a trip back to the 80s with our synthwave radio. Neon lights, retro beats, and pure nostalgia.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 4892,
    tags: ["synthwave", "retro", "80s", "electronic", "nostalgia"],
    category: "Music",
  },
  "6": {
    title: "Acoustic Sessions - Live From Studio",
    description: "Intimate acoustic performances from indie artists. Raw, authentic, and beautiful music.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 1834,
    tags: ["acoustic", "indie", "live", "studio"],
    category: "Music",
  },
  // Ambient
  "7": {
    title: "Ambient Sounds for Deep Focus",
    description: "Immerse yourself in ambient soundscapes designed to enhance concentration and productivity.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 3892,
    tags: ["ambient", "focus", "concentration", "productivity"],
    category: "Ambient",
  },
  "8": {
    title: "Nature Sounds - Forest Rain Ambience",
    description: "Escape to a peaceful forest with the soothing sounds of rain. Perfect for relaxation and sleep.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 4521,
    tags: ["nature", "rain", "forest", "sleep", "relaxation"],
    category: "Ambient",
  },
  "9": {
    title: "Ocean Waves - Beach Relaxation",
    description: "Let the waves wash away your stress. Crystal clear ocean sounds for ultimate relaxation.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 2987,
    tags: ["ocean", "waves", "beach", "meditation"],
    category: "Ambient",
  },
  "10": {
    title: "Fireplace Sounds - Cozy Winter Night",
    description: "Warm up with the crackling sounds of a cozy fireplace. Perfect for cold nights.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 1654,
    tags: ["fireplace", "cozy", "winter", "warmth"],
    category: "Ambient",
  },
  // Gaming
  "11": {
    title: "Speedrun Marathon - Classic Games",
    description: "Watch the best speedrunners tackle classic games in record time. High-skill gameplay and entertainment!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 18234,
    tags: ["speedrun", "gaming", "classic", "competition"],
    category: "Gaming",
  },
  "12": {
    title: "Pro League Finals - Championship Match",
    description: "The biggest esports event of the year! Watch top teams compete for the championship title.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 45621,
    tags: ["esports", "finals", "championship", "competitive"],
    category: "Gaming",
  },
  "13": {
    title: "Indie Game Showcase - Hidden Gems",
    description: "Discover amazing indie games you never knew existed. Fresh gameplay and unique stories.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 3456,
    tags: ["indie", "games", "showcase", "discovery"],
    category: "Gaming",
  },
  "14": {
    title: "Retro Gaming Night - 90s Classics",
    description: "Nostalgia trip through the golden age of gaming. Join us for classic 90s games!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 5678,
    tags: ["retro", "90s", "classics", "nostalgia"],
    category: "Gaming",
  },
  "15": {
    title: "Building in Survival Mode - Day 100",
    description: "Epic survival challenge! Watch as we build our ultimate base on day 100 of the challenge.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 8901,
    tags: ["survival", "building", "challenge", "gaming"],
    category: "Gaming",
  },
  "16": {
    title: "Horror Game Marathon - Scary Night",
    description: "Not for the faint of heart! Join us for a marathon of the scariest games ever made.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 7234,
    tags: ["horror", "scary", "marathon", "gaming"],
    category: "Gaming",
  },
  // Talk Shows
  "17": {
    title: "Morning Coffee Chat - Daily Updates",
    description: "Start your day with our friendly morning show. News, updates, and great conversations!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 4567,
    tags: ["morning", "chat", "news", "daily"],
    category: "Talk Shows",
  },
  "18": {
    title: "Tech News Roundup - Weekly Digest",
    description: "Your weekly dose of tech news. Latest gadgets, software updates, and industry trends.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 6789,
    tags: ["tech", "news", "gadgets", "trends"],
    category: "Talk Shows",
  },
  "19": {
    title: "Celebrity Interview - Behind the Scenes",
    description: "Exclusive interview with your favorite celebrities. Insights, stories, and behind-the-scenes moments.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 12345,
    tags: ["celebrity", "interview", "exclusive", "entertainment"],
    category: "Talk Shows",
  },
  "20": {
    title: "Podcast Live - Listener Q&A",
    description: "Interactive podcast session! Ask your questions live and join the conversation.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 3456,
    tags: ["podcast", "live", "qa", "interactive"],
    category: "Talk Shows",
  },
  "21": {
    title: "Comedy Hour - Stand Up Special",
    description: "Laugh out loud with our comedy special! Top comedians performing their best material.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 8765,
    tags: ["comedy", "standup", "funny", "entertainment"],
    category: "Talk Shows",
  },
  // Education
  "22": {
    title: "JavaScript Masterclass - Advanced Concepts",
    description: "Level up your JavaScript skills! Deep dive into advanced concepts with hands-on examples.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 5432,
    tags: ["javascript", "coding", "programming", "tutorial"],
    category: "Education",
  },
  "23": {
    title: "Physics Explained - Quantum Mechanics",
    description: "Demystifying quantum mechanics for everyone. Complex concepts made simple and engaging.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 3210,
    tags: ["physics", "quantum", "science", "education"],
    category: "Education",
  },
  "24": {
    title: "Language Learning - Spanish for Beginners",
    description: "Start your Spanish journey today! Interactive lessons with a native speaker.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 2876,
    tags: ["spanish", "language", "learning", "beginner"],
    category: "Education",
  },
  "25": {
    title: "History Deep Dive - Ancient Civilizations",
    description: "Explore the mysteries of ancient civilizations. From Egypt to Rome, discover history like never before.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 4123,
    tags: ["history", "ancient", "civilizations", "documentary"],
    category: "Education",
  },
  "26": {
    title: "Math Tutoring - Calculus Made Easy",
    description: "Struggling with calculus? Let us help! Clear explanations and practice problems.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 1987,
    tags: ["math", "calculus", "tutoring", "education"],
    category: "Education",
  },
  // Others
  "27": {
    title: "Cooking Live - Italian Cuisine Night",
    description: "Learn authentic Italian recipes from Chef Marco. Fresh pasta, sauces, and classic dishes!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 6543,
    tags: ["cooking", "italian", "food", "recipes"],
    category: "Others",
  },
  "28": {
    title: "Art Stream - Digital Painting Session",
    description: "Watch amazing digital art come to life. Tips, techniques, and creative inspiration.",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 2345,
    tags: ["art", "digital", "painting", "creative"],
    category: "Others",
  },
  "29": {
    title: "Fitness Live - HIIT Workout",
    description: "High-intensity interval training for all fitness levels. Get fit with our energetic instructors!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 4321,
    tags: ["fitness", "hiit", "workout", "health"],
    category: "Others",
  },
  "30": {
    title: "Travel Vlog - Exploring Tokyo Streets",
    description: "Virtual travel experience through the vibrant streets of Tokyo. Culture, food, and adventure!",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    viewerCount: 7654,
    tags: ["travel", "tokyo", "japan", "vlog"],
    category: "Others",
  },
};

export function EventStreamPage({ eventId }: EventStreamPageProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const event = eventData[eventId] || eventData["1"];

  // Ensure component is mounted before running effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setViewerCount(event.viewerCount);
    }, 1200);

    return () => clearTimeout(timer);
  }, [mounted, event.viewerCount]);

  // Simulate viewer count fluctuation
  useEffect(() => {
    if (!mounted || isLoading) return;

    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 21) - 10;
        return Math.max(1000, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, isLoading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <Link href="/" className="flex items-center gap-2 group">
              <Radio className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg text-foreground">StreamHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-live/10 border border-live/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </span>
              <span className="text-sm font-medium text-live">Live Now</span>
            </div>
            {/* Mobile chat toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              {isChatOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Video and Description */}
          <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <VideoPlayer
              videoUrl={event.videoUrl}
              isLoading={isLoading}
            />
            <EventDescription
              title={event.title}
              description={event.description}
              viewerCount={viewerCount}
              tags={event.tags}
              isLive={true}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column - Chat */}
          <div
            className={cn(
              "w-full lg:w-96 xl:w-[420px] lg:sticky lg:top-24",
              "animate-in fade-in slide-in-from-right-4 duration-500 delay-150",
              // Mobile: show/hide based on state
              isChatOpen ? "block" : "hidden lg:block"
            )}
          >
            <div className="h-[500px] lg:h-[calc(100vh-8rem)]">
              <ChatPanel isLoading={isLoading} viewerCount={viewerCount} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">StreamHub</span>
            </div>
            <p>Live streaming platform for creators and viewers worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
