import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features/Features";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section
        id="home"
        className="scroll-mt-24"
      >
        <Hero />
      </section>

      {/* Features */}
      <section
        id="features"
        className="scroll-mt-24"
      >
        <Features />
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-4xl mx-auto text-center">

            <p className="text-cyan-400 font-semibold tracking-wide">
              ABOUT PREPAI
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Prepare Smarter. Interview Better.
            </h2>

            <p className="text-slate-400 text-lg mt-6 leading-8">
              PrepAI is an AI-powered interview preparation platform
              designed to help students and job seekers improve their
              interview skills through realistic practice and
              personalized feedback.
            </p>

          </div>

          {/* About Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-cyan-400 transition">

              <div className="text-4xl">
                🎯
              </div>

              <h3 className="text-xl font-bold mt-5">
                Practice
              </h3>

              <p className="text-slate-400 mt-3 leading-7">
                Practice HR, technical, coding and company-specific
                interview questions in a realistic environment.
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-cyan-400 transition">

              <div className="text-4xl">
                📊
              </div>

              <h3 className="text-xl font-bold mt-5">
                Analyze
              </h3>

              <p className="text-slate-400 mt-3 leading-7">
                Understand your performance through scores, feedback,
                resume analysis and performance analytics.
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-cyan-400 transition">

              <div className="text-4xl">
                🚀
              </div>

              <h3 className="text-xl font-bold mt-5">
                Improve
              </h3>

              <p className="text-slate-400 mt-3 leading-7">
                Identify your weaknesses, improve your answers and
                build confidence for real interviews.
              </p>

            </div>

          </div>

          {/* About Bottom Card */}
          <div className="mt-10 bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 text-center">

            <h3 className="text-2xl font-bold">
              Everything You Need in One Platform
            </h3>

            <p className="text-slate-400 max-w-3xl mx-auto mt-4 leading-7">
              From mock interviews and voice interviews to resume
              analysis, coding assessments, company preparation and
              performance tracking, PrepAI brings your interview
              preparation into one place.
            </p>

          </div>

        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 bg-slate-900 border-y border-slate-800"
      >
        <div className="max-w-5xl mx-auto px-6 py-24">

          {/* Contact Heading */}
          <div className="text-center">

            <p className="text-cyan-400 font-semibold tracking-wide">
              CONTACT
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Get in Touch With PrepAI
            </h2>

            <p className="text-slate-400 text-lg mt-5">
              Have a question, suggestion or feedback?
              We'd love to hear from you.
            </p>

          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mt-12">

            <form
              onSubmit={(event) => {
                event.preventDefault();

                const form = event.currentTarget;

                const name = (
                  form.elements.namedItem("name") as HTMLInputElement
                ).value;

                const email = (
                  form.elements.namedItem("email") as HTMLInputElement
                ).value;

                const subject = (
                  form.elements.namedItem("subject") as HTMLInputElement
                ).value;

                const message = (
                  form.elements.namedItem("message") as HTMLTextAreaElement
                ).value;

                const emailBody = `
Name: ${name}

Email: ${email}

Message:
${message}
                `;

                const mailtoLink =
                  `mailto:pallavikh550@gmail.com` +
                  `?subject=${encodeURIComponent(subject)}` +
                  `&body=${encodeURIComponent(emailBody)}`;

                window.location.href = mailtoLink;
              }}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-8"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-slate-300 font-semibold mb-2"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Email */}
              <div className="mt-5">

                <label
                  htmlFor="email"
                  className="block text-slate-300 font-semibold mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />

              </div>

              {/* Subject */}
              <div className="mt-5">

                <label
                  htmlFor="subject"
                  className="block text-slate-300 font-semibold mb-2"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What is this regarding?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />

              </div>

              {/* Message */}
              <div className="mt-5">

                <label
                  htmlFor="message"
                  className="block text-slate-300 font-semibold mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-cyan-400 transition"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-7 bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition cursor-pointer"
              >
                📩 Send Message
              </button>

              <p className="text-slate-500 text-sm text-center mt-4">
                Your email app will open with the message ready to send.
              </p>

            </form>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          <p className="text-slate-400 font-semibold">
            PrepAI
          </p>

          <p className="text-slate-500 mt-2">
            AI-powered interview preparation platform.
          </p>

          <p className="text-slate-600 text-sm mt-4">
            © {new Date().getFullYear()} PrepAI. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;