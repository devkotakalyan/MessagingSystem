import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 pt-40 pb-24 flex flex-col lg:flex-row items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        <span className="bg-indigo-600 px-4 py-2 rounded-full">
          🚀 Realtime Messaging
        </span>

        <h1 className="text-6xl font-bold mt-8 leading-tight text-white">
          Chat Without
          <span className="text-indigo-500"> Limits.</span>
        </h1>

        <p className="text-slate-400 mt-6 text-lg">
          Secure messaging platform built with React, Supabase and Tailwind CSS.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="bg-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-500 transition">
            Get Started
          </button>

          <button className="border border-slate-600 px-8 py-4 rounded-xl hover:bg-slate-800 transition">
            Learn More
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-20 lg:mt-0"
      >
        <div className="w[380px] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl">
          <div className="bg-indigo-600 rounded-t-3xl p-4 text-center font-semibold">
            NovaChat
          </div>

          <div className="space-y-4 p-6">
            <div className="bg-slate-800 p-3 rounded-xl w-fit">👋 Hello!</div>

            <div className="bg-indigo-600 p-3 rounded-xl ml-auto w-fit">
              Hi there!
            </div>

            <div className="bg-slate-800 p-3 rounded-xl w-fit">
              Ready to build?
            </div>

            <div className="bg-indigo-600 p-3 rounded-xl ml-auto w-fit">
              Absolutely 🚀
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
