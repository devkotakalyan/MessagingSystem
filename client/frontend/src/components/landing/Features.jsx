import { FaLock, FaRocket, FaGlobe } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaRocket size={40} />,
      title: "Lightning Fast",
      desc: "Realtime messaging powered by Supabase.",
    },

    {
      icon: <FaLock size={40} />,
      title: "Secure",
      desc: "Authentication and protected communication.",
    },

    {
      icon: <FaGlobe size={40} />,
      title: "Cross Platform",
      desc: "Works on desktop and mobile.",
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center">Features</h2>

        <div className="grid md:grid-cols-3 gap-10 mt-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-900 p-10 rounded-2xl border border-slate-800 hover:border-indigo-500 transition"
            >
              <div className="text-indigo-500">{feature.icon}</div>

              <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>

              <p className="text-slate-400 mt-4">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
