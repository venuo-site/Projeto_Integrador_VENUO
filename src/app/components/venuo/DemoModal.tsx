import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Search, Filter, Star } from 'lucide-react';
import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const { colors } = useTheme();
  
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'unset';
    }
    return () => {
      window.document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden my-8"
              style={{
                backgroundColor: colors.bgTertiary,
                border: 'none',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Header */}
              <div 
                className="relative p-8 border-b"
                style={{ borderColor: colors.glassBorder }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${colors.orange}10, ${colors.cyan}10)`,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <h2 
                      className="text-3xl font-bold mb-2"
                      style={{ color: colors.textPrimary }}
                    >
                      Demo Interativa do Venuo
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Explore as principais funcionalidades da plataforma
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: colors.glassBg,
                      color: colors.textPrimary,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.cardBg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.glassBg}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Search Demo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="border rounded-2xl p-6"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.orange }}
                    >
                      <Search size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                        Busca Inteligente
                      </h3>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        Encontre lugares rapidamente
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar bares, restaurantes, eventos..."
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.cardBorder,
                        color: colors.textPrimary,
                        '--tw-ring-color': colors.orange,
                      } as any}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2" size={20} style={{ color: colors.textMuted }} />
                  </div>
                </motion.div>

                {/* Filters Demo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border rounded-2xl p-6"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})` }}
                    >
                      <Filter size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                        Filtros Avançados
                      </h3>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        Personalize sua busca
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Próximos de mim', 'Até R$50', 'Música ao vivo', 'Pet friendly', 'Aberto agora'].map((filter) => (
                      <button
                        key={filter}
                        className="px-4 py-2 rounded-full border text-sm transition-colors"
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.cardBorder,
                          color: colors.textPrimary,
                        }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Results Demo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border rounded-2xl p-6"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})` }}
                    >
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                        Resultados
                      </h3>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        Locais próximos a você
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Bar do João', type: 'Bar', distance: '0.8 km', rating: 4.5 },
                      { name: 'Restaurante Sabor', type: 'Restaurante', distance: '1.2 km', rating: 4.8 },
                      { name: 'Festa Neon', type: 'Evento', distance: '2.0 km', rating: 4.3 },
                    ].map((place, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-xl transition-colors"
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.glassBorder,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${colors.orange}30, ${colors.blue}30)`,
                            }}
                          >
                            {index === 0 ? '🍸' : index === 1 ? '🍽️' : '🎉'}
                          </div>
                          <div>
                            <p className="font-semibold" style={{ color: colors.textPrimary }}>
                              {place.name}
                            </p>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                              {place.type} • {place.distance}
                            </p>
                          </div>
                        </div>
                        <div 
                          className="flex items-center gap-1"
                          style={{ color: colors.orange }}
                        >
                          <Star size={16} fill="currentColor" />
                          <span className="font-semibold">{place.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div 
                className="p-6 border-t"
                style={{
                  borderColor: colors.glassBorder,
                  backgroundColor: colors.glassBg,
                }}
              >
                <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
                  Esta é uma demonstração interativa das funcionalidades principais do Venuo
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}