
import React from 'react';

interface QuizMode {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

interface QuizModeCardProps {
  mode: QuizMode;
  onClick: () => void;
}

const QuizModeCard = ({ mode, onClick }: QuizModeCardProps) => {
  return (
    <div 
      className="bg-bartender-surface hover:bg-bartender-surface-light border border-bartender-surface-light rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in"
      onClick={onClick}
    >
      <div className="p-6 h-40 flex flex-col justify-between relative">
        {/* Icon */}
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {mode.icon}
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-bartender-amber transition-colors">
            {mode.title}
          </h3>
          <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
            {mode.description}
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-bartender-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>
    </div>
  );
};

export default QuizModeCard;
