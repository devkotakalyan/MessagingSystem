import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-indigo-500">NovaChat</h2>

          <p className="text-slate-400 mt-3">
            Built with React, Tailwind & Supabase.
          </p>
        </div>

        <div className="flex gap-6 text-2xl mt-8 md:mt-0">
          <FaGithub className="hover:text-indigo-500 cursor-pointer transition" />

          <FaLinkedin className="hover:text-indigo-500 cursor-pointer transition" />

          <FaInstagram className="hover:text-indigo-500 cursor-pointer transition" />
        </div>
      </div>

      <p className="text-center text-slate-500 mt-10">
        © 2026 NovaChat. All Rights Reserved.
      </p>
    </footer>
  );
}
