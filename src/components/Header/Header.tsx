import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');

  // Verifica qual item está ativo com base na URL atual
  React.useEffect(() => {
    const pathname = window.location.pathname;
    setActiveItem(pathname);
  }, []);

  return (
    <header className="bg-liquid-navy text-white py-4 relative border-b border-liquid-teal/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Logo centralizada simplificada */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 z-10 flex items-center justify-center">
          <div className="w-16 h-16 bg-liquid-navy rounded-b-full flex items-center justify-center">
            <div className="w-14 h-14 bg-gradient-to-br from-liquid-teal to-liquid-blue rounded-full flex items-center justify-center shadow-md">
              <div className="font-bold text-xl text-white">IGL</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Links da esquerda */}
          <div className="hidden md:flex items-center space-x-8 w-1/3 justify-start">
            {[
              { path: '/', label: 'Home' },
              { path: '/games', label: 'Games' }
            ].map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                className={`uppercase font-medium text-sm tracking-wider group relative hover:text-liquid-teal transition duration-300 ${activeItem === item.path ? 'text-liquid-teal' : 'text-white/90'}`}
                onClick={() => setActiveItem(item.path)}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-teal/80 transition-all duration-300 group-hover:w-full ${activeItem === item.path ? 'w-full' : ''}`}></span>
              </a>
            ))}
          </div>
          
          {/* Espaço central para acomodar a logo */}
          <div className="w-1/3 flex justify-center">
            &nbsp;
          </div>
          
          {/* Links da direita + links restantes */}
          <div className="hidden md:flex items-center space-x-8 w-1/3 justify-end">
            {[
              { path: '/store', label: 'Store' },
              { path: '/news', label: 'News' },
              { path: '/tv', label: 'TV' },
              { path: '/about', label: 'About' }
            ].map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                className={`uppercase font-medium text-sm tracking-wider group relative hover:text-liquid-teal transition duration-300 ${activeItem === item.path ? 'text-liquid-teal' : 'text-white/90'}`}
                onClick={() => setActiveItem(item.path)}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-teal/80 transition-all duration-300 group-hover:w-full ${activeItem === item.path ? 'w-full' : ''}`}></span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Segunda linha para botões adicionais e login */}
        <div className="hidden md:flex items-center justify-end mt-4">
          <div className="flex items-center space-x-6">
            {[
              { path: '/events', label: 'Events' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                className={`uppercase font-medium text-sm tracking-wider group relative hover:text-liquid-teal transition duration-300 ${activeItem === item.path ? 'text-liquid-teal' : 'text-white/90'}`}
                onClick={() => setActiveItem(item.path)}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-teal/80 transition-all duration-300 group-hover:w-full ${activeItem === item.path ? 'w-full' : ''}`}></span>
              </a>
            ))}
            
            <div className="ml-8 flex items-center space-x-4">
              <a 
                href="/login" 
                className="flex items-center text-sm bg-liquid-navy px-4 py-1.5 rounded border border-liquid-teal/30 hover:bg-black/60 transition duration-300 group"
              >
                <span className="group-hover:text-liquid-teal transition duration-300">LOGIN</span>
              </a>
              <a 
                href="/register" 
                className="bg-gradient-to-r from-liquid-teal to-liquid-blue text-white px-5 py-1.5 rounded text-sm hover:shadow-md transition duration-300"
              >
                REGISTER
              </a>
            </div>
          </div>
        </div>
        
        {/* Menu mobile - botão hamburguer */}
        <div className="md:hidden absolute right-4 top-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-black/40 transition duration-300 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Menu mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-liquid-navy py-4 absolute top-full left-0 right-0 z-50 border-t border-liquid-teal/20 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              <a href="/" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">HOME</a>
              <a href="/games" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">GAMES</a>
              <a href="/store" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">STORE</a>
              <a href="/news" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">NEWS</a>
              <a href="/tv" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">TV</a>
              <a href="/about" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">ABOUT</a>
              <a href="/events" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">EVENTS</a>
              <a href="/contact" className="hover:text-liquid-teal py-2 px-3 transition duration-300 border-l border-transparent hover:border-liquid-teal/50">CONTACT</a>
              <div className="flex space-x-3 pt-3 border-t border-liquid-teal/10">
                <a href="/login" className="flex-1 py-2 px-3 text-center border border-liquid-teal/30 rounded-md hover:bg-liquid-navy/70 transition duration-300">
                  LOGIN
                </a>
                <a href="/register" className="flex-1 py-2 px-3 text-center bg-gradient-to-r from-liquid-teal to-liquid-blue text-white rounded-md transition duration-300">
                  REGISTER
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 