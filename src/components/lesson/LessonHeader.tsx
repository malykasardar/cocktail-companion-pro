import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonHeaderProps {
  title: string;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-8">
      <button 
        onClick={() => navigate('/')}
        className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
      >
        <ArrowLeft size={20} className="text-muted-foreground" />
      </button>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    </div>
  );
};

export default LessonHeader;