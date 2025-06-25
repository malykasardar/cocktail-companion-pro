
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MultipleChoice = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch cocktails for multiple choice questions
  const { data: cocktails, isLoading } = useQuery({
    queryKey: ['multiple-choice-cocktails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .limit(10);
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load questions');
        throw error;
      }
      
      return data || [];
    },
  });

  const generateOptions = (correctAnswer: string, allCocktails: any[]) => {
    const options = [correctAnswer];
    const otherOptions = allCocktails
      .filter(c => c.ingredients !== correctAnswer)
      .map(c => c.ingredients)
      .slice(0, 3);
    
    options.push(...otherOptions);
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const currentCocktail = cocktails?.[currentQuestion];
    if (currentCocktail && answer === currentCocktail.ingredients) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (cocktails && currentQuestion < cocktails.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
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
            <h1 className="text-2xl font-bold text-foreground">Multiple Choice</h1>
          </div>
          {cocktails && !quizCompleted && (
            <div className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {cocktails.length}
            </div>
          )}
        </div>

        <div className="max-w-md mx-auto">
          {!quizCompleted && currentCocktail && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Score: {score}/{cocktails?.length || 0}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  What are the main ingredients in {currentCocktail.drink_name}?
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg transition-colors flex items-center justify-between ${
                      showResult
                        ? option === currentCocktail.ingredients
                          ? 'bg-green-500 text-white'
                          : selectedAnswer === option
                          ? 'bg-red-500 text-white'
                          : 'bg-bartender-surface text-muted-foreground'
                        : 'bg-bartender-surface text-foreground hover:bg-bartender-surface-light'
                    }`}
                  >
                    <span>{option}</span>
                    {showResult && (
                      <>
                        {option === currentCocktail.ingredients && (
                          <CheckCircle size={20} className="text-white" />
                        )}
                        {selectedAnswer === option && option !== currentCocktail.ingredients && (
                          <XCircle size={20} className="text-white" />
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="text-center">
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold hover:bg-bartender-amber-light transition-colors"
                  >
                    {cocktails && currentQuestion < cocktails.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              )}
            </div>
          )}

          {quizCompleted && (
            <div className="text-center animate-scale-in">
              <h2 className="text-2xl font-bold text-bartender-amber mb-4">Quiz Complete!</h2>
              <p className="text-lg text-foreground mb-2">Final Score: {score}</p>
              <p className="text-muted-foreground mb-8">
                {cocktails && `${score}/${cocktails.length} questions answered correctly`}
              </p>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {score === cocktails?.length ? 'Perfect score! 🎉' : 
                     score && cocktails && score >= cocktails.length * 0.8 ? 'Great job! 👏' : 
                     'Keep practicing! 📚'}
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-bartender-amber text-bartender-background rounded-full font-bold hover:bg-bartender-amber-light transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
