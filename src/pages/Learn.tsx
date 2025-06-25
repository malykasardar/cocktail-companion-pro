
import React from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LessonCard from '../components/LessonCard';
import BottomNavigation from '../components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Learn = () => {
  const navigate = useNavigate();
  const categories = ['All', 'Basics', 'Techniques', 'Recipes', 'Advanced'];
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fetch lessons from database
  const { data: lessons, isLoading, error } = useQuery({
    queryKey: ['lessons', activeCategory, searchQuery],
    queryFn: async () => {
      console.log('Fetching lessons for category:', activeCategory, 'search:', searchQuery);
      
      let query = supabase.from('lessons').select('*').order('created_at', { ascending: true });
      
      if (activeCategory !== 'All') {
        query = query.eq('category', activeCategory);
      }
      
      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons');
        throw error;
      }
      
      console.log('Fetched lessons:', data);
      return data || [];
    },
  });

  const handleLessonClick = (lesson: any) => {
    console.log('Opening lesson:', lesson.title);
    navigate(`/lesson/${lesson.id}`);
  };

  // Convert duration string to number (extract minutes)
  const parseDuration = (duration: string) => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <div className="min-h-screen bg-bartender-background pb-20">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Learn</h1>
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-bartender-surface rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-bartender-amber"
            />
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading lessons...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load lessons. Please try again.</p>
          </div>
        )}

        {/* Lessons Grid */}
        {lessons && lessons.length > 0 && (
          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <LessonCard 
                  lesson={{
                    id: lesson.id,
                    title: lesson.title,
                    description: lesson.description,
                    duration: parseDuration(lesson.duration),
                    difficulty: lesson.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
                    image: lesson.image_url || 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop'
                  }}
                  onClick={() => handleLessonClick(lesson)} 
                />
              </div>
            ))}
          </div>
        )}

        {/* No lessons found */}
        {lessons && lessons.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchQuery ? `No lessons found matching "${searchQuery}"` : 'No lessons found for this category.'}
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Learn;
