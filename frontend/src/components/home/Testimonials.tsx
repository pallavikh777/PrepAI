function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      company: "Microsoft",
      review:
        "PrepAI helped me improve my confidence before technical interviews.",
    },
    {
      name: "Priya Patel",
      role: "Frontend Developer",
      company: "Adobe",
      review:
        "The AI feedback and resume analyzer were incredibly useful.",
    },
    {
      name: "Arjun Kumar",
      role: "SDE Intern",
      company: "Amazon",
      review:
        "The mock interviews felt realistic and helped me perform better.",
    },
  ];

  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-center text-4xl font-bold text-white">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-8"
            >
              <p className="text-slate-300 leading-7">
                "{review.review}"
              </p>

              <div className="mt-8">
                <h3 className="text-white font-bold">
                  {review.name}
                </h3>

                <p className="text-cyan-400">
                  {review.role} • {review.company}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;