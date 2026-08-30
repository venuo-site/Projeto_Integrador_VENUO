import { motion } from 'motion/react';
import { Target, Zap, Smartphone, Users } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function About() {
  const { colors } = useTheme();
  
  const stats = [
    { icon: Target, label: '1 só lugar', description: 'Informações reunidas em uma única plataforma' },
    { icon: Zap, label: '+ praticidade', description: 'Escolha mais rápida e organizada' },
    { icon: Smartphone, label: 'Responsivo', description: 'Uso fácil em celular, tablet e computador' },
    { icon: Users, label: 'Conexão', description: 'Aproxima usuários e estabelecimentos' },
  ];

  return (
    <section id="sobre" className="relative py-16">
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
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: colors.orange }}
          >
            Sobre o projeto
          </motion.p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Qual é o objetivo do Venuo?
          </h2>
          <p 
            className="text-lg max-w-[780px] mx-auto"
            style={{ color: colors.textSecondary }}
          >
            O Venuo busca conectar pessoas a lugares, reunindo informações importantes em uma única plataforma para facilitar a escolha de onde ir de forma rápida, prática e eficiente.
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 border rounded-[28px] p-8 md:p-10 backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          }}
        >
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: colors.textPrimary }}
            >
              Uma plataforma feita para simplificar a busca por lazer
            </h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg mb-4" 
              style={{ color: colors.textSecondary }}
            >
              O objetivo principal do projeto é ajudar o usuário a encontrar com mais facilidade opções como <strong style={{ color: colors.textPrimary }}>bares, restaurantes, eventos e áreas de lazer</strong>, sem precisar procurar em várias plataformas diferentes.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg" 
              style={{ color: colors.textSecondary }}
            >
              Com isso, o Venuo centraliza informações, melhora a experiência de escolha e oferece uma navegação mais prática em qualquer dispositivo.
            </motion.p>
          </motion.div>

          {/* Right Stats Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.08, y: -8, rotate: 2 }}
                className="border rounded-[22px] p-6 cursor-pointer"
                style={{
                  backgroundColor: colors.glassBg,
                  borderColor: colors.glassBorder,
                }}
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors.orange }}
                >
                  <stat.icon size={24} className="text-white" />
                </motion.div>
                <p className="text-xl font-bold mb-2" style={{ color: colors.orange }}>
                  {stat.label}
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}