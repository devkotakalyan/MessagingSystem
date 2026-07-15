export default function Loader({ fullScreen = false, label = "Loading..." }) {
  return (
    <div
      className={
        fullScreen
          ? "flex h-screen w-screen items-center justify-center bg-slate-950"
          : "flex items-center justify-center py-10"
      }
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </div>
  );
}
