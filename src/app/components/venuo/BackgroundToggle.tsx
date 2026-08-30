import { motion } from 'motion/react';
import { Palette } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function BackgroundToggle() {
  const { useOxfordBlue, toggleBackground, colors } = useTheme();
  const iconColor = colors.theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#FFFFFF';
  const bgColor = colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <motion.button
      onClick={toggleBackground}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: iconColor,
        borderRadius: '12px',
        border: useOxfordBlue ? '2px solid #002147' : 'none',
      }}
      aria-label={`Alternar para background ${useOxfordBlue ? 'padrão' : 'Oxford Blue'}`}
      title={`Background: ${useOxfordBlue ? 'Oxford Blue #002147' : 'Padrão #0D1B2A'}`}
    >
      <div
        className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
        style={{
          backgroundColor: useOxfordBlue ? '#002147' : '#0D1B2A',
          border: `1px solid ${colors.theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)'}`,
        }}
      />
      <Palette size={24} strokeWidth={2} />
    </motion.button>
  );
}
