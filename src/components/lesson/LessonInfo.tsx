import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';

interface LessonInfoProps {
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ 
  title, 
  description, 
  duration, 
  category, 
  difficulty 
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>
      <p className="text-lg text-muted-foreground mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={16} className="mr-2" />
          {duration}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen size={16} className="mr-2" />
          {category}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <User size={16} className="mr-2" />
          {difficulty}
        </div>
      </div>
    </div>
  );
};

export default LessonInfo;