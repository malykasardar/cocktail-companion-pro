
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BarChart3 } from 'lucide-react';

interface CocktailCardProps {
  cocktail: {
    id: string;
    drink_name: string;
    category: string;
    flavor_profile: string[];
    strength: string;
    difficulty: string;
    ingredients: string;
    glass_type: string;
    abv_percentage?: number;
    garnish?: string;
  };
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const ingredientsList = cocktail.ingredients.split(',').slice(0, 3);
  
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-scale-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {cocktail.drink_name}
            </h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {cocktail.flavor_profile.slice(0, 2).map((flavor) => (
                <Badge key={flavor} variant="secondary" className="text-xs">
                  {flavor}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-1">
              {cocktail.category}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 size={14} />
            <span>{cocktail.strength} • {cocktail.difficulty}</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <strong>Glass:</strong> {cocktail.glass_type}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <strong>Main ingredients:</strong> {ingredientsList.join(', ')}
            {cocktail.ingredients.split(',').length > 3 && '...'}
          </div>
          
          {cocktail.abv_percentage && (
            <div className="text-sm text-muted-foreground">
              <strong>ABV:</strong> {cocktail.abv_percentage}%
            </div>
          )}
          
          {cocktail.garnish && (
            <div className="text-sm text-muted-foreground">
              <strong>Garnish:</strong> {cocktail.garnish}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CocktailCard;
