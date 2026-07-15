export default function Stats() {
  const stats = [
    { value: "100+", label: "Countries" },
    { value: "99.9%", label: "Realtime" },
    { value: "24/7", label: "Online" },
    { value: "Secure", label: "Authentication" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-slate-900 p-8 rounded-2xl text-center border border-slate-800"
          >
            <h2 className="text-4xl font-bold text-indigo-500">{item.value}</h2>

            <p className="text-slate-400 mt-3">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
