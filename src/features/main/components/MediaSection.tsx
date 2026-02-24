import React from 'react';

/**
 * Componente MediaSection - Solo layout visual
 * Contenedor vacío con color de fondo
 */
interface MediaSectionProps {
  className?: string;
}

const MediaSection: React.FC<MediaSectionProps> = ({ className = '' }) => {
  return (
    <section className={`w-full h-full bg-[#0D3472] ${className}`} />
  );
};

export default MediaSection;
