import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function Benefits() {
  const { colors } = useTheme();
  
  const benefits = [
    'Informações organizadas em um único lugar',
    'Experiência de escolha mais rápida e eficiente',
    'Divulgação estratégica para estabelecimentos',
    'Plataforma moderna, simples e acessível',
  ];

  return (
    <section id="diferencial" className="relative py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-8 items-center border rounded-[28px] p-8 md:p-12 backdrop-blur-xl shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.orange}14, ${colors.blue}12, ${colors.orangeLight}12)`,
            borderColor: colors.cardBorder,
          }}
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.p 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Além de ajudar na busca por lugares para sair, o Venuo também pode valorizar os estabelecimentos cadastrados, criando uma relação de benefício mútuo e fortalecendo a conexão entre pessoas e locais.
            </motion.p>
          </motion.div>

          {/* Right Benefits List */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.3 + index * 0.12,
                  ease: "easeOut"
                }}
                whileHover={{ x: 8, scale: 1.05 }}
                className="flex items-start gap-4 border rounded-[18px] p-5 group cursor-pointer"
                style={{
                  backgroundColor: colors.glassBg,
                  borderColor: colors.glassBorder,
                }}
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.12 + 0.2 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center"
                >
                  <Check size={18} className="text-white" strokeWidth={3} />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.12 + 0.3 }}
                  className="leading-relaxed pt-0.5"
                  style={{ color: colors.textSecondary }}
                >
                  {benefit}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}