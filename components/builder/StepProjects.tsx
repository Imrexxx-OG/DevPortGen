"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Github, Sparkles } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

export default function StepProjects({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: any) {
  const [projects, setProjects] = useState(formData.projects || []);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [showGithubImport, setShowGithubImport] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
  });

  // Fetch GitHub repos
  const fetchGithubRepos = async () => {
    setLoadingRepos(true);
    try {
      const response = await fetch("/api/github/repos");
      const data = await response.json();
      if (data.repos) {
        setGithubRepos(data.repos);
        setShowGithubImport(true);
      } else {
        alert("Could not load GitHub repos: " + data.error);
      }
    } catch (error) {
      alert("Failed to load GitHub repos");
      console.error(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  // Import repo as project
  const importRepo = (repo: GitHubRepo) => {
    const newProject = {
      title: repo.name,
      description: repo.description || "A project built with modern tools",
      techStack: repo.language ? [repo.language] : ["JavaScript"],
      githubUrl: repo.html_url,
      liveUrl: "",
    };
    setProjects([...projects, newProject]);
    setShowGithubImport(false);
  };

  const addProject = () => {
    if (currentProject.title && currentProject.description) {
      const newProject = {
        ...currentProject,
        techStack: currentProject.techStack.split(",").map((s) => s.trim()),
      };
      setProjects([...projects, newProject]);
      setCurrentProject({
        title: "",
        description: "",
        techStack: "",
        githubUrl: "",
        liveUrl: "",
      });
    }
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_: any, i: number) => i !== index));
  };

  const handleNext = () => {
    updateFormData({ projects });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Projects</h2>
          <p className="text-slate-400">Add projects manually or import from GitHub</p>
        </div>
        <button
          onClick={fetchGithubRepos}
          disabled={loadingRepos}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Github className="w-5 h-5" />
          {loadingRepos ? "Loading..." : "Import from GitHub"}
        </button>
      </div>

      {/* GitHub Import Modal */}
      {showGithubImport && (
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Your GitHub Repos</h3>
            <button
              onClick={() => setShowGithubImport(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {githubRepos.slice(0, 10).map((repo) => (
              <div
                key={repo.id}
                className="bg-slate-800 border border-slate-600 rounded-lg p-3 flex justify-between items-start hover:border-teal-500 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{repo.name}</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-slate-500">
                    {repo.language && <span>🔹 {repo.language}</span>}
                    {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
                  </div>
                </div>
                <button
                  onClick={() => importRepo(repo)}
                  className="ml-4 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Import
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Added projects list */}
      {projects.length > 0 && (
        <div className="space-y-3">
          {projects.map((project: any, index: number) => (
            <div
              key={index}
              className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {project.techStack.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs bg-teal-900/30 text-teal-400 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => removeProject(index)}
                className="text-red-400 hover:text-red-300 ml-4"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new project form */}
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 space-y-4">
        <h3 className="text-white font-semibold">Add Project Manually</h3>
        <input
          value={currentProject.title}
          onChange={(e) =>
            setCurrentProject({ ...currentProject, title: e.target.value })
          }
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Project title"
        />
        <textarea
          value={currentProject.description}
          onChange={(e) =>
            setCurrentProject({ ...currentProject, description: e.target.value })
          }
          rows={2}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Short description"
        />
        <input
          value={currentProject.techStack}
          onChange={(e) =>
            setCurrentProject({ ...currentProject, techStack: e.target.value })
          }
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Tech stack (comma separated: React, Node.js, MongoDB)"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            value={currentProject.githubUrl}
            onChange={(e) =>
              setCurrentProject({ ...currentProject, githubUrl: e.target.value })
            }
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="GitHub URL (optional)"
          />
          <input
            value={currentProject.liveUrl}
            onChange={(e) =>
              setCurrentProject({ ...currentProject, liveUrl: e.target.value })
            }
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Live URL (optional)"
          />
        </div>
        <button
          onClick={addProject}
          className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="bg-slate-600 hover:bg-slate-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}