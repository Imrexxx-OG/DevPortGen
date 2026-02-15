"use client";

import { useForm } from "react-hook-form";
import { Github, Twitter, Linkedin, Globe } from "lucide-react";

export default function StepWeb3({
  formData,
  updateFormData,
  prevStep,
}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      web3Address: formData.web3Address,
      github: formData.socialLinks?.github || "",
      twitter: formData.socialLinks?.twitter || "",
      linkedin: formData.socialLinks?.linkedin || "",
      website: formData.socialLinks?.website || "",
    },
  });

  const onSubmit = async (data: any) => {
  const finalData = {
    name: formData.name,
    tagline: formData.tagline,
    bio: formData.bio,
    projects: formData.projects,
    skills: formData.skills,
    web3Address: data.web3Address,
    socialLinks: {
      github: data.github,
      twitter: data.twitter,
      linkedin: data.linkedin,
      website: data.website,
    },
  };

  try {
    const response = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    const result = await response.json();

    if (result.success) {
      alert(`Portfolio saved! Your URL: /p/${result.portfolio.slug}`);
      window.location.href = "/dashboard";
    } else {
      alert("Error saving portfolio: " + result.error);
    }
  } catch (error) {
    alert("Network error saving portfolio");
    console.error(error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Web3 & Social Links</h2>
        <p className="text-slate-400">Optional: Add your Web3 address and social profiles</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Web3 Wallet Address (ETH/Solana)
        </label>
        <input
          {...register("web3Address")}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
          placeholder="0x... or your Solana address"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Social Links</h3>

        <div className="flex items-center gap-3">
          <Github className="w-5 h-5 text-slate-400" />
          <input
            {...register("github")}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="github.com/username"
          />
        </div>

        <div className="flex items-center gap-3">
          <Twitter className="w-5 h-5 text-slate-400" />
          <input
            {...register("twitter")}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="twitter.com/username"
          />
        </div>

        <div className="flex items-center gap-3">
          <Linkedin className="w-5 h-5 text-slate-400" />
          <input
            {...register("linkedin")}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="linkedin.com/in/username"
          />
        </div>

        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-slate-400" />
          <input
            {...register("website")}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="yourwebsite.com"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="bg-slate-600 hover:bg-slate-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Complete Setup
        </button>
      </div>
    </form>
  );
}