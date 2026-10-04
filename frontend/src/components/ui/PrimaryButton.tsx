import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
}

function PrimaryButton({ children }: PrimaryButtonProps) {
  return (
    <button className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white font-semibold shadow-lg hover:scale-105">
      {children}
    </button>
  );
}

export default PrimaryButton;