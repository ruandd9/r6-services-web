import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Fundo com gradiente */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #001945 0%, #000c24 100%)'
        }}
      />
      
      {/* Grade de fundo */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GridBackground; 