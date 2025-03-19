import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface AccountData {
  id: number;
  rank: string;
  rankColor: string;
  rankIcon: string;
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
  description: string;
  tags: {
    text: string;
    color: string;
  }[];
  featured?: boolean;
  level: number;
  platform: 'ps' | 'xbox' | 'pc' | 'all';
  region: 'na' | 'eu' | 'as' | 'sa' | 'global';
  createdAt: string;
}

const AccountCatalog: React.FC = () => {
  // Estados para filtragem e ordenação
  const [searchTerm, setSearchTerm] = useState('');
  const [rankFilter, setRankFilter] = useState<string[]>([]);
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnunciarModalOpen, setIsAnunciarModalOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    title: '',
    rank: 'DIAMANTE',
    platform: 'pc',
    region: 'na',
    price: '',
    operators: '',
    skins: '',
    stats: '',
    description: '',
    level: 100,
  });
  
  const accountsPerPage = 12;
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const anunciarModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Dados das contas (simulando um banco de dados)
  const accounts: AccountData[] = [
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
      featured: true,
      level: 246,
      platform: "pc",
      region: "na",
      createdAt: "2023-08-15"
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
      featured: true,
      level: 378,
      platform: "pc",
      region: "eu",
      createdAt: "2023-09-22"
    },
    {
      id: 3,
      rank: "OURO",
      rankColor: "from-yellow-400 to-amber-500",
      rankIcon: "/images/accounts/rankicons/Gold 3.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Blitz.png",
      placeholderImage: "https://placehold.co/600x400/001a45/ffb700?text=Conta+Ouro",
      title: "Gold Account",
      price: "R$ 189,90",
      operators: "Operadores: 32/46 desbloqueados",
      skins: "8 skins raras",
      stats: "K/D: 1.2 | W/L: 55%",
      description: "Conta com progressão sólida e estatísticas estáveis. Bom custo-benefício para jogadores intermediários.",
      tags: [
        { text: "Battlepass", color: "bg-blue-500/20 text-blue-400" },
        { text: "Starter", color: "bg-green-500/20 text-green-400" },
      ],
      featured: false,
      level: 143,
      platform: "ps",
      region: "eu",
      createdAt: "2023-11-05"
    },
    {
      id: 4,
      rank: "PLATINA",
      rankColor: "from-teal-400 to-blue-500",
      rankIcon: "/images/accounts/rankicons/Platinum 2.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Doc.png",
      placeholderImage: "https://placehold.co/600x400/001a45/7fffd4?text=Conta+Platina",
      title: "Platinum Legacy",
      price: "R$ 299,90",
      operators: "Operadores: 38/46 desbloqueados",
      skins: "22 skins raras",
      stats: "K/D: 1.5 | W/L: 61%",
      description: "Conta completa para jogadores experientes com diversos cosméticos e estatísticas competitivas.",
      tags: [
        { text: "Twitch Drops", color: "bg-purple-500/20 text-purple-400" },
        { text: "Year 1 Pass", color: "bg-blue-500/20 text-blue-400" },
      ],
      featured: false,
      level: 210,
      platform: "xbox",
      region: "na",
      createdAt: "2023-10-18"
    },
    {
      id: 5,
      rank: "PRATA",
      rankColor: "from-gray-400 to-slate-500",
      rankIcon: "/images/accounts/rankicons/Silver 1.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Oryx.png",
      placeholderImage: "https://placehold.co/600x400/001a45/c0c0c0?text=Conta+Prata",
      title: "Silver Starter",
      price: "R$ 99,90",
      operators: "Operadores: 25/46 desbloqueados",
      skins: "4 skins padrão",
      stats: "K/D: 1.0 | W/L: 50%",
      description: "Conta inicial ideal para novos jogadores. Uma excelente introdução ao jogo com alguns operadores desbloqueados.",
      tags: [
        { text: "Beginner", color: "bg-green-500/20 text-green-400" },
        { text: "Budget", color: "bg-blue-500/20 text-blue-400" },
      ],
      featured: false,
      level: 78,
      platform: "pc",
      region: "as",
      createdAt: "2023-12-01"
    },
    {
      id: 6,
      rank: "NÃO RANQUEADO",
      rankColor: "from-gray-500 to-slate-700",
      rankIcon: "/images/accounts/rankicons/Unranked.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Iana.png",
      placeholderImage: "https://placehold.co/600x400/001a45/808080?text=Conta+Não+Ranqueada",
      title: "Conta Novata",
      price: "R$ 59,90",
      operators: "Operadores: 15/46 desbloqueados",
      skins: "2 skins básicas",
      stats: "K/D: 0.8 | W/L: 45%",
      description: "Conta para iniciantes que querem experimentar o jogo sem compromisso. Poucos operadores mas suficientes para começar.",
      tags: [
        { text: "Novato", color: "bg-green-500/20 text-green-400" },
      ],
      featured: false,
      level: 32,
      platform: "pc",
      region: "sa",
      createdAt: "2023-12-20"
    },
    {
      id: 7,
      rank: "BRONZE",
      rankColor: "from-amber-700 to-yellow-800",
      rankIcon: "/images/accounts/rankicons/Bronze 1.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Zofia.png",
      placeholderImage: "https://placehold.co/600x400/001a45/cd7f32?text=Conta+Bronze",
      title: "Bronze Operator",
      price: "R$ 79,90",
      operators: "Operadores: 20/46 desbloqueados",
      skins: "3 skins comuns",
      stats: "K/D: 0.9 | W/L: 48%",
      description: "Conta com potencial para melhorar. Bom equilíbrio entre preço e conteúdo para jogadores em desenvolvimento.",
      tags: [
        { text: "Econômica", color: "bg-blue-500/20 text-blue-400" },
        { text: "Casual", color: "bg-green-500/20 text-green-400" },
      ],
      featured: false,
      level: 62,
      platform: "xbox",
      region: "sa",
      createdAt: "2023-11-30"
    },
    {
      id: 8,
      rank: "ESMERALDA",
      rankColor: "from-emerald-500 to-green-700",
      rankIcon: "/images/accounts/rankicons/Emerald 2.png",
      image: "/images/accounts/Y5S4_STADIUM2_CARD_Kaid.png",
      placeholderImage: "https://placehold.co/600x400/001a45/50c878?text=Conta+Esmeralda",
      title: "Emerald Tactician",
      price: "R$ 249,90",
      operators: "Operadores: 35/46 desbloqueados",
      skins: "18 skins raras",
      stats: "K/D: 1.4 | W/L: 58%",
      description: "Conta de nível intermediário-avançado com bom equilíbrio entre operadores, skins e estatísticas.",
      tags: [
        { text: "Seasonal", color: "bg-purple-500/20 text-purple-400" },
        { text: "Event", color: "bg-red-500/20 text-red-400" },
      ],
      featured: false,
      level: 185,
      platform: "ps",
      region: "eu",
      createdAt: "2023-10-10"
    }
  ];

  // Calcular o número total de páginas e filtrar as contas
  const filteredAccounts = accounts.filter(account => {
    // Filtragem por termo de busca
    const matchesSearch = account.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         account.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtragem por rank
    const matchesRank = rankFilter.length === 0 || rankFilter.includes(account.rank.toLowerCase());
    
    // Filtragem por plataforma
    const matchesPlatform = platformFilter.length === 0 || 
                           platformFilter.includes(account.platform) || 
                           (account.platform === 'all' && platformFilter.length > 0);
    
    // Filtragem por região
    const matchesRegion = regionFilter.length === 0 || 
                         regionFilter.includes(account.region) || 
                         (account.region === 'global' && regionFilter.length > 0);
    
    // Filtragem por faixa de preço
    const price = parseFloat(account.price.replace(/[^\d,]/g, '').replace(',', '.'));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesRank && matchesPlatform && matchesRegion && matchesPrice;
  });

  // Ordenar contas
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    switch(sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'price-asc':
        return parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) - 
               parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.'));
      case 'price-desc':
        return parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) - 
               parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.'));
      case 'level-asc':
        return a.level - b.level;
      case 'level-desc':
        return b.level - a.level;
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedAccounts.length / accountsPerPage);
  const currentAccounts = sortedAccounts.slice(
    (currentPage - 1) * accountsPerPage,
    currentPage * accountsPerPage
  );

  // Gerenciar o clique fora do painel de filtros para fechar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Gerenciar o clique fora do modal para fechar
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

  // Gerenciar o clique fora do modal de anúncio para fechar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anunciarModalRef.current && !anunciarModalRef.current.contains(event.target as Node)) {
        setIsAnunciarModalOpen(false);
      }
    };

    if (isAnunciarModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAnunciarModalOpen]);

  // Manipuladores de estado
  const handleRankFilter = (rank: string) => {
    setRankFilter(prev => 
      prev.includes(rank) 
        ? prev.filter(r => r !== rank) 
        : [...prev, rank]
    );
  };

  const handlePlatformFilter = (platform: string) => {
    setPlatformFilter(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleRegionFilter = (region: string) => {
    setRegionFilter(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(event.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRankFilter([]);
    setPlatformFilter([]);
    setRegionFilter([]);
    setPriceRange([0, 1000]);
    setSortBy('featured');
  };

  const handleAccountClick = (account: AccountData) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  // Função para lidar com as mudanças nos campos do formulário
  const handleAnuncioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para enviar o anúncio
  const handleSubmitAnuncio = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para enviar os dados para seu backend
    alert("Anúncio enviado com sucesso! Aguarde a aprovação da nossa equipe.");
    setIsAnunciarModalOpen(false);
    setNewAccountData({
      title: '',
      rank: 'DIAMANTE',
      platform: 'pc',
      region: 'na',
      price: '',
      operators: '',
      skins: '',
      stats: '',
      description: '',
      level: 100,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-liquid-navy to-black">
      {/* Header com barra de pesquisa e filtros */}
      <header className="bg-black/60 backdrop-blur-lg sticky top-0 z-30 border-b border-liquid-teal/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate('/')}
                className="text-liquid-teal hover:text-liquid-teal/80 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-white">Catálogo de Contas</h1>
            </div>

            {/* Botão de Anunciar Conta */}
            <button
              onClick={() => setIsAnunciarModalOpen(true)}
              className="lg:absolute lg:right-4 lg:top-4 px-4 py-2 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-medium rounded-md shadow-lg shadow-liquid-teal/20 hover:shadow-liquid-teal/40 transition-all transform hover:-translate-y-1 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Anunciar Conta
            </button>

            <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-4">
              {/* Barra de pesquisa */}
              <div className="relative w-full lg:w-64">
                <input
                  type="text"
                  placeholder="Pesquisar contas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-400"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Dropdown de ordenação */}
              <div className="relative w-full lg:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full lg:w-auto bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50"
                >
                  <option value="featured">Destaque</option>
                  <option value="price-asc">Preço (menor primeiro)</option>
                  <option value="price-desc">Preço (maior primeiro)</option>
                  <option value="level-asc">Nível (menor primeiro)</option>
                  <option value="level-desc">Nível (maior primeiro)</option>
                  <option value="date-asc">Mais antigos</option>
                  <option value="date-desc">Mais recentes</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Botão de filtro */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isFilterOpen 
                    ? 'bg-liquid-teal text-black' 
                    : 'bg-black/30 border border-liquid-blue/30 text-white hover:bg-black/50'} transition-all`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4H21M3 12H21M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Filtros</span>
                  {(rankFilter.length > 0 || platformFilter.length > 0 || regionFilter.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <span className="flex items-center justify-center w-5 h-5 bg-liquid-yellow text-black rounded-full text-xs font-bold">
                      {rankFilter.length + platformFilter.length + regionFilter.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Painel de filtros */}
                {isFilterOpen && (
                  <div 
                    ref={filterPanelRef}
                    className="absolute right-0 mt-2 w-80 bg-black/80 backdrop-blur-lg border border-liquid-blue/30 rounded-lg shadow-xl z-40 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold">Filtros</h3>
                        <button 
                          onClick={clearFilters}
                          className="text-xs text-liquid-teal hover:text-liquid-blue transition-colors"
                        >
                          Limpar filtros
                        </button>
                      </div>

                      {/* Filtro por rank */}
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2 text-sm">Rank</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {['campeão', 'diamante', 'platina', 'ouro', 'prata', 'bronze'].map(rank => (
                            <button
                              key={rank}
                              onClick={() => handleRankFilter(rank)}
                              className={`px-3 py-1.5 text-xs rounded-md ${
                                rankFilter.includes(rank)
                                  ? 'bg-liquid-teal/20 border border-liquid-teal text-liquid-teal'
                                  : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'
                              } transition-all`}
                            >
                              {rank.charAt(0).toUpperCase() + rank.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filtro por plataforma */}
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2 text-sm">Plataforma</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: 'pc', label: 'PC' },
                            { id: 'ps', label: 'PlayStation' },
                            { id: 'xbox', label: 'Xbox' },
                          ].map(platform => (
                            <button
                              key={platform.id}
                              onClick={() => handlePlatformFilter(platform.id)}
                              className={`px-3 py-1.5 text-xs rounded-md ${
                                platformFilter.includes(platform.id)
                                  ? 'bg-liquid-blue/20 border border-liquid-blue text-liquid-blue'
                                  : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'
                              } transition-all`}
                            >
                              {platform.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filtro por região */}
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2 text-sm">Região</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'na', label: 'América do Norte' },
                            { id: 'sa', label: 'América do Sul' },
                            { id: 'eu', label: 'Europa' },
                            { id: 'as', label: 'Ásia' },
                          ].map(region => (
                            <button
                              key={region.id}
                              onClick={() => handleRegionFilter(region.id)}
                              className={`px-3 py-1.5 text-xs rounded-md ${
                                regionFilter.includes(region.id)
                                  ? 'bg-liquid-yellow/20 border border-liquid-yellow text-liquid-yellow'
                                  : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'
                              } transition-all`}
                            >
                              {region.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filtro por faixa de preço */}
                      <div className="mb-2">
                        <h4 className="text-white font-semibold mb-2 text-sm">Faixa de Preço</h4>
                        <div className="px-2">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400 text-xs">R$ {priceRange[0]}</span>
                            <span className="text-gray-400 text-xs">R$ {priceRange[1]}</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={1000}
                            step={50}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceRangeChange(e, 0)}
                            className="w-full accent-liquid-teal"
                          />
                          <input
                            type="range"
                            min={0}
                            max={1000}
                            step={50}
                            value={priceRange[1]}
                            onChange={(e) => handlePriceRangeChange(e, 1)}
                            className="w-full accent-liquid-teal"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Alternador de modo de visualização */}
              <div className="flex bg-black/30 border border-liquid-blue/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-liquid-blue text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 5C14 4.44772 14.4477 4 15 4H19C19.5523 4 20 4.44772 20 5V9C20 9.55228 19.5523 10 19 10H15C14.4477 10 14 9.55228 14 9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 15C4 14.4477 4.44772 14 5 14H9C9.55228 14 10 14.4477 10 15V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 15C14 14.4477 14.4477 14 15 14H19C19.5523 14 20 14.4477 20 15V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-liquid-blue text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Resultados da busca e contador */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-white font-bold text-xl">Contas Disponíveis</h2>
            <p className="text-gray-400 text-sm">
              Mostrando {currentAccounts.length} de {filteredAccounts.length} contas
            </p>
          </div>
          {(rankFilter.length > 0 || platformFilter.length > 0 || regionFilter.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <button
              onClick={clearFilters}
              className="mt-2 sm:mt-0 flex items-center gap-1 text-xs text-liquid-teal hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Limpar filtros
            </button>
          )}
        </div>

        {/* Grid de contas */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentAccounts.map(account => (
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

                {/* Tag Rank com design */}
                <div
                  className={`absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-[0_0_10px_rgba(0,150,255,0.2)] z-20 flex items-center gap-1 bg-gradient-to-r ${account.rankColor}`}
                >
                  <img
                    src={account.rankIcon}
                    alt={account.rank}
                    className="w-5 h-5 mr-1"
                  />
                  {account.rank}
                </div>

                {/* Tag de tipo de conta */}
                {account.badgeText && (
                  <div
                    className={`absolute top-3 right-3 ${account.badgeColor} px-3 py-1 rounded-lg text-xs font-bold z-20 shadow-[0_0_10px_rgba(0,150,255,0.2)]`}
                  ></div>
                )}

                {/* Imagem da conta */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={account.image}
                    alt={account.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = account.placeholderImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Info da conta */}
                <div className="p-4 relative z-10">
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {account.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 rounded-md ${tag.color} text-white shadow-[0_0_5px_rgba(0,150,255,0.1)]`}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>

                  {/* Indicadores de nível e plataforma */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <div className="flex items-center">
                      <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 16.5L18 7.5M12 19L12 5M6 16.5L6 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Nível: {account.level}
                    </div>
                    <div className="flex items-center">
                      {account.platform === 'pc' && (
                        <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 16.5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V16.5M12 3V16.5M12 3L17 7.5M12 3L7 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {account.platform === 'ps' && (
                        <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 12H17.5M12 6.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {account.platform === 'xbox' && (
                        <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {account.platform === 'all' && (
                        <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {account.platform.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Visualização em lista
          <div className="space-y-4">
            {currentAccounts.map(account => (
              <div
                key={account.id}
                onClick={() => handleAccountClick(account)}
                className="backdrop-blur-sm border border-liquid-blue/40 rounded-lg overflow-hidden relative group transition-all duration-300 hover:bg-black/40 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Imagem e rank (lado esquerdo) */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto">
                    <img
                      src={account.image}
                      alt={account.title}
                      className="w-full h-full object-contain bg-black/40"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = account.placeholderImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-t md:from-black/70 md:to-transparent"></div>
                    
                    {/* Tag Rank */}
                    <div
                      className={`absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-[0_0_10px_rgba(0,150,255,0.2)] z-20 flex items-center gap-1 bg-gradient-to-r ${account.rankColor}`}
                    >
                      <img
                        src={account.rankIcon}
                        alt={account.rank}
                        className="w-5 h-5 mr-1"
                      />
                      {account.rank}
                    </div>
                    
                    {/* Tag de tipo de conta */}
                    {account.badgeText && (
                      <div
                        className={`absolute top-3 right-3 ${account.badgeColor} px-3 py-1 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(0,150,255,0.2)]`}
                      >
                        {account.badgeText}
                      </div>
                    )}
                  </div>
                  
                  {/* Informações da conta (lado direito) */}
                  <div className="p-4 flex-1">
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
                    
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{account.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
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
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {account.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-liquid-blue/30 rounded-md ${tag.color} text-white shadow-[0_0_5px_rgba(0,150,255,0.1)]`}
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 16.5L18 7.5M12 19L12 5M6 16.5L6 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Nível: {account.level}
                        </div>
                        <div className="flex items-center">
                          {account.platform === 'pc' && (
                            <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 16.5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V16.5M12 3V16.5M12 3L17 7.5M12 3L7 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {account.platform === 'ps' && (
                            <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 12H17.5M12 6.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {account.platform === 'xbox' && (
                            <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {account.platform === 'all' && (
                            <svg className="w-3.5 h-3.5 mr-1 text-liquid-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {account.platform.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Atualizado em {new Date(account.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => (prev === 1 ? totalPages : prev - 1))}
                className="bg-black/30 border border-liquid-blue/30 text-white rounded-lg p-2 hover:bg-black/50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    currentPage === i + 1
                      ? 'bg-liquid-blue text-white'
                      : 'bg-black/30 border border-liquid-blue/30 text-white hover:bg-black/50'
                  } transition-colors`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => (prev === totalPages ? 1 : prev + 1))}
                className="bg-black/30 border border-liquid-blue/30 text-white rounded-lg p-2 hover:bg-black/50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal de detalhes da conta */}
      {selectedAccount && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setSelectedAccount(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedAccount(null)}></div>
          
          <div 
            className="bg-dark-blue-950 border border-liquid-blue/20 rounded-xl overflow-hidden shadow-lg z-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="relative">
              <img 
                src={selectedAccount.image} 
                alt={selectedAccount.title} 
                className="w-full h-[300px] object-contain bg-gradient-to-b from-dark-blue-900 to-dark-blue-950"
              />
              
              <div className="absolute top-0 left-0 p-4 flex flex-col gap-2">
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
              
              <button 
                className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={() => setSelectedAccount(null)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Imagem e informações */}
                <div className="space-y-4">
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
                    
                    {/* Estatísticas em grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/30 border border-liquid-blue/20 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">Nível da Conta</div>
                        <div className="text-white font-bold">{selectedAccount.level}</div>
                      </div>
                      <div className="bg-black/30 border border-liquid-blue/20 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">Plataforma</div>
                        <div className="text-white font-bold">{selectedAccount.platform.toUpperCase()}</div>
                      </div>
                      <div className="bg-black/30 border border-liquid-blue/20 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">Região</div>
                        <div className="text-white font-bold">
                          {selectedAccount.region === 'na' && 'América do Norte'}
                          {selectedAccount.region === 'sa' && 'América do Sul'}
                          {selectedAccount.region === 'eu' && 'Europa'}
                          {selectedAccount.region === 'as' && 'Ásia'}
                          {selectedAccount.region === 'global' && 'Global'}
                        </div>
                      </div>
                      <div className="bg-black/30 border border-liquid-blue/20 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">Data de Adição</div>
                        <div className="text-white font-bold">{new Date(selectedAccount.createdAt).toLocaleDateString()}</div>
                      </div>
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
                  
                  <div>
                    <h3 className="text-white font-bold mb-2">Descrição</h3>
                    <p className="text-gray-300">{selectedAccount.description}</p>
                  </div>
                  
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
                    <button className="w-full py-3 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-bold rounded-lg shadow-lg shadow-liquid-blue/20 hover:shadow-liquid-blue/40 transition-all transform hover:-translate-y-1">
                      Comprar Agora
                    </button>
                    <button className="w-full py-3 bg-transparent border border-liquid-teal/50 text-liquid-teal font-bold rounded-lg hover:bg-liquid-teal/10 transition-all">
                      Adicionar ao Carrinho
                    </button>
                    <button className="w-full py-3 bg-black/30 text-white border border-white/10 rounded-lg hover:bg-black/50 transition-all flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8L3 12L7 16M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Ver Mais Detalhes
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

      {/* Modal de anunciar conta */}
      {isAnunciarModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            ref={anunciarModalRef}
            className="bg-gradient-to-b from-gray-900 to-black border border-liquid-blue/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Cabeçalho do modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Anunciar Nova Conta</h2>
                <button
                  onClick={() => setIsAnunciarModalOpen(false)}
                  className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              
              {/* Formulário de anúncio */}
              <form onSubmit={handleSubmitAnuncio} className="space-y-6">
                {/* Informações básicas */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-white font-medium mb-2">Título da Conta</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newAccountData.title}
                      onChange={handleAnuncioChange}
                      required
                      placeholder="Ex: Conta Diamante com Skins Raras"
                      className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rank" className="block text-white font-medium mb-2">Rank</label>
                      <select
                        id="rank"
                        name="rank"
                        value={newAccountData.rank}
                        onChange={handleAnuncioChange}
                        required
                        className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50"
                      >
                        <option value="CAMPEÃO">Campeão</option>
                        <option value="DIAMANTE">Diamante</option>
                        <option value="PLATINA">Platina</option>
                        <option value="OURO">Ouro</option>
                        <option value="PRATA">Prata</option>
                        <option value="BRONZE">Bronze</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="level" className="block text-white font-medium mb-2">Nível da Conta</label>
                      <input
                        type="number"
                        id="level"
                        name="level"
                        value={newAccountData.level}
                        onChange={handleAnuncioChange}
                        min="1"
                        max="500"
                        required
                        className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="platform" className="block text-white font-medium mb-2">Plataforma</label>
                      <select
                        id="platform"
                        name="platform"
                        value={newAccountData.platform}
                        onChange={handleAnuncioChange}
                        required
                        className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50"
                      >
                        <option value="pc">PC</option>
                        <option value="ps">PlayStation</option>
                        <option value="xbox">Xbox</option>
                        <option value="all">Todas Plataformas</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="region" className="block text-white font-medium mb-2">Região</label>
                      <select
                        id="region"
                        name="region"
                        value={newAccountData.region}
                        onChange={handleAnuncioChange}
                        required
                        className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50"
                      >
                        <option value="na">América do Norte</option>
                        <option value="sa">América do Sul</option>
                        <option value="eu">Europa</option>
                        <option value="as">Ásia</option>
                        <option value="global">Global</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-white font-medium mb-2">Preço (R$)</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={newAccountData.price}
                      onChange={handleAnuncioChange}
                      required
                      placeholder="Ex: 299,90"
                      className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-500"
                    />
                  </div>
                </div>
                
                {/* Detalhes da conta */}
                <div className="space-y-4">
                  <h3 className="text-white font-bold border-b border-gray-700 pb-2">Detalhes da Conta</h3>
                  
                  <div>
                    <label htmlFor="operators" className="block text-white font-medium mb-2">Operadores</label>
                    <input
                      type="text"
                      id="operators"
                      name="operators"
                      value={newAccountData.operators}
                      onChange={handleAnuncioChange}
                      required
                      placeholder="Ex: Operadores: 42/46 desbloqueados"
                      className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="skins" className="block text-white font-medium mb-2">Skins</label>
                    <input
                      type="text"
                      id="skins"
                      name="skins"
                      value={newAccountData.skins}
                      onChange={handleAnuncioChange}
                      required
                      placeholder="Ex: 36 skins Black Ice"
                      className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stats" className="block text-white font-medium mb-2">Estatísticas</label>
                    <input
                      type="text"
                      id="stats"
                      name="stats"
                      value={newAccountData.stats}
                      onChange={handleAnuncioChange}
                      required
                      placeholder="Ex: K/D: 1.8 | W/L: 64%"
                      className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-white font-medium mb-2">Descrição Detalhada</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newAccountData.description}
                      onChange={handleAnuncioChange}
                      required
                      rows={4}
                      placeholder="Descreva os detalhes da sua conta, incluindo itens raros, histórico, motivo da venda, etc."
                      className="w-full bg-black/30 border border-liquid-blue/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-liquid-blue/50 placeholder-gray-500"
                    />
                  </div>
                </div>
                
                {/* Upload de imagens */}
                <div className="space-y-4">
                  <h3 className="text-white font-bold border-b border-gray-700 pb-2">Imagens da Conta</h3>
                  
                  <div className="border-2 border-dashed border-liquid-blue/30 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-liquid-blue mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-white mb-2">Arraste e solte uma imagem ou</p>
                      <button type="button" className="px-4 py-2 bg-liquid-blue/20 text-liquid-blue border border-liquid-blue/40 rounded-md hover:bg-liquid-blue/30 transition-all">
                        Escolher Arquivo
                      </button>
                      <p className="text-gray-500 text-xs mt-2">PNG, JPG ou GIF (Máximo 5MB)</p>
                    </div>
                  </div>
                </div>
                
                {/* Termos e Condições */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="w-4 h-4 accent-liquid-blue"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-300">
                      Concordo com os <a href="#" className="text-liquid-blue hover:underline">Termos de Serviço</a> e <a href="#" className="text-liquid-blue hover:underline">Política de Privacidade</a>. Entendo que meu anúncio passará por revisão antes de ser publicado.
                    </label>
                  </div>
                </div>
                
                {/* Botões de ação */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-liquid-teal to-liquid-blue text-white font-bold rounded-lg shadow-lg shadow-liquid-blue/20 hover:shadow-liquid-blue/40 transition-all transform hover:-translate-y-1"
                  >
                    Enviar Anúncio
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAnunciarModalOpen(false)}
                    className="flex-1 py-3 bg-transparent border border-gray-600 text-gray-300 font-bold rounded-lg hover:bg-gray-800/50 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCatalog;
            
