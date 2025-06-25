
import React from 'react';
import { Check } from 'lucide-react';

interface FlavorFilterProps {
  flavor: string;
  isSelected: boolean;
  onToggle: (flavor: string) => void;
}

const FlavorFilter = ({ flavor, isSelected, onToggle }: FlavorFilterProps) => {
  return (
    <button
      onClick={() => onToggle(flavor)}
      className={`relative px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
        isSelected
          ? 'border-bartender-amber bg-bartender-amber/20 text-bartender-amber'
          : 'border-bartender-surface-light bg-bartender-surface text-white hover:border-bartender-amber/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{flavor}</span>
        {isSelected && (
          <Check size={20} className="ml-2 text-bartender-amber" />
        )}
      </div>
    </button>
  );
};

export default FlavorFilter;
