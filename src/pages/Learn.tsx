
import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LessonCard from '../components/LessonCard';
import BottomNavigation from '../components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';

const Learn = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: lessons, isLoading, error } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      console.log('Fetching lessons...');
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }
      
      console.log('Fetched lessons:', data);
      return data || [];
    },
  });

  const filteredLessons = lessons?.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categories = [...new Set(lessons?.map(lesson => lesson.category) || [])];

  const handleLessonClick = (lessonId: string) => {
    console.log('Opening lesson:', lessonId);
    navigate(`/lesson/${lessonId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background flex items-center justify-center">
        <p className="text-white">Loading lessons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bartender-background flex items-center justify-center">
        <p className="text-red-400">Failed to load lessons. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bartender-background pb-20">
      <div className="px-4 pt-12 pb-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Learn Bartending</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bartender-surface border border-bartender-surface-light rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-bartender-amber"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchTerm(category)}
                className="px-4 py-2 bg-bartender-surface hover:bg-bartender-surface-light rounded-full text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            {searchTerm ? `Search Results (${filteredLessons.length})` : 'All Lessons'}
          </h2>
          
          {filteredLessons.length === 0 && searchTerm && (
            <p className="text-white/60 text-center py-8">
              No lessons found matching "{searchTerm}"
            </p>
          )}
          
          {filteredLessons.map((lesson, index) => (
            <div key={lesson.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <LessonCard 
                lesson={lesson} 
                onClick={() => handleLessonClick(lesson.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Learn;
