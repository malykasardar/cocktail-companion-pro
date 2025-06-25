
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MemoryTest = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Fetch cocktails for memory test
  const { data: cocktails, isLoading } = useQuery({
    queryKey: ['memory-test-cocktails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .limit(6);
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load memory test');
        throw error;
      }
      
      return data || [];
    },
  });

  const handleAnswerSelect = (cocktailId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [cocktailId]: answer
    }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const getScore = () => {
    if (!cocktails) return '0/0';
    const correct = cocktails.filter(cocktail => 
      selectedAnswers[cocktail.id] === cocktail.ingredients
    ).length;
    return `${correct}/${cocktails.length}`;
  };

  const resetTest = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading memory test...</p>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-foreground">Memory Test</h1>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Match each cocktail with its correct ingredients.
          </p>
        </div>

        {/* Memory Test Cards */}
        <div className="max-w-2xl mx-auto">
          {cocktails && cocktails.length > 0 && (
            <div className="space-y-4 mb-8">
              {cocktails.map((cocktail, index) => (
                <div key={cocktail.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in">
                  <div className="bg-bartender-surface rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">{cocktail.drink_name}</h3>
                      {selectedAnswers[cocktail.id] && (
                        <CheckCircle size={20} className="text-green-400" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {/* Create options by shuffling ingredients from different cocktails */}
                      {cocktails.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(cocktail.id, option.ingredients)}
                          className={`w-full p-3 text-left rounded-lg transition-colors ${
                            selectedAnswers[cocktail.id] === option.ingredients
                              ? showResults
                                ? option.ingredients === cocktail.ingredients
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : 'bg-bartender-amber text-bartender-background'
                              : 'bg-bartender-surface-light text-foreground hover:bg-bartender-surface'
                          }`}
                          disabled={showResults}
                        >
                          {option.ingredients}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            {cocktails && Object.keys(selectedAnswers).length === cocktails.length && !showResults && (
              <button 
                onClick={handleCheckAnswers}
                className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold hover:bg-bartender-amber-light transition-colors"
              >
                Check Answers
              </button>
            )}

            {showResults && (
              <div className="space-y-4">
                <div className="bg-bartender-surface rounded-lg p-6 animate-scale-in">
                  <h3 className="text-xl font-bold text-bartender-amber mb-2">Test Complete!</h3>
                  <p className="text-lg text-foreground">Your Score: {getScore()}</p>
                </div>
                <button
                  onClick={resetTest}
                  className="px-8 py-4 bg-bartender-surface text-foreground rounded-full font-bold hover:bg-bartender-surface-light transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryTest;
