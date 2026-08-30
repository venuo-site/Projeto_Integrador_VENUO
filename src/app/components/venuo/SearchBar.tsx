import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, X, Filter } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useNavigate, useLocation } from 'react-router';

export function SearchBar() {
  const { colors } = useTheme();
  const { searchValue, setSearchValue } = useSearch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleClear = () => {
    setSearchValue('');
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleCategoryFilter = (category: string) => {
    navigate(`/buscar?categoria=${encodeURIComponent(category)}`);
    setIsExpanded(false);
  };

  return (
    <div id="search-bar" className="w-full">
      <motion.div
          whileHover={{ scale: 1.01 }}
          animate={{
            scale: isScrolling ? 1.02 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative rounded-lg backdrop-blur-xl shadow-md h-[56px] px-4 flex items-center gap-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: colors.theme === 'light'
              ? `0 4px 12px ${colors.orange}20`
              : `0 4px 12px ${colors.orange}15`,
          }}
        >
          {/* Ícone de Busca */}
          <Search
            size={20}
            strokeWidth={2}
            className="flex-shrink-0"
            style={{
              color: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.5)'
            }}
          />

          {/* Input de Busca */}
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Buscar eventos, bares, restaurantes..."
              className="flex-1 bg-transparent border-none outline-none font-semibold"
              style={{
                color: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
              }}
            />
            <style>{`
              input::placeholder {
                color: ${colors.theme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.7)'};
                opacity: 1;
                font-weight: 600;
              }
            `}</style>
            {searchValue && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleClear}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
                style={{
                  backgroundColor: colors.theme === 'light' ? `${colors.orange}30` : `${colors.orange}20`,
                  color: colors.orange,
                }}
              >
                <X size={12} strokeWidth={2.5} />
              </motion.button>
            )}
          </form>

          {/* Botão de Localização */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 rounded-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap h-[48px]"
            style={{
              backgroundColor: colors.orange,
              color: colors.white,
              fontSize: '14px',
            }}
          >
            <MapPin size={18} strokeWidth={2.5} />
            <span className="hidden md:inline">Perto de mim</span>
          </motion.button>

          {/* Botão de Filtros */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-[48px] h-[48px] rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: isExpanded ? colors.orange : (colors.theme === 'light' ? `${colors.orange}20` : `${colors.orange}15`),
              color: '#FFFFFF',
            }}
          >
            <Filter size={18} strokeWidth={2.5} />
          </motion.button>

          {/* Filtros Expandidos */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-lg backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 37, 64, 0.98)',
                }}
              >
                <div className="p-4">
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: '🎵 Eventos', value: 'eventos' },
                      { label: '🍸 Bares', value: 'bares' },
                      { label: '🍽️ Restaurantes', value: 'restaurantes' },
                      { label: '🎉 Festas', value: 'eventos' },
                      { label: '☕ Cafés', value: 'lazer' },
                      { label: '🎭 Shows', value: 'eventos' },
                      { label: '🎨 Cultura', value: 'lazer' },
                      { label: '⚽ Esportes', value: 'lazer' },
                    ].map((filter) => (
                      <motion.button
                        key={filter.label}
                        onClick={() => handleCategoryFilter(filter.value)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all shadow-md"
                        style={{
                          backgroundColor: colors.theme === 'light' ? colors.white : `${colors.cyan}15`,
                          borderColor: colors.theme === 'light' ? colors.cyan : `${colors.cyan}50`,
                          color: colors.blueLight,
                          boxShadow: colors.theme === 'light' ? `0 4px 12px ${colors.cyan}30` : 'none',
                        }}
                      >
                        {filter.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
    </div>
  );
}