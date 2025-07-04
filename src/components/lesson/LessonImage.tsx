import React from 'react';
import { Badge } from '@/components/ui/badge';

interface LessonImageProps {
  imageUrl: string;
  title: string;
  difficulty: string;
}

const LessonImage: React.FC<LessonImageProps> = ({ imageUrl, title, difficulty }) => {
  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    Intermediate: 'bg-bartender-amber/10 text-bartender-amber border-bartender-amber/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 right-3">
        <Badge variant="outline" className={`${difficultyColors[difficulty as keyof typeof difficultyColors]} border`}>
          {difficulty}
        </Badge>
      </div>
    </div>
  );
};

export default LessonImage;