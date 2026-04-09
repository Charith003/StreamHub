'use client';

import { useEffect, useRef } from 'react';
import useLiveChat from '../hooks/useLiveChat';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

export default function ChatPanel() {
  const { messages, sendMessage, onlineCount } = useLiveChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

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

      <ChatInput onSend={sendMessage} />
    </aside>
  );
}
