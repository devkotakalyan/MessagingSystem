import clsx from "clsx";

export default function UserAvatar({ name = "?", src, size = 40, online }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950",
            online ? "bg-emerald-500" : "bg-slate-600"
          )}
        />
      )}
    </div>
  );
}
