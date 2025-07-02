
import React from 'react';
import { Clock } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    duration: string;
    image_url: string | null;
    difficulty: string;
    category: string;
  };
  onClick: () => void;
}

const LessonCard = ({ lesson, onClick }: LessonCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'intermediate':
        return 'bg-bartender-amber/10 text-bartender-amber border-bartender-amber/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-bartender-amber/10 text-bartender-amber border-bartender-amber/20';
    }
  };

  return (
    <div 
      className="bg-bartender-surface hover:bg-bartender-surface-light border border-bartender-surface-light rounded-2xl p-6 cursor-pointer group animate-fade-in transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
        <img 
          src={lesson.image_url || 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop'} 
          alt={lesson.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-bartender-amber/20 text-bartender-amber border border-bartender-amber/30 rounded-full">
            {lesson.category}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-bartender-amber transition-colors">
        {lesson.title}
      </h3>
      
      <p className="text-white/70 mb-4 line-clamp-2">
        {lesson.description}
      </p>
      
      <div className="flex items-center text-sm text-white/60">
        <Clock size={16} className="mr-2 text-bartender-amber" />
        {lesson.duration}
      </div>
    </div>
  );
};

export default LessonCard;
