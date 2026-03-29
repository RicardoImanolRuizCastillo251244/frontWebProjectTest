import React from 'react';

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const HeroButton: React.FC<HeroButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white font-bold uppercase text-sm sm:text-base w-64 sm:w-72 md:w-80 h-12 sm:h-14 md:h-16 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
      style={{
        backgroundColor: '#0F172A',
        border: '2px solid white',
        fontFamily: 'Roboto',
        fontWeight: 700,
        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </button>
  );
};

export default HeroButton;