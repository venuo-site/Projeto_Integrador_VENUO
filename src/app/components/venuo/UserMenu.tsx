import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, Settings, Heart } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();
  const { user, logout, isCNPJ } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const handleProfile = () => {
    setIsOpen(false);
    if (isCNPJ) {
      navigate('/dashboard');
    } else {
      navigate('/perfil');
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Avatar Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-3 h-[48px] backdrop-blur-xl transition-all"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          border: 'none',
        }}
      >
        <img
          src={user.avatar}
          alt={user.name || 'Usuário'}
          className="w-10 h-10 rounded-full"
          style={{
            border: 'none',
          }}
        />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-bold text-white">
            {user.name}
          </span>
          <span className="text-xs font-semibold text-white opacity-80">
            {isCNPJ ? 'Estabelecimento' : 'Usuário'}
          </span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-64 rounded-2xl backdrop-blur-2xl overflow-hidden z-50"
              style={{
                backgroundColor: colors.theme === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(10, 37, 64, 0.98)',
                border: 'none',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
            {/* User Info */}
            <div
              className="p-4 border-b-2"
              style={{
                borderColor: colors.orange,
                backgroundColor: colors.orange,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name || 'Usuário'}
                  className="w-12 h-12 rounded-full border-2"
                  style={{
                    borderColor: 'white',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <div className="flex-1">
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-xs text-white/80">{user.document}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <motion.button
                onClick={handleProfile}
                whileHover={{
                  x: 6,
                  backgroundColor: colors.theme === 'light'
                    ? 'rgba(255, 122, 61, 0.08)'
                    : 'rgba(72, 202, 228, 0.15)',
                }}
                className="w-full text-left px-4 py-3 transition-all font-bold flex items-center gap-3 border-b"
                style={{
                  color: colors.textPrimary,
                  borderColor: colors.theme === 'light'
                    ? 'rgba(0, 0, 0, 0.08)'
                    : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <User size={18} />
                {isCNPJ ? 'Dashboard' : 'Meu Perfil'}
              </motion.button>

              {!isCNPJ && (
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/perfil');
                  }}
                  whileHover={{
                    x: 6,
                    backgroundColor: colors.theme === 'light'
                      ? 'rgba(255, 122, 61, 0.08)'
                      : 'rgba(72, 202, 228, 0.15)',
                  }}
                  className="w-full text-left px-4 py-3 transition-all font-bold flex items-center gap-3 border-b"
                  style={{
                    color: colors.textPrimary,
                    borderColor: colors.theme === 'light'
                      ? 'rgba(0, 0, 0, 0.08)'
                      : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Heart size={18} />
                  Favoritos
                </motion.button>
              )}

              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{
                  x: 6,
                  backgroundColor: colors.theme === 'light'
                    ? 'rgba(255, 122, 61, 0.08)'
                    : 'rgba(72, 202, 228, 0.15)',
                }}
                className="w-full text-left px-4 py-3 transition-all font-bold flex items-center gap-3 border-b"
                style={{
                  color: colors.textPrimary,
                  borderColor: colors.theme === 'light'
                    ? 'rgba(0, 0, 0, 0.08)'
                    : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <Settings size={18} />
                Configurações
              </motion.button>

              <div className="border-t-2 my-2" style={{ borderColor: colors.orange }} />

              <motion.button
                onClick={handleLogout}
                whileHover={{
                  x: 6,
                  backgroundColor: colors.theme === 'light'
                    ? 'rgba(255, 122, 61, 0.08)'
                    : 'rgba(72, 202, 228, 0.15)',
                }}
                className="w-full text-left px-4 py-3 transition-all font-bold flex items-center gap-3"
                style={{ color: colors.orange }}
              >
                <LogOut size={18} />
                Sair
              </motion.button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
