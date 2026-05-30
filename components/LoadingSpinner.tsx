"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }[size];

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClass} text-teal-400 animate-spin`} />
      {text && <p className="text-slate-300 font-medium text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <LoadingSpinner size="lg" text="Setting up your portfolio..." />
    </div>
  );
}

export function InlineLoader({ text = "Processing..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-slate-300">
      <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
      <span className="text-sm">{text}</span>
    </div>
  );
}