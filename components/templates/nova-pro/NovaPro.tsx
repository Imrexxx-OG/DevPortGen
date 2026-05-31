"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowRight,
  ExternalLink,
  Code2,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  github?: string;
  technologies: string[];
  image?: string;
}

interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

interface NovaPro {
  name: string;
  bio: string;
  email: string;
  skills: string[];
  projects: Project[];
  socialLinks?: SocialLinks;
  web3Address?: string;
}

export default function NovaPro({ portfolio }: { portfolio: NovaPro }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skillCategories = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"],
    Backend: ["Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB"],
    Web3: ["Ethereum", "Smart Contracts", "Web3.js", "Solidity"],
    Tools: ["Git", "Vercel", "Docker", "VS Code"],
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github":
        return <Github className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "website":
        return <Globe className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-10"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Avatar */}
            <div className="mb-8 inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-2xl hover:shadow-teal-500/50 transition-all duration-300">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  {portfolio.name.charAt(0)}
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-6xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {portfolio.name}
            </h1>

            <div className="flex flex-col items-center gap-4 mb-8">
              <p className="text-xl sm:text-2xl text-slate-300 font-light">
                Full-Stack Developer & Creative Builder
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full" />
            </div>

            {/* Bio */}
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              {portfolio.bio}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-12">
              {portfolio.socialLinks?.github && (
                <Link
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  className="p-3 rounded-full bg-slate-800/50 hover:bg-teal-500/20 border border-slate-700 hover:border-teal-500 transition-all duration-300 hover:scale-110"
                >
                  {getSocialIcon("github")}
                </Link>
              )}
              {portfolio.socialLinks?.twitter && (
                <Link
                  href={portfolio.socialLinks.twitter}
                  target="_blank"
                  className="p-3 rounded-full bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-110"
                >
                  {getSocialIcon("twitter")}
                </Link>
              )}
              {portfolio.socialLinks?.linkedin && (
                <Link
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  className="p-3 rounded-full bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-110"
                >
                  {getSocialIcon("linkedin")}
                </Link>
              )}
              {portfolio.socialLinks?.website && (
                <Link
                  href={portfolio.socialLinks.website}
                  target="_blank"
                  className="p-3 rounded-full bg-slate-800/50 hover:bg-purple-500/20 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-110"
                >
                  {getSocialIcon("website")}
                </Link>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${portfolio.email}`}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/50 flex items-center justify-center gap-2"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </a>
              {portfolio.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  className="px-8 py-4 rounded-lg bg-slate-800/50 border-2 border-slate-700 hover:border-teal-500 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  View GitHub <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Scroll indicator */}
            <div className="mt-20 animate-bounce">
              <p className="text-slate-500 text-sm mb-2">Scroll to explore</p>
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-5xl font-bold mb-4 text-white">
                Featured <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">Projects</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolio.projects.slice(0, 6).map((project, index) => (
                <div
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Project image background */}
                  {project.image ? (
                    <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                      {/* Placeholder gradient if no image */}
                      <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10" />
                  )}

                  {/* Content */}
                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-4">
                      <Code2 className="w-8 h-8 text-teal-400" />
                      <div className="flex gap-2">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-teal-500/20 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-teal-500/20 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-400">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Skills & <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">Expertise</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.skills && portfolio.skills.length > 0 ? (
              portfolio.skills.map((skill, index) => (
                <div
                  key={skill}
                  className="group p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:bg-gradient-to-br hover:from-teal-900/20 hover:to-cyan-900/20"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-cyan-400 transition-colors" />
                    <span className="text-lg font-semibold text-white group-hover:text-teal-300 transition-colors">
                      {skill}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-500"
                      style={{
                        width: `${Math.random() * 30 + 70}%`,
                        transitionDelay: `${index * 0.05}s`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 col-span-full text-center">
                No skills added yet
              </p>
            )}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Let's Create Something <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">Amazing</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              I'm always interested in working on creative projects. Feel free to reach out!
            </p>
            <a
              href={`mailto:${portfolio.email}`}
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/50"
            >
              Send me an email
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} {portfolio.name}. Built with{" "}
            <span className="text-teal-400">DevPortGen</span>
          </p>
        </footer>
      </div>

      {/* Smooth scroll behavior */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}