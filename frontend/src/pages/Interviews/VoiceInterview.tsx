import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionLike;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

interface Question {
  question: string;
  keywords: string[];
}

const questions: Question[] = [
  {
    question: "Tell me about yourself.",
    keywords: [
      "bca",
      "student",
      "developer",
      "web",
      "frontend",
      "javascript",
      "python",
      "project",
      "skills",
      "experience",
    ],
  },
  {
    question: "Why should we hire you?",
    keywords: [
      "skills",
      "learn",
      "learning",
      "developer",
      "team",
      "hardworking",
      "project",
      "problem",
      "communication",
      "contribute",
    ],
  },
  {
    question: "What are your strengths?",
    keywords: [
      "communication",
      "teamwork",
      "learning",
      "problem",
      "solving",
      "creative",
      "adaptable",
      "hardworking",
      "time",
      "management",
    ],
  },
  {
    question: "What is your biggest weakness?",
    keywords: [
      "weakness",
      "improve",
      "learning",
      "time",
      "perfectionist",
      "communication",
      "practice",
      "working",
      "development",
      "improve",
    ],
  },
  {
    question: "Where do you see yourself in 5 years?",
    keywords: [
      "career",
      "developer",
      "software",
      "experience",
      "skills",
      "leadership",
      "technology",
      "company",
      "growth",
      "learning",
    ],
  },
];

