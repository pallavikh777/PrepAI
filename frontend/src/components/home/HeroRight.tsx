import {
  Mic,
  FileText,
  Brain,
  BarChart3,
  CheckCircle,
} from "lucide-react";

function HeroRight() {
  return (
    <div className="flex justify-center">

      <div className="relative w-[430px] rounded-3xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)]">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              PrepAI Assistant
            </h2>

            <p className="text-slate-400">
              AI Interview Dashboard
            </p>

          </div>

          <Brain className="text-cyan-400" size={40} />

        </div>

        {/* Cards */}

        <div className="mt-8 space-y-4">

          <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4">

            <div className="flex items-center gap-3">

              <FileText className="text-cyan-400" />

              <div>

                <p className="text-white font-semibold">
                  Resume Score
                </p>

                <p className="text-slate-400 text-sm">
                  ATS Optimized
                </p>

              </div>

            </div>

            <span className="text-green-400 font-bold">
              95%
            </span>

          </div>

          <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4">

            <div className="flex items-center gap-3">

              <Mic className="text-cyan-400" />

              <div>

                <p className="text-white font-semibold">
                  Voice Interview
                </p>

                <p className="text-slate-400 text-sm">
                  Ready
                </p>

              </div>

            </div>

            <CheckCircle className="text-green-400" />

          </div>

          <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4">

            <div className="flex items-center gap-3">

              <BarChart3 className="text-cyan-400" />

              <div>

                <p className="text-white font-semibold">
                  Overall Progress
                </p>

                <p className="text-slate-400 text-sm">
                  Excellent
                </p>

              </div>

            </div>

            <span className="text-cyan-400 font-bold">
              89%
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HeroRight;