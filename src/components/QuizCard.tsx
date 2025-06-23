
import React from 'react';

interface QuizCardProps {
  cocktail: {
    id: string;
    name: string;
    ingredients: string;
    image: string;
  };
  onClick: () => void;
}

const QuizCard = ({ cocktail, onClick }: QuizCardProps) => {
  return (
    <div 
      className="bartender-card cursor-pointer group animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={cocktail.image} 
            alt={cocktail.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-bartender-amber transition-colors">
            {cocktail.name}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {cocktail.ingredients}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
