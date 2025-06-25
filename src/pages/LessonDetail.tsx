
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
          <h3 className="text-xl font-bold text-foreground mb-4">Lesson Content</h3>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {lesson.content}
            </div>
          </div>
        </div>

        {/* Equipment Needed */}
        {lesson.equipment_needed && lesson.equipment_needed.length > 0 && (
          <div className="bartender-card mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Equipment Needed</h3>
            <div className="grid grid-cols-2 gap-2">
              {lesson.equipment_needed.map((equipment, index) => (
                <div key={index} className="flex items-center p-2 bg-bartender-surface rounded-lg">
                  <div className="w-2 h-2 bg-bartender-amber rounded-full mr-3"></div>
                  <span className="text-sm text-foreground">{equipment}</span>
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
            <h3 className="text-xl font-bold text-foreground mb-4">Pro Tips</h3>
            <div className="space-y-3">
              {lesson.tips.map((tip, index) => (
                <div key={index} className="flex items-start p-3 bg-bartender-surface rounded-lg">
                  <div className="w-6 h-6 bg-bartender-amber/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-bartender-amber">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip}</p>
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