function VoiceInterview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [scores, setScores] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const [isListening, setIsListening] = useState(false);

  const [error, setError] = useState("");

  const [completed, setCompleted] = useState(false);

  const [overallScore, setOverallScore] = useState(0);

  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  /*
   * Check browser support.
   */
  useEffect(() => {
    const speechWindow =
      window as WindowWithSpeechRecognition;

    const SpeechRecognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (
      event: SpeechRecognitionEventLike
    ) => {
      let transcript = "";

      for (
        let i = 0;
        i < Object.keys(event.results).length;
        i++
      ) {
        const result = event.results[i];

        if (result && result[0]) {
          transcript += result[0].transcript + " ";
        }
      }

      transcript = transcript.trim();

      if (!transcript) return;

      setAnswers((previousAnswers) => {
        const updatedAnswers = [...previousAnswers];

        const oldAnswer = updatedAnswers[currentQuestion];

        updatedAnswers[currentQuestion] = oldAnswer
          ? `${oldAnswer} ${transcript}`
          : transcript;

        return updatedAnswers;
      });
    };

    recognition.onerror = (
      event: SpeechRecognitionErrorEventLike
    ) => {
      console.error("Speech recognition error:", event.error);

      setIsListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Microphone permission was denied. Please allow microphone access."
        );
      } else if (event.error === "no-speech") {
        setError(
          "No speech detected. Please try speaking again."
        );
      } else {
        setError(
          "Voice recognition stopped. You can try again or type your answer."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [currentQuestion]);

  /*
   * Start voice recording.
   */
  const startListening = () => {
    setError("");

    if (!speechSupported || !recognitionRef.current) {
      setError(
        "Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.log("Recognition already running.");

      setIsListening(true);
    }
  };

  /*
   * Stop voice recording.
   */
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsListening(false);
  };

  /*
   * Handle typed answer.
   */
  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;

    setAnswers((previousAnswers) => {
      const updatedAnswers = [...previousAnswers];

      updatedAnswers[currentQuestion] = value;

      return updatedAnswers;
    });
  };

  /*
   * Calculate score for an answer.
   */
  const calculateAnswerScore = (
    answer: string,
    question: Question
  ) => {
    const cleanAnswer = answer
      .toLowerCase()
      .trim();

    /*
     * Completely empty answer.
     */
    if (!cleanAnswer) {
      return 0;
    }

    const words = cleanAnswer.split(/\s+/);

    const wordCount = words.length;

    /*
     * Count relevant keywords.
     */
    const matchedKeywords =
      question.keywords.filter((keyword) =>
        cleanAnswer.includes(keyword.toLowerCase())
      );

    const keywordScore =
      Math.min(
        matchedKeywords.length /
          Math.min(question.keywords.length, 5),
        1
      ) * 50;

    /*
     * Answer length score.
     *
     * 20+ words = good
     * 40+ words = excellent
     */
    let lengthScore = 0;

    if (wordCount >= 40) {
      lengthScore = 30;
    } else if (wordCount >= 25) {
      lengthScore = 25;
    } else if (wordCount >= 15) {
      lengthScore = 20;
    } else if (wordCount >= 8) {
      lengthScore = 12;
    } else {
      lengthScore = 5;
    }

    /*
     * Basic structure score.
     */
    let structureScore = 0;

    if (cleanAnswer.includes("because")) {
      structureScore += 5;
    }

    if (
      cleanAnswer.includes("experience") ||
      cleanAnswer.includes("project")
    ) {
      structureScore += 5;
    }

    /*
     * Final score.
     */
    const finalScore = Math.round(
      keywordScore +
        lengthScore +
        structureScore
    );

    return Math.min(
      Math.max(finalScore, 10),
      100
    );
  };

  /*
   * Save interview result.
   */
  const saveResult = (
    finalScores: number[],
    finalAnswers: string[]
  ) => {
    const total = finalScores.reduce(
      (sum, score) => sum + score,
      0
    );

    const finalOverallScore = Math.round(
      total / questions.length
    );

    setOverallScore(finalOverallScore);

    /*
     * Save result for Performance page.
     */
    localStorage.setItem(
      "prepAIInterviewResult",
      JSON.stringify({
        scores: finalScores,
        answers: finalAnswers,
        overallScore: finalOverallScore,
      })
    );

    /*
     * Also save voice-specific result.
     */
    localStorage.setItem(
      "prepAIVoiceInterviewResult",
      JSON.stringify({
        scores: finalScores,
        answers: finalAnswers,
        overallScore: finalOverallScore,
      })
    );

    return finalOverallScore;
  };

  /*
   * Move to next question.
   */
  const handleNext = () => {
    stopListening();

    const currentAnswer =
      answers[currentQuestion];

    const currentScore = calculateAnswerScore(
      currentAnswer,
      questions[currentQuestion]
    );

    const updatedScores = [...scores];

    updatedScores[currentQuestion] =
      currentScore;

    setScores(updatedScores);

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );

      setError("");
    } else {
      /*
       * Interview completed.
       */
      const finalScore = saveResult(
        updatedScores,
        answers
      );

      setOverallScore(finalScore);
      setCompleted(true);
    }
  };

  /*
   * Go back to previous question.
   */
  const handlePrevious = () => {
    stopListening();

    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );

      setError("");
    }
  };

  /*
   * Restart interview.
   */
  const restartInterview = () => {
    stopListening();

    setCurrentQuestion(0);

    setAnswers(
      Array(questions.length).fill("")
    );

    setScores(
      Array(questions.length).fill(0)
    );

    setCompleted(false);

    setOverallScore(0);

    setError("");

    localStorage.removeItem(
      "prepAIVoiceInterviewResult"
    );
  };

  /*
   * Progress percentage.
   */
  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  /*
   * Completed screen.
   */
  if (completed) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        {/* Header */}
        <header className="border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

            <h1 className="text-2xl font-bold text-cyan-400">
              PrepAI
            </h1>

            <a
              href="/dashboard"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Dashboard
            </a>

          </div>
        </header>

        {/* Result */}
        <main className="max-w-4xl mx-auto px-6 py-12">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">

            <div className="text-6xl mb-5">
              🎉
            </div>

            <h2 className="text-4xl font-bold">
              Voice Interview Completed
            </h2>

            <p className="text-slate-400 mt-3">
              Great job! Here is your performance.
            </p>

            {/* Score */}
            <div className="mt-10">

              <p className="text-slate-400 text-lg">
                Overall Score
              </p>

              <p className="text-7xl font-bold text-cyan-400 mt-3">
                {overallScore}%
              </p>

              <p
                className={`text-xl font-semibold mt-4 ${
                  overallScore >= 80
                    ? "text-green-400"
                    : overallScore >= 60
                    ? "text-yellow-400"
                    : "text-orange-400"
                }`}
              >
                {overallScore >= 80
                  ? "Excellent Performance!"
                  : overallScore >= 60
                  ? "Good Performance!"
                  : "Keep Practicing!"}
              </p>

            </div>

            {/* Question Scores */}
            <div className="mt-10 text-left space-y-4">

              {questions.map(
                (question, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-5"
                  >

                    <div className="flex justify-between gap-4">

                      <div>
                        <p className="text-slate-400 text-sm">
                          Question {index + 1}
                        </p>

                        <p className="font-semibold mt-1">
                          {question.question}
                        </p>
                      </div>

                      <span className="text-cyan-400 font-bold text-xl">
                        {scores[index]}%
                      </span>

                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-2 mt-4">

                      <div
                        className="bg-cyan-400 h-2 rounded-full transition-all"
                        style={{
                          width: `${scores[index]}%`,
                        }}
                      />

                    </div>

                  </div>
                )
              )}

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <button
                onClick={restartInterview}
                className="bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
              >
                Practice Again
              </button>

              <a
                href="/performance"
                className="border border-cyan-400 text-cyan-400 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                View Performance
              </a>

              <a
                href="/dashboard"
                className="border border-slate-600 text-slate-300 px-7 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
              >
                Dashboard
              </a>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /*
   * Main interview screen.
   */
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">

        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-bold text-cyan-400">
            PrepAI
          </h1>

          <a
            href="/dashboard"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Dashboard
          </a>

        </div>

      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Title */}
        <div className="text-center">

          <h2 className="text-4xl font-bold">
            🎤 Voice Interview
          </h2>

          <p className="text-slate-400 mt-3">
            Answer the interview questions using your voice.
          </p>

        </div>

        {/* Progress */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-10">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                Question
              </p>

              <p className="text-xl font-bold">
                {currentQuestion + 1} of{" "}
                {questions.length}
              </p>

            </div>

            <p className="text-cyan-400 font-bold">
              {Math.round(progress)}%
            </p>

          </div>

          <div className="w-full bg-slate-700 rounded-full h-3 mt-5">

            <div
              className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Browser Support */}
        {!speechSupported && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">

            <p className="text-yellow-400 font-semibold">
              ⚠️ Voice recognition is unavailable
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Please use Google Chrome or Microsoft Edge
              for voice recording. You can still type your
              answer below.
            </p>

          </div>
        )}

        {/* Question Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 mt-6">

          <p className="text-cyan-400 font-semibold">
            Question {currentQuestion + 1}
          </p>

          <h3 className="text-3xl font-bold mt-3">
            {questions[currentQuestion].question}
          </h3>

          <p className="text-slate-400 mt-3">
            Speak clearly and give a detailed answer.
          </p>

          {/* Recording */}
          <div className="mt-8 flex flex-wrap gap-4">

            {!isListening ? (
              <button
                onClick={startListening}
                className="bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
              >
                🎤 Start Recording
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="bg-red-500 text-white px-7 py-3 rounded-lg font-semibold hover:bg-red-400 transition"
              >
                ⏹ Stop Recording
              </button>
            )}

            {isListening && (
              <div className="flex items-center gap-2 text-green-400 font-semibold px-4">

                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

                Listening...

              </div>
            )}

          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 bg-red-500/10 border border-red-500/30 rounded-lg p-4">

              <p className="text-red-400">
                {error}
              </p>

            </div>
          )}

          {/* Answer */}
          <div className="mt-8">

            <label className="block text-slate-300 font-semibold mb-3">
              Your Answer
            </label>

            <textarea
              value={answers[currentQuestion]}
              onChange={handleAnswerChange}
              placeholder="Start speaking or type your answer here..."
              rows={8}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
            />

            <div className="flex justify-between mt-3 text-sm">

              <span className="text-slate-500">
                {answers[currentQuestion]
                  ? `${answers[currentQuestion].trim().split(/\s+/).length} words`
                  : "0 words"}
              </span>

              <span className="text-slate-500">
                Give a detailed answer for a better score.
              </span>

            </div>

          </div>

        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">

          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border border-slate-700 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            className="bg-cyan-500 text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            {currentQuestion ===
            questions.length - 1
              ? "Finish Interview"
              : "Next Question →"}
          </button>

        </div>

        {/* Question Navigation */}
        <div className="mt-10">

          <p className="text-slate-400 mb-4">
            Questions
          </p>

          <div className="flex flex-wrap gap-3">

            {questions.map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    stopListening();
                    setCurrentQuestion(index);
                    setError("");
                  }}
                  className={`w-12 h-12 rounded-lg font-bold transition ${
                    index === currentQuestion
                      ? "bg-cyan-400 text-slate-950"
                      : answers[index]
                      ? "bg-green-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                  title={question.question}
                >
                  {index + 1}
                </button>
              )
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default VoiceInterview;