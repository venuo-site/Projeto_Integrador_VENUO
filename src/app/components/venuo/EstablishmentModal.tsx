import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, Clock, Heart, Share2, DollarSign, Calendar, UtensilsCrossed, User, Send, Wifi, Car, PawPrint, Baby, Accessibility, Wind, Music2, CreditCard, Utensils, Beer } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useModal } from '../../contexts/ModalContext';

interface Establishment {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  openNow: boolean;
  hours: string;
  phone: string;
  website: string | null;
  image: string;
  description: string;
  priceRange: string;
  isSpecialEvent?: boolean;
  fullDescription?: string;
}

interface EstablishmentModalProps {
  establishment: Establishment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EstablishmentModal({ establishment, isOpen, onClose }: EstablishmentModalProps) {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { openModal, closeModal } = useModal();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Bloquear rolagem da tela quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
      openModal();
    } else {
      window.document.body.style.overflow = 'unset';
      closeModal();
    }

    return () => {
      window.document.body.style.overflow = 'unset';
      if (isOpen) {
        closeModal();
      }
    };
  }, [isOpen, openModal, closeModal]);

  if (!establishment) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmitReview = () => {
    if (userRating > 0 && reviewText.trim()) {
      // Aqui você pode adicionar lógica para salvar a avaliação
      alert(`Avaliação enviada com sucesso!\nNota: ${userRating} estrelas\nComentário: ${reviewText}`);
      setUserRating(0);
      setReviewText('');
    }
  };

  const handleNotify = () => {
    alert(`Você será notificado quando houver novidades sobre ${establishment.name}!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed top-[70px] left-0 right-0 bottom-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-[70px] left-0 right-0 bottom-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: colors.cardBackground,
              border: 'none',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
              }}
            >
              <X size={24} />
            </motion.button>

            {/* Image Header */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={establishment.image}
                alt={establishment.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                {/* Botão Fechar Grande */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 left-4 px-6 py-3 rounded-2xl backdrop-blur-xl font-bold border-2 shadow-lg flex items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderColor: colors.orange,
                    color: 'white',
                  }}
                >
                  <X size={20} />
                  Fechar
                </motion.button>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(establishment.id)}
                  className="p-3 rounded-full backdrop-blur-md transition-all"
                  style={{
                    background: isFavorite(establishment.id) ? colors.orange : 'rgba(255,255,255,0.2)',
                    color: isFavorite(establishment.id) ? '#ffffff' : 'white',
                  }}
                >
                  <Heart size={20} fill={isFavorite(establishment.id) ? '#ffffff' : 'none'} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full backdrop-blur-md"
                  style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>

              {/* Status Badge */}
              {establishment.openNow && (
                <div
                  className="absolute bottom-4 left-4 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md"
                  style={{ background: 'rgba(16, 185, 129, 0.9)', color: '#ffffff' }}
                >
                  Aberto agora
                </div>
              )}
            </div>

            {/* Content */}
<div
              className="p-6 md:p-8"
              style={{
                backgroundColor: colors.theme === 'light'
                  ? 'rgba(255, 255, 255, 0.85)'
                  : 'rgba(10, 37, 64, 0.85)',
              }}
            >
              {/* Title & Price */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
                  {establishment.name}
                </h2>
                <div className="flex items-center gap-2">
                  <DollarSign size={20} style={{ color: colors.cyan }} />
                  <span
                    className="text-lg font-bold px-3 py-1 rounded-lg"
                    style={{
                      background: `${colors.cyan}20`,
                      color: colors.cyan,
                    }}
                  >
                    {establishment.priceRange}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star size={24} fill={colors.orange} style={{ color: colors.orange }} />
                  <span className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                    {establishment.rating}
                  </span>
                </div>
                <span className="text-lg" style={{ color: colors.textPrimary }}>
                  ({establishment.reviews} avaliações)
                </span>
              </div>

              {/* Description */}
              <p className="text-lg mb-6" style={{ color: colors.textPrimary }}>
                {establishment.description}
              </p>

              {/* Eventos Especiais - Conteúdo Completo */}
              {establishment.isSpecialEvent && establishment.fullDescription && (
                <div className="mb-8">
                  <div
                    className="p-6 rounded-2xl border-4 mb-6"
                    style={{
                      borderImage: 'linear-gradient(90deg, #009c3b 0%, #009c3b 50%, #ffdf00 50%, #ffdf00 100%) 1',
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="whitespace-pre-line text-lg mb-6" style={{ color: colors.textPrimary }}>
                      {establishment.fullDescription}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNotify}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
                      style={{
                        background: 'linear-gradient(90deg, #009c3b 0%, #ffdf00 100%)',
                        color: '#000000',
                        boxShadow: '0 8px 20px rgba(0, 156, 59, 0.4)',
                      }}
                    >
                      🔔 Clique aqui para ser notificado
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Características Section */}
              {!establishment.isSpecialEvent && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                  Características
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.orange}15` }}
                  >
                    <Wifi size={24} style={{ color: colors.orange }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Wi-Fi Grátis
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.cyan}15` }}
                  >
                    <Car size={24} style={{ color: colors.cyan }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Estacionamento
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.blueLight}15` }}
                  >
                    <PawPrint size={24} style={{ color: colors.blueLight }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Pet Friendly
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.orange}15` }}
                  >
                    <Baby size={24} style={{ color: colors.orange }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Espaço Kids
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.cyan}15` }}
                  >
                    <Accessibility size={24} style={{ color: colors.cyan }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Acessível
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.blueLight}15` }}
                  >
                    <Wind size={24} style={{ color: colors.blueLight }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Ar Condicionado
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.orange}15` }}
                  >
                    <Music2 size={24} style={{ color: colors.orange }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Música ao Vivo
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: `${colors.cyan}15` }}
                  >
                    <CreditCard size={24} style={{ color: colors.cyan }} />
                    <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                      Aceita Cartão
                    </span>
                  </div>
                </div>
              </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: `${colors.textPrimarySecondary}10` }}
                >
                  <MapPin size={20} style={{ color: colors.orange, flexShrink: 0 }} />
                  <div>
                    <p className="font-bold mb-1" style={{ color: colors.textPrimary }}>
                      Endereço
                    </p>
                    <p style={{ color: colors.textPrimary }}>{establishment.address}</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: `${colors.textPrimarySecondary}10` }}
                >
                  <Clock size={20} style={{ color: colors.cyan, flexShrink: 0 }} />
                  <div>
                    <p className="font-bold mb-1" style={{ color: colors.textPrimary }}>
                      Horário
                    </p>
                    <p style={{ color: colors.textPrimary }}>{establishment.hours}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!establishment.isSpecialEvent && (
              <div className="flex gap-3 mb-8">
                {establishment.phone && (
                  <a
                    href={`tel:${establishment.phone}`}
                    className="flex-1 text-center py-3 px-6 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background: colors.orange,
                      color: '#ffffff',
                    }}
                  >
                    Ligar Agora
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(establishment.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 px-6 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: `${colors.cyan}20`,
                    color: colors.cyan,
                  }}
                >
                  Ver no Mapa
                </a>
              </div>
              )}

              {/* Eventos Section */}
              {!establishment.isSpecialEvent && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={24} style={{ color: colors.orange }} />
                  <h3 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                    Próximos Eventos
                  </h3>
                </div>
                <div className="space-y-3">
                  <div
                    className="p-4 rounded-xl border-2 transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                      borderColor: colors.orange,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                        Noite de Jazz ao Vivo
                      </h4>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${colors.orange}20`,
                          color: colors.orange,
                        }}
                      >
                        Sexta, 20:00
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Apresentação especial com a banda local. Entrada gratuita.
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-xl border-2 transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                      borderColor: colors.cyan,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                        Happy Hour Especial
                      </h4>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${colors.cyan}20`,
                          color: colors.cyan,
                        }}
                      >
                        Sábado, 18:00
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Drinks com 50% de desconto das 18h às 21h.
                    </p>
                  </div>
                </div>
              </div>
              )}

              {/* Cardápio Section */}
              {!establishment.isSpecialEvent && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed size={24} style={{ color: colors.cyan }} />
                  <h3 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                    Cardápio
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                        Feijoada Completa
                      </h4>
                      <span
                        className="font-bold px-2 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${colors.orange}15`,
                          color: colors.orange,
                        }}
                      >
                        R$ 45,00
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                      Feijoada tradicional com todos os acompanhamentos
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span
                        className="text-xs px-2 py-1 rounded font-bold"
                        style={{
                          backgroundColor: `${colors.cyan}15`,
                          color: colors.cyan,
                        }}
                      >
                        Arroz
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded font-bold"
                        style={{
                          backgroundColor: `${colors.cyan}15`,
                          color: colors.cyan,
                        }}
                      >
                        Farofa
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded font-bold"
                        style={{
                          backgroundColor: `${colors.cyan}15`,
                          color: colors.cyan,
                        }}
                      >
                        Couve
                      </span>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                        Picanha na Chapa
                      </h4>
                      <span
                        className="font-bold px-2 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${colors.orange}15`,
                          color: colors.orange,
                        }}
                      >
                        R$ 65,00
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                      Picanha grelhada no ponto com guarnições
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span
                        className="text-xs px-2 py-1 rounded font-bold"
                        style={{
                          backgroundColor: `${colors.cyan}15`,
                          color: colors.cyan,
                        }}
                      >
                        Batata Frita
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded font-bold"
                        style={{
                          backgroundColor: `${colors.cyan}15`,
                          color: colors.cyan,
                        }}
                      >
                        Vinagrete
                      </span>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                        Caipirinha Tradicional
                      </h4>
                      <span
                        className="font-bold px-2 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${colors.orange}15`,
                          color: colors.orange,
                        }}
                      >
                        R$ 18,00
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Caipirinha feita com cachaça artesanal
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                        Pudim de Leite
                      </h4>
                      <span
                        className="font-bold px-2 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: `${colors.orange}15`,
                          color: colors.orange,
                        }}
                      >
                        R$ 12,00
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Sobremesa caseira da casa
                    </p>
                  </div>
                </div>
              </div>
              )}

              {/* Avaliações Section */}
              {!establishment.isSpecialEvent && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Star size={24} style={{ color: colors.orange }} />
                  <h3 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                    Avaliações
                  </h3>
                </div>

                {/* Formulário de Nova Avaliação */}
                <div
                  className="p-5 rounded-xl mb-6 border-2"
                  style={{
                    backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 37, 64, 0.7)',
                    borderColor: colors.orange,
                  }}
                >
                  <h4 className="font-bold text-lg mb-3" style={{ color: colors.textPrimary }}>
                    Deixe sua avaliação
                  </h4>

                  {/* Seleção de Estrelas */}
                  <div className="mb-4">
                    <p className="text-sm font-bold mb-2" style={{ color: colors.textSecondary }}>
                      Sua nota:
                    </p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <motion.button
                          key={rating}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoverRating(rating)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setUserRating(rating)}
                          className="transition-all"
                        >
                          <Star
                            size={32}
                            fill={(hoverRating || userRating) >= rating ? colors.orange : 'none'}
                            style={{
                              color: (hoverRating || userRating) >= rating ? colors.orange : colors.textMuted,
                              cursor: 'pointer',
                            }}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Campo de Texto */}
                  <div className="mb-4">
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Compartilhe sua experiência..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 outline-none resize-none"
                      style={{
                        backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 37, 64, 0.9)',
                        borderColor: colors.glassBorder,
                        color: colors.textPrimary,
                      }}
                    />
                  </div>

                  {/* Botão Enviar */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitReview}
                    disabled={userRating === 0 || !reviewText.trim()}
                    className="w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: userRating > 0 && reviewText.trim() ? colors.orange : colors.textMuted,
                      color: '#ffffff',
                      opacity: userRating > 0 && reviewText.trim() ? 1 : 0.5,
                      cursor: userRating > 0 && reviewText.trim() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <Send size={20} />
                    Enviar Avaliação
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${colors.orange}20`,
                        }}
                      >
                        <User size={20} style={{ color: colors.orange }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                            Maria Silva
                          </h4>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                fill={colors.orange}
                                style={{ color: colors.orange }}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                          Há 2 dias
                        </p>
                        <p style={{ color: colors.textPrimary }}>
                          Lugar incrível! A comida é maravilhosa e o atendimento excepcional. Recomendo muito!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${colors.cyan}20`,
                        }}
                      >
                        <User size={20} style={{ color: colors.cyan }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                            João Santos
                          </h4>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                fill={colors.orange}
                                style={{ color: colors.orange }}
                              />
                            ))}
                            <Star size={16} style={{ color: colors.orange }} />
                          </div>
                        </div>
                        <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                          Há 1 semana
                        </p>
                        <p style={{ color: colors.textPrimary }}>
                          Ambiente muito agradável e música ao vivo excelente. O preço é justo pela qualidade oferecida.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(10, 37, 64, 0.5)',
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${colors.blueLight}20`,
                        }}
                      >
                        <User size={20} style={{ color: colors.blueLight }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold" style={{ color: colors.textPrimary }}>
                            Ana Costa
                          </h4>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                fill={colors.orange}
                                style={{ color: colors.orange }}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                          Há 2 semanas
                        </p>
                        <p style={{ color: colors.textPrimary }}>
                          Vim para o happy hour e adorei! Os drinks são deliciosos e o ambiente é perfeito para relaxar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
