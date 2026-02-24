import React from 'react';
import { createPortal } from 'react-dom';
import logoCourtUrl from '@/assets/images/logoCourt.png';
import perfilTest from '@/assets/images/perfilTest.jpg';

/**
 * Componente Header - Cabecera fija usando Portal para evitar stacking context
 */
interface HeaderProps {
  fixed?: boolean;
  userName?: string;
  userProfileImage?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  fixed = true, 
  userName = 'Usuario',
  userProfileImage = perfilTest,
}) => {
  const headerElement = (
    <header 
      className="h-20 bg-[#0F172A] z-[9999] flex items-center justify-between px-6"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
      }}
    >
      {/* Logo izquierda */}
      <div className="flex items-center">
        <img 
          src={logoCourtUrl} 
          alt="CourtMatch Logo" 
          className="h-16 w-auto"
        />
      </div>

      {/* Espacio central vacío */}
      <div className="flex-1" />

      {/* Usuario derecha */}
      <div className="flex items-center gap-4">
        {/* Nombre de usuario */}
        <span 
          className="text-white font-medium"
          style={{ fontFamily: 'Roboto' }}
        >
          {userName}
        </span>

        {/* Foto de perfil oval */}
        <img 
          src={userProfileImage} 
          alt={userName}
          className="w-14 h-14 rounded-full border-2 border-[#71AB46] object-cover"
        />
      </div>
    </header>
  );

  // Usar portal para renderizar fuera del árbol de componentes
  return createPortal(headerElement, document.body);
};

export default Header;
