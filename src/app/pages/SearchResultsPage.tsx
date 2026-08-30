import { useSearchParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeContext';
import { Star, MapPin, Clock, Phone, Globe, Heart, Share2, Wifi, Music, PawPrint, Car, Wind, Wine, Utensils } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { EstablishmentModal } from '../components/venuo/EstablishmentModal';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { establishments } from '../data/establishments';

// Helper function to extract closing time from hours string
const getClosingTime = (hours: string): string => {
  const parts = hours.split('-');
  if (parts.length >= 2) {
    return parts[parts.length - 1].trim();
  }
  return '';
};

// Amenity icon mapping
const amenityConfig: Record<string, { icon: React.ElementType; label: string }> = {
  'wifi': { icon: Wifi, label: 'Wi-Fi' },
  'live-music': { icon: Music, label: 'Música ao Vivo' },
  'pet-friendly': { icon: PawPrint, label: 'Pet Friendly' },
  'parking': { icon: Car, label: 'Estacionamento' },
  'valet-parking': { icon: Car, label: 'Valet' },
  'air-conditioning': { icon: Wind, label: 'Ar-condicionado' },
  'outdoor': { icon: Utensils, label: 'Área Externa' },
  'wine': { icon: Wine, label: 'Carta de Vinhos' },
};

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('categoria') || '';

  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof establishments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Restaurar posição do scroll
  useScrollRestoration();

  const filteredResults = establishments.filter(est => {
    const matchesQuery = query === '' ||
      est.name.toLowerCase().includes(query.toLowerCase()) ||
      est.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category === '' || est.category === category.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  const handleOpenModal = (establishment: typeof establishments[0]) => {
    setSelectedEstablishment(establishment);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Resultados da Busca
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            {query && (
              <p style={{ color: colors.textSecondary }}>
                Buscando por: <span className="font-semibold" style={{ color: colors.text }}>"{query}"</span>
              </p>
            )}
            {category && (
              <span
                className="px-4 py-2 rounded-full text-sm font-medium capitalize"
                style={{
                  background: `${colors.orange}20`,
                  color: colors.orange
                }}
              >
                {category}
              </span>
            )}
            <p style={{ color: colors.textSecondary }}>
              {filteredResults.length} {filteredResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          </div>
        </motion.div>

        {/* Results Grid */}
        {filteredResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl mb-4" style={{ color: colors.text }}>
              Nenhum resultado encontrado
            </p>
            <p style={{ color: colors.textSecondary }}>
              Tente ajustar sua busca ou explorar outras categorias
            </p>
            <Link
              to="/"
              className="inline-block mt-8 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
              style={{
                background: colors.orange,
                color: '#ffffff'
              }}
            >
              Voltar para Home
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResults.map((establishment, index) => (
              <motion.div
                key={establishment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={establishment.image}
                    alt={establishment.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(establishment.id);
                      }}
                      className="p-2 rounded-full backdrop-blur-md transition-all hover:scale-110"
                      style={{
                        background: isFavorite(establishment.id) ? colors.orange : 'rgba(255,255,255,0.2)',
                        color: isFavorite(establishment.id) ? '#ffffff' : colors.text
                      }}
                    >
                      <Heart size={18} fill={isFavorite(establishment.id) ? '#ffffff' : 'none'} />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full backdrop-blur-md transition-all hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.2)', color: colors.text }}
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                  <div
                    className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md"
                    style={{
                      background: establishment.openNow ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                      color: '#ffffff'
                    }}
                  >
                    {establishment.openNow ? `Aberto até ${getClosingTime(establishment.hours)}` : 'Fechado'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header: Name + Price Range */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3
                      className="text-xl font-bold group-hover:scale-105 transition-transform text-[#ffffff] flex-1"
                      style={{ color: colors.text }}
                    >
                      {establishment.name}
                    </h3>
                    <span
                      className="font-medium flex-shrink-0"
                      style={{
                        color: '#4BC8D4',
                        fontSize: '13px'
                      }}
                    >
                      {establishment.priceRange}
                    </span>
                  </div>

                  {/* Rating - Single Line */}
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Star size={16} fill={colors.orange} style={{ color: colors.orange }} />
                    <span className="font-semibold" style={{ color: colors.text }}>
                      {establishment.rating}
                    </span>
                    <span style={{ color: colors.textSecondary }}>·</span>
                    <span style={{ color: colors.textSecondary }} className="text-xs">
                      ({establishment.reviews} avaliações)
                    </span>
                  </div>

                  {/* Amenities Row - Single Line, No Wrap */}
                  {establishment.amenities && establishment.amenities.length > 0 && (
                    <div className="flex items-center gap-2 text-xs mb-3 overflow-hidden" style={{ color: colors.textSecondary }}>
                      {establishment.amenities.slice(0, 3).map((amenity) => {
                        const config = amenityConfig[amenity];
                        if (!config) return null;
                        const IconComponent = config.icon;
                        return (
                          <div key={amenity} className="flex items-center gap-1 flex-shrink-0">
                            <IconComponent size={14} style={{ color: '#4BC8D4' }} />
                            <span className="whitespace-nowrap">{config.label}</span>
                          </div>
                        );
                      })}
                      {establishment.amenities.length > 3 && (
                        <span className="flex-shrink-0" style={{ color: colors.textSecondary }}>+{establishment.amenities.length - 3}</span>
                      )}
                    </div>
                  )}

                  <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: colors.textSecondary }}
                  >
                    {establishment.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <MapPin size={16} />
                      <span className="line-clamp-1">{establishment.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <Clock size={16} />
                      <span>{establishment.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/local/${establishment.id}`}
                      onClick={(e) => {
                        // Se clicar normalmente (sem Ctrl/Cmd), abre o modal
                        if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                          e.preventDefault();
                          handleOpenModal(establishment);
                        }
                        // Se clicar com Ctrl/Cmd ou botão do meio, abre em nova aba (comportamento padrão)
                      }}
                      className="flex-1 text-center py-2 px-4 rounded-lg font-semibold transition-all hover:scale-105"
                      style={{
                        background: colors.orange,
                        color: '#ffffff'
                      }}
                    >
                      Ver Detalhes
                    </Link>
                    {establishment.phone && (
                      <a
                        href={`tel:${establishment.phone}`}
                        className="p-2 rounded-lg transition-all hover:scale-105"
                        style={{
                          background: `${colors.blue}20`,
                          color: colors.blue
                        }}
                      >
                        <Phone size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      <EstablishmentModal
        establishment={selectedEstablishment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
