import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileHero: React.FC = () => {
  // Adicionar estado para notificações
  const [visibleNotifications, setVisibleNotifications] = useState({
    notification1: true,
    notification2: true,
    notification3: true,
    notification4: true,
    notification5: true
  });

  // Referência para o componente principal
  const mainRef = useRef<HTMLDivElement>(null);

  // States para controlar a posição do mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Estado para controlar a paginação do carrossel
  const [currentPage, setCurrentPage] = useState(0);
  const accountsPerPage = 3; // Número de contas exibidas por página

  const navigate = useNavigate();

  // Estados para o modal de detalhes da conta
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeNotification = (notificationId: string) => {
    setVisibleNotifications(prev => ({
      ...prev,
      [notificationId]: false
    }));
  };

  const closeAllNotifications = () => {
    setVisibleNotifications({
      notification1: false,
      notification2: false,
      notification3: false,
      notification4: false,
      notification5: false
    });
  };

  // Efeito para atualizar a posição do mouse
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calcular a posição relativa do mouse
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Adicionando os listeners ao documento
    document.addEventListener('mousemove', handleMouseMove);
    mainElement.addEventListener('mouseenter', handleMouseEnter);
    mainElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (mainElement) {
        mainElement.removeEventListener('mouseenter', handleMouseEnter);
        mainElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Adicionar animações CSS
  useEffect(() => {
    const styles = document.createElement('style');
    styles.innerHTML = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes scanner {
        0% { top: 0; }
        100% { top: 100%; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
      }
      @keyframes grow {
        0%, 100% { transform: scaleX(1) scaleY(1); }
        50% { transform: scaleX(1.2) scaleY(1.2); }
      }
      /* Novas animações para seção de contas em destaque */
      @keyframes slide {
        0% { transform: translateX(-100%) rotate(var(--rotation, 0deg)); }
        100% { transform: translateX(100%) rotate(var(--rotation, 0deg)); }
      }
      @keyframes blink {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.8; }
      }
      @keyframes gradient-x {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
      @keyframes sway {
        0%, 100% { transform: translateX(-20px); }
        50% { transform: translateX(20px); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styles);

    return () => {
      document.head.removeChild(styles);
    };
  }, []);

  // Variáveis para o efeito 3D baseado na posição do mouse
  const maxTilt = 10; // máxima inclinação em graus
  const depth = isHovering ? 1 : 0;
  const tiltX = -mousePosition.y * maxTilt * depth;
  const tiltY = mousePosition.x * maxTilt * depth;

  // Definindo a interface para as contas
  interface AccountData {
    id: number;
    rank: string;
    rankColor: string;
    rankIcon: string; // Alterado de React.ReactNode para string
    badgeText?: string;
    badgeColor?: string;
    image: string;
    placeholderImage: string;
    title: string;
    originalPrice?: string;
    price: string;
    operators: string;
    skins: string;
    stats: string;
    description?: string;
    tags: {
      text: string;
      color: string;
    }[];
  }

  // Dados das contas
  const accounts: AccountData[] = [
    // Primeira página (0)
    {
      id: 1,
      rank: "DIAMANTE",
      rankColor: "from-purple-600 to-blue-500",
      rankIcon: "/images/accounts/rankicons/Diamond 1.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Vigil.png",
      placeholderImage: "https://placehold.co/600x400/001a45/00c8ff?text=Conta+Diamante",
      title: "Diamante Legacy",
      originalPrice: "R$ 399,90",
      price: "R$ 349,90",
      operators: "Operadores: 42/46 desbloqueados",
      skins: "36 skins Black Ice",
      stats: "K/D: 1.8 | W/L: 64%",
      description: "Conta premium com diversas skins raras e operadores desbloqueados. Ideal para jogadores que valorizam cosméticos exclusivos e estatísticas competitivas.",
      tags: [
        { text: "Black Ice", color: "bg-blue-500/20 text-blue-400" },
        { text: "Elite Skins", color: "bg-purple-500/20 text-purple-400" },
        { text: "Collector", color: "bg-yellow-500/20 text-yellow-400" },
      ],
    },
    {
      id: 2,
      rank: "CAMPEÃO",
      rankColor: "from-yellow-500 to-amber-600",
      rankIcon: "/images/accounts/rankicons/Champions.png",
      badgeText: "CONTA RARA",
      badgeColor: "bg-black/40 backdrop-blur-sm border border-liquid-blue/30 text-liquid-blue",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Wamai.png",
      placeholderImage: "https://placehold.co/600x400/001a45/ffd700?text=Conta+Campeão",
      title: "Champion Veteran",
      price: "R$ 599,90",
      operators: "Operadores: 46/46 desbloqueados",
      skins: "14 skins Elite + Pro League set",
      stats: "K/D: 2.1 | W/L: 72%",
      description: "Conta do mais alto nível competitivo. Todos os operadores desbloqueados e conjuntos Pro League exclusivos. Estatísticas impressionantes.",
      tags: [
        { text: "Pro League", color: "bg-yellow-500/20 text-yellow-400" },
        { text: "Alpha Pack", color: "bg-green-500/20 text-green-400" },
        { text: "Limited", color: "bg-red-500/20 text-red-400" },
      ],
    },
    {
      id: 3,
      rank: "PLATINA",
      rankColor: "from-blue-500 to-indigo-500",
      rankIcon: "/images/accounts/rankicons/Platinum 1.png",
      badgeText: "-20% OFF",
      badgeColor: "bg-gradient-to-r from-liquid-yellow to-amber-500 text-liquid-navy",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Valkyrie.png",
      placeholderImage: "https://placehold.co/600x400/001a45/4287f5?text=Conta+Platina",
      title: "Platinum OG",
      originalPrice: "R$ 249,90",
      price: "R$ 199,90",
      operators: "Operadores: 38/46 desbloqueados",
      skins: "18 skins raras da Y1-Y3",
      stats: "K/D: 1.4 | W/L: 58%",
      description: "Conta original com itens das primeiras temporadas do jogo. Possui diversas skins exclusivas que não estão mais disponíveis para compra.",
      tags: [
        { text: "OG Player", color: "bg-blue-500/20 text-blue-400" },
        { text: "Seasonal", color: "bg-purple-500/20 text-purple-400" },
        { text: "Popular", color: "bg-gray-500/20 text-gray-400" },
      ],
    },
    // Segunda página (1)
    {
      id: 4,
      rank: "OURO",
      rankColor: "from-yellow-400 to-amber-500",
      rankIcon: "/images/accounts/rankicons/Gold 1.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_IQ.png",
      placeholderImage: "https://placehold.co/600x400/001a45/FFD700?text=Conta+Ouro",
      title: "Gold Budget",
      price: "R$ 149,90",
      operators: "Operadores: 32/46 desbloqueados",
      skins: "10 skins raras + 3 Elite",
      stats: "K/D: 1.2 | W/L: 53%",
      description: "Opção econômica para jogadores que buscam iniciar com uma conta de nível intermediário. Possui operadores suficientes para diversas estratégias.",
      tags: [
        { text: "Econômica", color: "bg-green-500/20 text-green-400" },
        { text: "Iniciante+", color: "bg-blue-500/20 text-blue-400" },
      ],
    },
    {
      id: 5,
      rank: "DIAMANTE",
      rankColor: "from-purple-600 to-blue-500",
      rankIcon: "/images/accounts/rankicons/Diamond 1.png",
      badgeText: "PRO PLAYER",
      badgeColor: "bg-gradient-to-r from-red-500 to-purple-500 text-white",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Capitao.png",
      placeholderImage: "https://placehold.co/600x400/001a45/00c8ff?text=Pro+Player",
      title: "Ex-Pro Account",
      originalPrice: "R$ 899,90",
      price: "R$ 799,90",
      operators: "Operadores: 46/46 desbloqueados",
      skins: "Todas as skins Pro League + 25 Elite",
      stats: "K/D: 2.3 | W/L: 78%",
      description: "Conta exclusiva de ex-jogador profissional com estatísticas impressionantes e coleção completa de itens. Inclui skins extremamente raras e charms exclusivos de eventos.",
      tags: [
        { text: "Ex-Pro", color: "bg-red-500/20 text-red-400" },
        { text: "Complete", color: "bg-green-500/20 text-green-400" },
        { text: "Ultra Rare", color: "bg-purple-500/20 text-purple-400" },
      ],
    },
    {
      id: 6,
      rank: "PRATA",
      rankColor: "from-gray-400 to-gray-500",
      rankIcon: "/images/accounts/rankicons/Silver 1.png",
      badgeText: "INICIANTE",
      badgeColor: "bg-gradient-to-r from-blue-400 to-cyan-400 text-white",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Ash.png",
      placeholderImage: "https://placehold.co/600x400/001a45/C0C0C0?text=Conta+Prata",
      title: "Starter Silver",
      price: "R$ 99,90",
      operators: "Operadores: 25/46 desbloqueados",
      skins: "8 skins raras + Battlepass Y7",
      stats: "K/D: 1.0 | W/L: 49%",
      description: "Conta ideal para iniciantes, com operadores básicos desbloqueados e alguns itens cosméticos. Perfeita para quem está começando no jogo sem partir do zero.",
      tags: [
        { text: "Iniciante", color: "bg-blue-500/20 text-blue-400" },
        { text: "Econômica", color: "bg-green-500/20 text-green-400" },
      ],
    },
  ];

  // Calcular o total de páginas
  const totalPages = Math.ceil(accounts.length / accountsPerPage);

  // Obter as contas da página atual
  const currentAccounts = accounts.slice(
    currentPage * accountsPerPage,
    (currentPage + 1) * accountsPerPage
  );

  // Função para ir para a próxima página
  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Função para ir para a página anterior
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Função para renderizar o fundo holográfico
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
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
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

          {/* Elementos circulares com efeito de paralaxe */}
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translateZ(40px) translateX(${-mousePosition.x * 20}px) translateY(${-mousePosition.y * 20}px)` }}>
            <div className="relative w-[600px] h-[600px]">
              {/* Círculos concêntricos */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-[40px] rounded-full border border-cyan-500/15 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-[80px] rounded-full border border-cyan-500/10 animate-pulse" style={{ animationDuration: '5s' }}></div>

              {/* Linhas radiais que rotacionam com o mouse */}
              <div className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `rotate(${mousePosition.x * 5}deg)` }}>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `rotate(${45 + mousePosition.y * 5}deg)` }}>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
              </div>
              <div className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `rotate(${90 - mousePosition.x * 5}deg)` }}>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `rotate(${135 + mousePosition.y * 5}deg)` }}>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Pontos de dados flutuantes */}
          <div className="absolute inset-0" style={{ transform: `translateZ(60px) translateX(${-mousePosition.x * 40}px) translateY(${-mousePosition.y * 40}px)` }}>
            <div className="absolute w-2 h-2 rounded-full bg-cyan-400/30 top-1/4 left-1/4 blur-[1px]"></div>
            <div className="absolute w-1 h-1 rounded-full bg-cyan-400/40 top-3/4 left-1/3 blur-[1px]"></div>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/50 top-1/2 left-3/4 blur-[1px]"></div>
            <div className="absolute w-1 h-1 rounded-full bg-cyan-400/60 top-1/3 left-2/3 blur-[1px]"></div>
          </div>
        </div>

        {/* Efeito de luz de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(0, 200, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          transform: `translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 30}px)`
        }}></div>
      </>
    );
  };

  const handleExplorarCatalogo = () => {
    navigate('/catalogo-contas');
  };

  // Efeito para gerenciar o clique fora do modal para fechar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Função para abrir o modal com os detalhes da conta
  const handleAccountClick = (account: AccountData) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-liquid-navy overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #001945 0%, #000c24 100%)'
      }}
    >
      {/* Notificações fixas no topo esquerdo (alterado de direito para esquerdo) */}
      <div className="fixed top-4 left-4 z-50 w-80 space-y-2">
        {/* Botão para fechar todas as notificações */}
        <div className="flex justify-start mb-1">
          <button
            onClick={closeAllNotifications}
            className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors shadow-lg backdrop-blur-md flex items-center"
          >
            <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Limpar notificações
          </button>
        </div>

        

        {visibleNotifications.notification2 && (
          <div className="group relative">
            {/* Notificação estilo iPhone */}
            <div className="flex flex-col w-full rounded-2xl bg-black/75 backdrop-blur-xl px-4 pt-3 pb-3 shadow-2xl shadow-black/20 border border-white/10 overflow-hidden animate-float transform transition-transform duration-200 group-hover:scale-[1.02]" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
              {/* Cabeçalho da notificação */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-liquid-yellow to-amber-400 rounded-md mr-2">
                    <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 21C3 17.134 7.13401 14 12 14C16.866 14 21 17.134 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
                  <div className="flex items-center">
                    <span className="text-white text-xs font-semibold">R6 Marketplace</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-gray-400 text-[10px]">2 min</span>
              </div>
            </div>
            <button
              onClick={() => closeNotification('notification2')}
                  className="text-gray-400 hover:text-white p-0.5 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
              </div>
              
              {/* Conteúdo da notificação */}
              <div className="mt-0.5">
                <h4 className="text-white font-bold text-sm">NOVAS CONTAS PREMIUM</h4>
                <p className="text-gray-300 text-xs mt-0.5">Adicionamos 5 novas contas premium com Black Ice skins. Confira agora!</p>
              </div>
              
              {/* Barra de tempo */}
              <div className="w-full mt-3 relative h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-liquid-yellow w-2/3 rounded-full transition-all"></div>
              </div>
            </div>
            
            {/* Reflexo sutil embaixo da notificação */}
            <div className="w-[95%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto"></div>
          </div>
        )}

        {visibleNotifications.notification3 && (
          <div className="group relative">
            {/* Notificação estilo iPhone */}
            <div className="flex flex-col w-full rounded-2xl bg-black/75 backdrop-blur-xl px-4 pt-3 pb-3 shadow-2xl shadow-black/20 border border-white/10 overflow-hidden animate-float transform transition-transform duration-200 group-hover:scale-[1.02]" style={{ animationDuration: '4.5s', animationDelay: '1s' }}>
              {/* Cabeçalho da notificação */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-liquid-blue to-blue-400 rounded-md mr-2">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.85 8.3L22 9.3L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.3L9.15 8.3L12 2Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
                  <div className="flex items-center">
                    <span className="text-white text-xs font-semibold">R6 Credits</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-gray-400 text-[10px]">5 min</span>
              </div>
            </div>
            <button
              onClick={() => closeNotification('notification3')}
                  className="text-gray-400 hover:text-white p-0.5 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
              </div>
              
              {/* Conteúdo da notificação */}
              <div className="mt-0.5">
                <h4 className="text-white font-bold text-sm">OFERTA ESPECIAL</h4>
                <p className="text-gray-300 text-xs mt-0.5">Desconto de 15% em créditos R6! Oferta por tempo limitado. Aproveite agora!</p>
              </div>
              
              {/* Barra de tempo */}
              <div className="w-full mt-3 relative h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-liquid-blue w-1/2 rounded-full transition-all"></div>
              </div>
            </div>
            
            {/* Reflexo sutil embaixo da notificação */}
            <div className="w-[95%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto"></div>
          </div>
        )}


        {/* Nova notificação com imagem */}
        {visibleNotifications.notification5 && (
          <div className="group relative">
            {/* Notificação estilo iPhone com imagem */}
            <div className="flex flex-col w-full rounded-2xl bg-black/75 backdrop-blur-xl px-4 pt-3 pb-3 shadow-2xl shadow-black/20 border border-white/10 overflow-hidden animate-float transform transition-transform duration-200 group-hover:scale-[1.02]" style={{ animationDuration: '4.8s', animationDelay: '0.8s' }}>
              {/* Cabeçalho da notificação */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-400 rounded-md mr-2">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 22H15M12 17V22M8 2H16M16 2C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16V8C2 4.68629 4.68629 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
                  <div className="flex items-center">
                    <span className="text-white text-xs font-semibold">R6 News</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-gray-400 text-[10px]">20 min</span>
              </div>
            </div>
            <button
                  onClick={() => closeNotification('notification5')}
                  className="text-gray-400 hover:text-white p-0.5 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
              
              {/* Conteúdo da notificação */}
              <div className="mt-0.5">
                <h4 className="text-white font-bold text-sm">NOVA TEMPORADA ANUNCIADA</h4>
                <p className="text-gray-300 text-xs mt-0.5">Operação Collision Point chega com novo operador.</p>
                
                {/* Imagem de miniatura */}
                <div className="mt-2 rounded-lg overflow-hidden w-full h-24 bg-gray-900 relative">
                  <img 
                    src="/images/banners/r6-operation.jpg" 
                    alt="Nova Operação" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3OTM1ZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAxOTQ1IiBzdG9wLW9wYWNpdHk9IjAuMDUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjUsMzAgTDUwLDcwIEw3NSwzMCIvPjwvc3ZnPg==';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 flex items-center">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="text-white text-xs ml-1">1:24</span>
                  </div>
                </div>
              </div>
              
              {/* Barra de tempo */}
              <div className="w-full mt-3 relative h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-purple-500 w-1/6 rounded-full transition-all"></div>
              </div>
            </div>
            
            {/* Reflexo sutil embaixo da notificação */}
            <div className="w-[95%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto"></div>
          </div>
        )}
      </div>

      {/* Grade de fundo */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-liquid-teal rounded-full animate-float opacity-60" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-liquid-yellow rounded-full animate-float opacity-60" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-liquid-blue rounded-full animate-float opacity-60" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-liquid-teal rounded-full animate-float opacity-40" style={{ animationDuration: '7s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-liquid-yellow rounded-full animate-float opacity-50" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-3/5 right-1/3 w-2 h-2 bg-liquid-blue rounded-full animate-float opacity-40" style={{ animationDuration: '8s' }}></div>
      </div>

      {/* Container principal do conteúdo */}
      <div className="container mt-12 mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        {/* Seção Hero com Perfil */}
        <div className="w-full mb-16 text-center relative">
          {/* Efeito de neon ao fundo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-liquid-teal/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-t from-liquid-blue/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-liquid-teal/10 via-liquid-blue/10 to-liquid-teal/10 rounded-full blur-3xl animate-pulse"></div>

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

              {/* Grade holográfica */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 90%, rgba(0, 200, 255, 0.2) 100%), linear-gradient(90deg, transparent 90%, rgba(0, 200, 255, 0.2) 100%)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
          </div>
          <div className="inline-block bg-gradient-to-r from-liquid-teal/20 to-liquid-blue/20 border border-liquid-teal/30 text-white py-1 px-4 rounded-md mb-10 ">
            <span className="text-sm font-medium">Bem-vindo à nossa plataforma</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Serviços <span className="text-liquid-teal">Rainbow Six</span>
          </h1>

          {/* Perfil central com logo */}
          <div
            className="relative mx-auto mb-8 transition-transform duration-200 w-[220px] h-[230px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
            }}
          >
            {/* Forma de escudo */}
            <div className="relative w-full h-full">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 220 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M110 0L220 50V140C220 190 170 240 110 240C50 240 0 190 0 140V50L110 0Z"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="220" y2="240" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#13F2FF" />
                    <stop offset="100%" stopColor="#0077CC" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Logo do Rainbow Six */}
              <div className="absolute inset-[25px] rounded-md overflow-hidden flex items-center justify-center bg-[#1e2b3a]/80">
                <img
                  src="/images/profiles/r6-logo.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMGM4ZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAxOTQ1IiBzdG9wLW9wYWNpdHk9IjAuMDUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjUsMzAgTDUwLDcwIEw3NSwzMCIvPjwvc3ZnPg==")'
                  }}
                />
              </div>

              {/* Efeito de brilho */}
              <div className="absolute -inset-4 rounded-full bg-liquid-teal/20 filter blur-xl animate-pulse pointer-events-none"></div>
            </div>
          </div>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
            Adquira contas e créditos exclusivos de Rainbow Six! Compre de forma rápida e segura para aprimorar sua experiência de jogo.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-medium rounded-md shadow-lg shadow-liquid-teal/20 hover:shadow-liquid-teal/40 transition-all transform hover:-translate-y-1">
              Entrar na Comunidade
            </button>
            <button 
              onClick={handleExplorarCatalogo}
              className="px-6 py-3 bg-transparent border border-liquid-teal/50 text-liquid-teal font-medium rounded-md hover:bg-liquid-teal/10 transition-all">
              Explorar Catálogo
            </button>
          </div>
        </div>

        {/* Banner de separação decorativo com imagem que cobre toda a tela horizontalmente com um leve relevo  */}
        <div className="relative w-full h-64 my-12 overflow-hidden">
          {/* Imagem de fundo do Rainbow Six */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/banners/r6-tactical.jpg"
              alt="Rainbow Six Siege"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMGM4ZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAxOTQ1IiBzdG9wLW9wYWNpdHk9IjAuMDUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjUsMzAgTDUwLDcwIEw3NSwzMCIvPjwvc3ZnPg==")'
              }}
            />

            {/* Sobreposição para dar profundidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-liquid-navy/90 via-liquid-navy/30 to-liquid-navy/60"></div>
          </div>

          {/* Efeito de relevo e brilho */}
          <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-liquid-teal/70 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-liquid-teal/70 to-transparent"></div>

          {/* Logo do Rainbow Six em destaque */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-liquid-navy/40 backdrop-blur-sm p-4 rounded-lg border border-liquid-teal/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 rounded-md bg-gradient-to-br from-liquid-teal to-liquid-blue opacity-20 animate-pulse"></div>
                  <img src="/images/profiles/R6_live_Y10S01_Shield_Logo_Grey.png" alt="Rainbow Six Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-liquid-teal to-liquid-blue">RAINBOW SIX SIEGE</h3>
                  <p className="text-white text-sm">Operação Collision Point - TEMPORADA 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos decorativos */}
          <div className="absolute left-1/4 bottom-1/4 w-64 h-px bg-gradient-to-r from-liquid-teal/80 to-transparent transform -rotate-45"></div>
          <div className="absolute right-1/4 bottom-1/4 w-64 h-px bg-gradient-to-l from-liquid-teal/80 to-transparent transform rotate-45"></div>
        </div>
        <section className="relative py-16 overflow-hidden my-12" ref={mainRef}>
          {/* Fundo animado do banner */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Renderiza o fundo holográfico */}
            {renderBannerBackground()}

            {/* Partículas animadas */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute w-2 h-2 bg-liquid-teal rounded-full animate-float" style={{ top: '10%', left: '5%', animationDelay: '0s', opacity: 0.6 }}></div>
              <div className="absolute w-1 h-1 bg-liquid-yellow rounded-full animate-float" style={{ top: '35%', left: '15%', animationDelay: '0.5s', opacity: 0.8 }}></div>
              <div className="absolute w-3 h-3 bg-liquid-blue rounded-full animate-float" style={{ top: '80%', left: '8%', animationDelay: '1s', opacity: 0.5 }}></div>
              <div className="absolute w-2 h-2 bg-liquid-teal rounded-full animate-float" style={{ top: '20%', left: '88%', animationDelay: '1.5s', opacity: 0.7 }}></div>
              <div className="absolute w-1 h-1 bg-liquid-yellow rounded-full animate-float" style={{ top: '70%', left: '92%', animationDelay: '2s', opacity: 0.9 }}></div>
              <div className="absolute w-2 h-2 bg-liquid-blue rounded-full animate-float" style={{ top: '45%', left: '95%', animationDelay: '2.5s', opacity: 0.6 }}></div>
            </div>
          </div>

          {/* Conteúdo do banner */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Lado esquerdo - Texto e CTA */}
                <div className="md:w-1/2 space-y-6 text-center md:text-left">
                  <div className="inline-flex items-center bg-gradient-to-r from-liquid-teal/20 to-liquid-blue/20 rounded-full px-4 py-1 border border-liquid-teal/30">
                    <div className="w-2 h-2 rounded-full bg-liquid-teal animate-pulse mr-2"></div>
                    <span className="text-xs font-medium text-liquid-teal uppercase tracking-wider">Serviços Premium</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Aproveite nossos <span className="text-liquid-teal">serviços </span> <span className="text-liquid-yellow">aprimore sua experiência em Rainbow Six! </span>
                  </h2>

                  <p className="text-gray-300">
                    compre contas, créditos e itens premium de forma rápida e segura. Eleve seu jogo com a ajuda dos melhores recursos disponíveis!"
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      onClick={handleExplorarCatalogo}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-medium rounded-md shadow-lg shadow-liquid-teal/20 hover:shadow-liquid-teal/40 transition-all transform hover:-translate-y-1"
                    >
                      Acessar Catalogo de contas
                    </button>
                    <a
                      href="#learn-more"
                      className="w-full sm:w-auto px-8 py-3 bg-transparent border border-liquid-teal/50 text-liquid-teal font-medium rounded-md hover:bg-liquid-teal/10 transition-all"
                    >
                      Ver Creditos R6
                    </a>
                  </div>
                </div>

                {/* Lado direito - Imagem ilustrativa */}
                <div className="md:w-1/2 relative">
                  <div className="aspect-[4/3] relative">
                    {/* Fundo da imagem com efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-br from-liquid-teal/20 to-liquid-blue/20 rounded-lg overflow-hidden border border-liquid-teal/30">
                      {/* Glow effects */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-liquid-teal/20 rounded-full filter blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-liquid-blue/20 rounded-full filter blur-xl"></div>
                    </div>

                    {/* Anúncio de compra e venda de contas */}
                    <div className="absolute inset-8 bg-black/60 rounded border border-liquid-teal/40 backdrop-blur-sm shadow-lg flex flex-col">
                      {/* Header com título */}
                      <div className="bg-gradient-to-r from-liquid-navy/90 to-black/90 border-b border-liquid-teal/30 p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-liquid-teal/20 rounded-md flex items-center justify-center border border-liquid-teal/40">
                            <svg className="w-3.5 h-3.5 text-liquid-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-white">Mercado de Contas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                            <span className="text-[10px] text-gray-300">Atualizado agora</span>
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo do anúncio */}
                      <div className="flex-1 p-4 flex flex-col gap-3">
                        {/* Título principal */}
                        <div className="text-center mb-1">
                          <h3 className="text-lg font-bold text-liquid-yellow">Marketplace Oficial R6</h3>
                          <p className="text-xs text-gray-400">Compre, venda e troque contas com segurança</p>
                        </div>

                        {/* Destaques de contas */}
                        <div className="grid grid-cols-2 gap-2">
                          {/* Conta Premium */}
                          <div className="bg-black/40 border border-liquid-teal/20 rounded p-2 relative group">
                            <div className="absolute -top-1 -right-1 bg-liquid-teal px-1.5 rounded-full text-[8px] font-bold text-black">PREMIUM</div>
                            <div className="flex items-start gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-liquid-teal to-liquid-blue rounded-md flex-shrink-0 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" />
                                  <path d="M3 21C3 17.134 7.13401 14 12 14C16.866 14 21 17.134 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-white font-bold text-xs">Diamante III</p>
                                <p className="text-[10px] text-gray-400">K/D: 2.31</p>
                                <p className="text-[10px] text-liquid-teal group-hover:text-liquid-yellow transition-colors">14 skins raras</p>
                              </div>
                            </div>
                            <div className="mt-1 pt-1 border-t border-liquid-teal/10 flex justify-between items-center">
                              <span className="text-liquid-yellow font-bold text-xs">R$ 349,90</span>
                              <span className="text-[8px] text-gray-400">ID #2854</span>
                            </div>
                          </div>

                          {/* Conta Elite */}
                          <div className="bg-black/40 border border-liquid-yellow/20 rounded p-2 relative group">
                            <div className="absolute -top-1 -right-1 bg-liquid-yellow px-1.5 rounded-full text-[8px] font-bold text-black">ELITE</div>
                            <div className="flex items-start gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-liquid-yellow to-yellow-600 rounded-md flex-shrink-0 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-white font-bold text-xs">Campeão</p>
                                <p className="text-[10px] text-gray-400">K/D: 3.87</p>
                                <p className="text-[10px] text-liquid-yellow group-hover:text-liquid-teal transition-colors">Elite completo</p>
                              </div>
                            </div>
                            <div className="mt-1 pt-1 border-t border-liquid-yellow/10 flex justify-between items-center">
                              <span className="text-liquid-yellow font-bold text-xs">R$ 799,90</span>
                              <span className="text-[8px] text-gray-400">ID #3012</span>
                            </div>
                          </div>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-3 gap-2 my-1">
                          <div className="bg-black/40 border border-liquid-teal/20 rounded p-2 text-center">
                            <span className="text-[10px] text-gray-400 block">Contas</span>
                            <span className="text-sm text-liquid-teal font-bold">326</span>
                          </div>
                          <div className="bg-black/40 border border-liquid-teal/20 rounded p-2 text-center">
                            <span className="text-[10px] text-gray-400 block">Vendas</span>
                            <span className="text-sm text-liquid-yellow font-bold">5.8k+</span>
                          </div>
                          <div className="bg-black/40 border border-liquid-teal/20 rounded p-2 text-center">
                            <span className="text-[10px] text-gray-400 block">Avaliação</span>
                            <span className="text-sm text-liquid-blue font-bold">4.92★</span>
                          </div>
                        </div>


                        {/* CTA */}
                        <div className="mt-auto pt-5">
                          <button className="w-full bg-gradient-to-r from-liquid-teal to-liquid-blue hover:from-liquid-teal/90 hover:to-liquid-blue/90 text-white text-sm py-2 rounded-md transition-all flex items-center justify-center">
                            <span>Acessar Marketplace</span>
                            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge flutuante */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-bold py-2 px-4 rounded-full rotate-12 shadow-lg border-2 border-red-400 z-10">
                    MERCADO SEGURO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner decorativo holográfico com Rainbow Six */}
        <div className="relative w-full my-12 overflow-hidden">
          {/* Background semelhante ao banner acima */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-liquid-navy/90"></div>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMGM4ZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAxOTQ1IiBzdG9wLW9wYWNpdHk9IjAuMDUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjUsMzAgTDUwLDcwIEw3NSwzMCIvPjwvc3ZnPg==")',
              backgroundSize: '100px 100px'
            }}></div>
          </div>
        </div>

        {/* Mini Catálogo de Contas - Carrossel de contas à venda */}
        <section className="p-10 rounded-3xl relative overflow-hidden my-12">
          {/* Background semelhante ao da seção de créditos R6 */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-tl from-gray-900 via-indigo-950 to-gray-900 opacity-90"></div>

            {/* Formas flutuantes e efeitos - mantidos como no original */}
            <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-[float_5s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-20 right-1/5 w-[400px] h-[200px] bg-gradient-to-b from-cyan-500/15 to-transparent rounded-[50%] blur-xl animate-[sway_7s_ease-in-out_infinite]"></div>
            <div className="absolute inset-0">
              <div className="absolute w-[150%] h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent -rotate-12 top-1/3 left-1/2 -translate-x-1/2 animate-[slide_6s_linear_infinite]"></div>
              <div className="absolute w-[150%] h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent rotate-6 bottom-1/4 left-1/2 -translate-x-1/2 animate-[slide_4s_linear_infinite]"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full blur-sm animate-[blink_3s_ease-in-out_infinite]" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-300/40 rounded-full blur-sm animate-[blink_2s_ease-in-out_infinite_delay-1s]" />
          </div>

          {/* Efeito de grade digital no fundo */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 49%, rgba(0, 200, 255, 0.05) 50%, rgba(0, 200, 255, 0.05) 51%, transparent 52%, transparent 99%)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* NOVOS ELEMENTOS: Linhas diagonais */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(0, 200, 255, 0.08) 50%, rgba(0, 200, 255, 0.08) 51%, transparent 52%, transparent 99%)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(-45deg, transparent 49%, rgba(0, 200, 255, 0.08) 50%, rgba(0, 200, 255, 0.08) 51%, transparent 52%, transparent 99%)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* NOVOS ELEMENTOS: Elementos gráficos decorativos adicionais */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Círculo grande com efeito de pulso */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-liquid-blue/10 animate-pulse" style={{ animationDuration: '10s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-liquid-blue/15 animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-liquid-blue/20 animate-pulse" style={{ animationDuration: '6s' }}></div>

            {/* Linhas horizontais de escaneamento com movimento */}
            <div className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 blur-[1px]" style={{
              top: '30%',
              animation: 'scanner 8s linear infinite',
              boxShadow: '0 0 5px 2px rgba(0, 200, 255, 0.1)'
            }}></div>
            <div className="absolute left-0 right-0 h-[1px] bg-purple-400/20 blur-[1px]" style={{
              top: '70%',
              animation: 'scanner 10s linear infinite reverse',
              boxShadow: '0 0 5px 2px rgba(147, 51, 234, 0.1)'
            }}></div>
          </div>

          {/* NOVOS ELEMENTOS: Hexágonos/padrões de cyber-tech */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-1/4 w-20 h-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%2300c8ff' d='M20 0L40 10v20L20 40L0 30V10L20 0z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="absolute bottom-20 right-1/4 w-16 h-16" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%2300c8ff' d='M20 0L40 10v20L20 40L0 30V10L20 0z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="absolute top-1/2 right-1/5 w-24 h-24" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%2300c8ff' d='M20 0L40 10v20L20 40L0 30V10L20 0z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>

          {/* NOVOS ELEMENTOS: Elementos holográficos e efeitos 3D */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Grade de hologramas futurista com sensibilidade ao movimento do mouse */}
            <div
              className="absolute inset-0 transition-transform duration-200"
              style={{
                transform: `perspective(1000px) rotateX(${tiltX / 3}deg) rotateY(${tiltY / 3}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Linhas de grade com efeito 3D */}
              <div className="absolute inset-0" style={{ transform: 'translateZ(10px)' }}>
                <div className="h-full w-full" style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 49.5%, rgba(0, 200, 255, 0.15) 50%, rgba(0, 200, 255, 0.15) 50.5%, transparent 51%, transparent 99.5%)',
                  backgroundSize: '100px 100px'
                }}></div>
              </div>

              {/* Pontos de dados que se movem com o mouse */}
              <div style={{ transform: `translateZ(30px) translateX(${-mousePosition.x * 20}px) translateY(${-mousePosition.y * 20}px)` }}>
                <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-400/50"></div>
                <div className="absolute top-3/4 left-2/3 w-1.5 h-1.5 rounded-full bg-blue-400/40"></div>
                <div className="absolute top-2/3 left-1/4 w-1 h-1 rounded-full bg-indigo-400/60"></div>
                <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-cyan-400/30"></div>
              </div>
            </div>

            {/* Efeito de "escaneamento" holográfico */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Linha de escaneamento vertical que se move da esquerda para direita */}
              <div
                className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-[2px]"
                style={{
                  left: '10%',
                  animation: 'slide 7s linear infinite',
                  boxShadow: '0 0 8px 2px rgba(0, 200, 255, 0.1)'
                }}
              ></div>

              {/* Efeito de brilho que segue o mouse */}
              <div
                className="absolute w-[300px] h-[300px] rounded-full opacity-10"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 200, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
                  left: `calc(${mousePosition.x * 100 + 50}% - 150px)`,
                  top: `calc(${mousePosition.y * 100 + 50}% - 150px)`,
                  transition: 'left 0.3s ease-out, top 0.3s ease-out'
                }}
              ></div>
            </div>

            {/* Elemento circular de "interface" holográfica */}
            <div className="absolute top-3/4 right-1/4 w-[200px] h-[200px]">
              {/* Círculo exterior com rotação */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20"
                style={{ animation: 'spin 20s linear infinite' }}></div>

              {/* Círculo interior com rotação inversa */}
              <div className="absolute inset-8 rounded-full border border-purple-500/20"
                style={{ animation: 'spin 15s linear infinite reverse' }}></div>

              {/* Marcas do círculo */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2"
                  style={{
                    transformOrigin: 'left center',
                    transform: `rotate(${i * 30}deg)`,
                  }}>
                  <div className="absolute right-0 w-2 h-0.5 bg-cyan-400/30"></div>
                </div>
              ))}

              {/* Texto central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-cyan-900/20 flex items-center justify-center border border-cyan-500/40">
                  <div className="w-6 h-6 rounded-full bg-cyan-400/10 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Linhas decorativas no topo e rodapé */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-liquid-blue/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-liquid-blue/50 to-transparent"></div>
          </div>

          <div className="w-full px-4">
            <div className="text-center mb-10">
              <div className="inline-block relative">
                <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-liquid-teal to-liquid-blue animate-gradient-x title-font-alt uppercase tracking-wider">Contas em Destaque</h2>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-liquid-teal/0 via-liquid-teal to-liquid-teal/0 rounded-full"></div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-liquid-teal to-liquid-blue rounded-full"></div>
              </div>
            </div>

            {/* Controles do carrossel e indicador */}
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-liquid-blue rounded-full animate-pulse"></div>
                  <span className="text-xs text-white font-medium">
                    VISUALIZANDO {currentPage * accountsPerPage + 1}-{Math.min((currentPage + 1) * accountsPerPage, accounts.length)} DE {accounts.length} CONTAS
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-black/20 hover:bg-black/30 border border-liquid-blue/30 p-2 rounded-full transition-all backdrop-blur-sm"
                    onClick={prevPage}
                  >
                    <svg className="w-4 h-4 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    className="bg-black/20 hover:bg-black/30 border border-liquid-blue/30 p-2 rounded-full transition-all backdrop-blur-sm"
                    onClick={nextPage}
                  >
                    <svg className="w-4 h-4 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Carrossel de contas - centralizando com div externa */}
            <div className="flex justify-center">
              <div className="max-w-[1200px] w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                  {currentAccounts.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => handleAccountClick(account)}
                      className="backdrop-blur-sm border border-liquid-blue/40 rounded-lg overflow-hidden relative group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,180,255,0.3)] shadow-[inset_0_1px_1px_rgba(0,180,255,0.1),_0_5px_15px_rgba(0,0,0,0.4)] cursor-pointer"
                    >
                      {/* Efeito de fundo com gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-b from-liquid-blue/5 to-transparent opacity-70"></div>

                      {/* Borda de brilho no hover */}
                      <div className="absolute inset-0 border border-liquid-blue/0 group-hover:border-liquid-blue/60 rounded-lg transition-all duration-300"></div>

                      {/* Linhas de acento */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-liquid-blue/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-liquid-blue/40 to-transparent"></div>

                      {/* Tag Rank com novo design */}
                      <div
                        className={`absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-[0_0_10px_rgba(0,150,255,0.2)] z-20 flex items-center gap-1`}
                      >
                        <img 
                          src={account.rankIcon} 
                          alt={account.rank}
                          className="w-5 h-5 mr-1"
                        />
                        {account.rank}
                      </div>

                      {/* Tag de tipo de conta com novo design */}
                      {account.badgeText && (
                        <div
                          className={`absolute top-3 right-3 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 px-3 py-1 rounded-lg text-xs font-bold z-20 shadow-[0_0_10px_rgba(0,150,255,0.2)] text-white`}
                        >
                          {account.badgeText}
                        </div>
                      )}

                      {/* Imagem da conta com overlay melhorado */}
                      <div className="h-80 relative">
                        <img
                          src={account.image}
                          alt={`Conta ${account.rank}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = account.placeholderImage;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                        {/* Partículas decorativas */}
                        <div className="absolute bottom-5 right-5 w-1 h-1 bg-liquid-blue rounded-full animate-ping opacity-70"></div>
                        <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-liquid-blue rounded-full animate-ping opacity-50 animation-delay-500"></div>
                      </div>

                      {/* Info da conta com estilo atualizado */}
                      <div className="p-5 relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-white">{account.title}</h3>
                          <div className="text-right">
                            {account.originalPrice && (
                              <div className="text-gray-400 text-xs line-through">{account.originalPrice}</div>
                            )}
                            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-liquid-teal to-liquid-blue">
                              {account.price}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-300">
                            <span className="w-3 h-3 bg-liquid-blue/20 rounded-full flex items-center justify-center mr-2">
                              <span className="w-1.5 h-1.5 bg-liquid-blue rounded-full"></span>
                            </span>
                            {account.operators}
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <span className="w-3 h-3 bg-liquid-blue/20 rounded-full flex items-center justify-center mr-2">
                              <span className="w-1.5 h-1.5 bg-liquid-blue rounded-full"></span>
                            </span>
                            {account.skins}
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <span className="w-3 h-3 bg-liquid-blue/20 rounded-full flex items-center justify-center mr-2">
                              <span className="w-1.5 h-1.5 bg-liquid-blue rounded-full"></span>
                            </span>
                            {account.stats}
                          </div>
                        </div>

                        {/* Tags com novo estilo e cores dinâmicas */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {account.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 rounded-md ${tag.color} text-white shadow-[0_0_5px_rgba(0,150,255,0.1)]`}
                            >
                              {tag.text}
                            </span>
                          ))}
                        </div>

                        {/* Botão atualizado com gradiente e efeito de brilho */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Evita que o evento de clique se propague para o card
                            handleAccountClick(account);
                          }}
                          className="w-full bg-gradient-to-r from-liquid-blue/80 to-liquid-teal/80 hover:from-liquid-blue hover:to-liquid-teal text-white py-2.5 rounded-md transition-all flex items-center justify-center mt-2 shadow-[0_0_10px_rgba(0,150,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,180,255,0.3)]"
                        >
                          <span>Ver detalhes</span>
                          <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão para explorar mais */}
            <div className="mt-10 text-center">
              <button 
                onClick={handleExplorarCatalogo}
                className="bg-black/20 hover:bg-black/30 text-liquid-blue border border-liquid-blue/30 px-6 py-3 rounded-md backdrop-blur-sm transition-all hover:border-liquid-blue/60 inline-flex items-center"
              >
                <span>EXPLORAR CATÁLOGO COMPLETO</span>
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-white text-xs mt-2">{accounts.length} contas disponíveis para compra imediata</p>
            </div>
          </div>
        </section>


        {/* R6 Credits Packages Section */}
        <section className="w-full my-24 relative overflow-hidden p-2 rounded-3xl">
          {/* Efeito de neon */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Camada de fundo com gradiente suave */}
            <div className="absolute inset-0 bg-gradient-to-tl from-gray-900 via-indigo-950 to-gray-900 opacity-90"></div>

            {/* Forma flutuante 1 - círculo com movimento */}
            <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-[float_5s_ease-in-out_infinite]"></div>

            {/* Forma flutuante 2 - elipse com rotação sutil */}
            <div className="absolute bottom-20 right-1/5 w-[400px] h-[200px] bg-gradient-to-b from-cyan-500/15 to-transparent rounded-[50%] blur-xl animate-[sway_7s_ease-in-out_infinite]"></div>

            {/* Linhas dinâmicas diagonais */}
            <div className="absolute inset-0">
              <div className="absolute w-[150%] h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent -rotate-12 top-1/3 left-1/2 -translate-x-1/2 animate-[slide_6s_linear_infinite]"></div>
              <div className="absolute w-[150%] h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent rotate-6 bottom-1/4 left-1/2 -translate-x-1/2 animate-[slide_4s_linear_infinite]"></div>
            </div>

            {/* Partículas sutis */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full blur-sm animate-[blink_3s_ease-in-out_infinite]" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-300/40 rounded-full blur-sm animate-[blink_2s_ease-in-out_infinite_delay-1s]" />
          </div>

          <div className="text-center mb-16 relative z-10">
            <p className="text-gray-300 mt-5">Escolha o pacote ideal para suas conquistas</p>
            <h2 className="text-7xl mt-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-liquid-teal to-liquid-blue animate-gradient-x title-font-alt uppercase tracking-wider">
              Pacotes de Créditos R6
            </h2>
          </div>

          <div className="relative z-10 p-5 max-w-[1800px] mx-auto">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-liquid-yellow/5 to-transparent rounded-3xl"></div>
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-liquid-yellow/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>

            {/* Scroll container */}
            <div className="relative max-h-[600px] overflow-y-auto pb-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-liquid-yellow/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-liquid-yellow/70">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-8 lg:px-16">
                {/* Pacotes de créditos R6 com as novas imagens */}
                {[
                  {
                    credits: 600,
                    name: "Pacote Prata",
                    description: "Perfeito para começar",
                    bonus: 50,
                    originalPrice: "R$ 29,90",
                    price: "R$ 19,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS PRATA.png"
                  },
                  {
                    credits: 1200,
                    name: "Pacote Prata Plus",
                    description: "Para jogadores casuais",
                    bonus: 150,
                    originalPrice: "R$ 49,90",
                    price: "R$ 39,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS PRATA PLUS.png"
                  },
                  {
                    credits: 2400,
                    name: "Pacote Ouro",
                    description: "O favorito da comunidade",
                    bonus: 400,
                    originalPrice: "R$ 89,90",
                    price: "R$ 69,90",
                    featured: true,
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO.png"
                  },
                  {
                    credits: 3600,
                    name: "Pacote Ouro Plus",
                    description: "Para jogadores dedicados",
                    bonus: 800,
                    originalPrice: "R$ 129,90",
                    price: "R$ 99,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO PLUS.png"
                  },
                  {
                    credits: 4800,
                    name: "Pacote Elite",
                    description: "Para jogadores exigentes",
                    bonus: 1200,
                    originalPrice: "R$ 159,90",
                    price: "R$ 129,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO PLUS.png"
                  },
                  {
                    credits: 6000,
                    name: "Pacote Master",
                    description: "Experiência completa",
                    bonus: 1800,
                    originalPrice: "R$ 199,90",
                    price: "R$ 169,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO.png"
                  },
                  {
                    credits: 8400,
                    name: "Pacote Ultimate",
                    description: "Para os mais exigentes",
                    bonus: 2400,
                    originalPrice: "R$ 259,90",
                    price: "R$ 219,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO PLUS.png"
                  },
                  {
                    credits: 12000,
                    name: "Pacote Legend",
                    description: "Domine o jogo",
                    bonus: 3600,
                    originalPrice: "R$ 349,90",
                    price: "R$ 299,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO.png"
                  },
                  {
                    credits: 16000,
                    name: "Pacote Champion",
                    description: "Para verdadeiros campeões",
                    bonus: 5000,
                    originalPrice: "R$ 449,90",
                    price: "R$ 399,90",
                    imagePath: "/images/accounts/rankicons/R6CREDITS OURO PLUS.png"
                  }
                ].map((pack, index) => (
                  <div key={index} className="relative flex flex-col gap-4 p-4 w-[300px] rounded-xl bg-[#12131A] overflow-hidden group">
                    {/* Animated border effect */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/50 to-white/40 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-gradient-to-t from-transparent via-liquid-yellow to-transparent"></div>
                    </div>

                    {/* Featured badge */}
                    {pack.featured && (
                      <div className="absolute top-0 right-0 bg-liquid-yellow/80 text-liquid-navy text-xs font-bold py-1 px-3 rounded-bl-lg">
                        MAIS VENDIDO
                      </div>
                    )}

                    {/* Imagem do pacote */}
                    <div className="flex justify-center mb-4">
                      <img 
                        src={pack.imagePath} 
                        alt={pack.name} 
                        className="h-40 w-auto object-contain hover:scale-105 transition-transform"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3OTM1ZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAxOTQ1IiBzdG9wLW9wYWNpdHk9IjAuMDUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjUsMzAgTDUwLDcwIEw3NSwzMCIvPjwvc3ZnPg==';
                        }}
                      />
                    </div>

                    {/* Card content */}
                    <div className="flex flex-col gap-4">
                      {/* Title section */}
                      <div className="flex flex-col text-center">
                        <h3 className="text-lg font-bold text-white">{pack.name}</h3>
                        <p className="text-sm text-gray-400">{pack.description}</p>
                      </div>

                      <hr className="border-gray-700/50" />

                      {/* Features list */}
                      <ul className="flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-4 h-4 bg-liquid-yellow rounded-full">
                            <svg className="w-2.5 h-2.5 text-liquid-navy" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                            </svg>
                          </span>
                          <span className="text-sm text-gray-300">{pack.credits} Créditos Base</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-4 h-4 bg-liquid-yellow rounded-full">
                            <svg className="w-2.5 h-2.5 text-liquid-navy" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                            </svg>
                          </span>
                          <span className="text-sm text-gray-300">+{pack.bonus} Créditos Bônus</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-4 h-4 bg-liquid-yellow rounded-full">
                            <svg className="w-2.5 h-2.5 text-liquid-navy" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                            </svg>
                          </span>
                          <span className="text-sm text-gray-300">Entrega Instantânea</span>
                        </li>
                      </ul>

                      {/* Price and CTA */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            {pack.originalPrice && (
                              <span className="text-gray-400 line-through text-sm">{pack.originalPrice}</span>
                            )}
                            <p className="text-xl font-bold text-white">{pack.price}</p>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-liquid-yellow to-yellow-600 text-liquid-navy font-bold py-2 rounded-lg hover:shadow-lg hover:shadow-liquid-yellow/20 transition-all">
                          Comprar Agora
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Scroll indicators */}
            <div className="absolute left-0 bottom-0 w-full h-1 bg-liquid-yellow/10 rounded-full">
              <div className="h-full w-1/3 bg-gradient-to-r from-liquid-yellow to-yellow-600 rounded-full"></div>
            </div>
          </div>
        </section>



        {/* Seção de Fan Stories */}
        <div className="w-full mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-liquid-teal to-liquid-blue">Transformando a Experiência no Melhor R6 do Brasil</h2>
            <p className="text-gray-300 mt-5 mb-4">Sempre buscamos melhorar nossos serviços com base no seu feedback para garantir que você obtenha o máximo de nossos serviços.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Review 1 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-liquid-teal/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-liquid-teal/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Lucas P.</h4>
                  <p className="text-liquid-teal text-xs">Perfeita</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                Treinamento de extrema qualidade! Até me surpreendi. Vale lembrar que se você usar o coaching personalizado vai demorar um pouco para agendar.
              </p>

              <div className="mt-2 pt-2 border-t border-liquid-teal/20 text-xs text-gray-400 truncate">
                TACTICAL TRAINING PRO
              </div>
            </div>

            {/* Review 2 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-liquid-blue/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-liquid-blue/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Lana B.</h4>
                  <p className="text-liquid-blue text-xs">LINDO</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                Minha namorada me deu e eu amei! Ele é muito bem feito. O boost foi rápido e os jogadores são realmente profissionais, subi 3 ranks em 2 dias.
              </p>

              <div className="mt-2 pt-2 border-t border-liquid-blue/20 text-xs text-gray-400 truncate">
                TEAM LIQUID BLUE BOOST PACKAGE
              </div>
            </div>

            {/* Review 3 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-liquid-yellow/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-liquid-yellow/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Luiz C.</h4>
                  <p className="text-liquid-yellow text-xs">Amazing!</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                I love it! Always dreamt of buying it. Finally did that, and I want more jerseys! A qualidade é excepcional e o design é perfeito!
              </p>

              <div className="mt-2 pt-2 border-t border-liquid-yellow/20 text-xs text-gray-400 truncate">
                TEAM LIQUID 2023 CHAMPIONSHIP JERSEY
              </div>
            </div>

            {/* Review 4 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-red-400/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-red-400/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Guilherme R.</h4>
                  <p className="text-red-400 text-xs">Surreal</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                De longe a camisa mais bonita e bem feita que já comprei. Qualidade da estampa e tecido são diferenciais.
              </p>

              <div className="mt-2 pt-2 border-t border-red-400/20 text-xs text-gray-400 truncate">
                DEATH NOTE RYUK TEE
              </div>
            </div>

            {/* Review 5 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-purple-400/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-purple-400/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Fernanda M.</h4>
                  <p className="text-purple-400 text-xs">Incrível</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                O tecido é o mais gostoso entre todas as camisas da Liquid. E a camisa tem um conforto incrível.
              </p>

              <div className="mt-2 pt-2 border-t border-purple-400/20 text-xs text-gray-400 truncate">
                DEATH NOTE NOTEBOOK TEE
              </div>
            </div>

            {/* Review 6 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-green-400/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-green-400/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Nathália</h4>
                  <p className="text-green-400 text-xs">Perfeito!</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                Esse moletom é lindo demais, além de ser muito confortável e com uma qualidade absurda!
              </p>

              <div className="mt-2 pt-2 border-t border-green-400/20 text-xs text-gray-400 truncate">
                LQD_V3 INSIDE OUT HOODIE
              </div>
            </div>

            {/* Review 7 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-liquid-teal/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-liquid-teal/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Isaque L.</h4>
                  <p className="text-liquid-teal text-xs">Duo top</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                Essa camisa é muito bonita e eu gostei muito do tecido e agora vou poder assistir e torcer com minha duo.
              </p>

              <div className="mt-2 pt-2 border-t border-liquid-teal/20 text-xs text-gray-400 truncate">
                2023 TEAM LIQUID JERSEY
              </div>
            </div>

            {/* Review 8 - Versão compacta */}
            <div className="bg-gradient-to-br from-liquid-navy/80 to-black/80 border border-liquid-blue/30 p-3 rounded-lg relative overflow-hidden hover:shadow-md hover:shadow-liquid-blue/20 transition-all">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Rafael W.</h4>
                  <p className="text-liquid-blue text-xs">Love it</p>
                </div>
                <div className="flex text-liquid-yellow my-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3">
                I love it. O boost foi super rápido e profissional, fui do Gold para Platinum em tempo recorde!
              </p>

              <div className="mt-2 pt-2 border-t border-liquid-blue/20 text-xs text-gray-400 truncate">
                ELO BOOST GOLD TO PLAT
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="px-6 py-2 bg-transparent border border-liquid-teal/50 text-liquid-teal font-medium rounded-md hover:bg-liquid-teal/10 transition-all transform hover:scale-105">
              Ver Mais Avaliações
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-liquid-navy/95 to-black/90 border border-liquid-teal/40 text-white p-8 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src="/images/banners/r6-team.jpg"
                alt="Rainbow Six Team"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-liquid-teal/5 filter blur-xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-liquid-blue/5 filter blur-xl"></div>

            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-liquid-teal/20 to-transparent rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-liquid-blue/20 to-transparent rounded-tr-3xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Deseja anunciar sua conta do Rainbow Six?</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Junte-se à maior comunidade do Brasil e aproveite para trocar, anunciar e comprar contas em nossa plataforma com segurança e confiança.
              </p>

              <button className="px-8 py-3 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-bold rounded-md shadow-lg shadow-liquid-teal/20 hover:shadow-liquid-teal/40 transition-all transform hover:-translate-y-1">
                Anunciar conta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notificações adicionais animadas */}
      <div className="relative w-full mt-8">
        <div className="flex items-center justify-center">
          <div className="relative px-6 py-2 bg-liquid-navy/70 border border-liquid-teal/30 rounded-lg z-10">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-liquid-teal/0 via-liquid-teal/30 to-liquid-teal/0 opacity-30"
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 2s infinite'
                }}></div>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-liquid-teal animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-white text-sm">Todos os serviços incluem suporte prioritário 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalhes da conta */}
      {isModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-gradient-to-b from-gray-900 to-black border border-liquid-blue/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Botão de fechar */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Imagem e informações */}
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-liquid-blue/30">
                    <img
                      src={selectedAccount.image}
                      alt={selectedAccount.title}
                      className="w-full h-auto object-contain bg-black/30 p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = selectedAccount.placeholderImage;
                      }}
                    />
                    
                    {/* Tags sobrepostas */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div
                        className={`bg-black/40 backdrop-blur-sm border border-liquid-blue/30 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-[0_0_10px_rgba(0,150,255,0.2)] flex items-center gap-1 bg-gradient-to-r ${selectedAccount.rankColor}`}
                      >
                        <img 
                          src={selectedAccount.rankIcon} 
                          alt={selectedAccount.rank}
                          className="w-5 h-5 mr-1"
                        />
                        {selectedAccount.rank}
                      </div>
                      
                      {selectedAccount.badgeText && (
                        <div
                          className={`${selectedAccount.badgeColor} px-3 py-1 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(0,150,255,0.2)]`}
                        >
                          {selectedAccount.badgeText}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAccount.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 rounded-md ${tag.color} text-white shadow-[0_0_5px_rgba(0,150,255,0.1)]`}
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Detalhes e compra */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedAccount.title}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-liquid-teal to-liquid-blue">
                        {selectedAccount.price}
                      </div>
                      {selectedAccount.originalPrice && (
                        <div className="text-gray-400 text-sm line-through">{selectedAccount.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  
                  <hr className="border-gray-700/50" />
                  
                  {/* Descrição da conta */}
                  {selectedAccount.description && (
                    <div>
                      <h3 className="text-white font-bold mb-2">Descrição</h3>
                      <p className="text-gray-300 text-sm">{selectedAccount.description}</p>
                    </div>
                  )}
                  
                  <hr className="border-gray-700/50" />
                  
                  <div>
                    <h3 className="text-white font-bold mb-2">Detalhes da Conta</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <span className="w-4 h-4 bg-liquid-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-liquid-blue rounded-full"></span>
                        </span>
                        {selectedAccount.operators}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <span className="w-4 h-4 bg-liquid-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-liquid-blue rounded-full"></span>
                        </span>
                        {selectedAccount.skins}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <span className="w-4 h-4 bg-liquid-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-liquid-blue rounded-full"></span>
                        </span>
                        {selectedAccount.stats}
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-gray-700/50" />
                  
                  {/* Botões de ação */}
                  <div className="space-y-3">
                    <button 
                      onClick={handleExplorarCatalogo} 
                      className="w-full py-3 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-bold rounded-lg shadow-lg shadow-liquid-blue/20 hover:shadow-liquid-blue/40 transition-all transform hover:-translate-y-1"
                    >
                      Comprar Agora
                    </button>
                    <button className="w-full py-3 bg-transparent border border-liquid-teal/50 text-liquid-teal font-bold rounded-lg hover:bg-liquid-teal/10 transition-all">
                      Adicionar ao Carrinho
                    </button>
                    <button 
                      onClick={handleExplorarCatalogo}
                      className="w-full py-3 bg-black/30 text-white border border-white/10 rounded-lg hover:bg-black/50 transition-all flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8L3 12L7 16M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Ver Mais Contas no Catálogo
                    </button>
                  </div>
                  
                  {/* Informações de garantia */}
                  <div className="bg-black/20 border border-liquid-blue/20 rounded-lg p-4">
                    <div className="flex items-center text-liquid-teal mb-2">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-bold">Garantia de 30 dias</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Todas as contas têm garantia de 30 dias. Se houver qualquer problema, 
                      faremos a substituição ou devolução do seu dinheiro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHero;