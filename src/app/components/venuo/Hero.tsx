import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Mic, MapPin, Star } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router';

export function Hero() {
  const { colors, useGradientBg } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [openNow, setOpenNow] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate('/buscar');
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchTerm('Locais perto de mim');
          setShowSuggestions(false);
        },
        () => {
          // Silently fallback: use generic location search
          setSearchTerm('Locais próximos');
          setShowSuggestions(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setSearchTerm('Locais próximos');
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 2);
  };

  const suggestions = [
    { name: 'Bar do Léo', category: 'Bar', distance: '1.2km', highlight: 'Bar' },
    { name: 'Choperia Central', category: 'Bar', distance: '800m', highlight: 'Bar' },
    { name: 'Restaurante Villa Mix', category: 'Restaurante', distance: '2.5km', highlight: 'Restaurante' }
  ];

  const hasActiveFilters = selectedDistance || selectedPrice || openNow || minRating > 0;

  const clearFilters = () => {
    setSelectedDistance(null);
    setSelectedPrice(null);
    setOpenNow(false);
    setMinRating(0);
  };

  const distanceOptions = ['500m', '1km', '3km', '5km', '10km+'];
  const priceOptions = ['$', '$$', '$$$', '$$$$'];

  return (
    <section id="inicio" className="relative py-6 md:py-10">
      <div className="max-w-[900px] mx-auto px-5">
        <div className="flex flex-col items-center gap-8">
          {/* Headline & Subtitle */}
          <div className="flex flex-col items-center gap-3">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-bold leading-tight text-center"
              style={{
                fontSize: '72px',
              }}
            >
              <span style={{ color: '#F4622A' }}>Descubra.</span>{' '}
              <span style={{ color: colors.blueLight }}>Conecte.</span>{' '}
              <span style={{ color: colors.textPrimary }}>Viva.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
              style={{
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 400,
              }}
            >
              Encontre seu lazer ideal em segundos.
            </motion.p>
          </div>

          {/* Single Intelligent Search Bar */}
          <div className="relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full h-14 flex items-center gap-3 px-4 rounded-full transition-all"
              style={{
                backgroundColor: colors.bgTertiary,
                border: isFocused
                  ? `1px solid rgba(244, 98, 42, 0.4)`
                  : `1px solid ${colors.cardBorder}`,
                boxShadow: isFocused
                  ? '0 0 0 3px rgba(244, 98, 42, 0.1)'
                  : 'none',
              }}
            >
              {/* Filter Button */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/5 transition-colors relative"
                  aria-label="Abrir filtros"
                  title="Filtros (categorias, distância, avaliação)"
                >
                  <Plus size={24} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  {/* Active filter indicator */}
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.orange }}
                    />
                  )}
                </motion.button>
              </div>

              {/* Single Input Field */}
              <input
                type="text"
                placeholder="Para onde vamos hoje?"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-gray-500"
                style={{
                  color: '#FFFFFF',
                }}
              />

              {/* Right Icons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Mic Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Busca por voz"
                  title="Busca por voz"
                >
                  <Mic size={24} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                </motion.button>

                {/* GPS Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleGetLocation}
                  className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Usar minha localização"
                  title="Usar minha localização"
                >
                  <MapPin size={24} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                </motion.button>
              </div>
            </motion.div>

            {/* Filter Drawer */}
            <AnimatePresence>
              {showFilters && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-30"
                    onClick={() => setShowFilters(false)}
                  />

                  {/* Desktop Drawer */}
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-full md:w-96 rounded-2xl overflow-hidden z-40 hidden md:block"
                    style={{
                      backgroundColor: colors.bgTertiary,
                      border: `1px solid ${colors.cardBorder}`,
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div className="p-6 space-y-6">
                      {/* Distance Filter */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          Distância
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {distanceOptions.map((distance) => (
                            <motion.button
                              key={distance}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedDistance(distance === selectedDistance ? null : distance)}
                              className="px-4 py-2 rounded-full font-medium transition-all"
                              style={{
                                backgroundColor: selectedDistance === distance ? colors.orange : colors.bgSecondary,
                                color: '#FFFFFF',
                                border: selectedDistance === distance ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              {distance}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Price Filter */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          Preço
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {priceOptions.map((price) => (
                            <motion.button
                              key={price}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedPrice(price === selectedPrice ? null : price)}
                              className="px-4 py-2 rounded-full font-medium transition-all"
                              style={{
                                backgroundColor: selectedPrice === price ? colors.orange : colors.bgSecondary,
                                color: '#FFFFFF',
                                border: selectedPrice === price ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              {price}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Open Now Toggle */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                          Aberto agora
                        </h3>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setOpenNow(!openNow)}
                          className="relative w-12 h-6 rounded-full transition-colors"
                          style={{
                            backgroundColor: openNow ? colors.orange : '#2A3A4A',
                          }}
                        >
                          <motion.div
                            animate={{ x: openNow ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white"
                          />
                        </motion.button>
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          Avaliação mínima
                        </h3>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <motion.button
                              key={rating}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                              className="p-1"
                            >
                              <Star
                                size={28}
                                fill={rating <= minRating ? colors.orange : 'none'}
                                style={{
                                  color: rating <= minRating ? colors.orange : 'rgba(255, 255, 255, 0.3)',
                                }}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      {hasActiveFilters && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={clearFilters}
                          className="w-full text-center py-2 text-sm font-medium transition-colors hover:opacity-70"
                          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                          Limpar filtros
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  {/* Mobile Bottom Sheet */}
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden rounded-t-3xl overflow-hidden"
                    style={{
                      backgroundColor: colors.bgTertiary,
                      border: `1px solid ${colors.cardBorder}`,
                      boxShadow: '0 -12px 32px rgba(0, 0, 0, 0.5)',
                      maxHeight: '85vh',
                    }}
                  >
                    {/* Handle */}
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-12 h-1 rounded-full bg-white/20" />
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 40px)' }}>
                      {/* Distance Filter */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          Distância
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {distanceOptions.map((distance) => (
                            <motion.button
                              key={distance}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedDistance(distance === selectedDistance ? null : distance)}
                              className="px-4 py-2 rounded-full font-medium transition-all"
                              style={{
                                backgroundColor: selectedDistance === distance ? colors.orange : colors.bgSecondary,
                                color: '#FFFFFF',
                                border: selectedDistance === distance ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              {distance}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Price Filter */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          Preço
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {priceOptions.map((price) => (
                            <motion.button
                              key={price}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedPrice(price === selectedPrice ? null : price)}
                              className="px-4 py-2 rounded-full font-medium transition-all"
                              style={{
                                backgroundColor: selectedPrice === price ? colors.orange : colors.bgSecondary,
                                color: '#FFFFFF',
                                border: selectedPrice === price ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              {price}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Open Now Toggle */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                          Aberto agora
                        </h3>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setOpenNow(!openNow)}
                          className="relative w-12 h-6 rounded-full transition-colors"
                          style={{
                            backgroundColor: openNow ? colors.orange : '#2A3A4A',
                          }}
                        >
                          <motion.div
                            animate={{ x: openNow ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white"
                          />
                        </motion.button>
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          Avaliação mínima
                        </h3>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <motion.button
                              key={rating}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                              className="p-1"
                            >
                              <Star
                                size={28}
                                fill={rating <= minRating ? colors.orange : 'none'}
                                style={{
                                  color: rating <= minRating ? colors.orange : 'rgba(255, 255, 255, 0.3)',
                                }}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      {hasActiveFilters && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={clearFilters}
                          className="w-full text-center py-2 text-sm font-medium transition-colors hover:opacity-70"
                          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                          Limpar filtros
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Smart Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && searchTerm.length > 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden backdrop-blur-xl"
                  style={{
                    backgroundColor: colors.bgTertiary,
                    border: `1px solid ${colors.cardBorder}`,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div className="p-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        onClick={() => {
                          setSearchTerm(suggestion.name);
                          setShowSuggestions(false);
                          handleSearch();
                        }}
                        className="w-full px-4 py-3 rounded-xl text-left transition-colors flex items-center gap-3"
                      >
                        <MapPin size={18} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                        <div className="flex-1">
                          <span style={{ color: '#FFFFFF' }}>{suggestion.name}</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}> · </span>
                          <span style={{ color: colors.orange }}>{suggestion.category}</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}> · {suggestion.distance}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center items-center"
          >
            {[
              { label: 'Bares', badge: null },
              { label: 'Restaurantes', badge: null },
              { label: 'Eventos', badge: '12 hoje' },
              { label: 'Cafés', badge: null }
            ].map((cat, index) => (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/buscar')}
                className="px-4 py-2 rounded-full font-medium border relative flex items-center gap-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {cat.label}
                {cat.badge && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: colors.orange,
                      color: '#FFFFFF',
                    }}
                  >
                    {cat.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}