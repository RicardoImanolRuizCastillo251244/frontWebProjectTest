import React from 'react';
import { Footer } from '../features/main';
import { MainLayoutProps } from '../features/main/types/main.types';

/**
 * MainLayout - Layout principal
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="pt-20 w-full bg-slate-950">
      <main className="w-full">
        {children}
      </main>
      <Footer brandName="CourtMatch" year={new Date().getFullYear()} />
    </div>
  );
};

export default MainLayout;
