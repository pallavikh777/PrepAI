import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/20 transition-colors duration-300 group-hover:bg-cyan-500">
        <Icon className="text-cyan-400 group-hover:text-white" size={30} />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;