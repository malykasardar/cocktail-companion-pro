
import React, { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Flashcards = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<number>>(new Set());

  // Fetch cocktails for flashcards
  const { data: cocktails, isLoading } = useQuery({
    queryKey: ['flashcards-cocktails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .limit(20);
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load flashcards');
        throw error;
      }
      
      return data || [];
    },
  });

  const handleNext = () => {
    if (cocktails && currentCard < cocktails.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const markAsKnown = () => {
    setKnownCards(prev => new Set([...prev, currentCard]));
    setUnknownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard);
      return newSet;
    });
    handleNext();
  };

  const markAsUnknown = () => {
    setUnknownCards(prev => new Set([...prev, currentCard]));
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard);
      return newSet;
    });
    handleNext();
  };

  const resetProgress = () => {
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading flashcards...</p>
      </div>
    );
  }

  const currentCocktail = cocktails?.[currentCard];

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
            <h1 className="text-2xl font-bold text-foreground">Flashcards</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentCard + 1} / {cocktails?.length || 0}
            <div className="mt-1">
              <span className="text-green-400">Known: {knownCards.size}</span>
              {' • '}
              <span className="text-red-400">Review: {unknownCards.size}</span>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        {currentCocktail && (
          <div className="max-w-md mx-auto">
            <div 
              className="relative h-80 mb-8 cursor-pointer"
              onClick={handleFlip}
            >
              <div className={`absolute inset-0 w-full h-full transition-transform duration-600 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-bartender-surface rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {currentCocktail.drink_name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Tap to reveal ingredients
                  </p>
                  <RotateCcw size={24} className="text-bartender-amber" />
                </div>
                
                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-bartender-surface rounded-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-bartender-amber mb-4">Ingredients:</h3>
                  <p className="text-foreground mb-4">{currentCocktail.ingredients}</p>
                  <h3 className="text-lg font-bold text-bartender-amber mb-2">Instructions:</h3>
                  <p className="text-sm text-muted-foreground">{currentCocktail.steps}</p>
                </div>
              </div>
            </div>

            {/* Knowledge Assessment */}
            {isFlipped && (
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={markAsUnknown}
                  className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  Need Review
                </button>
                <button
                  onClick={markAsKnown}
                  className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  I Know This
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentCard === 0}
                className="px-6 py-3 bg-bartender-surface text-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bartender-surface-light transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {cocktails && currentCard >= cocktails.length - 1 && (
                  <button
                    onClick={resetProgress}
                    className="px-6 py-3 bg-bartender-surface text-foreground rounded-full hover:bg-bartender-surface-light transition-colors"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!cocktails || currentCard >= cocktails.length - 1}
                  className="px-6 py-3 bg-bartender-amber text-bartender-background rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bartender-amber-light transition-colors"
                >
                  {cocktails && currentCard >= cocktails.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
