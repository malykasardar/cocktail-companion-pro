
import React from 'react';
import { Clock } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description: string;
    duration: string;
    image: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  };
  onClick: () => void;
}

const LessonCard = ({ lesson, onClick }: LessonCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    Intermediate: 'bg-bartender-amber/10 text-bartender-amber border-bartender-amber/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div 
      className="bartender-card cursor-pointer group animate-fade-in"
      onClick={onClick}
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img 
          src={lesson.image} 
          alt={lesson.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium border rounded-full ${difficultyColors[lesson.difficulty]}`}>
            {lesson.difficulty}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-bartender-amber transition-colors">
        {lesson.title}
      </h3>
      
      <p className="text-muted-foreground mb-3 line-clamp-2">
        {lesson.description}
      </p>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <Clock size={16} className="mr-2" />
        {lesson.duration}
      </div>
    </div>
  );
};

export default LessonCard;
