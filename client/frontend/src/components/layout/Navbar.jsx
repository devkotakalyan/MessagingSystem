import { FaComments } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaComments className="text-indigo-500 text-3xl" />
          <h1 className="text-2xl font-bold text-white">NovaChat</h1>
        </div>

        <div className="hidden md:flex gap-10 text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition">
            Features
          </a>

          <a href="#preview" className="hover:text-indigo-400 transition">
            Preview
          </a>

          <a href="#contact" className="hover:text-indigo-400 transition">
            Contact
          </a>
        </div>

        <div className="flex gap-3">
          <button className="border border-indigo-500 text-indigo-400 px-5 py-2 rounded-xl hover:bg-indigo-500 hover:text-white transition">
            Login
          </button>

          <button className="bg-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-500 transition">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
