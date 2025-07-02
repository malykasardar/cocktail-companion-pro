
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const DragDrop = () => {
  const navigate = useNavigate();
  const [currentCocktail, setCurrentCocktail] = useState(0);
  const [droppedIngredients, setDroppedIngredients] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch cocktails for drag and drop
  const { data: cocktails, isLoading } = useQuery({
    queryKey: ['drag-drop-cocktails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .limit(5);
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load cocktails');
        throw error;
      }
      
      return data || [];
    },
  });

  // Generate random ingredients including correct ones
  const generateIngredients = (cocktail: any, allCocktails: any[]) => {
    const correctIngredients = cocktail.ingredients.split(', ').map((ing: string) => ing.trim());
    const incorrectIngredients = allCocktails
      .flatMap(c => c.ingredients.split(', ').map((ing: string) => ing.trim()))
      .filter(ing => !correctIngredients.includes(ing))
      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.max(6, correctIngredients.length * 2));
    
    return [...correctIngredients, ...incorrectIngredients].sort(() => Math.random() - 0.5);
  };

  const handleDragStart = (e: React.DragEvent, ingredient: string) => {
    e.dataTransfer.setData('text/plain', ingredient);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const ingredient = e.dataTransfer.getData('text/plain');
    
    if (!droppedIngredients.includes(ingredient)) {
      setDroppedIngredients([...droppedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setDroppedIngredients(droppedIngredients.filter(ing => ing !== ingredient));
  };

  const checkAnswer = () => {
    const current = cocktails?.[currentCocktail];
    if (!current) return;
    
    const correctIngredients = current.ingredients.split(', ').map((ing: string) => ing.trim());
    const droppedClean = droppedIngredients.map(ing => ing.trim());
    
    const isCorrect = correctIngredients.length === droppedClean.length &&
                     correctIngredients.every(ing => droppedClean.includes(ing));
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const nextCocktail = () => {
    if (cocktails && currentCocktail < cocktails.length - 1) {
      setCurrentCocktail(currentCocktail + 1);
      setDroppedIngredients([]);
      setShowResult(false);
    }
  };

  const resetGame = () => {
    setCurrentCocktail(0);
    setDroppedIngredients([]);
    setShowResult(false);
    setScore(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading cocktails...</p>
      </div>
    );
  }

  const current = cocktails?.[currentCocktail];
  const ingredients = current && cocktails ? generateIngredients(current, cocktails) : [];
  const correctIngredients = current ? current.ingredients.split(', ').map((ing: string) => ing.trim()) : [];

  return (
    <div className="min-h-screen bg-bartender-background">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/quiz')}
              className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
            >
              <ArrowLeft size={20} className="text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Drink Builder</h1>
          </div>
          {cocktails && currentCocktail < cocktails.length && (
            <div className="text-sm text-muted-foreground">
              {currentCocktail + 1} / {cocktails.length}
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {current && currentCocktail < cocktails!.length && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Build a {current.drink_name}
                </h2>
                <p className="text-muted-foreground">
                  Drag the correct ingredients to the cocktail shaker
                </p>
              </div>

              {/* Drop Zone */}
              <div 
                className="min-h-40 bg-bartender-surface rounded-lg p-6 mb-8 border-2 border-dashed border-bartender-surface-light"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3 className="text-lg font-bold text-bartender-amber mb-4">Cocktail Shaker</h3>
                <div className="space-y-2">
                  {droppedIngredients.length === 0 ? (
                    <p className="text-muted-foreground italic">Drop ingredients here...</p>
                  ) : (
                    droppedIngredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between bg-bartender-surface-light p-2 rounded">
                        <span className="text-foreground">{ingredient}</span>
                        {!showResult && (
                          <button
                            onClick={() => removeIngredient(ingredient)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Available Ingredients</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      draggable={!showResult && !droppedIngredients.includes(ingredient)}
                      onDragStart={(e) => handleDragStart(e, ingredient)}
                      className={`p-3 rounded-lg cursor-move transition-all ${
                        droppedIngredients.includes(ingredient)
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-50'
                          : showResult
                          ? correctIngredients.includes(ingredient)
                            ? 'bg-green-500 text-white'
                            : 'bg-bartender-surface text-foreground'
                          : 'bg-bartender-surface text-foreground hover:bg-bartender-surface-light'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{ingredient}</span>
                        {showResult && correctIngredients.includes(ingredient) && (
                          <CheckCircle size={16} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="text-center space-y-4">
                {!showResult && droppedIngredients.length > 0 && (
                  <button
                    onClick={checkAnswer}
                    className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold hover:bg-bartender-amber-light transition-colors"
                  >
                    Check Recipe
                  </button>
                )}

                {showResult && (
                  <div className="space-y-4">
                    <div className="bg-bartender-surface rounded-lg p-4">
                      <p className="text-foreground">
                        {correctIngredients.length === droppedIngredients.length &&
                         correctIngredients.every(ing => droppedIngredients.map(d => d.trim()).includes(ing.trim()))
                          ? '🎉 Perfect! You built the cocktail correctly!'
                          : `❌ Not quite right. You need exactly these ${correctIngredients.length} ingredients: ${correctIngredients.join(', ')}`}
                      </p>
                    </div>
                    
                    {currentCocktail < cocktails!.length - 1 ? (
                      <button
                        onClick={nextCocktail}
                        className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold hover:bg-bartender-amber-light transition-colors"
                      >
                        Next Cocktail
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-bartender-surface rounded-lg p-6">
                          <h3 className="text-xl font-bold text-bartender-amber mb-2">Game Complete!</h3>
                          <p className="text-lg text-foreground">Score: {score}/{cocktails!.length}</p>
                        </div>
                        <button
                          onClick={resetGame}
                          className="px-8 py-4 bg-bartender-surface text-foreground rounded-full font-bold hover:bg-bartender-surface-light transition-colors"
                        >
                          Play Again
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
