"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function StepBasicInfo({
  formData,
  updateFormData,
  nextStep,
}: any) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: formData.name,
      tagline: formData.tagline,
      bio: formData.bio,
    },
  });

  const name = watch("name");
  const bio = watch("bio");

  const generateBio = async () => {
    if (!name) {
      alert("Please enter your name first!");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          skills: formData.skills || ["React", "TypeScript", "Next.js"],
          projectTitles: formData.projects?.map((p: any) => p.title) || [],
          web3Address: formData.web3Address || "",
        }),
      });

      const result = await response.json();
      if (result.bio) {
        setValue("bio", result.bio);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Failed to generate bio");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (data: FormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Basic Info</h2>
        <p className="text-slate-400">Let's start with the basics</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Your Name
        </label>
        <input
          {...register("name")}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tagline
        </label>
        <input
          {...register("tagline")}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Full-stack Web3 developer"
        />
        {errors.tagline && (
          <p className="text-red-400 text-sm mt-1">{errors.tagline.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-300">
            Bio
          </label>
          <button
            type="button"
            onClick={generateBio}
            disabled={isGenerating}
            className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
        </div>
        <textarea
          {...register("bio")}
          rows={4}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Tell us about yourself..."
        />
        {errors.bio && (
          <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
        )}
        {bio && (
          <p className="text-xs text-slate-500 mt-1">
            {bio.length} characters
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}