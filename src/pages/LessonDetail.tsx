
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '../components/BottomNavigation';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: lesson, isLoading, error } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => {
      if (!id) throw new Error('No lesson ID provided');
      
      console.log('Fetching lesson with ID:', id);
      
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching lesson:', error);
        toast.error('Failed to load lesson');
        throw error;
      }
      
      if (!data) {
        throw new Error('Lesson not found');
      }
      
      console.log('Fetched lesson:', data);
      return data;
    },
    enabled: !!id,
  });

  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    Intermediate: 'bg-bartender-amber/10 text-bartender-amber border-bartender-amber/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background pb-20">
        <div className="px-4 pt-12 pb-8">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading lesson...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-bartender-background pb-20">
        <div className="px-4 pt-12 pb-8">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
            >
              <ArrowLeft size={20} className="text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Lesson Not Found</h1>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">The lesson you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-foreground">Lesson Details</h1>
        </div>

        {/* Lesson Image */}
        {lesson.image_url && (
          <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <img 
              src={lesson.image_url} 
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className={`${difficultyColors[lesson.difficulty as keyof typeof difficultyColors]} border`}>
                {lesson.difficulty}
              </Badge>
            </div>
          </div>
        )}

        {/* Lesson Header Info */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-3">{lesson.title}</h2>
          <p className="text-lg text-muted-foreground mb-4">{lesson.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock size={16} className="mr-2" />
              {lesson.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen size={16} className="mr-2" />
              {lesson.category}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <User size={16} className="mr-2" />
              {lesson.difficulty}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bartender-card mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-bartender-amber" />
            Lesson Content
          </h3>
          <div className="bg-gradient-to-br from-bartender-surface to-bartender-surface-light rounded-lg p-6 border border-bartender-amber/10">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-lg">
                {lesson.content.split('\n\n').map((paragraph, index) => (
                  <div 
                    key={index} 
                    className="mb-4 p-4 bg-bartender-background/30 rounded-lg border-l-4 border-bartender-amber/30 hover:border-bartender-amber/60 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="animate-fade-in">{paragraph}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Needed */}
        {lesson.equipment_needed && lesson.equipment_needed.length > 0 && (
          <div className="bartender-card mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <User size={20} className="mr-2 text-bartender-amber" />
              Equipment Needed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.equipment_needed.map((equipment, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 bg-gradient-to-r from-bartender-surface to-bartender-surface-light rounded-lg border border-bartender-amber/20 hover:border-bartender-amber/40 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-3 h-3 bg-bartender-amber rounded-full mr-4 animate-pulse"></div>
                  <span className="text-foreground font-medium">{equipment}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Recipes */}
        {lesson.recipes && lesson.recipes.length > 0 && (
          <div className="bartender-card mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Related Recipes</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.recipes.map((recipe, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {recipe}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {lesson.tips && lesson.tips.length > 0 && (
          <div className="bartender-card mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <Clock size={20} className="mr-2 text-bartender-amber" />
              Pro Tips
            </h3>
            <div className="space-y-4">
              {lesson.tips.map((tip, index) => (
                <div 
                  key={index} 
                  className="group flex items-start p-4 bg-gradient-to-r from-bartender-surface via-bartender-surface-light to-bartender-surface rounded-lg border border-bartender-amber/10 hover:border-bartender-amber/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-bartender-amber to-bartender-amber/70 rounded-full flex items-center justify-center mr-4 mt-0.5 shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-sm font-bold text-bartender-background">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Link */}
        {lesson.video_url && (
          <div className="bartender-card">
            <h3 className="text-xl font-bold text-foreground mb-4">Video Tutorial</h3>
            <a 
              href={lesson.video_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-bartender-amber text-bartender-background rounded-lg font-medium hover:bg-bartender-amber/90 transition-colors"
            >
              <BookOpen size={16} className="mr-2" />
              Watch Video
            </a>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LessonDetail;
