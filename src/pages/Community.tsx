import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProfileHero from '../components/ProfileHero';

const Community: React.FC = () => {
  // Referência para o componente principal
  const mainRef = useRef<HTMLDivElement>(null);
  
  // States para controlar a posição do mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Efeito para atualizar a posição do mouse em todo o site
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calcular a posição relativa do mouse dentro do site
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    // Adicionando os listeners ao documento para que funcionem em toda a página
    document.addEventListener('mousemove', handleMouseMove);
    mainElement.addEventListener('mouseenter', handleMouseEnter);
    mainElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      mainElement.removeEventListener('mouseenter', handleMouseEnter);
      mainElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col cursor-none" ref={mainRef}>
      {/* Cursor personalizado holográfico para todo o site */}
      {isHovering && (
        <div className="hidden md:block fixed w-12 h-12 rounded-full pointer-events-none z-50" 
             style={{
              left: `calc(${mousePosition.x * 100 + 50}% - 24px)`, 
              top: `calc(${mousePosition.y * 100 + 50}% - 24px)`,
              background: 'radial-gradient(circle, rgba(0, 200, 255, 0.2) 0%, rgba(0, 200, 255, 0) 70%)',
              boxShadow: '0 0 10px 2px rgba(0, 200, 255, 0.1)'
             }}>
        </div>
      )}
      
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        

        {/* Componente ProfileHero */}
        <ProfileHero />
      </main>
      <Footer />
    </div>
  );
};

// Adicionando a animação personalizada para os elementos
const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes grow {
    0%, 100% { transform: scaleX(1) scaleY(1); }
    50% { transform: scaleX(1.2) scaleY(1.2); }
  }
  @keyframes wave {
    0%, 100% { height: 10px; }
    50% { height: 30px; }
  }
  @keyframes scanner {
    0% { top: 0; }
    100% { top: 100%; }
  }
  @keyframes glitch-h {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  @keyframes glitch-block {
    0%, 100% { opacity: 0; }
    10%, 90% { opacity: 0; }
    20%, 80% { opacity: 0.3; }
    30%, 70% { opacity: 0.5; }
    40%, 60% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
`;
document.head.appendChild(styles);

export default Community;
