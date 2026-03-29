import React from 'react';
import MediaStatItem from './MediaStatItem';
import { MediaSectionProps, MediaStat } from '../types/main.types';

import logoCalendario from '@/assets/images/calendario.png';
import logoIntegrantes from '@/assets/images/integrantes.png';
import logoDeportes from '@/assets/images/deportes.png';

const STATS: MediaStat[] = [
  {
    id: 'partidos',
    iconSrc: logoCalendario,
    label: '12 Partidos activos', // Valores reales o estáticos por ahora
    altText: 'Logo Partidos activos'
  },
  {
    id: 'jugadores',
    iconSrc: logoIntegrantes,
    label: '+150 Jugadores registrados',
    altText: 'Logo Jugadores registrados'
  },
  {
    id: 'deportes',
    iconSrc: logoDeportes,
    label: '8 Deportes disponibles',
    altText: 'Logo Deportes disponibles'
  }
];

const MediaSection: React.FC<MediaSectionProps> = ({ className = '' }) => {
  return (
    <section className={`w-full h-full flex flex-col justify-center bg-[#0D3472] pt-10 pb-12 md:pt-4 md:pb-20 px-4 md:px-6 transition-all duration-300 ${className}`}>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 justify-items-center">
        {STATS.map((stat) => (
          <MediaStatItem 
            key={stat.id}
            id={stat.id}
            iconSrc={stat.iconSrc}
            label={stat.label}
            altText={stat.altText}
          />
        ))}
      </div>
    </section>
  );
};

export default MediaSection;