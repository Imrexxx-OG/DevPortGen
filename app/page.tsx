import Link from "next/link";
import { ArrowRight, Github, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">DevPortGen</h1>
          <Link
            href="/login"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">
            AI-Powered Portfolio Generator
          </h2>
          <p className="text-2xl text-slate-400 mb-8">
            Create your professional developer portfolio in minutes with AI
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
              <Github className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              GitHub Integration
            </h3>
            <p className="text-slate-400">
              Import your repos with one click. We fetch all your project data automatically.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              AI-Generated Content
            </h3>
            <p className="text-slate-400">
              Let AI write your bio and project descriptions. Professional copy in seconds.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Instant Publishing
            </h3>
            <p className="text-slate-400">
              Get a live portfolio URL instantly. Share it with recruiters and on LinkedIn.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 text-sm">
            Built with Next.js, Prisma, and Claude AI
          </p>
        </div>
      </main>
    </div>
  );
}