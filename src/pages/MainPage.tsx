import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { HeroMediaSection } from '../features/main/components';
import { MatchesVisualization } from '../features/match';
import CreateMatchModal from '../features/match/components/CreateMatchModal';

const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Esta función se ejecutará cuando el partido se cree con éxito
  const handleMatchCreated = () => {
    console.log("¡Partido creado! Aquí podrías refrescar la lista.");
    // Si MatchesVisualization tuviera una función de refetch, aquí la llamarías.
    // Por ahora, simplemente cerramos el modal o lanzamos un aviso.
  };

  return (
    <MainLayout>
      <HeroMediaSection 
        backgroundImage="/images/fondoMain.png" 
        onOpenModal={() => setIsModalOpen(true)} 
      />

      <MatchesVisualization />

      <CreateMatchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleMatchCreated} // <--- Pasamos la prop requerida
      />
    </MainLayout>
  );
};

export default MainPage;