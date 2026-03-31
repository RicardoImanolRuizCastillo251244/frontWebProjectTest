import React from 'react';
import { MediaStat } from '../types/main.types';

const MediaStatItem: React.FC<MediaStat> = ({ iconSrc, value, label, altText }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-1">
      <img
        src={iconSrc}
        alt={altText}
        className="w-12 h-12 md:w-14 md:h-14 object-contain mb-1 md:mb-2 transition-all duration-300"
      />
      {value !== undefined && value !== null ? (
        <span className="text-[#71AB46] font-black text-4xl md:text-5xl leading-none tracking-tight">
          {value}
        </span>
      ) : (
        <span className="text-[#71AB46] font-black text-4xl md:text-5xl leading-none opacity-0 select-none">0</span>
      )}
      <h3 className="text-white font-roboto font-medium text-sm md:text-base tracking-wide uppercase">
        {label}
      </h3>
    </div>
  );
};

export default MediaStatItem;