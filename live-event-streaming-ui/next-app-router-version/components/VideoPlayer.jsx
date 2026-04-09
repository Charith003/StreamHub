'use client';

import { useState } from 'react';

const STREAM_URL = 'https://www.youtube.com/embed/jfKfPfyJRdk';

export default function VideoPlayer() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500 dark:bg-slate-900/50">
      <div className="relative aspect-video w-full">
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
        )}
        <iframe
          title="Live stream"
          src={STREAM_URL}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </section>
  );
}
