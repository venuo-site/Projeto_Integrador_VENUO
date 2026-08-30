import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  MapPin,
  Check,
  ChevronLeft,
  Upload,
  Eye,
  EyeOff,
} from 'lucide-react';

interface UserFormData {
  // Informações Pessoais
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  maritalStatus: string;

  // Endereço
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;

  // Segurança
  password: string;
  confirmPassword: string;

  // Preferências
  interests: string[];

  // Foto
  avatar: File | null;
}

export function UserRegisterPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    phone: '',
    maritalStatus: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
    interests: [],
    avatar: null,
  });

  const availableInterests = [
    '🍸 Bares e Pubs',
    '🍽️ Restaurantes',
    '🎉 Festas e Eventos',
    '🎵 Shows e Música',
    '☕ Cafés',
    '🌆 Lazer e Entretenimento',
    '🎭 Teatro e Cultura',
    '⚽ Esportes',
    '🎨 Arte e Exposições',
    '🎬 Cinema',
    '🏖️ Viagens',
    '📚 Leitura e Literatura',
  ];

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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return numbers.slice(0, 11);
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return numbers.slice(0, 8);
  };

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validatePassword = (password: string) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    return requirements;
  };

  const isPasswordValid = (password: string) => {
    const requirements = validatePassword(password);
    return Object.values(requirements).every(Boolean);
  };

  const handlePasswordChange = (value: string) => {
    handleInputChange('password', value);

    if (value.length > 0 && !isPasswordValid(value)) {
      setPasswordError('A senha não atende aos requisitos de segurança');
    } else {
      setPasswordError('');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      // Validar senha antes de avançar
      if (!isPasswordValid(formData.password)) {
        setPasswordError('Por favor, atenda a todos os requisitos de senha');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('As senhas não coincidem');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!isPasswordValid(formData.password)) {
      alert('A senha não atende aos requisitos de segurança!');
      return;
    }

    setIsSubmitting(true);
    // Simula envio de dados
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/perfil');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Dados Pessoais', icon: User },
    { number: 2, title: 'Endereço', icon: MapPin },
    { number: 3, title: 'Segurança', icon: Lock },
    { number: 4, title: 'Interesses', icon: Calendar },
  ];

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all hover:scale-105 font-semibold"
            style={{
              background: `${colors.cardBackground}80`,
              color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
              border: `1px solid ${colors.border}`,
            }}
          >
            <ChevronLeft size={20} />
            Voltar
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
              Criar Conta
            </h1>
            <p className="text-lg font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
              Preencha seus dados para criar sua conta no Venuo
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        currentStep >= step.number ? 'scale-110' : ''
                      }`}
                      style={{
                        background:
                          currentStep >= step.number
                            ? colors.orange
                            : `${colors.textSecondary}30`,
                        color: currentStep >= step.number ? '#ffffff' : colors.textSecondary,
                      }}
                    >
                      {currentStep > step.number ? (
                        <Check size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </div>
                    <span
                      className="text-xs text-center whitespace-nowrap hidden sm:block font-semibold"
                      style={{
                        color: currentStep >= step.number
                          ? (colors.theme === 'light' ? '#0A2540' : '#FFFFFF')
                          : (colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0'),
                      }}
                    >
                      {step.title}
                    </span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-12 h-1 mx-2 rounded-full"
                      style={{
                        background:
                          currentStep > step.number
                            ? colors.orange
                            : `${colors.textSecondary}30`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="p-8 rounded-2xl mb-8"
          style={{
            background: colors.cardBackground,
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Dados Pessoais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="João Silva Santos"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    CPF *
                  </label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="joao@email.com"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Telefone *
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Estado Civil
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-bold"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <option value="" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Selecione</option>
                    <option value="solteiro" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Solteiro(a)</option>
                    <option value="casado" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Casado(a)</option>
                    <option value="divorciado" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Divorciado(a)</option>
                    <option value="viuvo" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Viúvo(a)</option>
                    <option value="nao_informar" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Prefiro não informar</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Endereço */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Endereço
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    CEP *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', formatZipCode(e.target.value))}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Rua/Avenida *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="Rua das Flores"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Número *
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => handleInputChange('complement', e.target.value)}
                    placeholder="Apto 101"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    placeholder="Centro"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="São Paulo"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Estado *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-bold"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <option value="" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Selecione</option>
                    <option value="SP" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>São Paulo</option>
                    <option value="RJ" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Rio de Janeiro</option>
                    <option value="MG" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Minas Gerais</option>
                    <option value="ES" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Espírito Santo</option>
                    <option value="PR" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Paraná</option>
                    <option value="SC" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Santa Catarina</option>
                    <option value="RS" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Rio Grande do Sul</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Segurança */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Segurança
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Digite sua senha"
                      className="w-full px-4 py-3 pr-12 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                      style={{
                        background: `${colors.textSecondary}10`,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${passwordError && formData.password.length > 0 ? '#EF4444' : colors.border}`,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: colors.textSecondary }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Requisitos de Senha */}
                  {formData.password.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                        Requisitos da senha:
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Check
                            size={16}
                            style={{
                              color: validatePassword(formData.password).minLength ? '#10B981' : colors.textSecondary
                            }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: validatePassword(formData.password).minLength
                                ? '#10B981'
                                : colors.textSecondary
                            }}
                          >
                            Mínimo de 8 caracteres
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check
                            size={16}
                            style={{
                              color: validatePassword(formData.password).hasUpperCase ? '#10B981' : colors.textSecondary
                            }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: validatePassword(formData.password).hasUpperCase
                                ? '#10B981'
                                : colors.textSecondary
                            }}
                          >
                            Pelo menos uma letra maiúscula
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check
                            size={16}
                            style={{
                              color: validatePassword(formData.password).hasLowerCase ? '#10B981' : colors.textSecondary
                            }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: validatePassword(formData.password).hasLowerCase
                                ? '#10B981'
                                : colors.textSecondary
                            }}
                          >
                            Pelo menos uma letra minúscula
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check
                            size={16}
                            style={{
                              color: validatePassword(formData.password).hasNumber ? '#10B981' : colors.textSecondary
                            }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: validatePassword(formData.password).hasNumber
                                ? '#10B981'
                                : colors.textSecondary
                            }}
                          >
                            Pelo menos um número
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check
                            size={16}
                            style={{
                              color: validatePassword(formData.password).hasSpecialChar ? '#10B981' : colors.textSecondary
                            }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: validatePassword(formData.password).hasSpecialChar
                                ? '#10B981'
                                : colors.textSecondary
                            }}
                          >
                            Pelo menos um caractere especial (!@#$%^&*...)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Digite a senha novamente"
                      className="w-full px-4 py-3 pr-12 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                      style={{
                        background: `${colors.textSecondary}10`,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${
                          formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
                            ? '#EF4444'
                            : colors.border
                        }`,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: colors.textSecondary }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
                    <p className="mt-2 text-sm font-medium" style={{ color: '#EF4444' }}>
                      As senhas não coincidem
                    </p>
                  )}
                  {formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword && (
                    <p className="mt-2 text-sm font-medium flex items-center gap-1" style={{ color: '#10B981' }}>
                      <Check size={16} />
                      As senhas coincidem
                    </p>
                  )}
                </div>

                {passwordError && (
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                  >
                    <p className="text-sm font-bold" style={{ color: '#EF4444' }}>
                      ⚠️ {passwordError}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Interesses */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Seus Interesses
              </h2>

              <p className="font-medium mb-4" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
                Selecione seus interesses para receber recomendações personalizadas
              </p>

              <div className="flex flex-wrap gap-3">
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={{
                      background: formData.interests.includes(interest)
                        ? colors.orange
                        : `${colors.textSecondary}20`,
                      color: formData.interests.includes(interest)
                        ? '#ffffff'
                        : (colors.theme === 'light' ? '#0A2540' : '#FFFFFF'),
                      border: `1px solid ${
                        formData.interests.includes(interest) ? colors.orange : colors.border
                      }`,
                    }}
                  >
                    {formData.interests.includes(interest) && <Check size={14} className="inline mr-1" />}
                    {interest}
                  </button>
                ))}
              </div>

              <div
                className="mt-6 p-4 rounded-xl"
                style={{ background: `${colors.orange}10`, border: `1px solid ${colors.orange}30` }}
              >
                <p className="text-sm font-medium" style={{ color: colors.theme === 'light' ? '#0A2540' : '#E0E0E0' }}>
                  <strong>💡 Dica:</strong> Você poderá alterar seus interesses a qualquer momento nas configurações do perfil.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-8 py-4 rounded-full font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: `${colors.textSecondary}20`,
              color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
            }}
          >
            Voltar
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNextStep}
              className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
              style={{
                background: colors.orange,
                color: '#ffffff',
              }}
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2"
              style={{
                background: colors.orange,
                color: '#ffffff',
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Criando conta...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Criar Conta
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
