import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";

export default function Preview() {
  return (
    <section id="preview" className="py-28">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-white">
          See NovaChat in Action
        </h2>

        <p className="text-slate-400 text-center mt-5">
          Beautiful interface with lightning-fast realtime messaging.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-20 bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl"
        >
          {/* Header */}

          <div className="bg-slate-800 flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                JD
              </div>

              <div>
                <h3 className="font-semibold">John Doe</h3>

                <p className="text-green-400 text-sm flex items-center gap-2">
                  <FaCircle size={8} />
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}

          <div className="space-y-5 p-8">
            <div className="bg-slate-800 w-fit px-5 py-3 rounded-2xl">
              👋 Hello!
            </div>

            <div className="bg-indigo-600 w-fit ml-auto px-5 py-3 rounded-2xl">
              Hi! How's your day?
            </div>

            <div className="bg-slate-800 w-fit px-5 py-3 rounded-2xl">
              Pretty good. Building NovaChat 🚀
            </div>

            <div className="bg-indigo-600 w-fit ml-auto px-5 py-3 rounded-2xl">
              Looks awesome already 😄
            </div>

            <div className="text-slate-500 text-sm">Typing...</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
