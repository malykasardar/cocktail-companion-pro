
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReferenceCard from '../components/ReferenceCard';
import BottomNavigation from '../components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  List, Clock, Wine, Scale, Thermometer, Coffee
} from 'lucide-react';

const Reference = () => {
  const navigate = useNavigate();

  // Map icon names to actual Lucide icons
  const iconMap = {
    'List': List,
    'Clock': Clock,
    'Wine': Wine,
    'Scale': Scale,
    'Thermometer': Thermometer,
    'Coffee': Coffee,
  };

  // Fetch reference guides from database
  const { data: references, isLoading, error } = useQuery({
    queryKey: ['references'],
    queryFn: async () => {
      console.log('Fetching reference guides');
      
      const { data, error } = await supabase
        .from('reference_guides')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) {
        console.error('Error fetching reference guides:', error);
        toast.error('Failed to load reference guides');
        throw error;
      }
      
      console.log('Fetched reference guides:', data);
      return data || [];
    },
  });

  const handleReferenceClick = (reference: any) => {
    console.log('Opening reference:', reference.title);
    navigate(`/reference/${reference.id}`);
  };

  // Group references by category
  const quickReferences = references?.filter(ref => ref.category === 'quick_reference') || [];
  const recommendations = references?.filter(ref => ref.category === 'recommendations') || [];

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
          <h1 className="text-2xl font-bold text-foreground">Cheat Sheet</h1>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading reference guides...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load reference guides. Please try again.</p>
          </div>
        )}

        {references && (
          <>
            {/* Quick References Section */}
            {quickReferences.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick References</h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickReferences.map((item, index) => {
                    const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || List;
                    return (
                      <div key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <ReferenceCard 
                          title={item.title}
                          icon={IconComponent}
                          onClick={() => handleReferenceClick(item)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Recommendations</h2>
                <div className="grid grid-cols-2 gap-4">
                  {recommendations.map((item, index) => {
                    const IconComponent = iconMap[item.icon_name as keyof typeof iconMap] || Wine;
                    return (
                      <div key={item.id} style={{ animationDelay: `${(index + quickReferences.length) * 0.1}s` }}>
                        <ReferenceCard 
                          title={item.title}
                          icon={IconComponent}
                          onClick={() => handleReferenceClick(item)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* No references found */}
        {references && references.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reference guides found.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reference;
