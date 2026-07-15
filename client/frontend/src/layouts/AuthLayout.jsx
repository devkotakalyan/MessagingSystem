import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-bold text-white">
            💬 Nova<span className="text-indigo-500">Chat</span>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
