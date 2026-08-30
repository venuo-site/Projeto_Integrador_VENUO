import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Upload,
  Check,
  ChevronLeft,
  User,
  DollarSign,
  Users,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';

interface FormData {
  // Informações Básicas
  establishmentName: string;
  cnpj: string;
  category: string;
  phone: string;
  email: string;

  // Redes Sociais
  instagram: string;
  facebook: string;
  whatsapp: string;

  // Endereço
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;

  // Funcionamento
  openingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };

  // Informações Adicionais
  capacity: string;
  priceRange: string;
  description: string;
  features: string[];
  paymentMethods: string[];

  // Mídia
  logo: File | null;
  photos: File[];
}

export function EstablishmentRegisterPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    establishmentName: '',
    cnpj: '',
    category: '',
    phone: '',
    email: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    openingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '18:00', closed: false },
      sunday: { open: '09:00', close: '18:00', closed: true },
    },
    capacity: '',
    priceRange: '$$',
    description: '',
    features: [],
    paymentMethods: [],
    logo: null,
    photos: [],
  });

  const categories = [
    { value: 'bares', label: '🍸 Bares', icon: '🍸' },
    { value: 'restaurantes', label: '🍽️ Restaurantes', icon: '🍽️' },
    { value: 'eventos', label: '🎉 Eventos', icon: '🎉' },
    { value: 'lazer', label: '🌆 Lazer', icon: '🌆' },
    { value: 'cafes', label: '☕ Cafés', icon: '☕' },
    { value: 'baladas', label: '🎵 Baladas', icon: '🎵' },
  ];

  const availableFeatures = [
    'Wi-Fi Grátis',
    'Estacionamento',
    'Ar Condicionado',
    'Música ao Vivo',
    'Pet Friendly',
    'Acessível',
    'Delivery',
    'Área Externa',
    'Reservas Online',
    'Open Bar',
    'Espaço Kids',
    'Vegano/Vegetariano',
  ];

  const paymentOptions = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX',
    'Vale Refeição',
    'Vale Alimentação',
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

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

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const togglePaymentMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simula envio de dados
    setTimeout(() => {
      setIsSubmitting(false);
      // Redireciona para a página de gerenciamento
      navigate('/dashboard');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Informações Básicas', icon: Building2 },
    { number: 2, title: 'Localização', icon: MapPin },
    { number: 3, title: 'Horário de Funcionamento', icon: Clock },
    { number: 4, title: 'Detalhes do Estabelecimento', icon: Users },
    { number: 5, title: 'Fotos e Mídia', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-5xl mx-auto">
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
              Cadastro de Estabelecimento
            </h1>
            <p className="text-lg font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
              Preencha as informações do seu estabelecimento para começar a usar o Venuo
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
          {/* Step 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Informações Básicas
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Nome do Estabelecimento *
                  </label>
                  <input
                    type="text"
                    value={formData.establishmentName}
                    onChange={(e) => handleInputChange('establishmentName', e.target.value)}
                    placeholder="Ex: Restaurante Sabor & Arte"
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
                    CNPJ *
                  </label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange('cnpj', formatCNPJ(e.target.value))}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
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
                    Categoria *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-bold"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <option value="" style={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                      Selecione uma categoria
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value} style={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
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
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contato@seurestaurante.com.br"
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
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    placeholder="@seurestaurante"
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
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    placeholder="facebook.com/seurestaurante"
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
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', formatPhone(e.target.value))}
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
              </div>
            </div>
          )}

          {/* Step 2: Localização */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Localização
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
                    placeholder="Loja 5, 2º andar"
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
                    {/* Adicionar mais estados conforme necessário */}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Horário de Funcionamento */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Horário de Funcionamento
              </h2>

              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div
                    key={day.key}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg"
                    style={{ background: `${colors.textSecondary}05` }}
                  >
                    <div className="flex items-center gap-3 md:w-48">
                      <input
                        type="checkbox"
                        checked={!formData.openingHours[day.key].closed}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            openingHours: {
                              ...prev.openingHours,
                              [day.key]: {
                                ...prev.openingHours[day.key],
                                closed: !e.target.checked,
                              },
                            },
                          }));
                        }}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: colors.orange }}
                      />
                      <label className="font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                        {day.label}
                      </label>
                    </div>

                    {!formData.openingHours[day.key].closed && (
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-bold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
                            Abre:
                          </label>
                          <input
                            type="time"
                            value={formData.openingHours[day.key].open}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                openingHours: {
                                  ...prev.openingHours,
                                  [day.key]: {
                                    ...prev.openingHours[day.key],
                                    open: e.target.value,
                                  },
                                },
                              }));
                            }}
                            className="px-3 py-2 rounded-lg outline-none font-semibold"
                            style={{
                              background: `${colors.textSecondary}10`,
                              color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                              border: `1px solid ${colors.border}`,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-bold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
                            Fecha:
                          </label>
                          <input
                            type="time"
                            value={formData.openingHours[day.key].close}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                openingHours: {
                                  ...prev.openingHours,
                                  [day.key]: {
                                    ...prev.openingHours[day.key],
                                    close: e.target.value,
                                  },
                                },
                              }));
                            }}
                            className="px-3 py-2 rounded-lg outline-none font-semibold"
                            style={{
                              background: `${colors.textSecondary}10`,
                              color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                              border: `1px solid ${colors.border}`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {formData.openingHours[day.key].closed && (
                      <span className="text-sm font-bold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                        Fechado
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Detalhes do Estabelecimento */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Detalhes do Estabelecimento
              </h2>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva seu estabelecimento, o que o torna especial, sua história..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-medium"
                  style={{
                    background: `${colors.textSecondary}10`,
                    color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                    border: `1px solid ${colors.border}`,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Capacidade
                  </label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="Ex: 100 pessoas"
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
                    Faixa de Preço
                  </label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 font-bold"
                    style={{
                      background: `${colors.textSecondary}10`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <option value="$" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>$ - Econômico</option>
                    <option value="$$" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>$$ - Médio</option>
                    <option value="$$$" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>$$$ - Alto</option>
                    <option value="$$$$" style={{ fontWeight: 'bold', color: '#1a1a1a' }}>$$$$ - Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Características
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableFeatures.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                      style={{
                        background: formData.features.includes(feature)
                          ? colors.orange
                          : `${colors.textSecondary}20`,
                        color: formData.features.includes(feature)
                          ? '#ffffff'
                          : (colors.theme === 'light' ? '#0A2540' : '#FFFFFF'),
                        border: `1px solid ${
                          formData.features.includes(feature) ? colors.orange : colors.border
                        }`,
                      }}
                    >
                      {formData.features.includes(feature) && <Check size={14} className="inline mr-1" />}
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Formas de Pagamento
                </label>
                <div className="flex flex-wrap gap-3">
                  {paymentOptions.map((method) => (
                    <button
                      key={method}
                      onClick={() => togglePaymentMethod(method)}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                      style={{
                        background: formData.paymentMethods.includes(method)
                          ? colors.orange
                          : `${colors.textSecondary}20`,
                        color: formData.paymentMethods.includes(method)
                          ? '#ffffff'
                          : (colors.theme === 'light' ? '#0A2540' : '#FFFFFF'),
                        border: `1px solid ${
                          formData.paymentMethods.includes(method) ? colors.orange : colors.border
                        }`,
                      }}
                    >
                      {formData.paymentMethods.includes(method) && <Check size={14} className="inline mr-1" />}
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Fotos e Mídia */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Fotos e Mídia
              </h2>

              <div>
                <label className="block text-sm font-bold mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Logo do Estabelecimento
                </label>
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-all"
                  style={{ borderColor: colors.border }}
                >
                  <Upload size={48} className="mx-auto mb-3" style={{ color: colors.orange }} />
                  <p className="font-bold mb-1" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Clique para fazer upload do logo
                  </p>
                  <p className="text-sm font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                    PNG, JPG até 5MB
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Fotos do Estabelecimento
                </label>
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-all"
                  style={{ borderColor: colors.border }}
                >
                  <ImageIcon size={48} className="mx-auto mb-3" style={{ color: colors.orange }} />
                  <p className="font-bold mb-1" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Adicionar fotos do ambiente, pratos, eventos
                  </p>
                  <p className="text-sm font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                    Adicione até 10 fotos - PNG, JPG até 5MB cada
                  </p>
                </div>
              </div>

              <div
                className="p-6 rounded-xl"
                style={{ background: `${colors.orange}10`, border: `1px solid ${colors.orange}30` }}
              >
                <p className="text-sm font-medium" style={{ color: colors.theme === 'light' ? '#0A2540' : '#E0E0E0' }}>
                  <strong>💡 Dica:</strong> Fotos de alta qualidade aumentam em até 70% as chances de
                  novos clientes visitarem seu estabelecimento!
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

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
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
                  Finalizando...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Finalizar Cadastro
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
