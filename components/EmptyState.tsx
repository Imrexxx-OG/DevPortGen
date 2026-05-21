"use client";

import { Rocket, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  hasProjects: boolean;
  hasSkills: boolean;
  isPublished: boolean;
}

export default function EmptyState({ hasProjects, hasSkills, isPublished }: EmptyStateProps) {
  const steps = [
    {
      id: 1,
      title: "Sign in with GitHub",
      description: "Connect your GitHub account",
      completed: true, // Always true if they're seeing this
    },
    {
      id: 2,
      title: "Import your first project",
      description: "Add projects from GitHub or manually",
      completed: hasProjects,
      link: "/builder",
    },
    {
      id: 3,
      title: "Add your skills",
      description: "Show what technologies you know",
      completed: hasSkills,
      link: "/builder",
    },
    {
      id: 4,
      title: "Publish your portfolio",
      description: "Make it live and share with recruiters",
      completed: isPublished,
      link: "/dashboard",
    },
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border border-teal-700/30 rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
          <Rocket className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            🎉 Welcome to DevPortGen!
          </h3>
          <p className="text-slate-400 text-sm">
            Let's get your portfolio set up in minutes
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-300">
            {completedSteps} of {steps.length} steps completed
          </span>
          <span className="text-sm text-teal-400 font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              step.completed
                ? "bg-teal-900/20 border border-teal-700/30"
                : "bg-slate-800/50 border border-slate-700"
            }`}
          >
            <div className="mt-0.5">
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-teal-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4
                  className={`font-semibold ${
                    step.completed ? "text-teal-300" : "text-white"
                  }`}
                >
                  {step.title}
                </h4>
                {!step.completed && step.link && (
                  <Link
                    href={step.link}
                    className="text-xs bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded transition-colors"
                  >
                    Do this
                  </Link>
                )}
              </div>
              <p className="text-sm text-slate-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {!isPublished && (
        <Link
          href="/builder"
          className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold text-center px-6 py-3 rounded-lg transition-colors"
        >
          {hasProjects ? "Continue Building →" : "Start Building Your Portfolio →"}
        </Link>
      )}

      {isPublished && (
        <div className="text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-teal-400 font-semibold">
            Congratulations! Your portfolio is live!
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Share it with recruiters and on LinkedIn
          </p>
        </div>
      )}
    </div>
  );
}