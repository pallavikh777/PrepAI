import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TestCase {
  input: string;
  expected: string;
}

interface Question {
  question: string;
  starterCode: string;
  testCases: TestCase[];
}

const questions: Question[] = [
  {
    question: "Write a function to find the sum of two numbers.",
    starterCode: `function add(a, b) {
  // Write your code here
}`,
    testCases: [
      {
        input: "2, 3",
        expected: "5",
      },
      {
        input: "10, 20",
        expected: "30",
      },
      {
        input: "-5, 8",
        expected: "3",
      },
    ],
  },

  {
    question: "Write a function to check whether a number is even.",
    starterCode: `function isEven(number) {
  // Write your code here
}`,
    testCases: [
      {
        input: "4",
        expected: "true",
      },
      {
        input: "7",
        expected: "false",
      },
      {
        input: "10",
        expected: "true",
      },
    ],
  },

  {
    question: "Write a function to find the largest number in an array.",
    starterCode: `function findLargest(numbers) {
  // Write your code here
}`,
    testCases: [
      {
        input: "[3, 8, 2, 10, 5]",
        expected: "10",
      },
      {
        input: "[1, 4, 2]",
        expected: "4",
      },
      {
        input: "[20, 5, 15]",
        expected: "20",
      },
    ],
  },

  {
    question: "Write a function to reverse a string.",
    starterCode: `function reverseString(text) {
  // Write your code here
}`,
    testCases: [
      {
        input: `"hello"`,
        expected: "olleh",
      },
      {
        input: `"javascript"`,
        expected: "tpircsavaj",
      },
      {
        input: `"PrepAI"`,
        expected: "IAperP",
      },
    ],
  },

  {
    question: "Write a function to count the vowels in a string.",
    starterCode: `function countVowels(text) {
  // Write your code here
}`,
    testCases: [
      {
        input: `"hello"`,
        expected: "2",
      },
      {
        input: `"education"`,
        expected: "5",
      },
      {
        input: `"computer"`,
        expected: "3",
      },
    ],
  },
];

function CodingAssessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [code, setCode] = useState(
    questions[0].starterCode
  );

  const [testResults, setTestResults] = useState<boolean[]>([]);

  const [hasRun, setHasRun] = useState(false);

  const [scores, setScores] = useState<number[]>([]);

  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  // =====================================================
  // RUN CODE
  // =====================================================

  const runCode = () => {
    const results: boolean[] = [];

    try {
      const functionMatch = code.match(
        /function\s+([a-zA-Z_$][\w$]*)/
      );

      if (!functionMatch) {
        setTestResults(
          question.testCases.map(() => false)
        );

        setHasRun(true);

        return;
      }

      const functionName = functionMatch[1];

      const userFunction = new Function(
        `
        ${code}

        return ${functionName};
        `
      )();

      if (typeof userFunction !== "function") {
        setTestResults(
          question.testCases.map(() => false)
        );

        setHasRun(true);

        return;
      }

      question.testCases.forEach((testCase) => {
        try {
          let output: unknown;

          // Question 1
          if (currentQuestion === 0) {
            const numbers = testCase.input
              .split(",")
              .map((value) => Number(value.trim()));

            output = userFunction(
              numbers[0],
              numbers[1]
            );
          }

          // Question 2
          else if (currentQuestion === 1) {
            const number = Number(
              testCase.input.trim()
            );

            output = userFunction(number);
          }

          // Question 3
          else if (currentQuestion === 2) {
            const numbers: number[] = JSON.parse(
              testCase.input
            );

            output = userFunction(numbers);
          }

          // Question 4
          else if (currentQuestion === 3) {
            const text: string = JSON.parse(
              testCase.input
            );

            output = userFunction(text);
          }

          // Question 5
          else if (currentQuestion === 4) {
            const text: string = JSON.parse(
              testCase.input
            );

            output = userFunction(text);
          }

          const actualOutput = String(output)
            .toLowerCase()
            .trim();

          const expectedOutput = testCase.expected
            .toLowerCase()
            .trim();

          results.push(
            actualOutput === expectedOutput
          );
        } catch {
          results.push(false);
        }
      });
    } catch {
      question.testCases.forEach(() => {
        results.push(false);
      });
    }

    setTestResults(results);
    setHasRun(true);
  };

  // =====================================================
  // CURRENT QUESTION SCORE
  // =====================================================

  const calculateCurrentScore = () => {
    if (testResults.length === 0) {
      return 0;
    }

    const passed = testResults.filter(
      Boolean
    ).length;

    return Math.round(
      (passed / question.testCases.length) * 100
    );
  };

  // =====================================================
  // PREVIOUS QUESTION
  // =====================================================

  const previousQuestion = () => {
    if (currentQuestion === 0) {
      return;
    }

    const previous = currentQuestion - 1;

    setCurrentQuestion(previous);

    setCode(
      questions[previous].starterCode
    );

    setTestResults([]);

    setHasRun(false);
  };

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const nextQuestion = () => {
    if (!hasRun) {
      return;
    }

    const currentScore =
      calculateCurrentScore();

    const updatedScores = [...scores];

    updatedScores[currentQuestion] =
      currentScore;

    // More questions remaining
    if (
      currentQuestion <
      questions.length - 1
    ) {
      const next = currentQuestion + 1;

      setScores(updatedScores);

      setCurrentQuestion(next);

      setCode(
        questions[next].starterCode
      );

      setTestResults([]);

      setHasRun(false);

      return;
    }

    // =================================================
    // FINAL QUESTION COMPLETED
    // =================================================

    setScores(updatedScores);

    const totalScore = Math.round(
      updatedScores.reduce(
        (sum, score) => sum + score,
        0
      ) / questions.length
    );

    localStorage.setItem(
      "prepAICodingResult",
      JSON.stringify({
        scores: updatedScores,
        overallScore: totalScore,
        questionsCompleted:
          questions.length,
      })
    );

    setShowResult(true);
  };

  // =====================================================
  // RESTART
  // =====================================================

  const restartAssessment = () => {
    localStorage.removeItem(
      "prepAICodingResult"
    );

    setCurrentQuestion(0);

    setCode(
      questions[0].starterCode
    );

    setTestResults([]);

    setScores([]);

    setHasRun(false);

    setShowResult(false);
  };

  // =====================================================
  // FINAL SCORE
  // =====================================================

  const finalScore =
    scores.length === questions.length
      ? Math.round(
          scores.reduce(
            (sum, score) => sum + score,
            0
          ) / questions.length
        )
      : 0;

  // =====================================================
  // FINAL RESULT SCREEN
  // =====================================================

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        {/* Header */}

        <header className="border-b border-slate-800">

          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

            <h1
              onClick={() =>
                navigate("/dashboard")
              }
              className="text-2xl font-bold text-cyan-400 cursor-pointer"
            >
              PrepAI
            </h1>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="text-slate-300 text-sm hover:text-cyan-400 transition"
            >
              Dashboard
            </button>

          </div>

        </header>

        {/* Result */}

        <main className="max-w-4xl mx-auto px-6 py-12">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center">

            <div className="text-5xl">
              {finalScore >= 80
                ? "🎉"
                : finalScore >= 50
                ? "👍"
                : "💪"}
            </div>

            <h2 className="text-3xl font-bold mt-5">
              Coding Assessment Completed!
            </h2>

            <p className="text-slate-400 mt-2">
              Here is your coding performance.
            </p>

            {/* Overall Score */}

            <div className="mt-8">

              <p className="text-slate-400">
                Overall Score
              </p>

              <p
                className={`text-6xl font-bold mt-2 ${
                  finalScore >= 80
                    ? "text-green-400"
                    : finalScore >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {finalScore}%
              </p>

              <p className="text-slate-400 mt-2">

                {finalScore >= 80
                  ? "Excellent Coding Skills!"
                  : finalScore >= 50
                  ? "Good effort! Keep practicing."
                  : "Keep practicing and improve your coding skills."}

              </p>

            </div>

            {/* Question Scores */}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">

              {questions.map(
                (_, index) => {

                  const score =
                    scores[index] ?? 0;

                  return (
                    <div
                      key={index}
                      className="bg-slate-800 rounded-lg p-4"
                    >

                      <p className="text-slate-400 text-xs">
                        Q{index + 1}
                      </p>

                      <p
                        className={`text-xl font-bold mt-1 ${
                          score >= 80
                            ? "text-green-400"
                            : score >= 50
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {score}%
                      </p>

                    </div>
                  );
                }
              )}

            </div>

            {/* Buttons */}

            <div className="flex justify-center gap-3 mt-8">

              <button
                onClick={restartAssessment}
                className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
              >
                🔄 Restart
              </button>

              <button
                onClick={() =>
                  navigate("/dashboard")
                }
                className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-400 text-sm font-semibold hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                Dashboard
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // =====================================================
  // MAIN ASSESSMENT
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <header className="border-b border-slate-800">

        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1
            onClick={() =>
              navigate("/dashboard")
            }
            className="text-2xl font-bold text-cyan-400 cursor-pointer"
          >
            PrepAI
          </h1>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="text-slate-300 text-sm hover:text-cyan-400 transition"
          >
            Exit Assessment
          </button>

        </div>

      </header>

      {/* Main */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7">

          {/* Title */}

          <div className="flex items-center justify-between">

            <div>

              <p className="text-cyan-400 text-sm font-semibold">
                CODING ASSESSMENT
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Question {currentQuestion + 1}
              </h2>

            </div>

            <p className="text-slate-400 text-sm">
              {currentQuestion + 1} /{" "}
              {questions.length}
            </p>

          </div>

          {/* Progress */}

          <div className="mt-6">

            <div className="flex justify-between text-xs text-slate-400 mb-2">

              <span>
                Progress
              </span>

              <span>
                {Math.round(progress)}%
              </span>

            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          {/* Question */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold">
              {question.question}
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Complete the function and run your
              code against the test cases.
            </p>

          </div>

          {/* Code Editor */}

          <div className="mt-6">

            <div className="flex items-center justify-between mb-2">

              <label className="text-slate-300 text-sm font-semibold">
                Your Code
              </label>

              <span className="text-xs text-slate-500">
                JavaScript
              </span>

            </div>

            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setHasRun(false);
                setTestResults([]);
              }}
              spellCheck={false}
              className="w-full min-h-[270px] bg-slate-950 border border-slate-700 rounded-xl p-5 text-green-400 font-mono text-sm leading-6 resize-y focus:outline-none focus:border-cyan-400"
            />

          </div>

          {/* Test Cases */}

          <div className="mt-7">

            <h3 className="text-lg font-bold">
              🧪 Test Cases
            </h3>

            <div className="grid md:grid-cols-3 gap-3 mt-4">

              {question.testCases.map(
                (testCase, index) => {

                  const result =
                    testResults[index];

                  return (
                    <div
                      key={index}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-4"
                    >

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-semibold">
                          Test {index + 1}
                        </p>

                        {hasRun && (
                          <span
                            className={`text-xs font-semibold ${
                              result
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {result
                              ? "✓ Passed"
                              : "✗ Failed"}
                          </span>
                        )}

                      </div>

                      <div className="mt-3">

                        <p className="text-slate-500 text-xs">
                          Input
                        </p>

                        <div className="bg-slate-950 rounded-md p-2 mt-1">

                          <p className="text-cyan-300 font-mono text-xs break-all">
                            {testCase.input}
                          </p>

                        </div>

                      </div>

                      <div className="mt-2">

                        <p className="text-slate-500 text-xs">
                          Expected
                        </p>

                        <div className="bg-slate-950 rounded-md p-2 mt-1">

                          <p className="text-green-300 font-mono text-xs break-all">
                            {testCase.expected}
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* Score */}

          {hasRun && (

            <div className="mt-5 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between">

              <span className="text-slate-400 text-sm">
                Test Cases Passed
              </span>

              <div className="text-right">

                <span className="text-white font-semibold">
                  {
                    testResults.filter(Boolean)
                      .length
                  }{" "}
                  /{" "}
                  {question.testCases.length}
                </span>

                <span className="text-cyan-400 font-semibold ml-3">
                  {calculateCurrentScore()}%
                </span>

              </div>

            </div>

          )}

          {/* Small Action Buttons */}

          <div className="flex items-center justify-between gap-3 mt-7">

            {/* Previous */}

            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 text-sm font-semibold hover:border-cyan-400 hover:text-cyan-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {/* Run Code */}

            <button
              onClick={runCode}
              className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
            >
              ▶ Run Code
            </button>

            {/* Next */}

            <button
              onClick={nextQuestion}
              disabled={!hasRun}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentQuestion ===
              questions.length - 1
                ? "Finish →"
                : "Next →"}
            </button>

          </div>

          {/* Question Indicators */}

          <div className="flex justify-center gap-2 mt-7">

            {questions.map(
              (_, index) => (

                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    index === currentQuestion
                      ? "bg-cyan-400 scale-125"
                      : index < currentQuestion
                      ? "bg-green-400"
                      : "bg-slate-700"
                  }`}
                />

              )
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default CodingAssessment;