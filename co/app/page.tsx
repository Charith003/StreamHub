"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Radio, Play, Eye, Clock, Search, TrendingUp, Sparkles, Gamepad2, Mic2, GraduationCap, Music, Waves, MoreHorizontal, Filter, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Format number with commas consistently (avoids locale-based hydration mismatch)
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const events = [
  // Music (6)
  {
    id: "1",
    title: "lofi hip hop radio - beats to relax/study to",
    thumbnail: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=600&h=340&fit=crop",
    viewerCount: 12453,
    isLive: true,
    duration: "5h 23m",
    category: "Music",
    channelName: "Lofi Girl",
  },
  {
    id: "2",
    title: "Chill Electronic Beats - Work & Focus Music",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=340&fit=crop",
    viewerCount: 8234,
    isLive: true,
    duration: "2h 45m",
    category: "Music",
    channelName: "Chillhop Music",
  },
  {
    id: "3",
    title: "Jazz Cafe Radio - Smooth Jazz 24/7",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=340&fit=crop",
    viewerCount: 5621,
    isLive: true,
    duration: "8h 12m",
    category: "Music",
    channelName: "Cafe Music BGM",
  },
  {
    id: "4",
    title: "Classical Piano Live Performance",
    thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&h=340&fit=crop",
    viewerCount: 2156,
    isLive: true,
    duration: "45m",
    category: "Music",
    channelName: "Piano Academy",
  },
  {
    id: "5",
    title: "Synthwave Radio - Retro Vibes 24/7",
    thumbnail: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&h=340&fit=crop",
    viewerCount: 4892,
    isLive: true,
    duration: "3h 10m",
    category: "Music",
    channelName: "Retro Wave",
  },
  {
    id: "6",
    title: "Acoustic Sessions - Live From Studio",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=340&fit=crop",
    viewerCount: 1834,
    isLive: true,
    duration: "1h 20m",
    category: "Music",
    channelName: "Acoustic Live",
  },
  // Ambient (4)
  {
    id: "7",
    title: "Ambient Sounds for Deep Focus",
    thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=340&fit=crop",
    viewerCount: 3892,
    isLive: true,
    duration: "1h 30m",
    category: "Ambient",
    channelName: "Focus Flow",
  },
  {
    id: "8",
    title: "Nature Sounds - Forest Rain Ambience",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=340&fit=crop",
    viewerCount: 4521,
    isLive: true,
    duration: "3h 15m",
    category: "Ambient",
    channelName: "Nature Vibes",
  },
  {
    id: "9",
    title: "Ocean Waves - Beach Relaxation",
    thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=340&fit=crop",
    viewerCount: 2987,
    isLive: true,
    duration: "6h 45m",
    category: "Ambient",
    channelName: "Calm Seas",
  },
  {
    id: "10",
    title: "Fireplace Sounds - Cozy Winter Night",
    thumbnail: "https://images.unsplash.com/photo-1543459176-4426b37223ba?w=600&h=340&fit=crop",
    viewerCount: 1654,
    isLive: true,
    duration: "4h 30m",
    category: "Ambient",
    channelName: "Cozy Corner",
  },
  // Gaming (6)
  {
    id: "11",
    title: "Speedrun Marathon - Classic Games",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=340&fit=crop",
    viewerCount: 18234,
    isLive: true,
    duration: "4h 12m",
    category: "Gaming",
    channelName: "SpeedDemon",
  },
  {
    id: "12",
    title: "Pro League Finals - Championship Match",
    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=340&fit=crop",
    viewerCount: 45621,
    isLive: true,
    duration: "2h 30m",
    category: "Gaming",
    channelName: "Esports Central",
  },
  {
    id: "13",
    title: "Indie Game Showcase - Hidden Gems",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=600&h=340&fit=crop",
    viewerCount: 3456,
    isLive: true,
    duration: "1h 45m",
    category: "Gaming",
    channelName: "Indie Explorer",
  },
  {
    id: "14",
    title: "Retro Gaming Night - 90s Classics",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=340&fit=crop",
    viewerCount: 5678,
    isLive: true,
    duration: "3h 20m",
    category: "Gaming",
    channelName: "RetroGamer",
  },
  {
    id: "15",
    title: "Building in Survival Mode - Day 100",
    thumbnail: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=340&fit=crop",
    viewerCount: 8901,
    isLive: true,
    duration: "5h 10m",
    category: "Gaming",
    channelName: "CraftMaster",
  },
  {
    id: "16",
    title: "Horror Game Marathon - Scary Night",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&h=340&fit=crop",
    viewerCount: 7234,
    isLive: true,
    duration: "2h 55m",
    category: "Gaming",
    channelName: "ScreamQueen",
  },
  // Talk Shows (5)
  {
    id: "17",
    title: "Morning Coffee Chat - Daily Updates",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=340&fit=crop",
    viewerCount: 4567,
    isLive: true,
    duration: "1h 15m",
    category: "Talk Shows",
    channelName: "Coffee Talk",
  },
  {
    id: "18",
    title: "Tech News Roundup - Weekly Digest",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=340&fit=crop",
    viewerCount: 6789,
    isLive: true,
    duration: "45m",
    category: "Talk Shows",
    channelName: "TechBytes",
  },
  {
    id: "19",
    title: "Celebrity Interview - Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=340&fit=crop",
    viewerCount: 12345,
    isLive: true,
    duration: "55m",
    category: "Talk Shows",
    channelName: "Star Talk",
  },
  {
    id: "20",
    title: "Podcast Live - Listener Q&A",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=340&fit=crop",
    viewerCount: 3456,
    isLive: true,
    duration: "1h 30m",
    category: "Talk Shows",
    channelName: "The Podcast Show",
  },
  {
    id: "21",
    title: "Comedy Hour - Stand Up Special",
    thumbnail: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=340&fit=crop",
    viewerCount: 8765,
    isLive: true,
    duration: "1h 00m",
    category: "Talk Shows",
    channelName: "Laugh Factory",
  },
  // Education (5)
  {
    id: "22",
    title: "JavaScript Masterclass - Advanced Concepts",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=340&fit=crop",
    viewerCount: 5432,
    isLive: true,
    duration: "2h 00m",
    category: "Education",
    channelName: "Code Academy",
  },
  {
    id: "23",
    title: "Physics Explained - Quantum Mechanics",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop",
    viewerCount: 3210,
    isLive: true,
    duration: "1h 20m",
    category: "Education",
    channelName: "Science Hub",
  },
  {
    id: "24",
    title: "Language Learning - Spanish for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=340&fit=crop",
    viewerCount: 2876,
    isLive: true,
    duration: "50m",
    category: "Education",
    channelName: "Polyglot Pro",
  },
  {
    id: "25",
    title: "History Deep Dive - Ancient Civilizations",
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=600&h=340&fit=crop",
    viewerCount: 4123,
    isLive: true,
    duration: "1h 40m",
    category: "Education",
    channelName: "History Channel",
  },
  {
    id: "26",
    title: "Math Tutoring - Calculus Made Easy",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=340&fit=crop",
    viewerCount: 1987,
    isLive: true,
    duration: "1h 15m",
    category: "Education",
    channelName: "Math Wizard",
  },
  // Others (4)
  {
    id: "27",
    title: "Cooking Live - Italian Cuisine Night",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=340&fit=crop",
    viewerCount: 6543,
    isLive: true,
    duration: "1h 30m",
    category: "Others",
    channelName: "Chef Marco",
  },
  {
    id: "28",
    title: "Art Stream - Digital Painting Session",
    thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=340&fit=crop",
    viewerCount: 2345,
    isLive: true,
    duration: "2h 45m",
    category: "Others",
    channelName: "Art Studio",
  },
  {
    id: "29",
    title: "Fitness Live - HIIT Workout",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=340&fit=crop",
    viewerCount: 4321,
    isLive: true,
    duration: "45m",
    category: "Others",
    channelName: "FitLife",
  },
  {
    id: "30",
    title: "Travel Vlog - Exploring Tokyo Streets",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=340&fit=crop",
    viewerCount: 7654,
    isLive: true,
    duration: "1h 55m",
    category: "Others",
    channelName: "Wanderlust",
  },
];

