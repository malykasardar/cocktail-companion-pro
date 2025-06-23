
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FlavorCard from '../components/FlavorCard';
import CocktailCard from '../components/CocktailCard';
import BottomNavigation from '../components/BottomNavigation';

const Flavors = () => {
  const navigate = useNavigate();
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  const flavorProfiles = [
    {
      id: 'fruity',
      name: 'Fruity',
      description: 'Sweet and fresh fruit flavors',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop'
    },
    {
      id: 'bubbly',
      name: 'Bubbly',
      description: 'Effervescent and light',
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&h=300&fit=crop'
    },
    {
      id: 'spicy',
      name: 'Spicy',
      description: 'Bold and warming spices',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop'
    },
    {
      id: 'sweet',
      name: 'Sweet',
      description: 'Rich and indulgent sweetness',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop'
    },
    {
      id: 'sour',
      name: 'Sour',
      description: 'Tart and tangy flavors',
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&h=300&fit=crop'
    },
    {
      id: 'bitter',
      name: 'Bitter',
      description: 'Complex and sophisticated',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop'
    }
  ];

  const cocktailsByFlavor = {
    fruity: [
      {
        id: '1',
        name: 'Strawberry Daiquiri',
        ingredients: ['White rum', 'Fresh strawberries', 'Lime juice', 'Simple syrup'],
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop',
        description: 'A refreshing tropical cocktail with fresh strawberry flavor'
      },
      {
        id: '2',
        name: 'Peach Bellini',
        ingredients: ['Prosecco', 'Peach purée', 'Lemon juice'],
        image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=100&h=100&fit=crop',
        description: 'Elegant sparkling cocktail with sweet peach notes'
      },
      {
        id: '3',
        name: 'Mango Mojito',
        ingredients: ['White rum', 'Fresh mango', 'Mint leaves', 'Lime juice', 'Soda water'],
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop',
        description: 'Tropical twist on the classic mojito with ripe mango'
      }
    ],
    bubbly: [
      {
        id: '4',
        name: 'Classic Champagne Cocktail',
        ingredients: ['Champagne', 'Sugar cube', 'Angostura bitters', 'Lemon twist'],
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop',
        description: 'Timeless elegant cocktail perfect for celebrations'
      },
      {
        id: '5',
        name: 'Aperol Spritz',
        ingredients: ['Aperol', 'Prosecco', 'Soda water', 'Orange slice'],
        image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=100&h=100&fit=crop',
        description: 'Light and refreshing Italian aperitif with bitter orange'
      },
      {
        id: '6',
        name: 'French 75',
        ingredients: ['Gin', 'Lemon juice', 'Simple syrup', 'Champagne'],
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop',
        description: 'Sophisticated gin cocktail topped with champagne'
      }
    ]
  };

  const handleFlavorSelect = (flavorId: string) => {
    setSelectedFlavor(flavorId);
  };

  const handleBackToFlavors = () => {
    setSelectedFlavor(null);
  };

  if (selectedFlavor) {
    const cocktails = cocktailsByFlavor[selectedFlavor as keyof typeof cocktailsByFlavor] || [];
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

          {/* Cocktail Recommendations */}
          <div className="space-y-4">
            {cocktails.map((cocktail, index) => (
              <div key={cocktail.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <CocktailCard cocktail={cocktail} />
              </div>
            ))}
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
