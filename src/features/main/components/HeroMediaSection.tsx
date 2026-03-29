import React from 'react';
import Hero from './Hero';
import MediaSection from './MediaSection';

interface HeroMediaSectionProps {
  backgroundImage: string;
  onOpenModal: () => void;
}

const HeroMediaSection: React.FC<HeroMediaSectionProps> = ({
  backgroundImage,
  onOpenModal,
}) => {
  return (
    <section className="w-full flex flex-col relative min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
      <div className="w-full relative flex flex-col flex-grow md:flex-none md:basis-[69%]">
        <Hero backgroundImage={backgroundImage} onOpenModal={onOpenModal} />
      </div>

      <div className="w-full relative flex flex-col shrink-0 md:basis-[31%]">
        <MediaSection features={[]} />
      </div>
    </section>
  );
};

export default HeroMediaSection;