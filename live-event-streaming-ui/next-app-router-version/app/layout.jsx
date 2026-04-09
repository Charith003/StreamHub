import './globals.css';

export const metadata = {
  title: 'Live Event Streaming Platform',
  description: 'Watch immersive live events with real-time chat and modern responsive UX.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
