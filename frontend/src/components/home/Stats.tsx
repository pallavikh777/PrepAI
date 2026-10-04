function Stats() {
  const stats = [
    { number: "10K+", label: "Mock Interviews" },
    { number: "500+", label: "Companies Covered" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-white mb-14">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-slate-800 p-8 text-center border border-slate-700 hover:border-cyan-400 transition duration-300"
            >
              <h3 className="text-5xl font-bold text-cyan-400">
                {stat.number}
              </h3>

              <p className="mt-4 text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;