import type { Metadata } from "next";
import { EventStreamPage } from "./EventStreamPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Live Event ${id} | StreamHub`,
    description: "Join the live stream and chat with thousands of viewers in real-time. High quality streaming with live chat interaction.",
    openGraph: {
      title: `Live Event ${id} | StreamHub`,
      description: "Join the live stream and chat with thousands of viewers in real-time.",
      type: "video.other",
      siteName: "StreamHub",
      images: [
        {
          url: "/og-stream.jpg",
          width: 1200,
          height: 630,
          alt: "Live Stream Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Live Event ${id} | StreamHub`,
      description: "Join the live stream and chat with thousands of viewers in real-time.",
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;
  
  return <EventStreamPage eventId={id} />;
}
