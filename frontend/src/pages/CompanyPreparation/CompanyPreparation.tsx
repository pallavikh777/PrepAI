import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CompanyData {
  name: string;
  emoji: string;
  description: string;
  focus: string[];
  hrQuestions: string[];
  technicalQuestions: string[];
  tips: string[];
}

const companies: CompanyData[] = [
  {
    name: "TCS",
    emoji: "🏢",
    description:
      "Prepare for TCS interviews with common HR, technical, and aptitude-focused questions.",
    focus: ["Java", "Python", "SQL", "Data Structures", "Aptitude"],
    hrQuestions: [
      "Tell me about yourself.",
      "Why do you want to join TCS?",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in 5 years?",
      "Why should we hire you?",
    ],
    technicalQuestions: [
      "What are the main features of Java?",
      "What is the difference between a primary key and a foreign key?",
      "What is normalization in SQL?",
      "What is the difference between an array and a linked list?",
      "What is OOP?",
    ],
    tips: [
      "Revise basic programming concepts.",
      "Practice SQL queries.",
      "Prepare common HR questions.",
      "Practice aptitude and logical reasoning.",
    ],
  },

  {
    name: "Infosys",
    emoji: "💼",
    description:
      "Prepare for Infosys interviews with programming, database, and behavioral questions.",
    focus: ["Java", "Python", "SQL", "OOP", "Problem Solving"],
    hrQuestions: [
      "Tell me about yourself.",
      "Why Infosys?",
      "What are your career goals?",
      "Tell me about your final-year project.",
      "How do you handle pressure?",
    ],
    technicalQuestions: [
      "Explain the four pillars of OOP.",
      "What is inheritance?",
      "What is a database?",
      "What is the difference between DELETE and TRUNCATE?",
      "What is exception handling?",
    ],
    tips: [
      "Understand your projects thoroughly.",
      "Revise OOP concepts.",
      "Practice basic coding problems.",
      "Be confident while explaining your answers.",
    ],
  },

  {
    name: "Accenture",
    emoji: "🚀",
    description:
      "Get ready for Accenture-style interviews covering technical skills, communication, and problem solving.",
    focus: ["Java", "Python", "SQL", "Cloud Basics", "Problem Solving"],
    hrQuestions: [
      "Tell me about yourself.",
      "Why do you want to join Accenture?",
      "Describe a challenge you faced.",
      "What motivates you?",
      "Why should we select you?",
    ],
    technicalQuestions: [
      "What is polymorphism?",
      "What is the difference between frontend and backend?",
      "What is an API?",
      "What is SQL?",
      "What is cloud computing?",
    ],
    tips: [
      "Improve communication skills.",
      "Know your resume projects.",
      "Revise programming fundamentals.",
      "Practice explaining technical concepts simply.",
    ],
  },

  {
    name: "Capgemini",
    emoji: "🌐",
    description:
      "Prepare for Capgemini interviews with technical, logical reasoning, and HR preparation.",
    focus: ["Java", "Python", "SQL", "DSA", "Communication"],
    hrQuestions: [
      "Introduce yourself.",
      "Why Capgemini?",
      "What are your hobbies?",
      "What is your biggest strength?",
      "How do you handle failure?",
    ],
    technicalQuestions: [
      "What is a class and object?",
      "What is the difference between Java and Python?",
      "What is a JOIN in SQL?",
      "What is a data structure?",
      "What is the difference between compiler and interpreter?",
    ],
    tips: [
      "Practice logical reasoning.",
      "Revise basic DSA concepts.",
      "Prepare questions from your projects.",
      "Work on communication and confidence.",
    ],
  },

  {
    name: "IBM",
    emoji: "💻",
    description:
      "Prepare for IBM interviews with programming, cloud, AI, and problem-solving topics.",
    focus: ["Python", "Java", "SQL", "AI/ML", "Cloud"],
    hrQuestions: [
      "Tell me about yourself.",
      "Why do you want to join IBM?",
      "What are your strengths?",
      "Tell me about a project you worked on.",
      "Where do you see yourself in the future?",
    ],
    technicalQuestions: [
      "What is machine learning?",
      "What is the difference between AI and ML?",
      "What is an API?",
      "Explain OOP concepts.",
      "What is cloud computing?",
    ],
    tips: [
      "Understand AI and cloud fundamentals.",
      "Know your projects well.",
      "Practice Python programming.",
      "Be ready to explain your technical skills.",
    ],
  },
];

