import React from 'react';
import { MediaStat } from '../types/main.types';

const MediaStatItem: React.FC<MediaStat> = ({ iconSrc, label, altText }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img 
        src={iconSrc} 
        alt={altText} 
        /* En móvil mide w-12 (48px), en desktop w-14 (56px) */
        className="w-12 h-12 md:w-14 md:h-14 object-contain mb-2 md:mb-3 transition-all duration-300"
      />
      <h3 className="text-white font-roboto font-medium text-sm md:text-base tracking-wide uppercase">
        {label}
      </h3>
    </div>
  );
};

export default MediaStatItem;