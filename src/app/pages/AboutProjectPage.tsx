import { motion } from 'motion/react';
import { MapPin, Search, Map, Smartphone, Target, Zap, Users, Check, ArrowLeft } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { useNavigate } from 'react-router';

export function AboutProjectPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const stats = [
    { icon: Target, label: '1 só lugar', description: 'Informações reunidas em uma única plataforma' },
    { icon: Zap, label: '+ praticidade', description: 'Escolha mais rápida e organizada' },
    { icon: Smartphone, label: 'Responsivo', description: 'Uso fácil em celular, tablet e computador' },
    { icon: Users, label: 'Conexão', description: 'Aproxima usuários e estabelecimentos' },
  ];

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

  const benefits = [
    'Informações organizadas em um único lugar',
    'Experiência de escolha mais rápida e eficiente',
    'Divulgação estratégica para estabelecimentos',
    'Plataforma moderna, simples e acessível',
  ];

  const technologies = [
    'React',
    'TypeScript',
    'React Router',
    'Motion (Framer Motion)',
    'Tailwind CSS',
    'Context API',
    'LocalStorage',
    'Geolocation API',
    'OpenStreetMap Nominatim'
  ];

  const categories = [
    '🍸 Bares e Pubs',
    '🍽️ Restaurantes',
    '🎉 Festas e Eventos',
    '🎵 Shows e Música',
    '☕ Cafés',
    '🌆 Lazer e Entretenimento',
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl font-semibold transition-all"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: `${colors.glassBg}`,
            border: `1px solid ${colors.glassBorder}`,
            color: colors.textPrimary,
          }}
        >
          <ArrowLeft size={20} />
          Voltar
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-12 rounded-3xl border-2 relative overflow-hidden"
          style={{
            background: colors.gradientPrimary,
            borderColor: colors.orange,
          }}
        >
          <div className="text-center relative z-10">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
              }}
            >
              Projeto acadêmico
            </motion.span>
            <h1 className="text-5xl font-bold text-white mb-4">
              Sobre o Projeto Venuo
            </h1>
            <p className="text-white/90 text-xl">
              Plataforma inteligente de descoberta de estabelecimentos
            </p>
          </div>
        </motion.div>

        {/* Objetivo do Venuo */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.p
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

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 border rounded-[28px] p-8 md:p-10 backdrop-blur-xl shadow-2xl"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
            }}
          >
            <div className="flex flex-col justify-center">
              <h3
                className="text-3xl md:text-4xl font-bold mb-5"
                style={{ color: colors.textPrimary }}
              >
                Uma plataforma feita para simplificar a busca por lazer
              </h3>
              <p
                className="text-lg mb-4"
                style={{ color: colors.textSecondary }}
              >
                O objetivo principal do projeto é ajudar o usuário a encontrar com mais facilidade opções como <strong style={{ color: colors.textPrimary }}>bares, restaurantes, eventos e áreas de lazer</strong>, sem precisar procurar em várias plataformas diferentes.
              </p>
              <p
                className="text-lg"
                style={{ color: colors.textSecondary }}
              >
                Com isso, o Venuo centraliza informações, melhora a experiência de escolha e oferece uma navegação mais prática em qualquer dispositivo.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ scale: 1.08, y: -8 }}
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
                    style={{ background: colors.gradientPrimary }}
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
        </section>

        {/* Funcionalidades */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.p
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="border rounded-[22px] p-6 backdrop-blur-xl shadow-2xl cursor-pointer"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  className="w-14 h-14 rounded-[18px] flex items-center justify-center mb-5 border shadow-lg"
                  style={{
                    background: colors.gradientPrimary,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <feature.icon size={28} className="text-white" />
                </motion.div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: colors.textPrimary }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Diferencial do Projeto */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8 items-center border rounded-[28px] p-8 md:p-12 backdrop-blur-xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.orange}14, ${colors.blue}12, ${colors.orangeLight}12)`,
              borderColor: colors.cardBorder,
            }}
          >
            <div>
              <motion.p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: colors.orange }}
              >
                Diferencial do projeto
              </motion.p>
              <h3
                className="text-3xl md:text-4xl font-bold mb-5"
                style={{ color: colors.textPrimary }}
              >
                Mais praticidade para o usuário e mais visibilidade para os estabelecimentos
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                Além de ajudar na busca por lugares para sair, o Venuo também pode valorizar os estabelecimentos cadastrados, criando uma relação de benefício mútuo e fortalecendo a conexão entre pessoas e locais.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  whileHover={{ x: 8, scale: 1.05 }}
                  className="flex items-start gap-4 border rounded-[18px] p-5 cursor-pointer"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center"
                  >
                    <Check size={18} className="text-white" strokeWidth={3} />
                  </motion.div>
                  <p
                    className="leading-relaxed pt-0.5"
                    style={{ color: colors.textSecondary }}
                  >
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Tecnologias */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-2xl"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.textPrimary }}>
              🛠️ Tecnologias Utilizadas
            </h2>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full font-semibold"
                  style={{
                    background: `${colors.textPrimarySecondary}20`,
                    color: colors.textPrimary,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Categorias */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-2xl"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.textPrimary }}>
              🏪 Categorias de Estabelecimentos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-lg text-center font-medium"
                  style={{
                    background: `${colors.glassBg}`,
                    border: `1px solid ${colors.glassBorder}`,
                    color: colors.textPrimary,
                  }}
                >
                  {category}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
