"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function StepSkills({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: any) {
  const [skills, setSkills] = useState<string[]>(formData.skills || []);
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleNext = () => {
    updateFormData({ skills });
    nextStep();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Skills</h2>
        <p className="text-slate-400">Add your technical skills and expertise</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Add Skills
        </label>
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="TypeScript, React, Solidity..."
          />
          <button
            onClick={addSkill}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">Press Enter or click Add</p>
      </div>

      {/* Skills display */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-teal-900/30 border border-teal-700 text-teal-300 px-3 py-2 rounded-lg flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-teal-100"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

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