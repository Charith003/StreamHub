import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/70"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.cover}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-red-500/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">🔴 Live</span>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{event.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{event.category}</span>
          <span className="font-medium text-slate-500 dark:text-slate-400">{event.viewers.toLocaleString()} watching</span>
        </div>
      </div>
    </Link>
  );
}
