import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Wifi, Music, PawPrint, Car, Wind, Wine, Utensils } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

export function FeaturedCarousel() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof establishments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Card especial Copa do Mundo 2026
  const copaMundialCard = {
    id: 'copa-mundial-2026',
    name: 'Copa do Mundo 2026 🏆',
    category: 'Evento Especial',
    rating: 0,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    address: '',
    openNow: false,
    description: 'Encontre os melhores bares com transmissão ao vivo',
    isSpecialEvent: true,
    isCopaEvent: true,
    tags: ['Bares', 'Transmissão ao vivo', 'Cerveja gelada'],
  };

  // Selecionar estabelecimentos em destaque (os com maior rating)
  const featuredEstablishments = [...establishments]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map(est => ({
      id: est.id,
      name: est.name,
      category: est.category === 'bares' ? 'Bares' :
                est.category === 'restaurantes' ? 'Restaurantes' :
                est.category === 'lazer' ? 'Lazer' : 'Eventos',
      rating: est.rating,
      image: est.image,
      address: est.address,
      openNow: est.openNow,
      description: est.description,
      isSpecialEvent: est.isSpecialEvent,
      isCopaEvent: false,
    }));

  // Adicionar card da Copa como primeiro item
  const featured = [copaMundialCard, ...featuredEstablishments];

  const handleOpenModal = (id: string) => {
    const establishment = establishments.find(est => est.id === id);
    if (establishment) {
      setSelectedEstablishment(establishment);
      setIsModalOpen(true);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="relative py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: colors.orange }}
          >
            Destaques
          </motion.p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Estabelecimentos em destaque
          </h2>
          <p
            className="text-lg max-w-[780px] mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Descubra os lugares mais populares e bem avaliados da cidade
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -top-16 right-0 z-10 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-3 rounded-full border shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(75, 200, 212, 0.25)',
                color: '#FFFFFF',
              }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sliderRef.current?.slickNext()}
              className="p-3 rounded-full border shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(75, 200, 212, 0.25)',
                color: '#FFFFFF',
              }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          <Slider ref={sliderRef} {...settings}>
            {featured.map((place, index) => (
              <div key={place.id} className="px-3">
                {place.isCopaEvent ? (
                  /* Card Especial Copa do Mundo 2026 */
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => navigate('/buscar')}
                    className="rounded-[24px] overflow-hidden shadow-2xl cursor-pointer relative h-[480px]"
                  >
                    {/* Background Image with Dark Overlay */}
                    <div className="absolute inset-0">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    {/* Badge EVENTO ESPECIAL */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: colors.orange,
                        color: 'white',
                        fontSize: '11px',
                      }}
                    >
                      EVENTO ESPECIAL
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {place.name}
                      </h3>
                      <p className="text-white/90 mb-4 text-sm">
                        {place.description}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {place.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-lg text-sm font-bold"
                          style={{
                            backgroundColor: colors.orange,
                            color: 'white',
                          }}
                        >
                          Ver lugares
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Card Normal de Estabelecimento */
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => handleOpenModal(place.id)}
                    className="rounded-[24px] overflow-hidden shadow-2xl cursor-pointer h-[480px] flex flex-col"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: place.isSpecialEvent && !place.isCopaEvent
                        ? '4px solid transparent'
                        : '1px solid rgba(75, 200, 212, 0.25)',
                      backgroundImage: place.isSpecialEvent && !place.isCopaEvent
                        ? 'linear-gradient(#1e293b, #1e293b), linear-gradient(90deg, #009c3b 0%, #009c3b 50%, #ffdf00 50%, #ffdf00 100%)'
                        : 'none',
                      backgroundOrigin: 'border-box',
                      backgroundClip: place.isSpecialEvent && !place.isCopaEvent ? 'padding-box, border-box' : 'unset',
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Updated Badge: "Aberto até 20h" */}
                      {(() => {
                        const establishment = establishments.find(e => e.id === place.id);
                        const closingTime = establishment ? getClosingTime(establishment.hours) : '';
                        return (
                          <div
                            className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: place.openNow ? '#10b981' : '#ef4444',
                              color: 'white',
                            }}
                          >
                            {place.openNow ? `Aberto até ${closingTime}` : 'Fechado'}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Header: Name + Price Range */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3
                            className="text-xl font-bold flex-1"
                            style={{ color: '#FFFFFF' }}
                          >
                            {place.name}
                          </h3>
                          {(() => {
                            const establishment = establishments.find(e => e.id === place.id);
                            return establishment?.priceRange ? (
                              <span
                                className="font-medium flex-shrink-0"
                                style={{ color: '#4BC8D4', fontSize: '13px' }}
                              >
                                {establishment.priceRange}
                              </span>
                            ) : null;
                          })()}
                        </div>

                        {/* Category Pill */}
                        <div className="mb-2">
                          <span
                            className="text-sm px-3 py-1 rounded-full inline-block"
                            style={{
                              backgroundColor: `${colors.orange}20`,
                              color: colors.orange,
                            }}
                          >
                            {place.category}
                          </span>
                        </div>

                        {/* Rating - Single Line */}
                        {(() => {
                          const establishment = establishments.find(e => e.id === place.id);
                          return (
                            <div className="flex items-center gap-1 text-sm mb-2">
                              <Star
                                size={16}
                                fill={colors.orange}
                                style={{ color: colors.orange }}
                              />
                              <span
                                className="font-bold"
                                style={{ color: '#FFFFFF' }}
                              >
                                {place.rating}
                              </span>
                              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>·</span>
                              <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                ({establishment?.reviews || 0} avaliações)
                              </span>
                            </div>
                          );
                        })()}

                        {/* Amenities Row - Single Line, No Wrap */}
                        {(() => {
                          const establishment = establishments.find(e => e.id === place.id);
                          const amenities = establishment?.amenities || [];
                          const displayAmenities = amenities.slice(0, 3);
                          const remainingCount = amenities.length - 3;

                          return amenities.length > 0 ? (
                            <div className="flex items-center gap-2 text-xs mb-3 overflow-hidden" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              {displayAmenities.map((amenity) => {
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
                              {remainingCount > 0 && (
                                <span className="flex-shrink-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>+{remainingCount}</span>
                              )}
                            </div>
                          ) : null;
                        })()}

                        {/* Description */}
                        <p
                          className="text-sm mb-3 line-clamp-2"
                          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {place.description}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        <MapPin size={16} />
                        <span className="line-clamp-1">{place.address}</span>
                      </div>
                    </div>
                </motion.div>
                )}
              </div>
            ))}
          </Slider>

          {/* Custom Dots Styling */}
          <style>{`
            .slick-dots {
              bottom: -50px;
            }
            .slick-dots li button:before {
              color: ${colors.orange};
              font-size: 10px;
              opacity: 0.25;
            }
            .slick-dots li.slick-active button:before {
              color: ${colors.orange};
              opacity: 1;
            }
          `}</style>
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
