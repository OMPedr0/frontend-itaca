// ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  progress: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, totalSteps }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      {[...Array(totalSteps)].map((_, step) => {
        const stepProgress = (step + 1) * (100 / totalSteps);
        const isStepCompleted = progress >= stepProgress;
        const rectangleClasses = `h-2 w-8 mx-1 rounded ${isStepCompleted ? 'bg-teal-500' : 'bg-gray-300'}`;

        return <div key={step} className={rectangleClasses}></div>;
      })}
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600"></span>
    </div>
  );
};

export default ProgressBar;
