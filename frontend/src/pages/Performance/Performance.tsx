import { useNavigate } from "react-router-dom";

interface InterviewResult {
  scores: number[];
  answers: string[];
  overallScore: number;
}

function Performance() {
  const navigate = useNavigate();

  const savedResult = localStorage.getItem(
    "prepAIInterviewResult"
  );

  const result: InterviewResult | null = savedResult
    ? JSON.parse(savedResult)
    : null;

  const score = result?.overallScore ?? 0;

  const questions = [
    "Tell me about yourself.",
    "Why should we hire you?",
    "What are your strengths?",
    "What is your biggest weakness?",
    "Where do you see yourself in 5 years?",
  ];

  const performanceData = questions.map(
    (question, index) => ({
      question,
      score: result?.scores?.[index] ?? 0,
    })
  );

  const getPerformanceMessage = () => {
    if (score >= 80) {
      return "Excellent Performance";
    }

    if (score >= 60) {
      return "Good Performance";
    }

    if (score >= 40) {
      return "Needs Improvement";
    }

    return "Keep Practicing";
  };

  const getRecommendation = () => {
    if (score >= 80) {
      return "Interview Ready";
    }

    if (score >= 60) {
      return "Almost Ready";
    }

    return "More Practice Needed";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold text-cyan-400 cursor-pointer"
          >
            PrepAI
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-cyan-400 hover:text-cyan-300"
          >
            Dashboard
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 py-12">

        <h2 className="text-4xl font-bold">
          Interview Performance Report 📊
        </h2>

        <p className="text-slate-400 mt-3">
          Review your performance and identify areas
          for improvement.
        </p>

        {/* Score Overview */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* Overall Score */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">

            <p className="text-slate-400">
              Overall Score
            </p>

            <p className="text-5xl font-bold text-cyan-400 mt-4">
              {score}%
            </p>

            <p className="text-green-400 mt-3">
              {getPerformanceMessage()}
            </p>

          </div>

          {/* Questions */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">

            <p className="text-slate-400">
              Questions Answered
            </p>

            <p className="text-5xl font-bold text-white mt-4">
              {result?.scores?.length ?? 0}
            </p>

            <p className="text-slate-400 mt-3">
              Completed
            </p>

          </div>

          {/* Recommendation */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">

            <p className="text-slate-400">
              Recommendation
            </p>

            <p className="text-3xl font-bold text-green-400 mt-6">
              {getRecommendation()}
            </p>

          </div>

        </div>

        {/* No Interview Yet */}
        {!result && (
          <div className="mt-10 bg-slate-900 border border-yellow-500/30 rounded-2xl p-8 text-center">

            <div className="text-5xl mb-4">
              🎤
            </div>

            <h3 className="text-2xl font-bold">
              No Interview Result Yet
            </h3>

            <p className="text-slate-400 mt-3">
              Complete an AI Mock Interview to see your
              performance report here.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="mt-6 bg-cyan-500 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              Start Interview
            </button>

          </div>
        )}

        {/* Question Performance */}
        {result && (
          <div className="mt-12">

            <h3 className="text-2xl font-bold">
              Question Performance
            </h3>

            <div className="mt-6 space-y-4">

              {performanceData.map(
                (item, index) => (

                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-5"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Question {index + 1}
                        </p>

                        <p className="text-white font-semibold mt-1">
                          {item.question}
                        </p>

                      </div>

                      <p className="text-cyan-400 text-xl font-bold">
                        {item.score}%
                      </p>

                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 mt-4">

                      <div
                        className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>
        )}

        {/* Strengths & Improvements */}
        {result && (
          <div className="grid md:grid-cols-2 gap-6 mt-12">

            {/* Strengths */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-green-400">
                💪 Strengths
              </h3>

              <ul className="mt-5 space-y-3 text-slate-300">

                <li>
                  ✓ Good communication
                </li>

                <li>
                  ✓ Clear answers
                </li>

                <li>
                  ✓ Strong confidence
                </li>

                <li>
                  ✓ Good technical understanding
                </li>

              </ul>

            </div>

            {/* Improvements */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-orange-400">
                🎯 Areas to Improve
              </h3>

              <ul className="mt-5 space-y-3 text-slate-300">

                <li>
                  • Give more detailed examples
                </li>

                <li>
                  • Improve answers about weaknesses
                </li>

                <li>
                  • Practice behavioral questions
                </li>

                <li>
                  • Improve answer structure
                </li>

              </ul>

            </div>

          </div>
        )}

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">

          <button
            onClick={() => navigate("/interview")}
            className="bg-cyan-500 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            Retake Interview
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-950 transition"
          >
            Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default Performance;