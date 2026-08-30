import { motion } from 'motion/react';
import { MapPin, Search, Map, Smartphone } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function Features() {
  const { colors } = useTheme();
  
  const features = [
    {
      icon: MapPin,
      title: 'Geolocalização',
      description: 'Permite identificar estabelecimentos próximos da localização atual do usuário, facilitando a descoberta de novas opções por perto.',
    },
    {
      icon: Search,
      title: 'Filtros de busca',
      description: 'Ajuda a encontrar locais de acordo com preferências como preço, tipo de ambiente ou estilo musical.',
    },
    {
      icon: Map,
      title: 'Mapa interativo',
      description: 'Apresenta os locais de forma visual e organizada, tornando a navegação mais simples e prática para o usuário.',
    },
    {
      icon: Smartphone,
      title: 'Interface responsiva',
      description: 'Garante facilidade de uso em diferentes dispositivos, com uma interface simples, leve e adaptável.',
    },
  ];

  return (
    <section id="funcionalidades" className="relative py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: colors.orange }}
          >
            Funcionalidades
          </motion.p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Recursos principais do sistema
          </h2>
          <p 
            className="text-lg max-w-[780px] mx-auto"
            style={{ color: colors.textSecondary }}
          >
            O site foi pensado para oferecer uma experiência intuitiva e moderna, com ferramentas que realmente ajudam o usuário a encontrar o lugar ideal.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ y: -12, scale: 1.05, rotate: 1 }}
              className="border rounded-[22px] p-6 backdrop-blur-xl shadow-2xl group cursor-pointer"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                whileHover={{ rotate: 360, scale: 1.15 }}
                className="w-14 h-14 rounded-[18px] flex items-center justify-center mb-5 border shadow-lg"
                style={{
                  backgroundColor: colors.orange,
                  border: 'none',
                }}
              >
                <feature.icon size={28} className="text-white" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                className="text-xl font-bold mb-3"
                style={{ color: colors.textPrimary }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                className="leading-relaxed" 
                style={{ color: colors.textSecondary }}
              >
                {feature.description}
              </motion.p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}