import clsx from "clsx";
import { formatMessageTime } from "../../utils/formatTime";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={clsx("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm",
          isOwn
            ? "rounded-br-sm bg-indigo-600 text-white"
            : "rounded-bl-sm bg-slate-800 text-slate-100"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div
          className={clsx(
            "mt-1 flex items-center gap-1 text-[10px]",
            isOwn ? "text-indigo-200" : "text-slate-400"
          )}
        >
          <span>{formatMessageTime(message.created_at)}</span>
          {isOwn && <span>{message.read_at ? "✓✓ Read" : "✓ Sent"}</span>}
        </div>
      </div>
    </div>
  );
}
