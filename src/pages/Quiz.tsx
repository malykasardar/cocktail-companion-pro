
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import BottomNavigation from '../components/BottomNavigation';

const Quiz = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const quizData = [
    {
      id: '1',
      name: 'Vodka Gimlet',
      ingredients: 'Vodka, lime juice, simple syrup, soda water',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Gin Fizz',
      ingredients: 'Gin, lemon juice, simple syrup, soda water',
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'Margarita',
      ingredients: 'Tequila, lime juice, agave nectar',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop'
    },
    {
      id: '4',
      name: 'Mojito',
      ingredients: 'Rum, lime juice, simple syrup, mint',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop'
    }
  ];

  const correctAnswers = {
    '1': 'Vodka, lime juice, simple syrup, soda water',
    '2': 'Gin, lemon juice, simple syrup, soda water',
    '3': 'Tequila, lime juice, agave nectar',
    '4': 'Rum, lime juice, simple syrup, mint'
  };

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
    const correct = Object.entries(selectedAnswers).filter(
      ([id, answer]) => correctAnswers[id as keyof typeof correctAnswers] === answer
    ).length;
    return `${correct}/${Object.keys(correctAnswers).length}`;
  };

  return (
    <div className="min-h-screen bg-bartender-background pb-20">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Memory Test</h1>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Match the cocktail with its ingredients.
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-4 mb-8">
          {quizData.map((cocktail, index) => (
            <div key={cocktail.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <QuizCard 
                cocktail={cocktail} 
                onClick={() => handleAnswerSelect(cocktail.id, cocktail.ingredients)}
              />
              {selectedAnswers[cocktail.id] && (
                <div className="mt-2 ml-20 flex items-center">
                  <CheckCircle size={16} className="text-green-400 mr-2" />
                  <span className="text-sm text-green-400">Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Check Answers Button */}
        {Object.keys(selectedAnswers).length === quizData.length && !showResults && (
          <button 
            onClick={handleCheckAnswers}
            className="w-full bartender-button animate-fade-in"
          >
            Check Answers
          </button>
        )}

        {/* Results */}
        {showResults && (
          <div className="bartender-card text-center animate-scale-in">
            <h3 className="text-xl font-bold text-bartender-amber mb-2">Quiz Complete!</h3>
            <p className="text-lg text-foreground">Your Score: {getScore()}</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Quiz;
