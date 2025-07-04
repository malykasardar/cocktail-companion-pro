import React from 'react';
import { BookOpen } from 'lucide-react';

interface LessonContentProps {
  content: string;
}

const LessonContent: React.FC<LessonContentProps> = ({ content }) => {
  return (
    <div className="bartender-card mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
        <BookOpen size={20} className="mr-2 text-bartender-amber" />
        Lesson Content
      </h3>
      <div className="bg-gradient-to-br from-bartender-surface to-bartender-surface-light rounded-lg p-6 border border-bartender-amber/10">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-lg">
            {content.split('\n\n').map((paragraph, index) => (
              <div 
                key={index} 
                className="mb-4 p-4 bg-bartender-background/30 rounded-lg border-l-4 border-bartender-amber/30 hover:border-bartender-amber/60 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="animate-fade-in">{paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;