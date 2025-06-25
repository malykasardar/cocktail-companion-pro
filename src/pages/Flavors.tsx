
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FlavorCard from '../components/FlavorCard';
import CocktailCard from '../components/CocktailCard';
import BottomNavigation from '../components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Flavors = () => {
  const navigate = useNavigate();
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  const flavorProfiles = [
    {
      id: 'Sweet',
      name: 'Sweet',
      description: 'Rich and indulgent sweetness',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop'
    },
    {
      id: 'Sour',
      name: 'Sour',
      description: 'Tart and tangy flavors',
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&h=300&fit=crop'
    },
    {
      id: 'Bitter',
      name: 'Bitter',
      description: 'Complex and sophisticated',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop'
    },
    {
      id: 'Herbal',
      name: 'Herbal',
      description: 'Fresh herbs and botanicals',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop'
    },
    {
      id: 'Tropical',
      name: 'Tropical',
      description: 'Exotic tropical fruit flavors',
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&h=300&fit=crop'
    },
    {
      id: 'Spicy',
      name: 'Spicy',
      description: 'Bold and warming spices',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop'
    }
  ];

  // Fetch cocktails based on selected flavor
  const { data: cocktails, isLoading, error } = useQuery({
    queryKey: ['cocktails', selectedFlavor],
    queryFn: async () => {
      if (!selectedFlavor) return [];
      
      console.log('Fetching cocktails for flavor:', selectedFlavor);
      
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .contains('flavor_profile', [selectedFlavor])
        .order('drink_name');
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load cocktails');
        throw error;
      }
      
      console.log('Fetched cocktails:', data);
      return data || [];
    },
    enabled: !!selectedFlavor,
  });

  const handleFlavorSelect = (flavorId: string) => {
    console.log('Selected flavor:', flavorId);
    setSelectedFlavor(flavorId);
  };

  const handleBackToFlavors = () => {
    setSelectedFlavor(null);
  };

  if (selectedFlavor) {
    const flavorName = flavorProfiles.find(f => f.id === selectedFlavor)?.name;

    return (
      <div className="min-h-screen bg-bartender-background pb-20">
        <div className="px-4 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={handleBackToFlavors}
              className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
            >
              <ArrowLeft size={20} className="text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">{flavorName} Cocktails</h1>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading cocktails...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load cocktails. Please try again.</p>
            </div>
          )}

          {/* Cocktail Recommendations */}
          {cocktails && cocktails.length > 0 && (
            <div className="space-y-4">
              {cocktails.map((cocktail, index) => (
                <div key={cocktail.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CocktailCard cocktail={cocktail} />
                </div>
              ))}
            </div>
          )}

          {/* No cocktails found */}
          {cocktails && cocktails.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No cocktails found for this flavor profile.</p>
            </div>
          )}
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
          <h1 className="text-2xl font-bold text-foreground">Flavor Profiles</h1>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-lg text-foreground mb-2">Choose a flavor profile</p>
          <p className="text-muted-foreground">
            Discover cocktails that match your taste preferences
          </p>
        </div>

        {/* Flavor Grid */}
        <div className="grid grid-cols-2 gap-4">
          {flavorProfiles.map((flavor, index) => (
            <div key={flavor.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <FlavorCard flavor={flavor} onClick={() => handleFlavorSelect(flavor.id)} />
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Flavors;
