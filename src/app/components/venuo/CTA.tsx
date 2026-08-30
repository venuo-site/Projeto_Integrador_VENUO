import { motion } from 'motion/react';
import { ArrowUp, Mail } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface CTAProps {
  onContactClick: () => void;
}

export function CTA({ onContactClick }: CTAProps) {
  const { colors } = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contato" className="relative py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center border rounded-[30px] p-10 md:p-16 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          }}
        >
          {/* Animated background gradient */}
          <motion.div 
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-50"
            style={{
              background: `linear-gradient(135deg, ${colors.orange}10, transparent, ${colors.cyan}10)`,
              backgroundSize: '200% 200%',
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring', bounce: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-xl"
              style={{ backgroundColor: colors.orange }}
            >
              <Mail size={40} className="text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
              style={{ color: colors.textPrimary }}
            >
              Venuo
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl max-w-[720px] mx-auto mb-8"
              style={{ color: colors.textSecondary }}
            >
              Um projeto acadêmico pensado para tornar a descoberta de lugares mais fácil, organizada e conectada ao estilo de vida do usuário.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.button
                onClick={scrollToTop}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-lg"
                style={{
                  backgroundColor: colors.orange,
                  color: '#FFFFFF',
                  boxShadow: `0 10px 30px ${colors.orange}40`,
                }}
              >
                <ArrowUp size={20} />
                Voltar ao topo
              </motion.button>

              <motion.button
                onClick={onContactClick}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full border font-bold transition-colors"
                style={{
                  backgroundColor: colors.glassBg,
                  borderColor: colors.glassBorder,
                  color: colors.textPrimary,
                }}
              >
                <Mail size={20} />
                Entrar em contato
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}