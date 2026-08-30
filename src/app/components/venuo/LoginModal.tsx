import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, Check, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router';
import { useModal } from '../../contexts/ModalContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCNPJLogin: (document: string, name: string) => void;
  onCPFLogin?: (document: string, name: string) => void;
}

export function LoginModal({ isOpen, onClose, onCNPJLogin, onCPFLogin }: LoginModalProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj'>('cpf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Bloquear rolagem da tela quando o modal estiver aberto
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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return numbers.slice(0, 11);
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
    return numbers.slice(0, 14);
  };

  const handleDocumentChange = (value: string) => {
    if (documentType === 'cpf') {
      setDocument(formatCPF(value));
    } else {
      setDocument(formatCNPJ(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de login
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);

        // Redireciona baseado no tipo de documento
        if (documentType === 'cnpj') {
          onCNPJLogin(document, name || `Estabelecimento ${document.slice(0, 4)}`);
        } else if (documentType === 'cpf' && onCPFLogin) {
          onCPFLogin(document, name || `Usuário ${document.slice(0, 3)}`);
        }

        onClose();
        setName('');
        setDocument('');
        setPassword('');
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setName('');
      setDocument('');
      setPassword('');
      setIsSuccess(false);
    }
  };

  const handleTypeSwitch = (type: 'cpf' | 'cnpj') => {
    setDocumentType(type);
    setName('');
    setDocument('');
  };

  const getPlaceholder = () => {
    if (documentType === 'cpf') return '000.000.000-00';
    return '00.000.000/0000-00';
  };

  const getMaxLength = () => {
    if (documentType === 'cpf') return 14;
    return 18;
  };

  const getLabel = () => {
    if (documentType === 'cpf') return 'CPF';
    return 'CNPJ';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              backgroundColor: colors.cardBg,
              border: 'none',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header */}
            <div
              className="relative px-8 py-6 border-b-2"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.orange,
              }}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-5 right-5 p-2 rounded-full backdrop-blur-xl"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white',
                }}
              >
                <X size={20} />
              </motion.button>

              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.orange }}
                >
                  <User size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>Login</h2>
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Acesse sua conta Venuo
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              {/* Document Type Toggle */}
              <div className="flex gap-2 mb-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTypeSwitch('cpf')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2"
                  style={{
                    backgroundColor: documentType === 'cpf'
                      ? colors.orange
                      : 'rgba(0, 0, 0, 0)',
                    borderColor: documentType === 'cpf'
                      ? colors.orange
                      : colors.glassBorder,
                    color: documentType === 'cpf'
                      ? 'white'
                      : colors.textSecondary,
                  }}
                >
                  CPF
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTypeSwitch('cnpj')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2"
                  style={{
                    backgroundColor: documentType === 'cnpj'
                      ? colors.orange
                      : 'rgba(0, 0, 0, 0)',
                    borderColor: documentType === 'cnpj'
                      ? colors.orange
                      : colors.glassBorder,
                    color: documentType === 'cnpj'
                      ? 'white'
                      : colors.textSecondary,
                  }}
                >
                  CNPJ
                </motion.button>
              </div>

              {/* Name Input */}
              <div className="mb-5">
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  {documentType === 'cnpj' ? 'Nome do Estabelecimento' : 'Seu Nome'}
                </label>
                <div
                  className="flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <User
                    size={20}
                    style={{ color: colors.orange }}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={documentType === 'cnpj' ? 'Digite o nome do estabelecimento' : 'Digite seu nome'}
                    className="flex-1 bg-transparent border-none outline-none font-semibold"
                    style={{ color: colors.textPrimary }}
                    required
                  />
                </div>
              </div>

              {/* Document Input */}
              <div className="mb-5">
                <label 
                  className="block text-sm font-bold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  {getLabel()}
                </label>
                <div
                  className="flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <CreditCard
                    size={20}
                    style={{ color: colors.orange }}
                  />
                  <input
                    type="text"
                    value={document}
                    onChange={(e) => handleDocumentChange(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="flex-1 bg-transparent border-none outline-none font-semibold"
                    style={{ color: colors.textPrimary }}
                    required
                    maxLength={getMaxLength()}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label 
                  className="block text-sm font-bold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  Senha
                </label>
                <div 
                  className="flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                  }}
                >
                  <Lock 
                    size={20} 
                    style={{ color: colors.orange }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="flex-1 bg-transparent border-none outline-none font-semibold"
                    style={{ color: colors.textPrimary }}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-6">
                <button
                  type="button"
                  className="text-sm font-semibold hover:underline transition-all"
                  style={{ color: colors.orange }}
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3"
                style={{
                  backgroundColor: isSuccess
                    ? colors.theme === 'light' ? '#10B981' : '#059669'
                    : colors.orange,
                  color: 'white',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSuccess ? (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <Check size={24} strokeWidth={3} />
                    </motion.div>
                    Login realizado com sucesso!
                  </>
                ) : isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </motion.button>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p style={{ color: colors.textSecondary }}>
                  {documentType === 'cnpj' ? (
                    <>
                      Não tem cadastro?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          // Fazer login temporário para permitir acesso ao cadastro
                          onCNPJLogin('temp', 'Temporário');
                          navigate('/cadastro-estabelecimento');
                        }}
                        className="font-bold hover:underline transition-all"
                        style={{ color: colors.orange }}
                      >
                        Cadastre seu estabelecimento
                      </button>
                    </>
                  ) : (
                    <>
                      Não tem uma conta?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          navigate('/cadastro-usuario');
                        }}
                        className="font-bold hover:underline transition-all"
                        style={{ color: colors.orange }}
                      >
                        Cadastre-se
                      </button>
                    </>
                  )}
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
