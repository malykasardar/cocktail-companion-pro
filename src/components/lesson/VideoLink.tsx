import React from 'react';
import { BookOpen } from 'lucide-react';

interface VideoLinkProps {
  videoUrl: string;
}

const VideoLink: React.FC<VideoLinkProps> = ({ videoUrl }) => {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="bartender-card">
      <h3 className="text-xl font-bold text-foreground mb-4">Video Tutorial</h3>
      <a 
        href={videoUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-bartender-amber text-bartender-background rounded-lg font-medium hover:bg-bartender-amber/90 transition-colors"
      >
        <BookOpen size={16} className="mr-2" />
        Watch Video
      </a>
    </div>
  );
};

export default VideoLink;