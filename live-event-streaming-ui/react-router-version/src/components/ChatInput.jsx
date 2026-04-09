import { useState } from 'react';

const MAX_CHARS = 180;

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('');

  const submitMessage = (event) => {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;

    onSend(message);
    setValue('');
  };

  return (
    <form onSubmit={submitMessage} className="sticky bottom-0 border-t border-white/20 bg-white/70 p-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
      <label htmlFor="chat-input" className="sr-only">
        Send a message
      </label>
      <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 transition-shadow focus-within:shadow-md dark:border-slate-700 dark:bg-slate-800">
        <button type="button" className="rounded-lg p-2 text-lg transition hover:scale-110 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Add emoji">
          😊
        </button>

        <div className="flex-1">
          <textarea
            id="chat-input"
            rows={1}
            maxLength={MAX_CHARS}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Say something nice..."
            className="max-h-24 w-full resize-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <p className="mt-1 text-right text-[11px] text-slate-400 dark:text-slate-500">{value.length}/{MAX_CHARS}</p>
        </div>

        <button
          type="submit"
          disabled={!value.trim()}
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-sm font-medium text-white shadow transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </form>
  );
}
