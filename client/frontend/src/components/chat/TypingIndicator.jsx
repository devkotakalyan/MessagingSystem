export default function TypingIndicator({ names = [] }) {
  if (names.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-1 py-1 text-xs text-slate-400">
      <div className="flex gap-1 rounded-2xl bg-slate-800 px-3 py-2">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
      </div>
      <span>{names.join(", ")} typing...</span>
    </div>
  );
}
