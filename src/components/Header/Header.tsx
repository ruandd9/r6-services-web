import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  // Verifica qual item está ativo com base na URL atual
  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveItem(pathname);

    // Adiciona efeito de scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/store', label: 'Store' },
    { path: '/news', label: 'News' },
    { path: '/tv', label: 'TV' },
    { path: '/about', label: 'About' }
  ];

  const secondaryItems = [
    { path: '/events', label: 'Events' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`bg-liquid-navy text-white py-3 relative border-b border-liquid-teal/20 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Logo centralizada */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 z-10 flex items-center justify-center">
          <div className="w-20 h-20 bg-liquid-navy rounded-b-full flex items-center justify-center border-b-2 border-x-2 border-liquid-teal/30">
            <div className="w-16 h-16 bg-gradient-to-br from-liquid-teal to-liquid-blue rounded-full flex items-center justify-center shadow-lg shadow-liquid-blue/30">
              <div className="font-bold text-2xl text-white">IGL</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {/* Links da esquerda */}
          <div className="hidden md:flex items-center space-x-8 w-1/3 justify-start">
            {navItems.slice(0, 2).map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                className={`uppercase font-medium text-sm tracking-wider group relative hover:text-liquid-teal transition duration-300 ${
                  activeItem === item.path ? 'text-liquid-teal' : 'text-white/90'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.path);
                  window.location.href = item.path;
                }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-teal/80 transition-all duration-300 group-hover:w-full ${
                  activeItem === item.path ? 'w-full' : ''
                }`}></span>
              </a>
            ))}
          </div>
          
          {/* Espaço central para acomodar a logo */}
          <div className="w-1/3 flex justify-center">
            &nbsp;
          </div>
          
          {/* Links da direita */}
          <div className="hidden md:flex items-center space-x-6 w-1/3 justify-end">
            {navItems.slice(2).map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                className={`uppercase font-medium text-sm tracking-wider group relative hover:text-liquid-teal transition duration-300 ${
                  activeItem === item.path ? 'text-liquid-teal' : 'text-white/90'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.path);
                  window.location.href = item.path;
                }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-teal/80 transition-all duration-300 group-hover:w-full ${
                  activeItem === item.path ? 'w-full' : ''
                }`}></span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Segunda linha para botões adicionais e login */}
        <div className="hidden md:flex items-center justify-between mt-4 pb-1">
          {/* Links secundários à esquerda */}
          <div className="flex items-center space-x-6">
            {secondaryItems.map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                className={`uppercase font-medium text-xs tracking-wider group relative hover:text-liquid-teal transition duration-300 ${
                  activeItem === item.path ? 'text-liquid-teal' : 'text-white/80'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.path);
                  window.location.href = item.path;
                }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-liquid-teal/80 transition-all duration-300 group-hover:w-full ${
                  activeItem === item.path ? 'w-full' : ''
                }`}></span>
              </a>
            ))}
          </div>
            
          {/* Área de autenticação com dropdown */}
          <div className="flex items-center space-x-4 relative">
            {/* Botão de login com dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowAuthDropdown(true)}
              onMouseLeave={() => setShowAuthDropdown(false)}
            >
              <a 
                href="/login" 
                className="flex items-center text-xs bg-liquid-navy px-4 py-1.5 rounded border border-liquid-teal/30 hover:bg-black/30 transition duration-300 group"
              >
                <span className="group-hover:text-liquid-teal transition duration-300">LOGIN</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              {/* Dropdown de login */}
              <div 
                className={`absolute right-0 mt-2 w-52 bg-gradient-to-b from-gray-900 to-black border border-liquid-teal/20 rounded shadow-lg shadow-black/50 transition-all duration-300 z-50 ${
                  showAuthDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="p-3 space-y-3">
                  {/* Botão de login com Steam */}
                  <a 
                    href="/login/steam" 
                    className="flex items-center justify-center space-x-2 p-2 bg-[#1b2838] hover:bg-[#2a475e] rounded transition duration-300 border border-[#66c0f4]/30"
                  >
                    {/* Ícone da Steam */}
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                    </svg>
                    <span className="text-sm text-white font-medium">
                      Login com Steam
                    </span>
                  </a>

                  {/* Divisor */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-liquid-teal/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-black text-gray-400">OU</span>
                    </div>
                  </div>

                  {/* Botão de login com Google */}
                  <a 
                    href="/login/google" 
                    className="flex items-center justify-center space-x-2 p-2 bg-white hover:bg-gray-100 rounded transition duration-300 border border-gray-300"
                  >
                    {/* Ícone do Google */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">
                      Login com Google
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Botão de registro */}
            <div
              className="relative"
              onMouseEnter={() => setShowAuthDropdown(true)}
              onMouseLeave={() => setShowAuthDropdown(false)}
            >
              <a 
                href="/register" 
                className="bg-gradient-to-r from-liquid-teal to-liquid-blue text-white px-5 py-1.5 rounded text-xs hover:shadow-md hover:shadow-liquid-blue/30 transition duration-300 flex items-center"
              >
                <span>REGISTER</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Menu mobile - botão hamburguer */}
        <div className="md:hidden absolute right-4 top-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-black/40 transition duration-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Menu mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-liquid-navy to-black/90 py-4 absolute top-full left-0 right-0 z-50 border-t border-liquid-teal/20 shadow-lg shadow-black/40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2">
              {[...navItems, ...secondaryItems].map((item) => (
                <a 
                  key={item.path} 
                  href={item.path}
                  className={`hover:text-liquid-teal py-2 px-3 transition duration-300 border-l-2 ${
                    activeItem === item.path ? 'border-liquid-teal text-liquid-teal' : 'border-transparent'
                  } hover:border-liquid-teal/50`}
                  onClick={() => {
                    setActiveItem(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4 mt-2 border-t border-liquid-teal/10">
                {/* Botão mobile de login com Steam */}
                <a 
                  href="/login/steam" 
                  className="flex items-center justify-center space-x-2 py-2 px-3 bg-[#1b2838] hover:bg-[#2a475e] rounded-md transition duration-300 border border-[#66c0f4]/30"
                >
                  {/* Ícone da Steam */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                  </svg>
                  <span className="text-white font-medium">LOGIN COM STEAM</span>
                </a>

                {/* Botão mobile de login com Google */}
                <a 
                  href="/login/google" 
                  className="flex items-center justify-center space-x-2 py-2 px-3 bg-white hover:bg-gray-100 rounded-md transition duration-300 border border-gray-300"
                >
                  {/* Ícone do Google */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-gray-700 font-medium">LOGIN COM GOOGLE</span>
                </a>

                <div className="flex space-x-3">
                  <a 
                    href="/login" 
                    className="flex-1 py-2 px-3 text-center border border-liquid-teal/30 rounded-md hover:bg-black/40 transition duration-300"
                  >
                    LOGIN
                  </a>
                  <a 
                    href="/register" 
                    className="flex-1 py-2 px-3 text-center bg-gradient-to-r from-liquid-teal to-liquid-blue text-white rounded-md transition duration-300 shadow-md shadow-liquid-blue/20"
                  >
                    REGISTER
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;