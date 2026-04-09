import { Link, useParams } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import EventDescription from '../components/EventDescription';
import VideoPlayer from '../components/VideoPlayer';

export default function EventPage() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-fuchsia-50 px-4 py-6 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 sm:px-6 lg:px-8">
      <div className="mx-auto mb-4 max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
        >
          ← Back to live events
        </Link>
      </div>

      <div className="mx-auto max-w-7xl animate-[fadeIn_450ms_ease-out]">
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
          <div>
            <VideoPlayer />
            <EventDescription eventId={id} />
          </div>
          <div>
            <ChatPanel />
          </div>
        </section>
      </div>
    </main>
  );
}
