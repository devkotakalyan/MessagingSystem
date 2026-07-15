import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-white">
      <Outlet />
    </div>
  );
}
