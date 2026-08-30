import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function GradientToggle() {
  const { useGradientBg, toggleGradient, colors } = useTheme();
  const iconColor = colors.theme === 'light' && !useGradientBg ? 'rgba(0, 0, 0, 0.7)' : '#FFFFFF';
  const bgColor = useGradientBg ? '#000D1A' : (colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)');

  return (
    <motion.button
      onClick={toggleGradient}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: iconColor,
        borderRadius: '12px',
        border: useGradientBg ? '2px solid rgba(255, 255, 255, 0.3)' : 'none',
      }}
      aria-label={`Alternar aurora ${useGradientBg ? 'desligado' : 'ligado'}`}
      title={`Background: ${useGradientBg ? 'Aurora Borealis' : 'Sólido'}`}
    >
      {/* Aurora effect inside button when active */}
      {useGradientBg && (
        <>
          <div
            className="absolute rounded-full"
            style={{
              top: '-20%',
              left: '-30%',
              width: '80%',
              height: '80%',
              background: '#F4622A',
              opacity: 0.3,
              filter: 'blur(15px)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: '-10%',
              right: '-20%',
              width: '70%',
              height: '70%',
              background: '#002147',
              opacity: 0.5,
              filter: 'blur(18px)',
            }}
          />
        </>
      )}
      <Sparkles size={24} strokeWidth={2} className="relative z-10" />
    </motion.button>
  );
}
