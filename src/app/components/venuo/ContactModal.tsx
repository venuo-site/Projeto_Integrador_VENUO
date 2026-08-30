import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useModal } from '../../contexts/ModalContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { colors } = useTheme();
  const { openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
      openModal();
    } else {
      window.document.body.style.overflow = 'unset';
      closeModal();
    }
    return () => {
      window.document.body.style.overflow = 'unset';
      if (isOpen) {
        closeModal();
      }
    };
  }, [isOpen, openModal, closeModal]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden"
              style={{
                backgroundColor: colors.bgTertiary,
                border: 'none',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Header */}
              <div 
                className="relative p-8 border-b"
                style={{ borderColor: colors.glassBorder }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${colors.orange}10, ${colors.cyan}10)`,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: colors.orange }}
                      >
                        <Mail size={24} className="text-white" />
                      </div>
                      <h2 
                        className="text-3xl font-bold"
                        style={{ color: colors.textPrimary }}
                      >
                        Entrar em Contato
                      </h2>
                    </div>
                    <p style={{ color: colors.textSecondary }}>
                      Envie sua mensagem e entraremos em contato
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: colors.glassBg,
                      color: colors.textPrimary,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.cardBg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.glassBg}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name Field */}
                      <div>
                        <label 
                          className="block font-semibold mb-2"
                          style={{ color: colors.textPrimary }}
                        >
                          Nome
                        </label>
                        <div className="relative">
                          <User 
                            className="absolute left-4 top-1/2 -translate-y-1/2" 
                            size={20}
                            style={{ color: colors.textMuted }}
                          />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Seu nome completo"
                            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              backgroundColor: colors.cardBg,
                              borderColor: colors.cardBorder,
                              color: colors.textPrimary,
                              '--tw-ring-color': colors.orange,
                            } as any}
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label 
                          className="block font-semibold mb-2"
                          style={{ color: colors.textPrimary }}
                        >
                          E-mail
                        </label>
                        <div className="relative">
                          <Mail 
                            className="absolute left-4 top-1/2 -translate-y-1/2" 
                            size={20}
                            style={{ color: colors.textMuted }}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="seu@email.com"
                            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              backgroundColor: colors.cardBg,
                              borderColor: colors.cardBorder,
                              color: colors.textPrimary,
                              '--tw-ring-color': colors.orange,
                            } as any}
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label 
                          className="block font-semibold mb-2"
                          style={{ color: colors.textPrimary }}
                        >
                          Mensagem
                        </label>
                        <div className="relative">
                          <MessageSquare 
                            className="absolute left-4 top-4" 
                            size={20}
                            style={{ color: colors.textMuted }}
                          />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Escreva sua mensagem aqui..."
                            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                            style={{
                              backgroundColor: colors.cardBg,
                              borderColor: colors.cardBorder,
                              color: colors.textPrimary,
                              '--tw-ring-color': colors.orange,
                            } as any}
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold shadow-lg"
                        style={{
                          backgroundColor: colors.orange,
                          color: colors.theme === 'light' ? colors.bgPrimary : '#2c1748',
                          boxShadow: `0 10px 30px ${colors.orange}40`,
                        }}
                      >
                        <Send size={20} />
                        Enviar Mensagem
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center"
                      >
                        <CheckCircle size={40} className="text-white" />
                      </motion.div>
                      <h3 
                        className="text-2xl font-bold mb-3"
                        style={{ color: colors.textPrimary }}
                      >
                        Mensagem Enviada!
                      </h3>
                      <p 
                        className="text-lg"
                        style={{ color: colors.textSecondary }}
                      >
                        Obrigado pelo contato. Responderemos em breve!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
