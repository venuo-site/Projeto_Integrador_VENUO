import { motion, AnimatePresence } from 'motion/react';
import { Eye, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme, ColorBlindMode } from '../ThemeContext';

export function ColorBlindSelector() {
  const { colors, colorBlindMode, setColorBlindMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const modes: Array<{ value: ColorBlindMode; label: string; description: string }> = [
    { value: 'none', label: 'Visão Normal', description: 'Sem filtro' },
    { value: 'protanopia', label: 'Protanopia', description: 'Cegueira ao vermelho' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Cegueira ao verde' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Cegueira ao azul' },
    { value: 'protanomaly', label: 'Protanomalia', description: 'Fraqueza ao vermelho' },
    { value: 'deuteranomaly', label: 'Deuteranomalia', description: 'Fraqueza ao verde' },
    { value: 'tritanomaly', label: 'Tritanomalia', description: 'Fraqueza ao azul' },
    { value: 'achromatopsia', label: 'Acromatopsia', description: 'Monocromático' },
  ];

  const currentMode = modes.find(m => m.value === colorBlindMode) || modes[0];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center"
        style={{
          backgroundColor: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
          color: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#FFFFFF',
          borderRadius: '12px',
          border: 'none',
        }}
        aria-label="Seletor de modo de daltonismo"
        title={`Modo atual: ${currentMode.label}`}
      >
        <Eye size={24} strokeWidth={2} />
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

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-[320px] rounded-2xl backdrop-blur-2xl z-50 overflow-hidden"
              style={{
                backgroundColor: colors.theme === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(10, 37, 64, 0.98)',
                border: 'none',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Header */}
              <div 
                className="px-5 py-4 border-b-2"
                style={{ 
                  borderColor: colors.orange,
                  backgroundColor: colors.orange,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                <p className="text-base font-bold text-white flex items-center gap-2">
                  <Eye size={18} />
                  Acessibilidade Visual
                </p>
              </div>

              {/* Options */}
              <div className="max-h-[420px] overflow-y-auto">
                {modes.map((mode, index) => (
                  <motion.button
                    key={mode.value}
                    onClick={() => {
                      setColorBlindMode(mode.value);
                      setIsOpen(false);
                    }}
                    whileHover={{ x: 6, backgroundColor: colors.theme === 'light' ? 'rgba(255, 122, 61, 0.08)' : 'rgba(72, 202, 228, 0.15)' }}
                    className="w-full px-5 py-3.5 flex items-start gap-3 border-b transition-all"
                    style={{
                      backgroundColor: colorBlindMode === mode.value
                        ? (colors.theme === 'light' ? 'rgba(255, 122, 61, 0.12)' : 'rgba(72, 202, 228, 0.2)')
                        : 'rgba(0, 0, 0, 0)',
                      borderColor: colors.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                      color: colors.textPrimary,
                    }}
                  >
                    {/* Check Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {colorBlindMode === mode.value ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: colors.orange,
                            boxShadow: `0 4px 12px ${colors.orange}60`,
                          }}
                        >
                          <Check size={16} className="text-white" strokeWidth={3} />
                        </motion.div>
                      ) : (
                        <div 
                          className="w-6 h-6 rounded-full border-2"
                          style={{ 
                            borderColor: colors.theme === 'light' ? colors.orange : colors.cyan,
                            opacity: 0.4,
                          }}
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <p 
                        className="font-bold text-sm mb-1"
                        style={{ color: colors.textPrimary }}
                      >
                        {mode.label}
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: colors.textMuted }}
                      >
                        {mode.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer Info */}
              <div 
                className="px-5 py-3 border-t-2 text-sm"
                style={{ 
                  borderColor: colors.orange,
                  color: colors.textSecondary,
                  backgroundColor: colors.theme === 'light' ? 'rgba(255, 122, 61, 0.05)' : 'rgba(72, 202, 228, 0.08)',
                }}
              >
                💡 Selecionado: <strong style={{ color: colors.orange, fontWeight: 700 }}>{currentMode.label}</strong>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}