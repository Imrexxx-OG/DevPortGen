"use client";

import { useState } from "react";
import StepBasicInfo from "@/components/builder/StepBasicInfo";
import StepProjects from "@/components/builder/StepProjects";
import StepSkills from "@/components/builder/StepSkills";
import StepWeb3 from "@/components/builder/StepWeb3";

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    bio: "",
    projects: [] as any[],
    skills: [] as string[],
    web3Address: "",
    socialLinks: { github: "", twitter: "", linkedin: "", website: "" },
  });

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: "Basic Info", component: StepBasicInfo },
    { number: 2, title: "Projects", component: StepProjects },
    { number: 3, title: "Skills", component: StepSkills },
    { number: 4, title: "Web3 & Social", component: StepWeb3 },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentStep >= step.number
                    ? "bg-teal-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {step.number}
              </div>
              <div
                className={`flex-1 h-1 mx-2 transition-colors ${
                  step.number < steps.length
                    ? currentStep > step.number
                      ? "bg-teal-500"
                      : "bg-slate-700"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          {steps.map((step) => (
            <span
              key={step.number}
              className={currentStep === step.number ? "text-teal-400 font-semibold" : ""}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Current step */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
}