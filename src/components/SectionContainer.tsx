import React from 'react';

/**
 * Componente SectionContainer - Contenedor reutilizable para secciones
 * Proporciona consistencia en padding, max-width y alineación
 */
interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  bgColor = 'bg-slate-50',
  spacing = 'lg',
  fullWidth = false,
}) => {
  const spacingClasses = {
    sm: 'py-8 md:py-12 px-4',
    md: 'py-12 md:py-16 px-6',
    lg: 'py-16 md:py-24 px-6',
    xl: 'py-24 md:py-32 px-6',
  };

  return (
    <section className={`w-full ${bgColor}`}>
      <div
        className={`
          ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}
          ${spacingClasses[spacing]}
          ${className}
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
