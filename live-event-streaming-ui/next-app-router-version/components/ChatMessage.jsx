export default function ChatMessage({ message, isOwnMessage }) {
  return (
    <article
      className={`group flex gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 ${
        isOwnMessage ? 'animate-[fadeUp_220ms_ease-out]' : 'animate-[fadeIn_350ms_ease-out]'
      }`}
    >
      <div className="mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 p-[1px] shadow-md">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-100">
          {message.user.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div className="min-w-0">
        <p className="mb-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-800 dark:text-slate-100">{message.user}</span>
          <time>{message.time}</time>
        </p>
        <p className="inline-block rounded-2xl bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-md dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700">
          {message.text}
        </p>
      </div>
    </article>
  );
}
