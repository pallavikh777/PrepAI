import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  keywords: string[];
}

const questions: Question[] = [
  {
    question: "Tell me about yourself.",
    keywords: ["name", "education", "skills", "experience", "goal"],
  },
  {
    question: "Why should we hire you?",
    keywords: ["skills", "company", "value", "learn", "contribute"],
  },
  {
    question: "What are your strengths?",
    keywords: ["communication", "teamwork", "problem", "learning", "adapt"],
  },
  {
    question: "What is your biggest weakness?",
    keywords: ["improve", "learning", "challenge", "work", "develop"],
  },
  {
    question: "Where do you see yourself in 5 years?",
    keywords: ["career", "growth", "skills", "experience", "goal"],
  },
];

function Interview() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  // ------------------------------------------
  // CALCULATE SCORE
  // ------------------------------------------
  const calculateAnswerScore = (userAnswer: string) => {
    const text = userAnswer.trim().toLowerCase();

    if (!text) {
      return 0;
    }

    let score = 10;

    // Keyword matching
    const matchedKeywords = question.keywords.filter((keyword) =>
      text.includes(keyword.toLowerCase())
    );

    score += matchedKeywords.length * 12;

    // Answer length
    if (text.length >= 50) {
      score += 20;
    }

    if (text.length >= 100) {
      score += 15;
    }

    if (text.length >= 150) {
      score += 10;
    }

    // Sentence structure
    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0);

    if (sentences.length >= 2) {
      score += 5;
    }

    // Maximum score
    return Math.min(score, 100);
  };

  // ------------------------------------------
  // NEXT QUESTION / SUBMIT
  // ------------------------------------------
  const handleNext = () => {
    if (!answer.trim()) {
      alert("Please enter your answer before continuing.");
      return;
    }

    const answerScore = calculateAnswerScore(answer);

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;

    const updatedScores = [...scores];
    updatedScores[currentQuestion] = answerScore;

    setAnswers(updatedAnswers);
    setScores(updatedScores);

    // ------------------------------------------
    // LAST QUESTION
    // ------------------------------------------
    if (currentQuestion === questions.length - 1) {
      const finalScores = updatedScores;

      const totalScore = finalScores.reduce(
        (total, value) => total + value,
        0
      );

      const finalOverallScore = Math.round(
        totalScore / questions.length
      );

      const interviewResult = {
        scores: finalScores,
        answers: updatedAnswers,
        overallScore: finalOverallScore,
      };

      // Clear old result
      localStorage.removeItem("prepAIInterviewResult");

      // Save NEW result
      localStorage.setItem(
        "prepAIInterviewResult",
        JSON.stringify(interviewResult)
      );

      console.log("PrepAI Interview Result:", interviewResult);

      setCompleted(true);

      return;
    }

    // Move to next question
    const nextQuestion = currentQuestion + 1;

    setCurrentQuestion(nextQuestion);
    setAnswer(updatedAnswers[nextQuestion] || "");
  };

  // ------------------------------------------
  // PREVIOUS QUESTION
  // ------------------------------------------
  const handlePrevious = () => {
    if (currentQuestion === 0) {
      return;
    }

    const previousQuestion = currentQuestion - 1;

    setCurrentQuestion(previousQuestion);
    setAnswer(answers[previousQuestion] || "");
  };

  // ------------------------------------------
  // RESTART
  // ------------------------------------------
  const restartInterview = () => {
    localStorage.removeItem("prepAIInterviewResult");

    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setScores([]);
    setCompleted(false);
  };

  // ------------------------------------------
  // OVERALL SCORE
  // ------------------------------------------
  const overallScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((total, value) => total + value, 0) /
            scores.length
        )
      : 0;

  // ------------------------------------------
  // PERFORMANCE LEVEL
  // ------------------------------------------
  const getPerformanceLevel = () => {
    if (overallScore >= 80) {
      return {
        title: "Excellent Performance",
        message:
          "You demonstrated strong interview skills and gave well-structured answers.",
      };
    }

    if (overallScore >= 60) {
      return {
        title: "Good Performance",
        message:
          "You have a good foundation. A little more practice can make your answers stronger.",
      };
    }

    if (overallScore >= 40) {
      return {
        title: "Needs Improvement",
        message:
          "You are on the right track. Keep practicing and improve the structure of your answers.",
      };
    }

    return {
      title: "Keep Practicing",
      message:
        "Practice more interviews and focus on giving detailed, relevant answers.",
    };
  };

  const performance = getPerformanceLevel();

  // =========================================================
  // COMPLETED / RESULT PAGE
  // =========================================================

  if (completed) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        {/* HEADER */}
        <header className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

            <h1 className="text-2xl font-bold text-cyan-400">
              PrepAI
            </h1>

            <button
              onClick={() => navigate("/dashboard")}
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Dashboard
            </button>

          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-6 py-12">

          {/* TITLE */}
          <div className="text-center">

            <p className="text-cyan-400 font-semibold">
              INTERVIEW REPORT
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Interview Performance 📊
            </h2>

            <p className="text-slate-400 mt-3">
              Here is your performance summary from the mock interview.
            </p>

          </div>

          {/* OVERALL SCORE */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 mt-10">

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <div className="text-center">

                <p className="text-slate-400 text-lg">
                  Overall Score
                </p>

                <p className="text-7xl font-bold text-cyan-400 mt-3">
                  {overallScore}%
                </p>

                <p className="text-xl font-semibold text-green-400 mt-4">
                  {performance.title}
                </p>

                <p className="text-slate-400 mt-3">
                  {performance.message}
                </p>

              </div>

              {/* SKILL BARS */}
              <div className="space-y-5">

                {/* Communication */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">
                      Communication
                    </span>

                    <span className="text-cyan-400">
                      {Math.min(100, overallScore + 5)}%
                    </span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full">
                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          overallScore + 5
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Answer Quality */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">
                      Answer Quality
                    </span>

                    <span className="text-cyan-400">
                      {overallScore}%
                    </span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full">
                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${overallScore}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Relevance */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">
                      Relevance
                    </span>

                    <span className="text-cyan-400">
                      {Math.min(100, overallScore + 3)}%
                    </span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full">
                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          overallScore + 3
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">
                      Confidence
                    </span>

                    <span className="text-cyan-400">
                      {Math.max(0, overallScore - 5)}%
                    </span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full">
                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${Math.max(
                          0,
                          overallScore - 5
                        )}%`,
                      }}
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* STRENGTHS + IMPROVEMENTS */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {/* Strengths */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7">

              <h3 className="text-2xl font-bold text-green-400">
                ⭐ Strengths
              </h3>

              <div className="mt-6 space-y-4">

                <div className="flex gap-3">
                  <span className="text-green-400">
                    ✓
                  </span>

                  <p className="text-slate-300">
                    You completed all interview questions.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400">
                    ✓
                  </span>

                  <p className="text-slate-300">
                    You attempted every question.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400">
                    ✓
                  </span>

                  <p className="text-slate-300">
                    You are actively practicing interview skills.
                  </p>
                </div>

              </div>

            </div>

            {/* Improvements */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7">

              <h3 className="text-2xl font-bold text-orange-400">
                🎯 Areas to Improve
              </h3>

              <div className="mt-6 space-y-4">

                <div className="flex gap-3">
                  <span className="text-yellow-400">
                    •
                  </span>

                  <p className="text-slate-300">
                    Give more detailed answers with examples.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-yellow-400">
                    •
                  </span>

                  <p className="text-slate-300">
                    Structure your answers clearly.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-yellow-400">
                    •
                  </span>

                  <p className="text-slate-300">
                    Practice answering questions confidently.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* QUESTION-WISE PERFORMANCE */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7 mt-8">

            <h3 className="text-2xl font-bold">
              📊 Question-wise Performance
            </h3>

            <div className="mt-6 space-y-4">

              {questions.map((item, index) => {

                const questionScore = scores[index] ?? 0;

                return (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-5"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Question {index + 1}
                        </p>

                        <p className="text-white font-semibold mt-1">
                          {item.question}
                        </p>

                      </div>

                      <div className="text-cyan-400 font-bold text-xl">
                        {questionScore}%
                      </div>

                    </div>

                    <div className="h-2 bg-slate-700 rounded-full mt-4">

                      <div
                        className="h-2 bg-cyan-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${questionScore}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* AI RECOMMENDATION */}
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-7 mt-8">

            <h3 className="text-2xl font-bold">
              🤖 PrepAI Recommendation
            </h3>

            <p className="text-slate-300 leading-7 mt-4">

              {overallScore >= 80
                ? "Excellent work! You are showing strong interview readiness. Continue practicing regularly to maintain your confidence and improve your answers further."
                : overallScore >= 60
                ? "Good job! You have a solid foundation. Focus on giving more detailed examples and structuring your answers clearly."
                : "Keep practicing mock interviews regularly. Focus on giving structured answers, using real examples, and explaining your skills clearly."}

            </p>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <button
              onClick={restartInterview}
              className="bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              🔄 Restart Interview
            </button>

            <button
              onClick={() => navigate("/performance")}
              className="border border-cyan-400 text-cyan-400 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-950 transition"
            >
              📊 View Performance
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-slate-600 text-slate-300 px-7 py-3 rounded-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition"
            >
              ← Dashboard
            </button>

          </div>

        </main>
      </div>
    );
  }

  // =========================================================
  // INTERVIEW PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-bold text-cyan-400">
            PrepAI
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Exit Interview
          </button>

        </div>

      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* TITLE */}
        <div className="text-center">

          <h2 className="text-4xl font-bold">
            AI Mock Interview
          </h2>

          <p className="text-slate-400 mt-3">
            Answer each question as if you are in a real interview.
          </p>

        </div>

        {/* PROGRESS */}
        <div className="mt-10">

          <div className="flex justify-between text-sm mb-3">

            <span className="text-cyan-400 font-semibold">
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

            <span className="text-slate-400">
              {Math.round(
                ((currentQuestion + 1) /
                  questions.length) *
                  100
              )}
              %
            </span>

          </div>

          <div className="w-full bg-slate-800 rounded-full h-3">

            <div
              className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

        {/* QUESTION CARD */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 mt-10">

          <p className="text-cyan-400 font-semibold">
            HR Interview • Beginner
          </p>

          <div className="flex justify-between items-center">

            <h3 className="text-3xl font-bold mt-6">
              Question {currentQuestion + 1}
            </h3>

            <span className="text-slate-400 mt-6">
              {currentQuestion + 1} / {questions.length}
            </span>

          </div>

          <p className="text-xl text-slate-200 mt-5 leading-8">
            {question.question}
          </p>

          {/* ANSWER */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-52 mt-8 bg-slate-800 border border-slate-700 rounded-xl p-5 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-cyan-400 transition"
          />

          {/* BUTTONS */}
          <div className="flex justify-between items-center mt-6">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              {currentQuestion === questions.length - 1
                ? "Submit Interview"
                : "Next Question →"}
            </button>

          </div>

          {/* QUESTION DOTS */}
          <div className="flex justify-center gap-3 mt-8">

            {questions.map((_, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setCurrentQuestion(index);
                  setAnswer(answers[index] || "");
                }}
                className={`h-3 w-3 rounded-full transition ${
                  currentQuestion === index
                    ? "bg-cyan-400 scale-125"
                    : answers[index]
                    ? "bg-green-400"
                    : "bg-slate-700"
                }`}
                title={`Go to question ${index + 1}`}
              />

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Interview;