import { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
}

function SecondaryButton({ children }: SecondaryButtonProps) {
  return (
    <button className="px-8 py-4 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300 font-semibold hover:scale-105">
      {children}
    </button>
  );
}

export default SecondaryButton;