"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">DevPortGen</h1>
            <p className="text-slate-400">AI-powered portfolios for Web3 devs</p>
          </div>

          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          <p className="text-xs text-slate-500 text-center mt-6">
            By continuing, you agree to let us access your GitHub repos
          </p>
        </div>
      </div>
    </div>
  );
}