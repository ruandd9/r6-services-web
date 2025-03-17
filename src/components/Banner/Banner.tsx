import React from 'react';

interface BannerProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  imageSrc = '/images/banners/r6-tactical.jpg',
  title,
  subtitle,
  children,
  className = '',
}) => {
  // Renderiza o fundo holográfico do banner
  const renderBannerBackground = () => {
    return (
      <>
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-liquid-navy/80 to-black"></div>
        
        {/* Elementos decorativos */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 200, 255, 0.08) 0%, transparent 60%)'
        }}></div>
        
        {/* Container 3D - move com o mouse */}
        <div 
          className="absolute inset-0 transition-transform duration-200" 
          style={{
            transform: `perspective(1000px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Linhas de escaneamento */}
          <div className="absolute inset-0 overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
            {/* Linha de escaneamento principal */}
            <div 
              className="absolute left-0 right-0 h-[2px] bg-cyan-400/40 blur-[1px]" 
              style={{ 
                animation: 'scanner 4s linear infinite',
                boxShadow: '0 0 10px 5px rgba(0, 200, 255, 0.15)' 
              }}
            ></div>
            
            {/* Linhas horizontais finas */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 49%, rgba(0, 200, 255, 0.05) 50%, transparent 51%)',
              backgroundSize: '100% 4px',
              opacity: 0.5
            }}></div>
            
            {/* Grade holográfica */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 90%, rgba(0, 200, 255, 0.2) 100%), linear-gradient(90deg, transparent 90%, rgba(0, 200, 255, 0.2) 100%)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        
        {/* Efeito de luz de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full" style={{ 
          background: 'radial-gradient(circle, rgba(0, 200, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
      </>
    );
  };

  return (
    <section className={`relative py-16 overflow-hidden ${className}`}>
      {/* Imagem de fundo com efeito de overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageSrc}
          alt="Banner background" 
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xNyA4YzAtNC02LTctNi03cy02IDMtNiA3YzAgNC42IDIuNiA4LjUgNiAxMCA0LjYtMS41IDctNS40IDctMTB6Ii8+PC9zdmc+';
            target.className = `${target.className} bg-gray-900`;
          }}
        />
        
        {/* Fundo animado do banner */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {renderBannerBackground()}
        </div>
      </div>
      
      {/* Conteúdo do banner */}
      <div className="container mx-auto px-4 relative z-10">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Banner;
