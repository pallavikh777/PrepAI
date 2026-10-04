import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Feature {
  title: string;
  description: string;
  path: string;
  icon: string;
  status: string;
  score?: number;
}

function Dashboard() {
  const navigate = useNavigate();

  const [interviewScore, setInterviewScore] = useState(0);
  const [codingScore, setCodingScore] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);

  useEffect(() => {
    // Mock Interview score
    const interviewData = localStorage.getItem(
      "prepAIInterviewResult"
    );

    if (interviewData) {
      try {
        const result = JSON.parse(interviewData);
        setInterviewScore(result.overallScore || 0);
      } catch {
        setInterviewScore(0);
      }
    }

    // Coding Assessment score
    const codingData = localStorage.getItem(
      "prepAICodingResult"
    );

    if (codingData) {
      try {
        const result = JSON.parse(codingData);

        if (typeof result === "number") {
          setCodingScore(result);
        } else {
          setCodingScore(result.score || result.overallScore || 0);
        }
      } catch {
        setCodingScore(0);
      }
    }

    // Resume Analyzer score
    const resumeData = localStorage.getItem(
      "prepAIResumeResult"
    );

    if (resumeData) {
      try {
        const result = JSON.parse(resumeData);
        setResumeScore(result.score || 0);
      } catch {
        setResumeScore(0);
      }
    }
  }, []);

  const features: Feature[] = [
    {
      title: "AI Mock Interview",
      description:
        "Practice real interview questions and receive a performance score.",
      path: "/interview",
      icon: "🎤",
      status:
        interviewScore > 0
          ? `Score: ${interviewScore}%`
          : "Not Started",
      score: interviewScore,
    },
    {
      title: "Resume Analyzer",
      description:
        "Analyze your resume and improve its ATS compatibility.",
      path: "/resume-analyzer",
      icon: "📄",
      status:
        resumeScore > 0
          ? `ATS Score: ${resumeScore}%`
          : "Not Analyzed",
      score: resumeScore,
    },
    {
      title: "Voice Interview",
      description:
        "Practice answering interview questions using your voice.",
      path: "/voice-interview",
      icon: "🎙️",
      status: "Available",
    },
    {
      title: "Coding Assessment",
      description:
        "Test your programming skills with coding challenges.",
      path: "/coding-assessment",
      icon: "💻",
      status:
        codingScore > 0
          ? `Score: ${codingScore}%`
          : "Not Started",
      score: codingScore,
    },
    {
      title: "Company Preparation",
      description:
        "Prepare for interviews with company-specific questions.",
      path: "/company-preparation",
      icon: "🏢",
      status: "Available",
    },
    {
      title: "Performance Analytics",
      description:
        "View your interview performance and identify areas to improve.",
      path: "/performance",
      icon: "📊",
      status:
        interviewScore > 0
          ? `Latest: ${interviewScore}%`
          : "No Data",
      score: interviewScore,
    },
  ];

  const completedModules = features.filter(
    (feature) =>
      feature.score !== undefined &&
      feature.score > 0
  ).length;

  const progress = Math.round(
    (completedModules / features.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-bold text-cyan-400">
            PrepAI
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 py-12">

        {/* Welcome */}
        <div>
          <p className="text-cyan-400 font-semibold">
            WELCOME BACK 👋
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Your Interview Preparation Dashboard
          </h2>

          <p className="text-slate-400 mt-3 max-w-2xl">
            Continue practicing, improve your skills and become
            interview ready with PrepAI.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7 mt-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h3 className="text-2xl font-bold">
                Preparation Progress
              </h3>

              <p className="text-slate-400 mt-2">
                {completedModules} of {features.length} modules completed
              </p>
            </div>

            <div className="text-right">
              <p className="text-4xl font-bold text-cyan-400">
                {progress}%
              </p>

              <p className="text-slate-500 text-sm">
                Overall Progress
              </p>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-3 mt-6">

            <div
              className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Feature Cards */}
        <section className="mt-12">

          <h3 className="text-3xl font-bold">
            AI Preparation Tools
          </h3>

          <p className="text-slate-400 mt-2">
            Choose a module and continue your preparation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="group bg-slate-900 border border-slate-700 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
              >

                {/* Icon */}
                <div className="text-5xl">
                  {feature.icon}
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold mt-5">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-slate-400 leading-7 mt-3">
                  {feature.description}
                </p>

                {/* Status */}
                <div className="mt-5">

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      feature.score &&
                      feature.score > 0
                        ? "bg-green-500/10 text-green-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {feature.status}
                  </span>

                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(feature.path)}
                  className="w-full mt-6 bg-cyan-500 text-slate-950 px-5 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
                >
                  {feature.score &&
                  feature.score > 0
                    ? "View / Practice"
                    : "Start"}
                </button>

              </div>

            ))}

          </div>

        </section>

        {/* Quick Stats */}
        <section className="mt-12">

          <h3 className="text-3xl font-bold">
            Quick Statistics
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-7">

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <p className="text-slate-400">
                Interview Score
              </p>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {interviewScore}%
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <p className="text-slate-400">
                Resume ATS Score
              </p>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {resumeScore}%
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <p className="text-slate-400">
                Modules Completed
              </p>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {completedModules}/{features.length}
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;