import React from 'react';
import { Clock } from 'lucide-react';

interface ProTipsProps {
  tips: string[];
}

const ProTips: React.FC<ProTipsProps> = ({ tips }) => {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className="bartender-card mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
        <Clock size={20} className="mr-2 text-bartender-amber" />
        Pro Tips
      </h3>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="group flex items-start p-4 bg-gradient-to-r from-bartender-surface via-bartender-surface-light to-bartender-surface rounded-lg border border-bartender-amber/10 hover:border-bartender-amber/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-bartender-amber to-bartender-amber/70 rounded-full flex items-center justify-center mr-4 mt-0.5 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-sm font-bold text-bartender-background">{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProTips;