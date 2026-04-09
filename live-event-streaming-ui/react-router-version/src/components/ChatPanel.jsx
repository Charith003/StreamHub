import { useEffect, useMemo, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const BOT_USERS = ['PixelNinja', 'StreamScout', 'NightOwl', 'BasslineFan', 'CodeVibes'];
const BOT_MESSAGES = [
  'This beat is immaculate 🔥',
  'Camera quality looks so clean!',
  'Anyone watching from New York?',
  'This drop at 2:15 was wild!',
  'Love the live ambience tonight ✨',
  'Chat is so wholesome right now.',
  'This is my favorite stream to focus to.',
];

const formatTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

const createMessage = (user, text, isOwnMessage = false) => ({
  id: crypto.randomUUID(),
  user,
  text,
  time: formatTime(),
  isOwnMessage,
});

export default function ChatPanel() {
  const [messages, setMessages] = useState(() => [
    createMessage('ModBot', 'Welcome to the stream! Keep it respectful 💜'),
    createMessage('LoFiFox', 'Perfect soundtrack for late-night coding.'),
    createMessage('ChillPilot', 'I have this on in the background every day.'),
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
      const text = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
      setMessages((prev) => [...prev, createMessage(user, text)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const onlineCount = useMemo(() => `${(950 + messages.length * 3).toLocaleString()} chatting`, [messages.length]);

  const onSend = (text) => setMessages((prev) => [...prev, createMessage('You', text, true)]);

  return (
    <aside className="flex h-[620px] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/70 shadow-2xl backdrop-blur-xl dark:bg-slate-900/70">
      <header className="border-b border-white/20 px-4 py-3 dark:border-slate-700">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Live Chat</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{onlineCount}</p>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} isOwnMessage={message.isOwnMessage} />
        ))}
      </div>

      <ChatInput onSend={onSend} />
    </aside>
  );
}
