'use client';

import { useEffect, useMemo, useState } from 'react';
import { BOT_MESSAGES, BOT_USERS, formatTime } from '../utils/chatData';

const createMessage = (user, text, isOwnMessage = false) => ({
  id: crypto.randomUUID(),
  user,
  text,
  time: formatTime(),
  isOwnMessage,
});

export default function useLiveChat() {
  const [messages, setMessages] = useState(() => [
    createMessage('ModBot', 'Welcome to the stream! Keep it respectful 💜'),
    createMessage('LoFiFox', 'Perfect soundtrack for late-night coding.'),
    createMessage('ChillPilot', 'I have this on in the background every day.'),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
      const text = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
      setMessages((prev) => [...prev, createMessage(user, text)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const onlineCount = useMemo(() => `${(950 + messages.length * 3).toLocaleString()} chatting`, [messages.length]);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, createMessage('You', text, true)]);
  };

  return { messages, sendMessage, onlineCount };
}
