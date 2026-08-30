import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeContext';
import { Home, Search, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block mb-8"
        >
          <AlertCircle size={120} style={{ color: colors.orange }} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          Página Não Encontrada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg mb-8"
          style={{ color: colors.textSecondary }}
        >
          Ops! A página que você está procurando não existe ou foi movida.
          <br />
          Que tal explorar nossos estabelecimentos?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
            style={{
              background: colors.orange,
              color: '#ffffff'
            }}
          >
            <Home size={20} />
            Voltar para Home
          </Link>

          <Link
            to="/buscar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
            style={{
              background: `${colors.blue}20`,
              color: colors.blue,
              border: `2px solid ${colors.blue}`
            }}
          >
            <Search size={20} />
            Buscar Estabelecimentos
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
