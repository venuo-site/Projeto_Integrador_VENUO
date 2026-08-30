import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeContext';
import { User, Heart, MapPin, Calendar, Clock, Star, Settings, LogOut, Bell, CreditCard, Info } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { establishments } from '../data/establishments';
import { EstablishmentModal } from '../components/venuo/EstablishmentModal';

export function ProfilePage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'settings'>('favorites');
  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof establishments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados fictícios do usuário
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    memberSince: 'Janeiro 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  });

  const favorites = [
    {
      id: '1',
      name: 'Bar do João',
      category: 'Bares',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
    },
    {
      id: '3',
      name: 'Café Moinho',
      category: 'Lazer',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
    },
    {
      id: '5',
      name: 'Pizzaria Bella Napoli',
      category: 'Restaurantes',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    },
  ];

  const visitHistory = [
    {
      id: '2',
      name: 'Restaurante Sabor & Arte',
      date: '2026-04-05',
      time: '19:30',
      rating: 5,
    },
    {
      id: '4',
      name: 'Club Noite Viva',
      date: '2026-03-28',
      time: '23:00',
      rating: 4,
    },
    {
      id: '1',
      name: 'Bar do João',
      date: '2026-03-15',
      time: '18:45',
      rating: 5,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenModal = (id: string) => {
    const establishment = establishments.find(est => est.id === id);
    if (establishment) {
      setSelectedEstablishment(establishment);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-8 rounded-2xl"
          style={{
            background: colors.cardBackground,
            border: `1px solid ${colors.border}`
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-32 h-32 rounded-full object-cover ring-4"
              style={{ ringColor: colors.orange }}
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
                {userData.name}
              </h1>
              <p className="mb-1" style={{ color: colors.textSecondary }}>
                {userData.email}
              </p>
              <p className="mb-3" style={{ color: colors.textSecondary }}>
                {userData.phone}
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Calendar size={16} style={{ color: colors.orange }} />
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  Membro desde {userData.memberSince}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                background: `${colors.orange}20`,
                color: colors.orange
              }}
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div
            className="flex gap-2 p-2 rounded-xl w-fit"
            style={{ background: colors.cardBackground }}
          >
            {[
              { id: 'favorites' as const, label: 'Favoritos', icon: Heart },
              { id: 'history' as const, label: 'Histórico', icon: Clock },
              { id: 'settings' as const, label: 'Configurações', icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  background: activeTab === id ? colors.orange : 'transparent',
                  color: activeTab === id ? '#ffffff' : colors.text
                }}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {favorites.map((place) => (
                <div
                  key={place.id}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                  style={{
                    background: colors.cardBackground,
                    border: `1px solid ${colors.border}`
                  }}
                  onClick={() => handleOpenModal(place.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button
                      className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md"
                      style={{ background: colors.orange, color: '#ffffff' }}
                    >
                      <Heart size={18} fill="#ffffff" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                      {place.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm px-3 py-1 rounded-full"
                        style={{
                          background: `${colors.cyan}20`,
                          color: colors.cyan
                        }}
                      >
                        {place.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={16} fill={colors.orange} style={{ color: colors.orange }} />
                        <span className="font-semibold" style={{ color: colors.text }}>
                          {place.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {visitHistory.map((visit) => (
                <div
                  key={`${visit.id}-${visit.date}`}
                  className="p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all cursor-pointer"
                  style={{
                    background: colors.cardBackground,
                    border: `1px solid ${colors.border}`
                  }}
                  onClick={() => handleOpenModal(visit.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: `${colors.orange}20` }}
                    >
                      <MapPin size={24} style={{ color: colors.orange }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
                        {visit.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm" style={{ color: colors.textSecondary }}>
                        <span>{new Date(visit.date).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span>{visit.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < visit.rating ? colors.orange : 'none'}
                        style={{ color: i < visit.rating ? colors.orange : colors.textSecondary }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`
                }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: colors.text }}>
                  <User size={24} style={{ color: colors.orange }} />
                  Informações Pessoais
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg outline-none transition-all focus:ring-2"
                      style={{
                        background: `${colors.textSecondary}10`,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg outline-none transition-all focus:ring-2"
                      style={{
                        background: `${colors.textSecondary}10`,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg outline-none transition-all focus:ring-2"
                      style={{
                        background: `${colors.textSecondary}10`,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    />
                  </div>
                  <button
                    className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105"
                    style={{ background: colors.orange, color: '#ffffff' }}
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: colors.cardBackground,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ color: colors.text }}>
                    <Bell size={24} style={{ color: colors.orange }} />
                    Notificações
                  </h3>
                  <div className="space-y-3">
                    {['Ofertas e Promoções', 'Novos Estabelecimentos', 'Atualizações de Favoritos'].map((item) => (
                      <label key={item} className="flex items-center justify-between cursor-pointer">
                        <span style={{ color: colors.text }}>{item}</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 rounded"
                          style={{ accentColor: colors.orange }}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: colors.cardBackground,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ color: colors.text }}>
                    <CreditCard size={24} style={{ color: colors.orange }} />
                    Métodos de Pagamento
                  </h3>
                  <p className="mb-4" style={{ color: colors.textSecondary }}>
                    Nenhum método de pagamento cadastrado
                  </p>
                  <button
                    className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105"
                    style={{
                      background: `${colors.blue}20`,
                      color: colors.blue
                    }}
                  >
                    Adicionar Cartão
                  </button>
                </div>

                <div
                  className="p-6 rounded-2xl cursor-pointer transition-all hover:scale-105"
                  style={{
                    background: colors.cardBackground,
                    border: `2px solid ${colors.orange}`
                  }}
                  onClick={() => navigate('/sobre-projeto')}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ color: colors.orange }}>
                    <Info size={24} style={{ color: colors.orange }} />
                    Sobre o Projeto
                  </h3>
                  <p className="mb-4" style={{ color: colors.textSecondary }}>
                    Saiba mais sobre o Venuo, tecnologias utilizadas e funcionalidades
                  </p>
                  <button
                    className="w-full py-3 rounded-lg font-semibold transition-all"
                    style={{
                      background: `${colors.orange}20`,
                      color: colors.orange
                    }}
                  >
                    Ver Informações
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
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
