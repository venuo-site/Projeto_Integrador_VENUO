import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { Star, MapPin, Wifi, Music, PawPrint, Car, Wind, Wine, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router';
import { establishments } from '../../data/establishments';
import { EstablishmentModal } from './EstablishmentModal';

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

export function CategoriesWithEstablishments() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof establishments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      id: 'bares',
      emoji: '🍸',
      title: 'Bares',
      description: 'Opções para encontros, música e lazer noturno.',
    },
    {
      id: 'restaurantes',
      emoji: '🍽️',
      title: 'Restaurantes',
      description: 'Lugares para diferentes gostos, estilos e faixas de preço.',
    },
    {
      id: 'eventos',
      emoji: '🎉',
      title: 'Eventos',
      description: 'Descubra programações, festas e experiências especiais.',
    },
    {
      id: 'lazer',
      emoji: '🌆',
      title: 'Lazer',
      description: 'Encontre novas opções para relaxar, sair e aproveitar o tempo.',
    },
  ];

  const getEstablishmentsByCategory = (categoryId: string) => {
    return establishments.filter(est => est.category === categoryId).slice(0, 3);
  };

  const handleOpenModal = (establishment: typeof establishments[0]) => {
    setSelectedEstablishment(establishment);
    setIsModalOpen(true);
  };

  return (
    <section id="categorias" className="relative py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: colors.orange }}
          >
            Categorias
          </motion.p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Tudo o que você precisa em um só lugar
          </h2>
          <p
            className="text-lg max-w-[780px] mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Explore diferentes categorias e descubra os melhores estabelecimentos
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const categoryEstablishments = getEstablishmentsByCategory(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-5xl">{category.emoji}</span>
                    <div>
                      <h3
                        className="text-3xl font-bold"
                        style={{ color: colors.textPrimary }}
                      >
                        {category.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Establishments Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryEstablishments.map((establishment, index) => (
                    <motion.div
                      key={establishment.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => handleOpenModal(establishment)}
                      className="border rounded-[22px] overflow-hidden shadow-xl cursor-pointer group"
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.cardBorder,
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={establishment.image}
                          alt={establishment.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div
                          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: establishment.openNow ? '#10b981' : '#ef4444',
                            color: 'white',
                          }}
                        >
                          {establishment.openNow ? `Aberto até ${getClosingTime(establishment.hours)}` : 'Fechado'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Header: Name + Price Range */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4
                            className="text-xl font-bold flex-1"
                            style={{ color: colors.textPrimary }}
                          >
                            {establishment.name}
                          </h4>
                          <span
                            className="font-medium flex-shrink-0"
                            style={{ color: '#4BC8D4', fontSize: '13px' }}
                          >
                            {establishment.priceRange}
                          </span>
                        </div>

                        {/* Rating - Single Line */}
                        <div className="flex items-center gap-1 text-sm mb-2">
                          <Star
                            size={16}
                            fill={colors.orange}
                            style={{ color: colors.orange }}
                          />
                          <span
                            className="font-bold"
                            style={{ color: colors.textPrimary }}
                          >
                            {establishment.rating}
                          </span>
                          <span style={{ color: colors.textSecondary }}>·</span>
                          <span
                            className="text-xs"
                            style={{ color: colors.textSecondary }}
                          >
                            ({establishment.reviews} avaliações)
                          </span>
                        </div>

                        {/* Amenities Row - Single Line, No Wrap */}
                        {establishment.amenities && establishment.amenities.length > 0 && (
                          <div className="flex items-center gap-2 text-xs mb-2 overflow-hidden" style={{ color: colors.textSecondary }}>
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

                        <div className="mt-3 pt-3 border-t" style={{ borderColor: colors.glassBorder }}>
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.textSecondary }} />
                            <span className="text-xs line-clamp-1" style={{ color: colors.textSecondary }}>
                              {establishment.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View All Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                  className="text-center mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/buscar?categoria=${category.id}`)}
                    className="px-6 py-3 rounded-full font-semibold border"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.orange,
                      color: colors.orange,
                    }}
                  >
                    Ver todos em {category.title}
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <EstablishmentModal
        establishment={selectedEstablishment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
