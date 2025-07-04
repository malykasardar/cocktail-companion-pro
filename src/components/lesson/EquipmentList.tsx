import React from 'react';
import { User } from 'lucide-react';

interface EquipmentListProps {
  equipment: string[];
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipment }) => {
  if (!equipment || equipment.length === 0) {
    return null;
  }

  return (
    <div className="bartender-card mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
        <User size={20} className="mr-2 text-bartender-amber" />
        Equipment Needed
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {equipment.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center p-4 bg-gradient-to-r from-bartender-surface to-bartender-surface-light rounded-lg border border-bartender-amber/20 hover:border-bartender-amber/40 transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-3 h-3 bg-bartender-amber rounded-full mr-4 animate-pulse"></div>
            <span className="text-foreground font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;