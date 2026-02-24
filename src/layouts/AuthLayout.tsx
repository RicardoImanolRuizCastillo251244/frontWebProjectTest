import React from 'react';
import fondoUrl from '@/assets/images/fondo.jpeg';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.7)), url(${fondoUrl})`,
      }}
    >
      <div className="w-full max-w-4xl flex justify-center">{children}</div>
    </main>
  );
};

