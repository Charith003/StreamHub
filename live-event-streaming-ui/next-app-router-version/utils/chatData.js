export const BOT_USERS = ['PixelNinja', 'StreamScout', 'NightOwl', 'BasslineFan', 'CodeVibes'];

export const BOT_MESSAGES = [
  'This beat is immaculate 🔥',
  'Camera quality looks so clean!',
  'Anyone watching from New York?',
  'This drop at 2:15 was wild!',
  'Love the live ambience tonight ✨',
  'Chat is so wholesome right now.',
  'This is my favorite stream to focus to.',
];

export const formatTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
