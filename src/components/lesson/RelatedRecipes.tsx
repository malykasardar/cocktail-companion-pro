import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RelatedRecipesProps {
  recipes: string[];
}

const RelatedRecipes: React.FC<RelatedRecipesProps> = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="bartender-card mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Related Recipes</h3>
      <div className="flex flex-wrap gap-2">
        {recipes.map((recipe, index) => (
          <Badge key={index} variant="secondary" className="text-sm">
            {recipe}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RelatedRecipes;