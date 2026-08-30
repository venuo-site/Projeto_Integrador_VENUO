import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { EstablishmentManager } from '../components/venuo/EstablishmentManager';
import { establishments } from '../data/establishments';
import { EstablishmentModal } from '../components/venuo/EstablishmentModal';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Upload,
  Save,
  Edit2,
  Trash2,
  Plus,
  Calendar,
  Tag,
  TrendingUp,
  Users,
  Star,
  Settings,
  LogOut,
  Image as ImageIcon,
  X,
  Eye,
  DollarSign,
  BarChart3,
  Heart,
  Store,
} from 'lucide-react';

type TabType = 'establishments' | 'overview' | 'info' | 'photos' | 'schedule' | 'promotions' | 'events' | 'analytics' | 'settings';

interface DaySchedule {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  active: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  ticketPrice: string;
}

export function EstablishmentManagementPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('establishments');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof establishments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados do estabelecimento (simulado)
  const [establishmentData, setEstablishmentData] = useState({
    name: 'Bar do João',
    cnpj: '12.345.678/0001-90',
    category: 'bares',
    phone: '(11) 98765-4321',
    email: 'contato@bardojoao.com.br',
    website: 'www.bardojoao.com.br',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Loja 2',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    capacity: '80 pessoas',
    priceRange: '$$',
    description: 'Bar tradicional com música ao vivo e petiscos artesanais. Ambiente descontraído perfeito para happy hour e encontros com amigos.',
    features: ['Música ao Vivo', 'Wi-Fi Grátis', 'Estacionamento', 'Pet Friendly'],
    paymentMethods: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX'],
  });

  const [schedules, setSchedules] = useState<DaySchedule[]>([
    { day: 'Segunda-feira', open: '18:00', close: '02:00', closed: false },
    { day: 'Terça-feira', open: '18:00', close: '02:00', closed: false },
    { day: 'Quarta-feira', open: '18:00', close: '02:00', closed: false },
    { day: 'Quinta-feira', open: '18:00', close: '02:00', closed: false },
    { day: 'Sexta-feira', open: '18:00', close: '03:00', closed: false },
    { day: 'Sábado', open: '18:00', close: '03:00', closed: false },
    { day: 'Domingo', open: '18:00', close: '00:00', closed: true },
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Happy Hour Especial',
      description: 'Cervejas em dobro das 17h às 19h',
      discount: '50%',
      validUntil: '2026-12-31',
      active: true,
    },
    {
      id: '2',
      title: 'Terça da Caipirinha',
      description: 'Todas as caipirinhas com desconto',
      discount: '30%',
      validUntil: '2026-06-30',
      active: true,
    },
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Show de Rock ao Vivo',
      description: 'Banda local tocando clássicos do rock',
      date: '2026-04-20',
      time: '21:00',
      ticketPrice: 'R$ 20,00',
    },
    {
      id: '2',
      title: 'Noite de Samba',
      description: 'Roda de samba com os melhores sambistas',
      date: '2026-04-27',
      time: '20:00',
      ticketPrice: 'Grátis',
    },
  ]);

  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({});
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [showAddPromotion, setShowAddPromotion] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Analytics data (simulado)
  const analytics = {
    totalViews: 3542,
    totalLikes: 892,
    totalReservations: 156,
    rating: 4.8,
    reviewsCount: 342,
    weeklyGrowth: '+12%',
    monthlyGrowth: '+28%',
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert('Alterações salvas com sucesso!');
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const deletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleOpenModal = () => {
    // Usar o primeiro estabelecimento como exemplo (id: '1')
    const establishment = establishments.find(est => est.id === '1');
    if (establishment) {
      setSelectedEstablishment(establishment);
      setIsModalOpen(true);
    }
  };

  const addPromotion = () => {
    if (newPromotion.title && newPromotion.description) {
      const promotion: Promotion = {
        id: Date.now().toString(),
        title: newPromotion.title,
        description: newPromotion.description || '',
        discount: newPromotion.discount || '',
        validUntil: newPromotion.validUntil || '',
        active: true,
      };
      setPromotions([...promotions, promotion]);
      setNewPromotion({});
      setShowAddPromotion(false);
    }
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.description) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description || '',
        date: newEvent.date || '',
        time: newEvent.time || '',
        ticketPrice: newEvent.ticketPrice || '',
      };
      setEvents([...events, event]);
      setNewEvent({});
      setShowAddEvent(false);
    }
  };

  const tabs = [
    { id: 'establishments' as TabType, label: 'Meus Estabelecimentos', icon: Store },
    { id: 'overview' as TabType, label: 'Visão Geral', icon: TrendingUp },
    { id: 'info' as TabType, label: 'Informações', icon: Building2 },
    { id: 'photos' as TabType, label: 'Fotos', icon: ImageIcon },
    { id: 'schedule' as TabType, label: 'Horários', icon: Clock },
    { id: 'promotions' as TabType, label: 'Promoções', icon: Tag },
    { id: 'events' as TabType, label: 'Eventos', icon: Calendar },
    { id: 'analytics' as TabType, label: 'Análises', icon: BarChart3 },
    { id: 'settings' as TabType, label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Gerenciamento do Estabelecimento
              </h1>
              <p className="text-lg font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
                {establishmentData.name}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                style={{
                  background: `${colors.cyan}20`,
                  color: colors.cyan,
                  border: `1px solid ${colors.cyan}`,
                }}
              >
                <Eye size={20} />
                Ver Página
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                style={{
                  background: `${colors.orange}20`,
                  color: colors.orange,
                  border: `1px solid ${colors.orange}`,
                }}
              >
                <LogOut size={20} />
                Sair
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto pb-2">
            <div
              className="flex gap-2 p-2 rounded-xl w-fit"
              style={{ background: colors.cardBackground }}
            >
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-bold transition-all whitespace-nowrap"
                  style={{
                    background: activeTab === id ? colors.orange : 'transparent',
                    color: activeTab === id ? '#ffffff' : (colors.theme === 'light' ? '#0A2540' : '#FFFFFF'),
                  }}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Establishments Tab */}
          {activeTab === 'establishments' && (
            <EstablishmentManager />
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Visualizações', value: analytics.totalViews, icon: Eye, color: colors.orange },
                { label: 'Curtidas', value: analytics.totalLikes, icon: Heart, color: colors.cyan },
                { label: 'Reservas', value: analytics.totalReservations, icon: Calendar, color: '#10B981' },
                { label: 'Avaliação', value: analytics.rating, icon: Star, color: '#FFD700' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: colors.cardBackground,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: `${stat.color}20` }}
                    >
                      <stat.icon size={24} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}

              <div
                className="md:col-span-2 lg:col-span-4 p-6 rounded-2xl"
                style={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Crescimento Recente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <TrendingUp size={32} style={{ color: colors.orange }} />
                    <div>
                      <div className="text-2xl font-bold" style={{ color: colors.orange }}>
                        {analytics.weeklyGrowth}
                      </div>
                      <div className="text-sm font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                        Crescimento Semanal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <TrendingUp size={32} style={{ color: colors.cyan }} />
                    <div>
                      <div className="text-2xl font-bold" style={{ color: colors.cyan }}>
                        {analytics.monthlyGrowth}
                      </div>
                      <div className="text-sm font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                        Crescimento Mensal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div
              className="p-8 rounded-2xl"
              style={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Informações do Estabelecimento
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      background: colors.orange,
                      color: '#ffffff',
                    }}
                  >
                    <Edit2 size={20} />
                    Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-lg transition-all hover:scale-105 font-semibold"
                      style={{
                        background: `${colors.textSecondary}20`,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        background: colors.orange,
                        color: '#ffffff',
                      }}
                    >
                      {isSaving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Salvar
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Nome do Estabelecimento
                  </label>
                  <input
                    type="text"
                    value={establishmentData.name}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Categoria
                  </label>
                  <select
                    value={establishmentData.category}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <option value="bares" style={{ color: '#1a1a1a' }}>🍸 Bares</option>
                    <option value="restaurantes" style={{ color: '#1a1a1a' }}>🍽️ Restaurantes</option>
                    <option value="eventos" style={{ color: '#1a1a1a' }}>🎉 Eventos</option>
                    <option value="lazer" style={{ color: '#1a1a1a' }}>🌆 Lazer</option>
                    <option value="cafes" style={{ color: '#1a1a1a' }}>☕ Cafés</option>
                    <option value="baladas" style={{ color: '#1a1a1a' }}>🎵 Baladas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Telefone
                  </label>
                  <input
                    type="text"
                    value={establishmentData.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
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
                    value={establishmentData.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Website
                  </label>
                  <input
                    type="text"
                    value={establishmentData.website}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, website: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Capacidade
                  </label>
                  <input
                    type="text"
                    value={establishmentData.capacity}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, capacity: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
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
                    value={establishmentData.priceRange}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, priceRange: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <option value="$" style={{ color: '#1a1a1a' }}>$ - Econômico</option>
                    <option value="$$" style={{ color: '#1a1a1a' }}>$$ - Médio</option>
                    <option value="$$$" style={{ color: '#1a1a1a' }}>$$$ - Alto</option>
                    <option value="$$$$" style={{ color: '#1a1a1a' }}>$$$$ - Premium</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Descrição
                  </label>
                  <textarea
                    value={establishmentData.description}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEstablishmentData({ ...establishmentData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg outline-none font-medium"
                    style={{
                      background: isEditing ? `${colors.textSecondary}10` : `${colors.textSecondary}05`,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div
              className="p-8 rounded-2xl"
              style={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Galeria de Fotos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Add Photo Button */}
                <div
                  className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all min-h-[200px]"
                  style={{ borderColor: colors.border }}
                >
                  <Upload size={48} className="mb-3" style={{ color: colors.orange }} />
                  <p className="font-bold text-center" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Adicionar Foto
                  </p>
                  <p className="text-sm text-center mt-1 font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                    PNG, JPG até 5MB
                  </p>
                </div>

                {/* Existing Photos (placeholder) */}
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden group"
                    style={{ background: `${colors.textSecondary}20` }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <ImageIcon size={48} style={{ color: colors.textSecondary }} />
                    </div>
                    <button
                      className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: colors.orange, color: '#ffffff' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div
              className="p-8 rounded-2xl"
              style={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Horário de Funcionamento
                </h2>
                <button
                  onClick={() => {
                    alert('Horários salvos!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: colors.orange,
                    color: '#ffffff',
                  }}
                >
                  <Save size={20} />
                  Salvar Horários
                </button>
              </div>

              <div className="space-y-4">
                {schedules.map((schedule, index) => (
                  <div
                    key={schedule.day}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg"
                    style={{ background: `${colors.textSecondary}05` }}
                  >
                    <div className="flex items-center gap-3 md:w-48">
                      <input
                        type="checkbox"
                        checked={!schedule.closed}
                        onChange={(e) => {
                          const newSchedules = [...schedules];
                          newSchedules[index].closed = !e.target.checked;
                          setSchedules(newSchedules);
                        }}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: colors.orange }}
                      />
                      <label className="font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                        {schedule.day}
                      </label>
                    </div>

                    {!schedule.closed ? (
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-bold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>
                            Abre:
                          </label>
                          <input
                            type="time"
                            value={schedule.open}
                            onChange={(e) => {
                              const newSchedules = [...schedules];
                              newSchedules[index].open = e.target.value;
                              setSchedules(newSchedules);
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
                            value={schedule.close}
                            onChange={(e) => {
                              const newSchedules = [...schedules];
                              newSchedules[index].close = e.target.value;
                              setSchedules(newSchedules);
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
                    ) : (
                      <span className="text-sm font-bold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                        Fechado
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <div
              className="p-8 rounded-2xl"
              style={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Promoções Ativas
                </h2>
                <button
                  onClick={() => setShowAddPromotion(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: colors.orange,
                    color: '#ffffff',
                  }}
                >
                  <Plus size={20} />
                  Nova Promoção
                </button>
              </div>

              {showAddPromotion && (
                <div
                  className="mb-6 p-6 rounded-xl"
                  style={{
                    background: `${colors.orange}10`,
                    border: `1px solid ${colors.orange}30`,
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                      Adicionar Nova Promoção
                    </h3>
                    <button onClick={() => setShowAddPromotion(false)}>
                      <X size={20} style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Título da promoção"
                      value={newPromotion.title || ''}
                      onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Desconto (ex: 50%)"
                      value={newPromotion.discount || ''}
                      onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <input
                      type="date"
                      placeholder="Válido até"
                      value={newPromotion.validUntil || ''}
                      onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Descrição da promoção"
                    value={newPromotion.description || ''}
                    onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg outline-none mb-4 font-medium"
                    style={{
                      background: colors.cardBackground,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                  <button
                    onClick={addPromotion}
                    className="w-full py-2 rounded-lg font-semibold"
                    style={{ background: colors.orange, color: '#ffffff' }}
                  >
                    Adicionar Promoção
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-6 rounded-xl"
                    style={{
                      background: `${colors.textSecondary}05`,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                          {promo.title}
                        </h3>
                        <p className="mb-2 font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#D0D0D0' }}>
                          {promo.description}
                        </p>
                        <div className="flex gap-4 text-sm">
                          <span
                            className="px-3 py-1 rounded-full font-semibold"
                            style={{ background: colors.orange, color: '#ffffff' }}
                          >
                            {promo.discount}
                          </span>
                          <span className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                            Válido até: {new Date(promo.validUntil).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deletePromotion(promo.id)}
                        className="p-2 rounded-lg hover:scale-110 transition-all"
                        style={{ background: `${colors.orange}20`, color: colors.orange }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div
              className="p-8 rounded-2xl"
              style={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Próximos Eventos
                </h2>
                <button
                  onClick={() => setShowAddEvent(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: colors.cyan,
                    color: '#ffffff',
                  }}
                >
                  <Plus size={20} />
                  Novo Evento
                </button>
              </div>

              {showAddEvent && (
                <div
                  className="mb-6 p-6 rounded-xl"
                  style={{
                    background: `${colors.cyan}10`,
                    border: `1px solid ${colors.cyan}30`,
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                      Adicionar Novo Evento
                    </h3>
                    <button onClick={() => setShowAddEvent(false)}>
                      <X size={20} style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Nome do evento"
                      value={newEvent.title || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <input
                      type="date"
                      value={newEvent.date || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <input
                      type="time"
                      value={newEvent.time || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Preço do ingresso"
                      value={newEvent.ticketPrice || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, ticketPrice: e.target.value })}
                      className="px-4 py-2 rounded-lg outline-none font-medium"
                      style={{
                        background: colors.cardBackground,
                        color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Descrição do evento"
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg outline-none mb-4 font-medium"
                    style={{
                      background: colors.cardBackground,
                      color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF',
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                  <button
                    onClick={addEvent}
                    className="w-full py-2 rounded-lg font-semibold"
                    style={{ background: colors.cyan, color: '#ffffff' }}
                  >
                    Adicionar Evento
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-xl"
                    style={{
                      background: `${colors.textSecondary}05`,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                          {event.title}
                        </h3>
                        <p className="mb-3 font-medium" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#D0D0D0' }}>
                          {event.description}
                        </p>
                        <div className="space-y-1 text-sm font-semibold">
                          <div className="flex items-center gap-2" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                            <Calendar size={16} />
                            {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                          </div>
                          <div className="flex items-center gap-2" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                            <DollarSign size={16} />
                            {event.ticketPrice}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="p-2 rounded-lg hover:scale-110 transition-all"
                        style={{ background: `${colors.cyan}20`, color: colors.cyan }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div
                className="p-8 rounded-2xl"
                style={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Análise de Desempenho
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: colors.orange }}>
                      {analytics.totalViews.toLocaleString()}
                    </div>
                    <div className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>Total de Visualizações</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: colors.cyan }}>
                      {analytics.totalReservations}
                    </div>
                    <div className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>Reservas Realizadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: '#10B981' }}>
                      {analytics.rating} ⭐
                    </div>
                    <div className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                      Avaliação Média ({analytics.reviewsCount} avaliações)
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-8 rounded-2xl"
                style={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                  Gráfico de Crescimento
                </h3>
                <div
                  className="h-64 flex items-center justify-center rounded-lg"
                  style={{ background: `${colors.textSecondary}10` }}
                >
                  <p className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#B0B0B0' }}>
                    Gráfico em desenvolvimento...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div
              className="p-8 rounded-2xl"
              style={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                Configurações
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Notificações
                  </h3>
                  {['Novas reservas', 'Avaliações de clientes', 'Promoções ativas'].map((item) => (
                    <label key={item} className="flex items-center justify-between mb-3 cursor-pointer">
                      <span className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>{item}</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded"
                        style={{ accentColor: colors.orange }}
                      />
                    </label>
                  ))}
                </div>

                <div className="pt-6 border-t" style={{ borderColor: colors.border }}>
                  <h3 className="font-bold text-lg mb-3" style={{ color: colors.theme === 'light' ? '#0A2540' : '#FFFFFF' }}>
                    Privacidade
                  </h3>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-semibold" style={{ color: colors.theme === 'light' ? '#1e3a5f' : '#E0E0E0' }}>Perfil visível publicamente</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded"
                      style={{ accentColor: colors.orange }}
                    />
                  </label>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: colors.border }}>
                  <button
                    className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                    style={{ background: '#EF4444', color: '#ffffff' }}
                  >
                    Excluir Conta
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal de Detalhes */}
      <EstablishmentModal
        establishment={selectedEstablishment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
