import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import logo from 'figma:asset/0656c76fc7d038a01d7846c81019a213a0c7c74f.png';

export function Footer() {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 text-center">
      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Brand */}
          <div className="flex items-center justify-center gap-3">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden p-2"
              style={{ background: colors.white }}
            >
              <img
                src={logo}
                alt="Logo Venuo"
                className="w-full h-full object-contain"
              />
            </div>
            <span 
              className="text-2xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              Venuo
            </span>
          </div>

          {/* Tagline */}
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Descubra. Conecte. Viva.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: colors.glassBg,
                borderColor: colors.glassBorder,
                color: colors.textPrimary,
              }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: colors.glassBg,
                borderColor: colors.glassBorder,
                color: colors.textPrimary,
              }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: colors.glassBg,
                borderColor: colors.glassBorder,
                color: colors.textPrimary,
              }}
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Divider */}
          <div 
            className="w-full max-w-md mx-auto h-px"
            style={{ backgroundColor: colors.glassBorder }}
          />

          {/* Copyright */}
          <p className="text-sm" style={{ color: colors.textMuted }}>
            © {currentYear} Venuo — Projeto acadêmico desenvolvido para facilitar a descoberta de lugares.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}