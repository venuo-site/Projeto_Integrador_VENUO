import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();
  const iconColor = colors.theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#FFFFFF';
  const bgColor = colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center"
      style={{
        backgroundColor: bgColor,
        color: iconColor,
        borderRadius: '12px',
        border: 'none',
      }}
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <Sun size={24} strokeWidth={2} />
      ) : (
        <Moon size={24} strokeWidth={2} />
      )}
    </motion.button>
  );
}