const categories = [
  { name: "All", icon: Grid3X3 },
  { name: "Music", icon: Music },
  { name: "Ambient", icon: Waves },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Talk Shows", icon: Mic2 },
  { name: "Education", icon: GraduationCap },
  { name: "Others", icon: MoreHorizontal },
];

function EventCard({ event, index, viewMode }: { event: typeof events[0]; index: number; viewMode: "grid" | "list" }) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === "list") {
    return (
      <Link
        href={`/event/${event.id}`}
        className={cn(
          "group flex gap-4 p-3 rounded-xl bg-card border border-border",
          "transform transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:bg-secondary/30",
          "animate-in fade-in slide-in-from-left-4",
        )}
        style={{ animationDelay: `${index * 40}ms`, animationFillMode: "both" }}
      >
        {/* Thumbnail */}
        <div className="relative w-48 aspect-video rounded-lg overflow-hidden shrink-0">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {event.isLive && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-live text-white text-xs font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs">
            <Clock className="w-3 h-3" />
            {event.duration}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {event.category}
            </span>
          </div>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors mb-1">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground">{event.channelName}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatNumber(event.viewerCount)} watching
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/event/${event.id}`}
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border",
        "transform transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
        "animate-in fade-in slide-in-from-bottom-4",
      )}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}>
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-lg shadow-primary/30">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Live badge */}
        {event.isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-live text-white text-xs font-bold uppercase tracking-wide shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Live
          </div>
        )}

        {/* Duration */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          {event.duration}
        </div>

        {/* Viewer count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
          <Eye className="w-3 h-3" />
          {formatNumber(event.viewerCount)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {event.category}
          </span>
          <span className="text-xs text-muted-foreground">{event.channelName}</span>
        </div>
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"viewers" | "duration">("viewers");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [mounted]);

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.channelName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort events
    if (sortBy === "viewers") {
      filtered = [...filtered].sort((a, b) => b.viewerCount - a.viewerCount);
    } else {
      filtered = [...filtered].sort((a, b) => {
        const durationA = parseDuration(a.duration);
        const durationB = parseDuration(b.duration);
        return durationB - durationA;
      });
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalViewers = events.reduce((sum, e) => sum + e.viewerCount, 0);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: events.length };
    events.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-foreground">StreamHub</span>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search streams, channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-live/10 border border-live/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </span>
              <span className="text-sm font-medium text-live">{events.length} Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-10 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>{formatNumber(totalViewers)} viewers watching now</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Live Streaming for Everyone
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-lg mx-auto">
              Join thousands of viewers watching live streams. From music to gaming, education to entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Search */}
      <div className="container mx-auto px-4 mb-4 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search streams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-secondary/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <section className="container mx-auto px-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "rounded-full whitespace-nowrap transition-all gap-2",
                  selectedCategory === category.name 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" 
                    : "hover:bg-secondary"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.name}
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  selectedCategory === category.name 
                    ? "bg-primary-foreground/20" 
                    : "bg-muted"
                )}>
                  {categoryCounts[category.name] || 0}
                </span>
              </Button>
            );
          })}
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              {selectedCategory === "All" ? "All Streams" : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">({filteredEvents.length})</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <div className="flex items-center gap-1 text-sm">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "viewers" | "duration")}
                className="bg-secondary border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="viewers">Most Viewers</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid/List */}
      <section className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "flex flex-col gap-3"
          )}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={cn(
                "rounded-xl overflow-hidden bg-card border border-border",
                viewMode === "list" && "flex gap-4 p-3"
              )}>
                <div className={cn(
                  "bg-secondary animate-pulse",
                  viewMode === "grid" ? "aspect-video" : "w-48 aspect-video rounded-lg shrink-0"
                )} />
                <div className={cn(
                  "space-y-3",
                  viewMode === "grid" ? "p-4" : "flex-1 py-2"
                )}>
                  <div className="h-4 w-20 bg-secondary animate-pulse rounded-full" />
                  <div className="h-5 w-full bg-secondary animate-pulse rounded" />
                  {viewMode === "list" && <div className="h-4 w-32 bg-secondary animate-pulse rounded" />}
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No streams found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "flex flex-col gap-3"
          )}>
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} viewMode={viewMode} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
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

// Helper function to parse duration string to minutes
function parseDuration(duration: string): number {
  const parts = duration.match(/(\d+)h?\s*(\d+)?m?/);
  if (!parts) return 0;
  const hours = parseInt(parts[1]) || 0;
  const minutes = parseInt(parts[2]) || 0;
  return hours * 60 + minutes;
}
