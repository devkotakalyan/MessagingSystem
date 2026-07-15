import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { FiSend, FiSmile, FiPaperclip } from "react-icons/fi";

export default function MessageInput({ onSend, onTyping, disabled }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
    setShowEmoji(false);
  }

  return (
    <div className="relative border-t border-slate-800 bg-slate-900/40 p-3">
      {showEmoji && (
        <div className="absolute bottom-full right-3 mb-2">
          <EmojiPicker
            theme="dark"
            onEmojiClick={(emoji) => setText((prev) => prev + emoji.emoji)}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg p-2.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <FiPaperclip size={18} />
        </button>
        {/* Wire this up to profileService/chatService storage upload logic for real file sharing */}
        <input ref={fileInputRef} type="file" className="hidden" disabled={disabled} />

        <button
          type="button"
          onClick={() => setShowEmoji((v) => !v)}
          className="rounded-lg p-2.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <FiSmile size={18} />
        </button>

        <textarea
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(e) => {
            setText(e.target.value);
            onTyping?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
          }}
          placeholder="Type a message"
          className="max-h-32 flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="rounded-lg bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          <FiSend size={18} />
        </button>
      </form>
    </div>
  );
}
