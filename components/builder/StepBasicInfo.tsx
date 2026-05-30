"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";

interface StepBasicInfoProps {
  formData: {
    name?: string;
    email?: string;
    bio?: string;
    skills: string[];
    web3Address?: string;
    [key: string]: any;
  };
  updateFormData: (data: any) => void;
  nextStep: () => void;
}

export default function StepBasicInfo({
  formData,
  updateFormData,
  nextStep,
}: StepBasicInfoProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const generateBio = async () => {
    if (!formData.name || formData.name.trim() === "") {
      toast.error("❌ Please enter your name first!");
      return;
    }

    if (formData.skills.length === 0) {
      toast.error("❌ Please add at least one skill!");
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading("✨ Asking AI to write your bio...");

    try {
      const response = await fetch("/api/ai/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          skills: formData.skills,
          projectTitles: formData.projects?.map((p: any) => p.title) || [],
          web3Address: formData.web3Address || "",
        }),
      });

      const data = await response.json();

      if (data.bio) {
        updateFormData({ ...formData, bio: data.bio });
        toast.success("✨ Bio generated successfully!", { id: loadingToast });
      } else {
        toast.error("❌ Failed to generate bio. Try again!", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Try again!", {
        id: loadingToast,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() === "") {
      toast.error("❌ Please enter a skill!");
      return;
    }

    if (formData.skills.includes(skillInput.trim())) {
      toast.error("❌ You already added this skill!");
      return;
    }

    const updatedSkills = [...formData.skills, skillInput.trim()];
    updateFormData({ ...formData, skills: updatedSkills });
    setSkillInput("");
    toast.success(`✅ Added ${skillInput.trim()}`);
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = formData.skills.filter((s: string) => s !== skill);
    updateFormData({ ...formData, skills: updatedSkills });
    toast.success(`✅ Removed ${skill}`);
  };

  const copyBio = () => {
    navigator.clipboard.writeText(formData.bio || "");
    setIsCopied(true);
    toast.success("✅ Bio copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const isFormValid =
    formData.name?.trim() &&
    formData.email?.trim() &&
    formData.skills.length > 0 &&
    formData.bio?.trim();

  return (
    <div className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) =>
            updateFormData({ ...formData, name: e.target.value })
          }
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          placeholder="e.g., Imran Damare"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) =>
            updateFormData({ ...formData, email: e.target.value })
          }
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          placeholder="your@email.com"
        />
      </div>

      {/* Skills Section */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Skills & Technologies *
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            placeholder="e.g., React, TypeScript, PostgreSQL"
          />
          <button
            onClick={addSkill}
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
          >
            Add
          </button>
        </div>

        {/* Skills Tags */}
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700">
            {formData.skills.map((skill: string) => (
              <div
                key={skill}
                className="bg-teal-600/20 text-teal-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-teal-600/30"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-teal-400 hover:text-red-400 transition-colors"
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bio Field */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-white font-semibold">
            Professional Bio *
          </label>
          {formData.bio && (
            <button
              onClick={copyBio}
              type="button"
              className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1 transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>

        <textarea
          value={formData.bio || ""}
          onChange={(e) =>
            updateFormData({ ...formData, bio: e.target.value })
          }
          rows={5}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
          placeholder="Tell us about yourself, your experience, and what you're passionate about..."
        />
        <p className="text-xs text-slate-400 mt-2">
          This is what will appear on your portfolio
        </p>

        {/* AI Generate Button */}
        <button
          onClick={generateBio}
          disabled={isGenerating}
          type="button"
          className={`mt-3 w-full flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-lg transition-all ${
            isGenerating
              ? "bg-purple-800 text-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white active:scale-95"
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>🤖 Asking AI to write your bio...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>✨ Generate with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Optional: Web3 Address */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Web3 Address (Optional)
        </label>
        <input
          type="text"
          value={formData.web3Address || ""}
          onChange={(e) =>
            updateFormData({ ...formData, web3Address: e.target.value })
          }
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          placeholder="0x... (Ethereum, Polygon, etc.)"
        />
      </div>

      {/* Info Box */}
      <div className="bg-teal-900/20 border border-teal-700/30 rounded-lg p-4">
        <p className="text-sm text-teal-300">
          💡 <span className="font-semibold">Tip:</span> The AI generates better
          bios when you have more skills and details. After adding your
          projects, you can regenerate for a more personalized bio.
        </p>
      </div>

      {/* Next Step Button */}
      <button
        onClick={nextStep}
        disabled={!isFormValid}
        className={`w-full font-semibold px-6 py-3 rounded-lg transition-all ${
          isFormValid
            ? "bg-teal-600 hover:bg-teal-700 text-white active:scale-95"
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        Continue to Next Step →
      </button>

      {!isFormValid && (
        <p className="text-sm text-slate-400 text-center">
          Fill in all required fields (*) to continue
        </p>
      )}
    </div>
  );
}