
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SpeedRound = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Fetch cocktails for questions
  const { data: cocktails, isLoading } = useQuery({
    queryKey: ['speed-round-cocktails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .limit(20);
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load questions');
        throw error;
      }
      
      return data || [];
    },
  });

  // Timer effect
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
  }, [gameStarted, timeLeft, gameEnded]);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(60);
  };

  const handleAnswer = (answer: string, correct: boolean) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      if (correct) {
        setScore(score + 1);
      }
      
      if (cocktails && currentQuestion < cocktails.length - 1) {
        setCurrentQuestion(current => current + 1);
        setSelectedAnswer(null);
      } else {
        setGameEnded(true);
      }
    }, 1000);
  };

  const generateOptions = (correct: string, allCocktails: any[]) => {
    const options = [correct];
    const otherOptions = allCocktails
      .filter(c => c.ingredients !== correct)
      .map(c => c.ingredients)
      .slice(0, 3);
    
    options.push(...otherOptions);
    return options.sort(() => Math.random() - 0.5);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  const currentCocktail = cocktails?.[currentQuestion];
  const options = currentCocktail && cocktails ? generateOptions(currentCocktail.ingredients, cocktails) : [];

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
            <h1 className="text-2xl font-bold text-foreground">Speed Round</h1>
          </div>
          
          {gameStarted && !gameEnded && (
            <div className="flex items-center text-bartender-amber">
              <Clock size={20} className="mr-2" />
              <span className="text-xl font-bold">{timeLeft}s</span>
            </div>
          )}
        </div>

        {/* Game Content */}
        <div className="max-w-md mx-auto">
          {!gameStarted && !gameEnded && (
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Ready for the Speed Round?</h2>
              <p className="text-muted-foreground mb-8">
                You have 60 seconds to answer as many questions as possible!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold text-lg hover:bg-bartender-amber-light transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {gameStarted && !gameEnded && currentCocktail && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Question {currentQuestion + 1} • Score: {score}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  What are the ingredients for {currentCocktail.drink_name}?
                </h2>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option, option === currentCocktail.ingredients)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      selectedAnswer === option
                        ? option === currentCocktail.ingredients
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-bartender-surface text-foreground hover:bg-bartender-surface-light'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameEnded && (
            <div className="text-center animate-scale-in">
              <h2 className="text-2xl font-bold text-bartender-amber mb-4">Game Over!</h2>
              <p className="text-lg text-foreground mb-2">Final Score: {score}</p>
              <p className="text-muted-foreground mb-8">
                {cocktails && `${score}/${cocktails.length} questions answered correctly`}
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold hover:bg-bartender-amber-light transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeedRound;
