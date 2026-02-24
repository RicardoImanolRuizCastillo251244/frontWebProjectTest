import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { HeroMediaSection, MatchesVisualization } from '../features/main/components';

/**
 * MainPage - Página principal de la aplicación
 * Layout limpio: Header + HeroMediaSection + Matches + Footer
 */
const MainPage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero + Media Section - 65% + 35% (vertical) */}
      <HeroMediaSection backgroundImage="/images/fondoMain.png" />

      {/* Matches Visualization - Layout vacío */}
      <MatchesVisualization />
    </MainLayout>
  );
};

export default MainPage;
