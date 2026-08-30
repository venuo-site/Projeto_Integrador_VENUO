import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Users, Heart, Shield, Zap, Globe } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutProjectModal({ isOpen, onClose }: AboutProjectModalProps) {
  const { colors } = useTheme();

  // Bloquear rolagem da tela quando o modal estiver aberto
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-sm"
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
              background: colors.cardBg,
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

            {/* Header */}
            <div
              className="relative px-8 py-12 border-b-2"
              style={{
                backgroundColor: colors.orange,
                borderColor: colors.orange,
              }}
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-3">
                  Sobre o Projeto Venuo
                </h2>
                <p className="text-white/90 text-lg">
                  Plataforma inteligente de descoberta de estabelecimentos
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Descrição Principal */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                  🎯 O que é o Venuo?
                </h3>
                <p className="text-lg mb-4" style={{ color: colors.textPrimarySecondary }}>
                  O <strong>Venuo</strong> é uma plataforma moderna que conecta pessoas aos melhores estabelecimentos da cidade.
                  Seja para encontrar aquele bar aconchegante, um restaurante especial ou descobrir novos lugares,
                  o Venuo facilita sua experiência de descoberta urbana.
                </p>
                <p className="text-lg" style={{ color: colors.textPrimarySecondary }}>
                  Com recursos avançados de busca, geolocalização e um sistema inteligente de recomendações,
                  transformamos a forma como você explora sua cidade.
                </p>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                  ✨ Principais Funcionalidades
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-6 rounded-xl"
                    style={{ background: `${colors.orange}10`, border: `1px solid ${colors.orange}30` }}
                  >
                    <MapPin size={32} style={{ color: colors.orange }} className="mb-3" />
                    <h4 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                      Geolocalização Inteligente
                    </h4>
                    <p style={{ color: colors.textPrimarySecondary }}>
                      Encontre estabelecimentos próximos a você com precisão. Sistema automático de preenchimento de endereço.
                    </p>
                  </div>

                  <div
                    className="p-6 rounded-xl"
                    style={{ background: `${colors.cyan}10`, border: `1px solid ${colors.cyan}30` }}
                  >
                    <Heart size={32} style={{ color: colors.cyan }} className="mb-3" />
                    <h4 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                      Sistema de Favoritos
                    </h4>
                    <p style={{ color: colors.textPrimarySecondary }}>
                      Salve seus lugares preferidos e acesse-os a qualquer momento, mesmo offline.
                    </p>
                  </div>

                  <div
                    className="p-6 rounded-xl"
                    style={{ background: `${colors.orange}10`, border: `1px solid ${colors.orange}30` }}
                  >
                    <Users size={32} style={{ color: colors.orange }} className="mb-3" />
                    <h4 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                      Dois Tipos de Usuários
                    </h4>
                    <p style={{ color: colors.textPrimarySecondary }}>
                      Cadastro para clientes (CPF) e estabelecimentos (CNPJ) com funcionalidades específicas para cada perfil.
                    </p>
                  </div>

                  <div
                    className="p-6 rounded-xl"
                    style={{ background: `${colors.cyan}10`, border: `1px solid ${colors.cyan}30` }}
                  >
                    <Shield size={32} style={{ color: colors.cyan }} className="mb-3" />
                    <h4 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                      Segurança Avançada
                    </h4>
                    <p style={{ color: colors.textPrimarySecondary }}>
                      Validação de senha com requisitos de segurança, autenticação protegida e dados criptografados.
                    </p>
                  </div>

                  <div
                    className="p-6 rounded-xl"
                    style={{ background: `${colors.orange}10`, border: `1px solid ${colors.orange}30` }}
                  >
                    <Zap size={32} style={{ color: colors.orange }} className="mb-3" />
                    <h4 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                      Performance Otimizada
                    </h4>
                    <p style={{ color: colors.textPrimarySecondary }}>
                      Navegação rápida com preservação de scroll, carregamento otimizado e experiência fluida.
                    </p>
                  </div>

                  <div
                    className="p-6 rounded-xl"
                    style={{ background: `${colors.cyan}10`, border: `1px solid ${colors.cyan}30` }}
                  >
                    <Globe size={32} style={{ color: colors.cyan }} className="mb-3" />
                    <h4 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                      Acessibilidade
                    </h4>
                    <p style={{ color: colors.textPrimarySecondary }}>
                      Suporte a modos de daltonismo, temas claro/escuro e navegação otimizada para todos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tecnologias */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                  🛠️ Tecnologias Utilizadas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'React',
                    'TypeScript',
                    'React Router',
                    'Motion (Framer Motion)',
                    'Tailwind CSS',
                    'Context API',
                    'LocalStorage',
                    'Geolocation API',
                    'OpenStreetMap Nominatim'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full font-semibold"
                      style={{
                        background: `${colors.textPrimarySecondary}20`,
                        color: colors.textPrimary,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Categorias Suportadas */}
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                  🏪 Categorias de Estabelecimentos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    '🍸 Bares e Pubs',
                    '🍽️ Restaurantes',
                    '🎉 Festas e Eventos',
                    '🎵 Shows e Música',
                    '☕ Cafés',
                    '🌆 Lazer e Entretenimento',
                  ].map((category) => (
                    <div
                      key={category}
                      className="p-3 rounded-lg text-center font-medium"
                      style={{
                        background: `${colors.glassBg}`,
                        border: `1px solid ${colors.glassBorder}`,
                        color: colors.textPrimary,
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
