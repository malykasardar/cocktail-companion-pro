
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import BottomNavigation from '../components/BottomNavigation';

const ReferenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: reference, isLoading, error } = useQuery({
    queryKey: ['reference', id],
    queryFn: async () => {
      if (!id) throw new Error('No reference ID provided');
      
      console.log('Fetching reference with ID:', id);
      
      const { data, error } = await supabase
        .from('reference_guides')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching reference:', error);
        toast.error('Failed to load reference guide');
        throw error;
      }
      
      if (!data) {
        throw new Error('Reference guide not found');
      }
      
      console.log('Fetched reference:', data);
      return data;
    },
    enabled: !!id,
  });

  const renderData = (data: any) => {
    if (!data) return null;

    // Handle different data structures
    if (data.substitutions) {
      return (
        <div className="space-y-4">
          {data.substitutions.map((sub: any, index: number) => (
            <div key={index} className="p-4 bg-bartender-surface rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">{sub.ingredient}</h4>
              <p className="text-muted-foreground text-sm mb-1">
                <strong>Substitute:</strong> {sub.substitute}
              </p>
              <p className="text-muted-foreground text-sm">
                <strong>Ratio:</strong> {sub.ratio}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (data.prep_times) {
      return (
        <div className="space-y-4">
          {data.prep_times.map((prep: any, index: number) => (
            <div key={index} className="p-4 bg-bartender-surface rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">{prep.task}</h4>
              <p className="text-muted-foreground text-sm mb-1">
                <strong>Time:</strong> {prep.time}
              </p>
              <p className="text-muted-foreground text-sm">
                <strong>Notes:</strong> {prep.notes}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (data.glassware) {
      return (
        <div className="space-y-4">
          {data.glassware.map((glass: any, index: number) => (
            <div key={index} className="p-4 bg-bartender-surface rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">{glass.name}</h4>
              <p className="text-muted-foreground text-sm mb-1">
                <strong>Volume:</strong> {glass.volume}
              </p>
              <p className="text-muted-foreground text-sm mb-2">
                <strong>Use:</strong> {glass.use}
              </p>
              <div className="flex flex-wrap gap-2">
                {glass.examples.map((example: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-bartender-amber/10 text-bartender-amber text-xs rounded">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (data.spirits || data.cocktails) {
      return (
        <div className="space-y-6">
          {data.spirits && (
            <div>
              <h4 className="font-semibold text-foreground mb-4">Spirits</h4>
              <div className="space-y-3">
                {data.spirits.map((spirit: any, index: number) => (
                  <div key={index} className="p-3 bg-bartender-surface rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{spirit.category}</span>
                      <span className="text-bartender-amber text-sm">{spirit.standard}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Range: {spirit.abv_range}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.cocktails && (
            <div>
              <h4 className="font-semibold text-foreground mb-4">Cocktails</h4>
              <div className="space-y-3">
                {data.cocktails.map((cocktail: any, index: number) => (
                  <div key={index} className="p-3 bg-bartender-surface rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{cocktail.name}</span>
                      <span className="text-bartender-amber text-sm">{cocktail.abv}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Strength: {cocktail.strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Generic fallback for other data structures
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <h4 className="font-semibold text-foreground mb-3 capitalize">{key.replace('_', ' ')}</h4>
                <div className="space-y-2">
                  {value.map((item: any, index: number) => (
                    <div key={index} className="p-3 bg-bartender-surface rounded-lg">
                      {typeof item === 'object' ? (
                        Object.entries(item).map(([itemKey, itemValue]) => (
                          <p key={itemKey} className="text-sm text-muted-foreground">
                            <strong className="capitalize">{itemKey.replace('_', ' ')}:</strong> {String(itemValue)}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">{String(item)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bartender-background pb-20">
        <div className="px-4 pt-12 pb-8">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading reference guide...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (error || !reference) {
    return (
      <div className="min-h-screen bg-bartender-background pb-20">
        <div className="px-4 pt-12 pb-8">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/reference')}
              className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
            >
              <ArrowLeft size={20} className="text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Reference Not Found</h1>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">The reference guide you're looking for doesn't exist or has been removed.</p>
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
            onClick={() => navigate('/reference')}
            className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">{reference.title}</h1>
        </div>

        {/* Content Description */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">{reference.content}</p>
        </div>

        {/* Data Content */}
        <div className="bartender-card">
          {renderData(reference.data)}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ReferenceDetail;
