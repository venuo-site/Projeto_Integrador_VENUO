import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Baby, Dog, Accessibility, Music, UtensilsCrossed, Plus, Trash2, Image as ImageIcon, DollarSign } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  garnishes?: string[];
}

interface Establishment {
  id: string;
  cnpj: string;
  name: string;
  address: string;
  category: string;
  isActive: boolean;
  targetAudience?: {
    ageRange: string[];
    familyFriendly: boolean;
    petFriendly: boolean;
    accessibility: boolean;
    musicStyle?: string[];
  };
  menu?: MenuItem[];
  photos?: string[];
}

interface EstablishmentDetailsProps {
  establishment: Establishment;
  onClose: () => void;
}

export function EstablishmentDetails({ establishment, onClose }: EstablishmentDetailsProps) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'info' | 'audience' | 'menu' | 'photos'>('info');

  // Bloquear rolagem da tela quando o modal estiver aberto
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';
    return () => {
      window.document.body.style.overflow = 'unset';
    };
  }, []);

  const tabs = [
    { id: 'info', label: 'Informações' },
    { id: 'audience', label: 'Público-Alvo' },
    { id: 'menu', label: 'Cardápio' },
    { id: 'photos', label: 'Fotos' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 rounded-2xl p-6 relative"
        style={{
          backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 37, 64, 0.85)',
          borderColor: colors.orange,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:scale-110 transition-transform"
          style={{
            backgroundColor: `${colors.orange}20`,
            color: colors.orange,
          }}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            {establishment.name}
          </h2>
          <p className="text-sm" style={{ color: colors.textPrimary }}>
            {establishment.address}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? colors.orange : 'rgba(0, 0, 0, 0)',
                color: activeTab === tab.id ? 'white' : colors.textPrimary,
                border: `2px solid ${activeTab === tab.id ? colors.orange : colors.glassBorder}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: colors.textPrimary }}>CNPJ</p>
                <p className="text-lg font-bold" style={{ color: colors.textPrimary }}>{establishment.cnpj}</p>
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: colors.textPrimary }}>Categoria</p>
                <p className="text-lg font-bold" style={{ color: colors.textPrimary }}>{establishment.category}</p>
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: colors.textPrimary }}>Status</p>
                <span
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: establishment.isActive ? `${colors.orange}20` : `${colors.textMuted}20`,
                    color: establishment.isActive ? colors.orange : colors.textMuted,
                  }}
                >
                  {establishment.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div className="space-y-6">
              {establishment.targetAudience ? (
                <>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
                      <Users size={24} style={{ color: colors.orange }} />
                      Faixa Etária
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {establishment.targetAudience.ageRange?.map((age, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full font-bold text-sm"
                          style={{
                            backgroundColor: `${colors.cyan}20`,
                            color: colors.cyan,
                          }}
                        >
                          {age}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: establishment.targetAudience.familyFriendly
                          ? `${colors.orange}15`
                          : `${colors.glassBorder}15`,
                      }}
                    >
                      <Baby size={32} className="mb-2" style={{ color: colors.orange }} />
                      <p className="font-bold" style={{ color: colors.textPrimary }}>
                        Ambiente Familiar
                      </p>
                      <p className="text-sm mt-1" style={{ color: colors.textPrimary }}>
                        {establishment.targetAudience.familyFriendly ? 'Sim' : 'Não'}
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: establishment.targetAudience.petFriendly
                          ? `${colors.orange}15`
                          : `${colors.glassBorder}15`,
                      }}
                    >
                      <Dog size={32} className="mb-2" style={{ color: colors.orange }} />
                      <p className="font-bold" style={{ color: colors.textPrimary }}>
                        Pet Friendly
                      </p>
                      <p className="text-sm mt-1" style={{ color: colors.textPrimary }}>
                        {establishment.targetAudience.petFriendly ? 'Sim' : 'Não'}
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: establishment.targetAudience.accessibility
                          ? `${colors.orange}15`
                          : `${colors.glassBorder}15`,
                      }}
                    >
                      <Accessibility size={32} className="mb-2" style={{ color: colors.orange }} />
                      <p className="font-bold" style={{ color: colors.textPrimary }}>
                        Acessibilidade
                      </p>
                      <p className="text-sm mt-1" style={{ color: colors.textPrimary }}>
                        {establishment.targetAudience.accessibility ? 'Sim' : 'Não'}
                      </p>
                    </div>

                    {establishment.targetAudience.musicStyle && establishment.targetAudience.musicStyle.length > 0 && (
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: `${colors.cyan}15` }}
                      >
                        <Music size={32} className="mb-2" style={{ color: colors.cyan }} />
                        <p className="font-bold" style={{ color: colors.textPrimary }}>
                          Estilo Musical
                        </p>
                        <p className="text-sm mt-1" style={{ color: colors.textPrimary }}>
                          {establishment.targetAudience.musicStyle.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Users size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhuma informação de público-alvo cadastrada
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              {establishment.menu && establishment.menu.length > 0 ? (
                establishment.menu.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border-2"
                    style={{
                      backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(10, 37, 64, 0.4)',
                      borderColor: colors.glassBorder,
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                        {item.name}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1"
                        style={{
                          backgroundColor: `${colors.orange}20`,
                          color: colors.orange,
                        }}
                      >
                        <DollarSign size={16} />
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: colors.textPrimary }}>
                      {item.description}
                    </p>
                    {item.garnishes && item.garnishes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.garnishes.map((garnish, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded text-xs font-bold"
                            style={{
                              backgroundColor: `${colors.cyan}15`,
                              color: colors.cyan,
                            }}
                          >
                            {garnish}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <UtensilsCrossed size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhum item no cardápio
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {establishment.photos && establishment.photos.length > 0 ? (
                establishment.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: colors.glassBg,
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <ImageIcon size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhuma foto cadastrada
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
