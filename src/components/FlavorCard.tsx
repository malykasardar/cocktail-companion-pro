
import React from 'react';

interface FlavorCardProps {
  flavor: {
    id: string;
    name: string;
    image: string;
    description: string;
  };
  onClick: () => void;
}

const FlavorCard = ({ flavor, onClick }: FlavorCardProps) => {
  return (
    <div 
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 animate-scale-in"
      onClick={onClick}
    >
      <div className="aspect-square">
        <img 
          src={flavor.image} 
          alt={flavor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-bold text-white mb-1">
          {flavor.name}
        </h3>
        <p className="text-white/80 text-sm">
          {flavor.description}
        </p>
      </div>
    </div>
  );
};

export default FlavorCard;
