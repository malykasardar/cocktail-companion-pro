
import React from 'react';

interface CocktailCardProps {
  cocktail: {
    id: string;
    name: string;
    ingredients: string[];
    image: string;
    description: string;
  };
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  return (
    <div className="bartender-card animate-fade-in">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={cocktail.image} 
            alt={cocktail.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">
            {cocktail.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">
            {cocktail.description}
          </p>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-bartender-amber">Ingredients:</p>
            <ul className="text-sm text-muted-foreground">
              {cocktail.ingredients.map((ingredient, index) => (
                <li key={index}>• {ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
