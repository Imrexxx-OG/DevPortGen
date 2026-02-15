import { Github, Twitter, Linkedin, Globe, ExternalLink } from "lucide-react";

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
}

interface Portfolio {
  user?: {
    name?: string | null;
    image?: string | null;
  };
  tagline?: string | null;
  bio?: string | null;
  skills: string[];
  web3Address?: string | null;
  socialLinks?: SocialLinks;
  projects: Project[];
}

interface NovaTemplateProps {
  portfolio: Portfolio;
}

export default function NovaTemplate({ portfolio }: NovaTemplateProps) {
  const user = portfolio.user || {};
  const social = portfolio.socialLinks || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full text-center">
          {user.image && (
            <div className="mb-8 flex justify-center">
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="w-32 h-32 rounded-full border-4 border-teal-500/30"
              />
            </div>
          )}

          <h1 className="text-6xl font-bold text-white mb-4">
            {user.name || "Developer"}
          </h1>

          <p className="text-slate-400 text-xl mb-6">
            {portfolio.tagline || "Building the future, one line at a time"}
          </p>

          {portfolio.bio && (
            <p className="max-w-2xl mx-auto text-slate-300 mb-8">
              {portfolio.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {social.github && (
              <a
                href={
                  social.github.startsWith("http")
                    ? social.github
                    : `https://github.com/${social.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6 text-slate-400 hover:text-teal-400" />
              </a>
            )}
            {social.twitter && (
              <a
                href={
                  social.twitter.startsWith("http")
                    ? social.twitter
                    : `https://twitter.com/${social.twitter}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6 text-slate-400 hover:text-teal-400" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={
                  social.linkedin.startsWith("http")
                    ? social.linkedin
                    : `https://linkedin.com/in/${social.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-slate-400 hover:text-teal-400" />
              </a>
            )}
            {social.website && (
              <a
                href={
                  social.website.startsWith("http")
                    ? social.website
                    : `https://${social.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-6 h-6 text-slate-400 hover:text-teal-400" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      {portfolio.projects.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <h3 className="text-xl text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-teal-900/30 text-teal-300 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
