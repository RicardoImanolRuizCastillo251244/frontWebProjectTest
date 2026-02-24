import React from 'react';
import Hero from './Hero';
import MediaSection from './MediaSection';

/**
 * Componente HeroMediaSection - Combina presentación (69%) y media (31%)
 * Se muestran una debajo de la otra ocupando exactamente el viewport
 * 
 * Cálculos basados en Figma (MacBook Pro 16"):
 * - Hero: 684px / (684 + 306) = 69.1%
 * - Media: 306px / (684 + 306) = 30.9%
 * 
 * Responsive para cualquier pantalla manteniendo proporción
 */
interface HeroMediaSectionProps {
  backgroundImage: string;
}

const HeroMediaSection: React.FC<HeroMediaSectionProps> = ({
  backgroundImage,
}) => {
  return (
    <section className="w-full flex flex-col relative overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Hero Section - 69% */}
      <div className="basis-[69%] w-full relative overflow-hidden">
        <Hero backgroundImage={backgroundImage} />
      </div>

      {/* Media Section - 31% */}
      <div className="basis-[31%] w-full relative overflow-hidden">
        <MediaSection />
      </div>
    </section>
  );
};

export default HeroMediaSection;
