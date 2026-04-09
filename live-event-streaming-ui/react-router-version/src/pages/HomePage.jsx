import { useMemo, useState } from 'react';
import EventCard from '../components/EventCard';
import { EVENTS } from '../data/events';

const CATEGORIES = ['All', ...new Set(EVENTS.map((event) => event.category))];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const byCategory = category === 'All' || event.category === category;
      const byQuery =
        event.title.toLowerCase().includes(query.toLowerCase()) || event.description.toLowerCase().includes(query.toLowerCase());

      return byCategory && byQuery;
    });
  }, [query, category]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-fuchsia-50 px-4 py-6 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-[fadeIn_450ms_ease-out]">
        <header className="mb-6 rounded-2xl border border-white/20 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:bg-slate-900/70">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">StreamHub</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Discover Live Events</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Click any event card to open the streaming experience and join live chat.</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search live events"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    category === item
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      </div>
    </main>
  );
}