function CompanyPreparation() {
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(
    null
  );

  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1
            className="text-3xl font-bold text-cyan-400 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
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

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            🏢 Company Preparation
          </h2>

          <p className="text-slate-400 mt-3 text-lg">
            Prepare for interviews based on your target company.
          </p>
        </div>

        {!selectedCompany ? (
          <>
            {/* Search */}
            <div className="max-w-xl mx-auto mb-10">
              <input
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-slate-800
                border border-slate-700 text-white
                placeholder-slate-500
                focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Company Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div
                  key={company.name}
                  className="bg-slate-900 border border-slate-700
                  rounded-2xl p-7 hover:border-cyan-400
                  transition duration-300"
                >
                  <div className="text-5xl mb-5">
                    {company.emoji}
                  </div>

                  <h3 className="text-2xl font-bold">
                    {company.name}
                  </h3>

                  <p className="text-slate-400 mt-3 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {company.focus.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full
                        bg-cyan-500/10 text-cyan-400
                        border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="w-full mt-6 py-3 rounded-lg
                    bg-cyan-500 text-slate-950 font-semibold
                    hover:bg-cyan-400 transition"
                  >
                    Start Preparation →
                  </button>
                </div>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center text-slate-400 mt-10">
                No company found.
              </div>
            )}
          </>
        ) : (
          /* Company Details */
          <div>
            {/* Back button */}
            <button
              onClick={() => setSelectedCompany(null)}
              className="mb-6 text-cyan-400 hover:text-cyan-300"
            >
              ← Back to Companies
            </button>

            {/* Company Header */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-5">
                <div className="text-6xl">
                  {selectedCompany.emoji}
                </div>

                <div>
                  <h2 className="text-4xl font-bold">
                    {selectedCompany.name}
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Interview Preparation Guide
                  </p>
                </div>
              </div>

              <p className="text-slate-300 mt-6">
                {selectedCompany.description}
              </p>
            </div>

            {/* Focus Areas */}
            <section className="bg-slate-900 border border-slate-700 rounded-2xl p-7 mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-5">
                🎯 Focus Areas
              </h3>

              <div className="flex flex-wrap gap-3">
                {selectedCompany.focus.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full
                    bg-cyan-500/10 text-cyan-300
                    border border-cyan-500/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* HR Questions */}
            <section className="bg-slate-900 border border-slate-700 rounded-2xl p-7 mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-5">
                👤 Common HR Questions
              </h3>

              <div className="space-y-4">
                {selectedCompany.hrQuestions.map((question, index) => (
                  <div
                    key={question}
                    className="bg-slate-800 rounded-lg p-4"
                  >
                    <span className="text-cyan-400 font-semibold">
                      {index + 1}.
                    </span>{" "}
                    <span className="text-slate-200">
                      {question}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Questions */}
            <section className="bg-slate-900 border border-slate-700 rounded-2xl p-7 mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-5">
                💻 Technical Questions
              </h3>

              <div className="space-y-4">
                {selectedCompany.technicalQuestions.map(
                  (question, index) => (
                    <div
                      key={question}
                      className="bg-slate-800 rounded-lg p-4"
                    >
                      <span className="text-cyan-400 font-semibold">
                        {index + 1}.
                      </span>{" "}
                      <span className="text-slate-200">
                        {question}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Tips */}
            <section className="bg-slate-900 border border-slate-700 rounded-2xl p-7 mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-5">
                💡 Preparation Tips
              </h3>

              <div className="space-y-4">
                {selectedCompany.tips.map((tip) => (
                  <div
                    key={tip}
                    className="flex gap-3 text-slate-300"
                  >
                    <span className="text-green-400">✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/interview")}
                className="px-6 py-3 rounded-lg
                bg-cyan-500 text-slate-950 font-semibold
                hover:bg-cyan-400 transition"
              >
                🎤 Practice Mock Interview
              </button>

              <button
                onClick={() => setSelectedCompany(null)}
                className="px-6 py-3 rounded-lg
                border border-cyan-400 text-cyan-400
                hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                Choose Another Company
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-lg
                border border-slate-600 text-slate-300
                hover:border-cyan-400 hover:text-cyan-400 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CompanyPreparation;