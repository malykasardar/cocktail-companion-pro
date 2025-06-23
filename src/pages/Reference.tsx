
import React from 'react';
import { ArrowLeft, List, Clock, Thermometer, Scale, Wine, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReferenceCard from '../components/ReferenceCard';
import BottomNavigation from '../components/BottomNavigation';

const Reference = () => {
  const navigate = useNavigate();

  const quickReferences = [
    { title: 'Ingredient Substitutions', icon: List },
    { title: 'Prep Times', icon: Clock },
    { title: 'Glassware Guide', icon: Wine },
    { title: 'ABV Chart', icon: Scale },
    { title: 'Temperature Conversions', icon: Thermometer },
    { title: 'Measurement Conversions', icon: Scale },
  ];

  const recommendations = [
    { title: 'Classic Cocktails', icon: Wine },
    { title: 'Wine Pairings', icon: Wine },
    { title: 'Craft Beer Styles', icon: Coffee },
    { title: 'Top Shelf Spirits', icon: Wine },
    { title: 'Non-Alcoholic Options', icon: Coffee },
    { title: 'Garnishes', icon: List },
  ];

  const handleReferenceClick = (title: string) => {
    console.log('Opening reference:', title);
    // Here you would typically navigate to a detailed reference page
  };

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

        {/* Quick References Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick References</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickReferences.map((item, index) => (
              <div key={item.title} style={{ animationDelay: `${index * 0.1}s` }}>
                <ReferenceCard 
                  title={item.title}
                  icon={item.icon}
                  onClick={() => handleReferenceClick(item.title)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recommendations</h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendations.map((item, index) => (
              <div key={item.title} style={{ animationDelay: `${(index + quickReferences.length) * 0.1}s` }}>
                <ReferenceCard 
                  title={item.title}
                  icon={item.icon}
                  onClick={() => handleReferenceClick(item.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reference;
