function Companies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Netflix",
    "Adobe",
    "IBM",
    "Accenture",
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-center text-4xl font-bold text-white">
          Trusted by Candidates Preparing For
        </h2>

        <p className="text-center text-slate-400 mt-4">
          Practice interviews for the world's leading companies.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">

          {companies.map((company) => (
            <div
              key={company}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-white">
                {company}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Companies;