import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
}

function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  // --------------------------------
  // FILE SELECTION
  // --------------------------------
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError("");
  };

  // --------------------------------
  // EXTRACT TEXT FROM PDF
  // --------------------------------
  const extractTextFromPDF = async (pdfFile: File) => {
    const arrayBuffer = await pdfFile.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let fullText = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => {
          if ("str" in item) {
            return item.str;
          }

          return "";
        })
        .join(" ");

      fullText += pageText + "\n";
    }

    return fullText;
  };

  // --------------------------------
  // ANALYZE RESUME
  // --------------------------------
  const analyzeResume = async () => {
    if (!file) {
      setError("Please choose a resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const text = await extractTextFromPDF(file);

      const resumeText = text.toLowerCase();

      // Check extracted text
      if (resumeText.trim().length < 50) {
        setError(
          "We couldn't extract enough text from this PDF. Please upload a text-based resume."
        );

        setLoading(false);
        return;
      }

      let score = 0;

      const strengths: string[] = [];
      const improvements: string[] = [];

      // --------------------------------
      // CONTACT INFORMATION
      // --------------------------------

      const hasEmail =
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(
          text
        );

      const hasPhone =
        /(\+91[\s-]?)?[6-9]\d{9}/.test(text);

      if (hasEmail) {
        score += 10;

        strengths.push(
          "Email address included"
        );
      } else {
        improvements.push(
          "Add a professional email address"
        );
      }

      if (hasPhone) {
        score += 10;

        strengths.push(
          "Phone number included"
        );
      } else {
        improvements.push(
          "Add your phone number"
        );
      }

      // --------------------------------
      // EDUCATION
      // --------------------------------

      if (
        resumeText.includes("education") ||
        resumeText.includes("bca") ||
        resumeText.includes("bachelor")
      ) {
        score += 10;

        strengths.push(
          "Education section detected"
        );
      } else {
        improvements.push(
          "Add a clear education section"
        );
      }

      // --------------------------------
      // TECHNICAL SKILLS
      // --------------------------------

      const skills = [
        "html",
        "css",
        "javascript",
        "typescript",
        "python",
        "java",
        "sql",
        "react",
        "spring boot",
        "node",
        "node.js",
        "machine learning",
        "deep learning",
        "git",
        "github",
        "mysql",
        "postgresql",
      ];

      const detectedSkills = skills.filter(
        (skill) => resumeText.includes(skill)
      );

      if (detectedSkills.length >= 3) {
        score += 15;

        strengths.push(
          `Relevant technical skills detected (${detectedSkills.length})`
        );
      } else {
        improvements.push(
          "Add more relevant technical skills and keywords"
        );
      }

      // --------------------------------
      // PROJECTS
      // --------------------------------

      if (
        resumeText.includes("project") ||
        resumeText.includes("projects")
      ) {
        score += 15;

        strengths.push(
          "Projects section detected"
        );
      } else {
        improvements.push(
          "Add projects with technologies and measurable results"
        );
      }

      // --------------------------------
      // EXPERIENCE / INTERNSHIP
      // --------------------------------

      if (
        resumeText.includes("internship") ||
        resumeText.includes("experience") ||
        resumeText.includes("work experience")
      ) {
        score += 10;

        strengths.push(
          "Experience or internship information detected"
        );
      } else {
        improvements.push(
          "Add internship, experience, or relevant practical work"
        );
      }

      // --------------------------------
      // CAREER OBJECTIVE / SUMMARY
      // --------------------------------

      if (
        resumeText.includes("objective") ||
        resumeText.includes("summary") ||
        resumeText.includes("profile")
      ) {
        score += 10;

        strengths.push(
          "Professional summary/objective detected"
        );
      } else {
        improvements.push(
          "Add a concise career objective or professional summary"
        );
      }

      // --------------------------------
      // GITHUB / LINKEDIN
      // --------------------------------

      if (
        resumeText.includes("github") ||
        resumeText.includes("linkedin")
      ) {
        score += 10;

        strengths.push(
          "Professional profile links detected"
        );
      } else {
        improvements.push(
          "Add GitHub and LinkedIn links"
        );
      }

      // --------------------------------
      // ATS KEYWORDS
      // --------------------------------

      const atsKeywords = [
        "developer",
        "software",
        "web",
        "frontend",
        "backend",
        "database",
        "api",
        "programming",
      ];

      const keywordCount = atsKeywords.filter(
        (keyword) =>
          resumeText.includes(keyword)
      ).length;

      if (keywordCount >= 3) {
        score += 10;

        strengths.push(
          "Good use of technical/ATS keywords"
        );
      } else {
        improvements.push(
          "Improve ATS keywords based on the job description"
        );
      }

      // --------------------------------
      // LIMIT SCORE
      // --------------------------------

      score = Math.min(score, 100);

      // --------------------------------
      // DEFAULT MESSAGES
      // --------------------------------

      if (strengths.length === 0) {
        strengths.push(
          "Resume uploaded successfully and text was extracted"
        );
      }

      if (improvements.length === 0) {
        improvements.push(
          "Continue tailoring your resume for each job application"
        );
      }

      // --------------------------------
      // CREATE RESULT
      // --------------------------------

      const analysisResult: AnalysisResult = {
        score,
        strengths,
        improvements,
      };

      // --------------------------------
      // SAVE RESULT TO LOCAL STORAGE
      // --------------------------------

      localStorage.setItem(
        "prepAIResumeResult",
        JSON.stringify(analysisResult)
      );

      // --------------------------------
      // SHOW RESULT
      // --------------------------------

      setResult(analysisResult);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to analyze this PDF. Please try another resume."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // RESET ANALYZER
  // --------------------------------

  const resetAnalyzer = () => {
    setFile(null);
    setResult(null);
    setError("");

    // Remove previous resume result
    localStorage.removeItem(
      "prepAIResumeResult"
    );
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

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
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Title */}
        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Resume Analyzer
          </h2>

          <p className="text-slate-400 mt-3">
            Upload your resume and get an instant
            ATS-style analysis.
          </p>

        </div>

        {/* Upload Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 mt-10">

          <h3 className="text-2xl font-bold">
            Upload Your Resume
          </h3>

          <p className="text-slate-400 mt-2">
            Upload a PDF resume to analyze its
            structure, skills, keywords and important
            sections.
          </p>

          {/* File Upload */}
          <div className="mt-8">

            <label
              htmlFor="resume"
              className="inline-block cursor-pointer bg-cyan-500 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              Choose Resume
            </label>

            <input
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

          </div>

          {/* Selected File */}
          {file && (
            <div className="mt-6">

              <p className="text-green-400 font-semibold">
                ✓ {file.name}
              </p>

              <p className="text-slate-500 mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 bg-red-500/10 border border-red-500/30 rounded-lg p-4">

              <p className="text-red-400">
                {error}
              </p>

            </div>
          )}

          {/* Analyze Button */}
          {file && !result && (
            <button
              onClick={analyzeResume}
              disabled={loading}
              className="mt-8 bg-cyan-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}
            </button>
          )}

        </div>

        {/* Results */}
        {result && (
          <section className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
              Resume Analysis
            </h2>

            {/* Score */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">

              <p className="text-slate-400 text-lg">
                ATS Resume Score
              </p>

              <p className="text-7xl font-bold text-cyan-400 mt-4">
                {result.score}%
              </p>

              <p
                className={`mt-3 font-semibold ${
                  result.score >= 80
                    ? "text-green-400"
                    : result.score >= 60
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {result.score >= 80
                  ? "Excellent Resume"
                  : result.score >= 60
                  ? "Good Resume"
                  : "Needs Improvement"}
              </p>

            </div>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">

              {/* Strengths */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7">

                <h3 className="text-2xl font-bold text-green-400">
                  ✓ Strengths
                </h3>

                <div className="mt-5 space-y-4">

                  {result.strengths.map(
                    (strength, index) => (
                      <p
                        key={index}
                        className="text-slate-300"
                      >
                        ✓ {strength}
                      </p>
                    )
                  )}

                </div>

              </div>

              {/* Improvements */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7">

                <h3 className="text-2xl font-bold text-orange-400">
                  ⚠ Improvements
                </h3>

                <div className="mt-5 space-y-4">

                  {result.improvements.map(
                    (improvement, index) => (
                      <p
                        key={index}
                        className="text-slate-300"
                      >
                        • {improvement}
                      </p>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={resetAnalyzer}
                className="bg-cyan-500 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
              >
                Analyze Another Resume
              </button>

              <a
                href="/dashboard"
                className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                Back to Dashboard
              </a>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default ResumeAnalyzer;