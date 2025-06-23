
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ReferenceCardProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
}

const ReferenceCard = ({ title, icon: Icon, onClick }: ReferenceCardProps) => {
  return (
    <div 
      className="bartender-card cursor-pointer group text-center animate-scale-in"
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 bg-bartender-amber/10 rounded-lg flex items-center justify-center group-hover:bg-bartender-amber/20 transition-colors">
          <Icon size={24} className="text-bartender-amber" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground group-hover:text-bartender-amber transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ReferenceCard;
