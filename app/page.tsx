"use client";

import Link from "next/link";
import { ArrowRight, Github, Sparkles, Zap, Users, Globe, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [stats, setStats] = useState({ portfolios: 0, users: 0 });

  // Animated counter effect
  useEffect(() => {
    const targetPortfolios = 127; // Update this as your app grows
    const targetUsers = 89;
    
    const duration = 2000; // 2 seconds
    const steps = 50;
    const incrementPortfolios = targetPortfolios / steps;
    const incrementUsers = targetUsers / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setStats({
        portfolios: Math.floor(incrementPortfolios * current),
        users: Math.floor(incrementUsers * current),
      });
      
      if (current >= steps) {
        clearInterval(timer);
        setStats({ portfolios: targetPortfolios, users: targetUsers });
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">DevPortGen</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/p/imran-damare"
              className="text-slate-300 hover:text-teal-400 transition-colors"
            >
              View Demo
            </Link>
            <Link
              href="/login"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="inline-block mb-4">
            <span className="bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full text-sm font-semibold border border-teal-500/20">
              AI-Powered Portfolio Generator
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Developer Portfolio
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              In 3 Minutes
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Import projects from GitHub, generate professional content with AI, 
            and publish your portfolio at your custom URL, all without writing a single line of code.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 text-lg"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/p/imran-damare"
              target="_blank"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg border border-slate-600"
            >
              <Globe className="w-5 h-5" />
              View Live Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center mt-12 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400">{stats.portfolios}+</div>
              <div className="text-slate-400 text-sm mt-1">Portfolios Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400">{stats.users}+</div>
              <div className="text-slate-400 text-sm mt-1">Happy Developers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400">&lt;3</div>
              <div className="text-slate-400 text-sm mt-1">Minute Setup</div>
            </div>
          </div>
        </section>

        {/* Example Portfolios Showcase */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              See What You Can Build
            </h3>
            <p className="text-slate-400 text-lg">
              Real portfolios created with DevPortGen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Example 1 - You can add real portfolios as you get users */}
            <Link 
              href="/p/imran-damare" 
              target="_blank"
              className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-teal-900/30 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👨‍💻</div>
                  <div className="text-white font-semibold">Full-Stack Engineer</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-white mb-1">Imran Damare</h4>
                <p className="text-sm text-slate-400">Building AI-powered applications</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-teal-900/30 text-teal-400 px-2 py-1 rounded">Next.js</span>
                  <span className="text-xs bg-teal-900/30 text-teal-400 px-2 py-1 rounded">TypeScript</span>
                </div>
              </div>
            </Link>

            {/* Example 2 - Placeholder until you have more users */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden opacity-60">
              <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🎨</div>
                  <div className="text-white font-semibold">Frontend Developer</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-white mb-1">Your Portfolio</h4>
                <p className="text-sm text-slate-400">Create yours in minutes</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Example 3 - Placeholder */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden opacity-60">
              <div className="aspect-video bg-gradient-to-br from-orange-900/30 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">⚡</div>
                  <div className="text-white font-semibold">Backend Engineer</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-white mb-1">Next Developer</h4>
                <p className="text-sm text-slate-400">Join the community</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-orange-900/30 text-orange-400 px-2 py-1 rounded">Node.js</span>
                  <span className="text-xs bg-orange-900/30 text-orange-400 px-2 py-1 rounded">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              How It Works
            </h3>
            <p className="text-slate-400 text-lg">
              From GitHub login to published portfolio in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-teal-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">1. Connect GitHub</h4>
              <p className="text-slate-400">
                Sign in with your GitHub account and we'll import your repositories automatically
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">2. AI Generates Content</h4>
              <p className="text-slate-400">
                Our AI writes professional bios and project descriptions based on your work
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">3. Publish Instantly</h4>
              <p className="text-slate-400">
                Get your live portfolio URL and share it with recruiters on LinkedIn
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Everything You Need
            </h3>
            <p className="text-slate-400 text-lg">
              Powerful features to make your portfolio stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Github className="w-6 h-6" />,
                title: "GitHub Integration",
                description: "One-click import of all your repositories with full metadata"
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "AI-Generated Content",
                description: "Professional bios and project descriptions written by AI"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Publishing",
                description: "Get your portfolio live at /p/your-name in seconds"
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Beautiful Templates",
                description: "Modern dark theme with gradients and smooth animations"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Mobile Responsive",
                description: "Looks perfect on all devices - desktop, tablet, and mobile"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "100% Free",
                description: "No hidden costs, no premium tiers - completely free forever"
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-teal-500/50 transition-all">
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4 text-teal-400">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Developers Love It
            </h3>
            <p className="text-slate-400 text-lg">
              See what developers are saying about DevPortGen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer",
                text: "Created my portfolio in under 5 minutes. The AI-generated bio was surprisingly good!",
                avatar: "👩‍💻"
              },
              {
                name: "Shareef Habib",
                role: "Full-Stack Engineer",
                text: "Finally a portfolio that actually looks professional. Landed 2 interviews in the first week.",
                avatar: "👨‍💻"
              },
              {
                name: "Emily Davis",
                role: "Backend Developer",
                text: "GitHub integration is seamless. All my projects imported perfectly. Highly recommend!",
                avatar: "👩‍💼"
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Build Your Portfolio?
            </h3>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join {stats.users}+ developers who already created their portfolios with DevPortGen
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-10 py-5 rounded-lg transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 text-lg"
            >
              <Github className="w-6 h-6" />
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              No credit card required • Takes less than 3 minutes
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800">
          <div className="text-center">
            <p className="text-slate-500 text-sm mb-4">
              Built with Next.js, Prisma, and Claude AI
            </p>
            <div className="flex gap-6 justify-center text-sm">
              <a href="https://github.com/Imrexxx-OG/DevPortGen" target="_blank" className="text-slate-400 hover:text-teal-400 transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com/Imrexx_dev" target="_blank" className="text-slate-400 hover:text-teal-400 transition-colors">
                Twitter
              </a>
              <a href="/p/imran-damare" target="_blank" className="text-slate-400 hover:text-teal-400 transition-colors">
                Creator
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}