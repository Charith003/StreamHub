const TAGS = ['Lo-fi', 'Focus', 'Community', 'Live Beats', 'Chill'];

export default function EventDescription({ eventId }) {
  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:bg-slate-900/70">
      <header className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Night Flow Sessions • Event #{eventId}</h1>
        <span className="rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">🔴 Live</span>
        <span className="rounded-full bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-white dark:bg-slate-200 dark:text-slate-900">12.6k watching</span>
      </header>

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Join a continuous live session blending lo-fi beats and ambient visuals designed for work, study, and creative flow. Chat with other
        viewers, share your current project, and enjoy a distraction-free vibe in real time.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1 text-xs font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}
