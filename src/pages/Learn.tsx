
import React from 'react';
import { Search } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import BottomNavigation from '../components/BottomNavigation';

const Learn = () => {
  const categories = ['All', 'Basics', 'Techniques', 'Recipes'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Bartending',
      description: 'Learn the basics of bartending, including essential tools, glassware, and ingredients.',
      duration: '15 min',
      difficulty: 'Beginner' as const,
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Mastering Basic Techniques',
      description: 'Learn essential bartending techniques such as pouring, stirring, shaking, and muddling.',
      duration: '20 min',
      difficulty: 'Beginner' as const,
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Crafting Classic Cocktails',
      description: 'Discover how to make classic cocktails like the Old Fashioned, Margarita, and Martini.',
      duration: '25 min',
      difficulty: 'Intermediate' as const,
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Advanced Mixology',
      description: 'Explore advanced mixology techniques and create unique and innovative cocktails.',
      duration: '30 min',
      difficulty: 'Advanced' as const,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop'
    }
  ];

  const handleLessonClick = (lesson: any) => {
    console.log('Opening lesson:', lesson.title);
    // Here you would typically navigate to a detailed lesson page
  };

  return (
    <div className="min-h-screen bg-bartender-background pb-20">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Learn</h1>
          <div className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center">
            <Search size={20} className="text-muted-foreground" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-bartender-amber text-bartender-background'
                  : 'bg-bartender-surface text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <LessonCard lesson={lesson} onClick={() => handleLessonClick(lesson)} />
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Learn;
