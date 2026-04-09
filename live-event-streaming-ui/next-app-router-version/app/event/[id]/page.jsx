import ChatPanel from '../../../components/ChatPanel';
import EventDescription from '../../../components/EventDescription';
import VideoPlayer from '../../../components/VideoPlayer';

export async function generateMetadata({ params }) {
  const { id } = await params;

  const title = `Night Flow Sessions • Event #${id}`;
  const description = 'Watch the live lo-fi event with immersive visuals, real-time community chat, and smooth responsive UI.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://example.com/event/${id}`,
      siteName: 'Live Event Streaming Platform',
    },
  };
}

export default async function EventPage({ params }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-fuchsia-50 px-4 py-6 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 sm:px-6 lg:px-8">
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
