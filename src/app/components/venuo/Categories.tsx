import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTheme } from '../ThemeContext';
import { useState } from 'react';
import { X, MapPin, Star, Clock } from 'lucide-react';
import { useSearch } from '../SearchContext';
import { useNavigate } from 'react-router';

export function Categories() {
  const { colors } = useTheme();
  const { setSearchValue, scrollToSearch } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const categories = [
    {
      emoji: '🍸',
      title: 'Bares',
      description: 'Opções para encontros, música e lazer noturno.',
      image: 'https://images.unsplash.com/photo-1772310005791-d3bfe38703e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBiYXIlMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3NDkwNDUzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundImage: 'https://images.unsplash.com/photo-1769613044949-fd9642d63af2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmFyJTIwaW50ZXJpb3IlMjBhdG1vc3BoZXJlJTIwbmVvbnxlbnwxfHx8fDE3NzUwODI3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      detailedDescription: 'Descubra os melhores bares da cidade! De ambientes intimistas a casas noturnas animadas, encontre o lugar perfeito para curtir com amigos.',
      suggestions: [
        { name: 'Bar do João', rating: 4.8, location: 'Centro', hours: 'Aberto até 2h' },
        { name: 'Lounge 360', rating: 4.5, location: 'Jardins', hours: 'Aberto até 3h' },
        { name: 'Rock House', rating: 4.7, location: 'Vila Madalena', hours: 'Aberto até 4h' },
      ]
    },
    {
      emoji: '🍽️',
      title: 'Restaurantes',
      description: 'Lugares para diferentes gostos, estilos e faixas de preço.',
      image: 'https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc0ODA3MTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundImage: 'https://images.unsplash.com/photo-1758648207365-df458d3e83f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGRpbmluZyUyMGludGVyaW9yfGVufDF8fHx8MTc3NTAzMzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      detailedDescription: 'Explore uma curadoria de restaurantes para todos os paladares e ocasiões. De bistrôs charmosos a restaurantes estrelados.',
      suggestions: [
        { name: 'Sabor & Arte', rating: 4.9, location: 'Itaim Bibi', hours: 'Aberto até 23h' },
        { name: 'Casa da Nonna', rating: 4.6, location: 'Moema', hours: 'Aberto até 22h' },
        { name: 'Fusion Grill', rating: 4.8, location: 'Pinheiros', hours: 'Aberto até 24h' },
      ]
    },
    {
      emoji: '🎉',
      title: 'Eventos',
      description: 'Descubra programações, festas e experiências especiais.',
      image: 'https://images.unsplash.com/photo-1726221439805-0a52fea84e30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBlbmpveWluZyUyMGNvbmNlcnQlMjBldmVudHxlbnwxfHx8fDE3NzQ5MDQ1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundImage: 'https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBmZXN0aXZhbCUyMGxpZ2h0c3xlbnwxfHx8fDE3NzUwNDcwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      detailedDescription: 'Fique por dentro das melhores festas, shows, festivais e eventos especiais acontecendo na sua cidade.',
      suggestions: [
        { name: 'Festival de Verão', rating: 5.0, location: 'Anhembi', hours: 'Sáb 20h' },
        { name: 'Jazz Night', rating: 4.7, location: 'Blue Note', hours: 'Sex 21h' },
        { name: 'Carnival Party', rating: 4.9, location: 'Sambódromo', hours: 'Dom 22h' },
      ]
    },
    {
      emoji: '🌆',
      title: 'Lazer',
      description: 'Encontre novas opções para relaxar, sair e aproveitar o tempo.',
      image: 'https://images.unsplash.com/photo-1636366939393-7afc5eaf7707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGVpc3VyZSUyMG91dGRvb3J8ZW58MXx8fHwxNzc0OTA0NTQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundImage: 'https://images.unsplash.com/photo-1636366939393-7afc5eaf7707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGxlaXN1cmUlMjBvdXRkb29yJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc3NTA4Mjc4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      detailedDescription: 'Descubra atividades de lazer, parques, museus, cinemas e muito mais para aproveitar seu tempo livre.',
      suggestions: [
        { name: 'Parque Ibirapuera', rating: 4.9, location: 'Ibirapuera', hours: '5h às 24h' },
        { name: 'MASP', rating: 4.8, location: 'Avenida Paulista', hours: '10h às 18h' },
        { name: 'Cinema IMAX', rating: 4.6, location: 'Shopping Center', hours: '12h às 23h' },
      ]
    },
  ];

  const selectedCategoryData = categories.find(cat => cat.title === selectedCategory);

  return (
    <section id="categorias" className="relative py-16">
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
            Categorias
          </motion.p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Tudo o que o usuário precisa em um só ambiente
          </h2>
          <p 
            className="text-lg max-w-[780px] mx-auto"
            style={{ color: colors.textSecondary }}
          >
            A plataforma reúne diferentes tipos de experiências para que o usuário encontre exatamente o que procura com mais rapidez.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 60, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ y: -12, scale: 1.08, rotateY: 5 }}
              onClick={() => setSelectedCategory(category.title)}
              className="group relative overflow-hidden border rounded-[22px] shadow-2xl cursor-pointer"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover opacity-20"
                  />
                </motion.div>
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${colors.bgTertiary}, ${colors.bgTertiary}B3, transparent)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-7 text-center flex flex-col items-center justify-center min-h-[240px]">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  className="text-6xl mb-4 inline-block"
                >
                  {category.emoji}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                  className="text-2xl font-bold mb-3"
                  style={{ color: colors.textPrimary }}
                >
                  {category.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                  style={{ color: colors.textSecondary }}
                >
                  {category.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedCategory(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-md"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 rounded-3xl shadow-2xl"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.orange,
              }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={selectedCategoryData.backgroundImage}
                  alt={selectedCategoryData.title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: colors.theme === 'light'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 122, 61, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(10, 37, 64, 0.95) 0%, rgba(10, 37, 64, 0.85) 50%, rgba(72, 202, 228, 0.2) 100%)',
                  }}
                />
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCategory(null)}
                className="absolute top-5 right-5 z-20 p-3 rounded-full border-2 backdrop-blur-xl shadow-xl"
                style={{
                  backgroundColor: colors.glassBg,
                  borderColor: colors.orange,
                  color: colors.textPrimary,
                }}
              >
                <X size={24} />
              </motion.button>

              {/* Content */}
              <div className="relative z-10 overflow-y-auto max-h-[90vh] p-8 md:p-12">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-8"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.2 }}
                    className="text-8xl inline-block mb-4"
                  >
                    {selectedCategoryData.emoji}
                  </motion.span>
                  <h2 
                    className="text-5xl font-bold mb-4"
                    style={{ color: colors.textPrimary }}
                  >
                    {selectedCategoryData.title}
                  </h2>
                  <p 
                    className="text-xl max-w-2xl mx-auto"
                    style={{ color: colors.textSecondary }}
                  >
                    {selectedCategoryData.detailedDescription}
                  </p>
                </motion.div>

                {/* Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {selectedCategoryData.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="p-6 border-2 rounded-2xl backdrop-blur-xl shadow-lg"
                      style={{
                        backgroundColor: colors.glassBg,
                        borderColor: colors.theme === 'light' ? colors.orange : colors.cyan,
                      }}
                    >
                      <h4 
                        className="text-xl font-bold mb-3"
                        style={{ color: colors.textPrimary }}
                      >
                        {suggestion.name}
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Star 
                            size={16} 
                            className="fill-current"
                            style={{ color: colors.orange }}
                          />
                          <span style={{ color: colors.textSecondary }}>
                            {suggestion.rating} estrelas
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin 
                            size={16}
                            style={{ color: colors.cyan }}
                          />
                          <span style={{ color: colors.textSecondary }}>
                            {suggestion.location}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock 
                            size={16}
                            style={{ color: colors.theme === 'light' ? colors.orange : colors.cyan }}
                          />
                          <span style={{ color: colors.textSecondary }}>
                            {suggestion.hours}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-center mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full font-bold text-lg shadow-xl"
                    style={{
                      backgroundColor: colors.orange,
                      color: '#FFFFFF',
                    }}
                    onClick={() => {
                      const categoryParam = selectedCategoryData.title.toLowerCase();
                      navigate(`/buscar?categoria=${categoryParam}`);
                      setSelectedCategory(null);
                    }}
                  >
                    🔍 Buscar {selectedCategoryData.title}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}