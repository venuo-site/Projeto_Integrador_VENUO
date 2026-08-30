import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { BackgroundToggle } from "./BackgroundToggle";
import { GradientToggle } from "./GradientToggle";
import { ColorBlindSelector } from "./ColorBlindSelector";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { NotificationsMenu } from "./NotificationsMenu";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router";
import VenuoLogo from "../../../imports/VENUO_LOGO_FUNDO_TRANSPARENTE_-_NOME_LATERAL.png";

interface HeaderProps {
  onContactClick: () => void;
  onLoginClick: () => void;
  hideForModal?: boolean;
  hideSearchBar?: boolean;
}

export function Header({
  onContactClick,
  onLoginClick,
  hideForModal = false,
  hideSearchBar = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isScrolled, setIsScrolled] = useState(false);
  const { colors, useGradientBg } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Detectar scroll e direção
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Definir direção do scroll
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      // Detectar se rolou da página
      setIsScrolled(currentScrollY > 20);
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Header sempre visível
  const shouldHide = false;
  const isCompact = isScrolled;

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    } else {
      // Se não estiver na home, navega para home e depois scrolla
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: 0,
        boxShadow: isScrolled
          ? '0 10px 30px rgba(0, 0, 0, 0.4)'
          : 'none',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 ${useGradientBg ? '' : 'backdrop-blur-xl'} border-b transition-colors duration-300 ${hideForModal ? 'z-10' : 'z-40'}`}
      style={{
        backgroundColor: useGradientBg
          ? '#000D1A'
          : (colors.theme === 'light'
            ? (isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.85)')
            : (isScrolled ? colors.bgSecondary + 'F8' : colors.bgSecondary + 'D9')),
        borderColor: isScrolled ? colors.orange : 'rgba(255, 255, 255, 0.1)',
        borderWidth: isScrolled ? '2px' : '1px',
      }}
    >
      <div className="w-full px-8">
        <motion.nav
          animate={{
            minHeight: isCompact ? '50px' : '70px',
          }}
          transition={{ duration: 0.3 }}
          className="flex flex-row items-center justify-between"
        >
          {/* Lado Esquerdo: Logo e Barra de Busca */}
          <div className="flex items-center" style={{ gap: hideSearchBar ? '0' : '24px' }}>
            {/* Logo */}
            <motion.button
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex-shrink-0"
              aria-label="Voltar para home"
            >
              <img
                src={VenuoLogo}
                alt="Venuo"
                className="h-20 w-auto object-contain"
              />
            </motion.button>

            {/* Barra de Busca */}
            {!hideSearchBar && (
              <div className="w-[760px]">
                <SearchBar />
              </div>
            )}
          </div>

          {/* Lado Direito: Botões */}
          <div className="hidden md:flex items-center flex-shrink-0" style={{ gap: '16px' }}>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center"
              style={{
                backgroundColor: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                color: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#FFFFFF',
                borderRadius: '12px',
                border: 'none',
              }}
            >
              <Menu size={24} strokeWidth={2} />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 rounded-2xl backdrop-blur-2xl overflow-hidden z-40"
                    style={{
                      backgroundColor: colors.theme === 'light'
                        ? 'rgba(255, 255, 255, 0.98)'
                        : colors.bgSecondary + 'F8',
                      border: 'none',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                  <div className="py-2">
                    <motion.button
                      onClick={() => {
                        scrollToSection("categorias");
                        setIsMenuOpen(false);
                      }}
                      whileHover={{
                        x: 6,
                        backgroundColor: colors.theme === 'light'
                          ? 'rgba(255, 122, 61, 0.08)'
                          : 'rgba(72, 202, 228, 0.15)',
                      }}
                      className="w-full text-left px-5 py-3 transition-all font-bold border-b"
                      style={{
                        color: colors.textPrimary,
                        borderColor: colors.theme === 'light'
                          ? 'rgba(0, 0, 0, 0.08)'
                          : 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      Categorias
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        onContactClick();
                        setIsMenuOpen(false);
                      }}
                      whileHover={{
                        x: 6,
                        backgroundColor: colors.theme === 'light'
                          ? 'rgba(255, 122, 61, 0.08)'
                          : 'rgba(72, 202, 228, 0.15)',
                      }}
                      className="w-full text-left px-5 py-3 transition-all font-bold border-b"
                      style={{
                        color: colors.textPrimary,
                        borderColor: colors.theme === 'light'
                          ? 'rgba(0, 0, 0, 0.08)'
                          : 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      Contato
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        navigate('/sobre-projeto');
                        setIsMenuOpen(false);
                      }}
                      whileHover={{
                        x: 6,
                        backgroundColor: colors.theme === 'light'
                          ? 'rgba(255, 122, 61, 0.08)'
                          : 'rgba(72, 202, 228, 0.15)',
                      }}
                      className="w-full text-left px-5 py-3 transition-all font-bold"
                      style={{ color: colors.orange }}
                    >
                      Sobre o Projeto
                    </motion.button>
                  </div>
                </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Login/User Section */}
            <div className="flex items-center" style={{ gap: '16px' }}>
              {isAuthenticated ? (
                <>
                  <NotificationsMenu />
                  <UserMenu />
                </>
              ) : (
                <motion.button
                  onClick={onLoginClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center"
                  style={{
                    backgroundColor: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                    color: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#FFFFFF',
                    borderRadius: '12px',
                    border: 'none',
                  }}
                  aria-label="Login"
                  title="Fazer login"
                >
                  <User size={24} strokeWidth={2} />
                </motion.button>
              )}

              <GradientToggle />
              <BackgroundToggle />
              <ColorBlindSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: ColorBlind Selector + Theme Toggle + Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <GradientToggle />
            <BackgroundToggle />
            <ColorBlindSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-[46px] h-[46px] rounded-[14px] border flex items-center justify-center"
              style={{
                backgroundColor: colors.glassBg,
                borderColor: colors.glassBorder,
                color: colors.textPrimary,
              }}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <button
                  onClick={() => scrollToSection("categorias")}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors"
                  style={{ color: colors.textSecondary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      colors.glassBg)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0)")
                  }
                >
                  Categorias
                </button>
                <button
                  onClick={onContactClick}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors"
                  style={{ color: colors.textSecondary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      colors.glassBg)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0)")
                  }
                >
                  Contato
                </button>
                <button
                  onClick={() => {
                    navigate('/sobre-projeto');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors font-semibold"
                  style={{
                    color: colors.orange,
                    backgroundColor: "rgba(0, 0, 0, 0)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      colors.glassBg)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0)")
                  }
                >
                  Sobre o Projeto
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}