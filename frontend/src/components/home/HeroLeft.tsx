import { useNavigate } from "react-router-dom";
import Badge from "./Badge";

function HeroLeft() {
  const navigate = useNavigate();

  const handleWatchDemo = () => {
    const featuresSection = document.getElementById("features");

    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="max-w-xl">

      {/* Badge */}
      <Badge />

      {/* Heading */}
      <h1 className="mt-8 text-6xl lg:text-7xl font-extrabold leading-tight text-white">
        Crack Your
        <span className="block text-cyan-400">
          Dream Job
        </span>
        With AI
      </h1>

      {/* Description */}
      <p className="mt-8 text-xl text-slate-300 leading-9">
        Practice HR, Technical, Coding, Resume Analysis,
        Company-specific interviews and receive
        AI-powered feedback instantly.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex gap-5">

        {/* Start Free */}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition cursor-pointer"
        >
          Start Free
        </button>

        {/* Watch Demo */}
        <button
          type="button"
          onClick={handleWatchDemo}
          className="border border-cyan-400 text-cyan-400 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-950 transition cursor-pointer"
        >
          Watch Demo
        </button>

      </div>

      {/* Statistics */}
      <div className="mt-12 flex gap-12">

        <div>
          <h2 className="text-3xl font-bold text-cyan-400">
            10K+
          </h2>

          <p className="text-slate-400">
            Interviews
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-cyan-400">
            500+
          </h2>

          <p className="text-slate-400">
            Companies
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-cyan-400">
            95%
          </h2>

          <p className="text-slate-400">
            Success Rate
          </p>
        </div>

      </div>

    </div>
  );
}

export default HeroLeft;