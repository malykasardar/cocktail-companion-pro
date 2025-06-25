
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FlavorFilter from '../components/FlavorFilter';
import CocktailCard from '../components/CocktailCard';
import BottomNavigation from '../components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Flavors = () => {
  const navigate = useNavigate();
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const availableFlavors = [
    'Fruity',
    'Bubbly', 
    'Sweet',
    'Sour',
    'Bitter',
    'Herbal',
    'Tropical',
    'Spicy',
    'Creamy',
    'Citrus'
  ];

  // Fetch cocktails based on selected flavors
  const { data: cocktails, isLoading, error } = useQuery({
    queryKey: ['cocktails', selectedFlavors],
    queryFn: async () => {
      if (selectedFlavors.length === 0) return [];
      
      console.log('Fetching cocktails for flavors:', selectedFlavors);
      
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .overlaps('flavor_profile', selectedFlavors)
        .order('drink_name')
        .limit(3);
      
      if (error) {
        console.error('Error fetching cocktails:', error);
        toast.error('Failed to load cocktails');
        throw error;
      }
      
      console.log('Fetched cocktails:', data);
      return data || [];
    },
    enabled: showResults && selectedFlavors.length > 0,
  });

  const handleFlavorToggle = (flavor: string) => {
    setSelectedFlavors(prev => 
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleSubmit = () => {
    if (selectedFlavors.length === 0) {
      toast.error('Please select at least one flavor profile');
      return;
    }
    
    console.log('Submitting flavors:', selectedFlavors);
    setShowResults(true);
  };

  const handleBackToFilters = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-bartender-background pb-20">
        <div className="px-4 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={handleBackToFilters}
              className="w-10 h-10 bg-bartender-surface rounded-full flex items-center justify-center mr-4"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Recommended Cocktails</h1>
          </div>

          {/* Selected Flavors */}
          <div className="mb-6">
            <p className="text-white mb-2">Based on your flavor preferences:</p>
            <div className="flex flex-wrap gap-2">
              {selectedFlavors.map(flavor => (
                <span key={flavor} className="px-3 py-1 bg-bartender-amber/20 text-bartender-amber rounded-full text-sm">
                  {flavor}
                </span>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-white">Finding perfect cocktails for you...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">Failed to load cocktails. Please try again.</p>
            </div>
          )}

          {/* Cocktail Recommendations */}
          {cocktails && cocktails.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">
                Top 3 Cocktails for You
              </h2>
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
              <p className="text-white">No cocktails found matching your selected flavors. Try different combinations!</p>
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
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Flavor Profiles</h1>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-lg text-white mb-2">Choose your preferred flavors</p>
          <p className="text-white/70">
            Select one or more flavor profiles to get personalized cocktail recommendations
          </p>
        </div>

        {/* Flavor Filters */}
        <div className="space-y-4 mb-8">
          {availableFlavors.map((flavor, index) => (
            <div key={flavor} style={{ animationDelay: `${index * 0.05}s` }} className="animate-fade-in">
              <FlavorFilter
                flavor={flavor}
                isSelected={selectedFlavors.includes(flavor)}
                onToggle={handleFlavorToggle}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedFlavors.length === 0}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            selectedFlavors.length > 0
              ? 'bg-bartender-amber text-bartender-background hover:bg-bartender-amber-light'
              : 'bg-bartender-surface text-white/50 cursor-not-allowed'
          }`}
        >
          Get My Cocktail Recommendations ({selectedFlavors.length} selected)
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Flavors;
