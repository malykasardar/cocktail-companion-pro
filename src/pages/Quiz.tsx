
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import QuizModeCard from '../components/QuizModeCard';

const Quiz = () => {
  const navigate = useNavigate();

  const quizModes = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Study cocktail recipes with interactive flashcards',
      icon: '🗂️',
      route: '/quiz/flashcards'
    },
    {
      id: 'speed-round',
      title: 'Speed Round',
      description: 'Quick-fire questions to test your knowledge',
      icon: '⚡',
      route: '/quiz/speed-round'
    },
    {
      id: 'memory-test',
      title: 'Memory Test',
      description: 'Match cocktails with their ingredients',
      icon: '🧠',
      route: '/quiz/memory-test'
    },
    {
      id: 'multiple-choice',
      title: 'Multiple Choice',
      description: 'Choose the correct answer from options',
      icon: '✅',
      route: '/quiz/multiple-choice'
    },
    {
      id: 'drag-drop',
      title: 'Drink Builder',
      description: 'Drag and drop ingredients to build cocktails',
      icon: '🍹',
      route: '/quiz/drag-drop'
    }
  ];

  const handleModeClick = (mode: typeof quizModes[0]) => {
    console.log('Opening quiz mode:', mode.title);
    navigate(mode.route);
  };

  return (
    <div className="min-h-screen bg-bartender-background pb-20">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4 hover:bg-bartender-surface-light transition-colors"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-3xl font-bold text-foreground">Quiz Modes</h1>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Choose your preferred way to test your bartending knowledge
          </p>
        </div>

        {/* Quiz Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizModes.map((mode, index) => (
            <div key={mode.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <QuizModeCard 
                mode={mode}
                onClick={() => handleModeClick(mode)}
              />
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Quiz;
