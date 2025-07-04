
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import BottomNavigation from '../components/BottomNavigation';
import LessonHeader from '../components/lesson/LessonHeader';
import LessonImage from '../components/lesson/LessonImage';
import LessonInfo from '../components/lesson/LessonInfo';
import LessonContent from '../components/lesson/LessonContent';
import EquipmentList from '../components/lesson/EquipmentList';
import RelatedRecipes from '../components/lesson/RelatedRecipes';
import ProTips from '../components/lesson/ProTips';
import VideoLink from '../components/lesson/VideoLink';

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
          <LessonHeader title="Lesson Not Found" />
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
        <LessonHeader title="Lesson Details" />

        {lesson.image_url && (
          <LessonImage 
            imageUrl={lesson.image_url} 
            title={lesson.title} 
            difficulty={lesson.difficulty} 
          />
        )}

        <LessonInfo 
          title={lesson.title}
          description={lesson.description}
          duration={lesson.duration}
          category={lesson.category}
          difficulty={lesson.difficulty}
        />

        <LessonContent content={lesson.content} />

        <EquipmentList equipment={lesson.equipment_needed || []} />

        <RelatedRecipes recipes={lesson.recipes || []} />

        <ProTips tips={lesson.tips || []} />

        <VideoLink videoUrl={lesson.video_url || ''} />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LessonDetail;
