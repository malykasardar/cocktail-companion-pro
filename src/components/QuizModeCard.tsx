
import React from 'react';

interface QuizMode {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

interface QuizModeCardProps {
  mode: QuizMode;
  onClick: () => void;
}

const QuizModeCard = ({ mode, onClick }: QuizModeCardProps) => {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`${mode.color} p-6 h-40 flex flex-col justify-between relative`}>
        {/* Icon */}
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {mode.icon}
        </div>
        
        {/* Content */}
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors">
            {mode.title}
          </h3>
          <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
            {mode.description}
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default QuizModeCard;
