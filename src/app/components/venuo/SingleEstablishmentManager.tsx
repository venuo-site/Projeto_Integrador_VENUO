import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Building2, Image as ImageIcon, Clock, Tag, Calendar,
  BarChart3, Settings, Save, Upload, Trash2, Plus, X, Check,
  Users, Baby, Dog, Accessibility, Music, UtensilsCrossed, DollarSign,
  Eye, Heart, Star, TrendingUp
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface SingleEstablishmentManagerProps {
  establishmentId: string;
  onClose: () => void;
}

type TabType = 'info' | 'audience' | 'menu' | 'photos' | 'schedule' | 'promotions' | 'events' | 'analytics' | 'settings';

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

export function SingleEstablishmentManager({ establishmentId, onClose }: SingleEstablishmentManagerProps) {
  const { colors } = useTheme();
  const { establishments, updateEstablishment } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isSaving, setIsSaving] = useState(false);

  const establishment = establishments.find(e => e.id === establishmentId);

  // Bloquear rolagem da tela quando o modal estiver aberto
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';
    return () => {
      window.document.body.style.overflow = 'unset';
    };
  }, []);

  const [formData, setFormData] = useState({
    ...establishment,
    targetAudience: establishment?.targetAudience || {
      ageRange: [],
      familyFriendly: false,
      petFriendly: false,
      accessibility: false,
      musicStyle: [],
    },
    menu: establishment?.menu || [],
    photos: establishment?.photos || [],
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

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    garnishes: '',
  });

  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    ticketPrice: '',
  });

  const [newPhoto, setNewPhoto] = useState('');

  if (!establishment) {
    return null;
  }

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateEstablishment(establishmentId, formData);
      setIsSaving(false);
      alert('Alterações salvas com sucesso!');
    }, 1000);
  };

  const addMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      const menuItem = {
        id: Date.now().toString(),
        name: newMenuItem.name,
        description: newMenuItem.description,
        price: newMenuItem.price,
        garnishes: newMenuItem.garnishes ? newMenuItem.garnishes.split(',').map(g => g.trim()) : [],
      };

      setFormData({
        ...formData,
        menu: [...(formData.menu || []), menuItem],
      });

      setNewMenuItem({ name: '', description: '', price: '', garnishes: '' });
    }
  };

  const removeMenuItem = (id: string) => {
    setFormData({
      ...formData,
      menu: formData.menu?.filter(item => item.id !== id),
    });
  };

  const addPhoto = () => {
    if (newPhoto) {
      setFormData({
        ...formData,
        photos: [...(formData.photos || []), newPhoto],
      });
      setNewPhoto('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos?.filter((_, i) => i !== index),
    });
  };

  const addPromotion = () => {
    if (newPromotion.title) {
      const promotion: Promotion = {
        id: Date.now().toString(),
        ...newPromotion,
        active: true,
      };
      setPromotions([...promotions, promotion]);
      setNewPromotion({ title: '', description: '', discount: '', validUntil: '' });
    }
  };

  const deletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const addEvent = () => {
    if (newEvent.title) {
      const event: Event = {
        id: Date.now().toString(),
        ...newEvent,
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', description: '', date: '', time: '', ticketPrice: '' });
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const toggleAgeRange = (age: string) => {
    const ageRange = formData.targetAudience.ageRange.includes(age)
      ? formData.targetAudience.ageRange.filter(a => a !== age)
      : [...formData.targetAudience.ageRange, age];

    setFormData({
      ...formData,
      targetAudience: { ...formData.targetAudience, ageRange },
    });
  };

  const toggleMusicStyle = (style: string) => {
    const musicStyle = formData.targetAudience.musicStyle?.includes(style)
      ? formData.targetAudience.musicStyle.filter(s => s !== style)
      : [...(formData.targetAudience.musicStyle || []), style];

    setFormData({
      ...formData,
      targetAudience: { ...formData.targetAudience, musicStyle },
    });
  };

  const tabs = [
    { id: 'info', label: 'Informações', icon: Building2 },
    { id: 'audience', label: 'Público-Alvo', icon: Users },
    { id: 'menu', label: 'Cardápio', icon: UtensilsCrossed },
    { id: 'photos', label: 'Fotos', icon: ImageIcon },
    { id: 'schedule', label: 'Horários', icon: Clock },
    { id: 'promotions', label: 'Promoções', icon: Tag },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'analytics', label: 'Análises', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const ageRanges = ['Crianças (0-12)', 'Jovens (13-25)', 'Adultos (26-59)', 'Idosos (60+)'];
  const musicStyles = ['Samba', 'Rock', 'MPB', 'Eletrônica', 'Sertanejo', 'Jazz', 'Pop'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto border-2 rounded-2xl p-6 relative space-y-6"
        style={{
          backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 37, 64, 0.85)',
          borderColor: colors.orange,
        }}
      >
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl"
          style={{
            backgroundColor: `${colors.orange}20`,
            color: colors.orange,
          }}
        >
          <ArrowLeft size={24} />
        </motion.button>

        <div className="flex-1">
          <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
            {establishment.name}
          </h2>
          <p className="text-sm" style={{ color: colors.textPrimary }}>
            Gerenciamento completo do estabelecimento
          </p>
        </div>

        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
          style={{
            backgroundColor: colors.orange,
            color: 'white',
            opacity: isSaving ? 0.7 : 1,
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
              Salvar Alterações
            </>
          )}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === id ? colors.orange : 'rgba(0, 0, 0, 0)',
                color: activeTab === id ? 'white' : colors.textPrimary,
                border: `2px solid ${activeTab === id ? colors.orange : colors.glassBorder}`,
              }}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-2 rounded-2xl p-6"
        style={{
          backgroundColor: colors.theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 37, 64, 0.85)',
          borderColor: colors.glassBorder,
        }}
      >
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Informações Básicas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                  Nome do Estabelecimento
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                  CNPJ
                </label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                >
                  <option value="restaurante" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>🍽️ Restaurante</option>
                  <option value="bar" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>🍸 Bar</option>
                  <option value="cafe" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>☕ Café</option>
                  <option value="eventos" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>🎉 Eventos</option>
                  <option value="lazer" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>🎮 Lazer</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: colors.orange }}
                  />
                  <span className="font-bold" style={{ color: colors.textPrimary }}>
                    Estabelecimento Ativo
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === 'audience' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Público-Alvo
            </h3>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-bold mb-3" style={{ color: colors.textPrimary }}>
                Faixa Etária
              </label>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((age) => (
                  <button
                    key={age}
                    onClick={() => toggleAgeRange(age)}
                    className="px-4 py-2 rounded-full font-bold text-sm transition-all"
                    style={{
                      backgroundColor: formData.targetAudience.ageRange.includes(age) ? colors.orange : `${colors.orange}20`,
                      color: formData.targetAudience.ageRange.includes(age) ? 'white' : colors.orange,
                      border: `2px solid ${colors.orange}`,
                    }}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2"
                style={{
                  borderColor: formData.targetAudience.familyFriendly ? colors.orange : colors.glassBorder,
                  backgroundColor: formData.targetAudience.familyFriendly ? `${colors.orange}10` : 'rgba(0, 0, 0, 0)',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.targetAudience.familyFriendly}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetAudience: { ...formData.targetAudience, familyFriendly: e.target.checked },
                  })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: colors.orange }}
                />
                <Baby size={24} style={{ color: colors.orange }} />
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  Ambiente Familiar
                </span>
              </label>

              <label
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2"
                style={{
                  borderColor: formData.targetAudience.petFriendly ? colors.orange : colors.glassBorder,
                  backgroundColor: formData.targetAudience.petFriendly ? `${colors.orange}10` : 'rgba(0, 0, 0, 0)',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.targetAudience.petFriendly}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetAudience: { ...formData.targetAudience, petFriendly: e.target.checked },
                  })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: colors.orange }}
                />
                <Dog size={24} style={{ color: colors.orange }} />
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  Pet Friendly
                </span>
              </label>

              <label
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2"
                style={{
                  borderColor: formData.targetAudience.accessibility ? colors.orange : colors.glassBorder,
                  backgroundColor: formData.targetAudience.accessibility ? `${colors.orange}10` : 'rgba(0, 0, 0, 0)',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.targetAudience.accessibility}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetAudience: { ...formData.targetAudience, accessibility: e.target.checked },
                  })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: colors.orange }}
                />
                <Accessibility size={24} style={{ color: colors.orange }} />
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  Acessibilidade
                </span>
              </label>
            </div>

            {/* Music Style */}
            <div>
              <label className="block text-sm font-bold mb-3" style={{ color: colors.textPrimary }}>
                Estilo Musical
              </label>
              <div className="flex flex-wrap gap-2">
                {musicStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => toggleMusicStyle(style)}
                    className="px-4 py-2 rounded-full font-bold text-sm transition-all"
                    style={{
                      backgroundColor: formData.targetAudience.musicStyle?.includes(style) ? colors.cyan : `${colors.cyan}20`,
                      color: formData.targetAudience.musicStyle?.includes(style) ? 'white' : colors.cyan,
                      border: `2px solid ${colors.cyan}`,
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                Cardápio
              </h3>
            </div>

            {/* Add Menu Item Form */}
            <div
              className="p-4 rounded-xl border-2"
              style={{
                backgroundColor: `${colors.orange}10`,
                borderColor: colors.orange,
              }}
            >
              <h4 className="font-bold mb-3" style={{ color: colors.textPrimary }}>
                Adicionar Item
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nome do item"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="text"
                  placeholder="Preço (ex: R$ 25,00)"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="text"
                  placeholder="Guarnições (separadas por vírgula)"
                  value={newMenuItem.garnishes}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, garnishes: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <button
                onClick={addMenuItem}
                className="mt-3 px-6 py-2 rounded-xl font-bold flex items-center gap-2"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white',
                }}
              >
                <Plus size={20} />
                Adicionar ao Cardápio
              </button>
            </div>

            {/* Menu Items List */}
            <div className="space-y-3">
              {formData.menu && formData.menu.length > 0 ? (
                formData.menu.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border-2 flex justify-between items-start"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.glassBorder,
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                          {item.name}
                        </h4>
                        <span
                          className="px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1"
                          style={{
                            backgroundColor: `${colors.orange}20`,
                            color: colors.orange,
                          }}
                        >
                          <DollarSign size={16} />
                          {item.price}
                        </span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: colors.textPrimary }}>
                        {item.description}
                      </p>
                      {item.garnishes && item.garnishes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.garnishes.map((garnish, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded text-xs font-bold"
                              style={{
                                backgroundColor: `${colors.cyan}15`,
                                color: colors.cyan,
                              }}
                            >
                              {garnish}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeMenuItem(item.id)}
                      className="ml-4 p-2 rounded-lg"
                      style={{
                        backgroundColor: `${colors.orange}20`,
                        color: colors.orange,
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <UtensilsCrossed size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhum item no cardápio. Adicione itens acima.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              Galeria de Fotos
            </h3>

            {/* Add Photo */}
            <div
              className="p-4 rounded-xl border-2"
              style={{
                backgroundColor: `${colors.cyan}10`,
                borderColor: colors.cyan,
              }}
            >
              <h4 className="font-bold mb-3" style={{ color: colors.textPrimary }}>
                Adicionar Foto
              </h4>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="URL da foto"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <button
                  onClick={addPhoto}
                  className="px-6 py-2 rounded-xl font-bold flex items-center gap-2"
                  style={{
                    backgroundColor: colors.cyan,
                    color: 'white',
                  }}
                >
                  <Plus size={20} />
                  Adicionar
                </button>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.photos && formData.photos.length > 0 ? (
                formData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                  >
                    <img
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: colors.orange,
                        color: 'white',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <ImageIcon size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhuma foto cadastrada. Adicione fotos acima.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              Horário de Funcionamento
            </h3>

            <div className="space-y-4">
              {schedules.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: `${colors.textPrimary}05` }}
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
                    <label className="font-bold" style={{ color: colors.textPrimary }}>
                      {schedule.day}
                    </label>
                  </div>

                  {!schedule.closed ? (
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-bold" style={{ color: colors.textPrimary }}>
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
                            backgroundColor: `${colors.textPrimary}10`,
                            color: colors.textPrimary,
                            border: `1px solid ${colors.glassBorder}`,
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-bold" style={{ color: colors.textPrimary }}>
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
                            backgroundColor: `${colors.textPrimary}10`,
                            color: colors.textPrimary,
                            border: `1px solid ${colors.glassBorder}`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm font-bold" style={{ color: colors.textMuted }}>
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
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              Promoções
            </h3>

            {/* Add Promotion Form */}
            <div
              className="p-4 rounded-xl border-2"
              style={{
                backgroundColor: `${colors.orange}10`,
                borderColor: colors.orange,
              }}
            >
              <h4 className="font-bold mb-3" style={{ color: colors.textPrimary }}>
                Nova Promoção
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Título da promoção"
                  value={newPromotion.title}
                  onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="text"
                  placeholder="Desconto (ex: 50%)"
                  value={newPromotion.discount}
                  onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="date"
                  placeholder="Válido até"
                  value={newPromotion.validUntil}
                  onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <textarea
                  placeholder="Descrição"
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                  rows={1}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <button
                onClick={addPromotion}
                className="mt-3 px-6 py-2 rounded-xl font-bold flex items-center gap-2"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white',
                }}
              >
                <Plus size={20} />
                Adicionar Promoção
              </button>
            </div>

            {/* Promotions List */}
            <div className="space-y-3">
              {promotions.length > 0 ? (
                promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-4 rounded-xl border-2 flex justify-between items-start"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.glassBorder,
                    }}
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2" style={{ color: colors.textPrimary }}>
                        {promo.title}
                      </h4>
                      <p className="text-sm mb-2" style={{ color: colors.textPrimary }}>
                        {promo.description}
                      </p>
                      <div className="flex gap-3 text-sm">
                        <span
                          className="px-3 py-1 rounded-full font-bold"
                          style={{ backgroundColor: colors.orange, color: 'white' }}
                        >
                          {promo.discount}
                        </span>
                        <span className="font-semibold" style={{ color: colors.textPrimary }}>
                          Válido até: {new Date(promo.validUntil).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePromotion(promo.id)}
                      className="ml-4 p-2 rounded-lg"
                      style={{
                        backgroundColor: `${colors.orange}20`,
                        color: colors.orange,
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Tag size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhuma promoção cadastrada.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              Eventos
            </h3>

            {/* Add Event Form */}
            <div
              className="p-4 rounded-xl border-2"
              style={{
                backgroundColor: `${colors.cyan}10`,
                borderColor: colors.cyan,
              }}
            >
              <h4 className="font-bold mb-3" style={{ color: colors.textPrimary }}>
                Novo Evento
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nome do evento"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="text"
                  placeholder="Preço do ingresso"
                  value={newEvent.ticketPrice}
                  onChange={(e) => setNewEvent({ ...newEvent, ticketPrice: e.target.value })}
                  className="px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
                <textarea
                  placeholder="Descrição do evento"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={1}
                  className="md:col-span-2 px-4 py-2 rounded-xl border-2 outline-none font-semibold"
                  style={{
                    backgroundColor: colors.glassBg,
                    borderColor: colors.glassBorder,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <button
                onClick={addEvent}
                className="mt-3 px-6 py-2 rounded-xl font-bold flex items-center gap-2"
                style={{
                  backgroundColor: colors.cyan,
                  color: 'white',
                }}
              >
                <Plus size={20} />
                Adicionar Evento
              </button>
            </div>

            {/* Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl border-2"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.glassBorder,
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                        {event.title}
                      </h4>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${colors.cyan}20`,
                          color: colors.cyan,
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm mb-3" style={{ color: colors.textPrimary }}>
                      {event.description}
                    </p>
                    <div className="space-y-1 text-sm font-semibold">
                      <div className="flex items-center gap-2" style={{ color: colors.textPrimary }}>
                        <Calendar size={16} />
                        {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: colors.textPrimary }}>
                        <DollarSign size={16} />
                        {event.ticketPrice}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Calendar size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
                  <p style={{ color: colors.textPrimary }}>
                    Nenhum evento cadastrado.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Análise de Desempenho
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Visualizações', value: 3542, icon: Eye, color: colors.orange },
                { label: 'Curtidas', value: 892, icon: Heart, color: colors.cyan },
                { label: 'Avaliação', value: '4.8', icon: Star, color: '#FFD700' },
                { label: 'Crescimento', value: '+28%', icon: TrendingUp, color: '#10B981' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: colors.glassBg,
                    border: `1px solid ${colors.glassBorder}`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-8 rounded-xl"
              style={{
                backgroundColor: colors.glassBg,
                border: `1px solid ${colors.glassBorder}`,
              }}
            >
              <h4 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                Gráfico de Crescimento
              </h4>
              <div
                className="h-64 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: `${colors.textPrimary}10` }}
              >
                <p className="font-semibold" style={{ color: colors.textPrimary }}>
                  Gráfico em desenvolvimento...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              Configurações
            </h3>

            <div>
              <h4 className="font-bold text-lg mb-3" style={{ color: colors.textPrimary }}>
                Notificações
              </h4>
              {['Novas reservas', 'Avaliações de clientes', 'Promoções ativas'].map((item) => (
                <label key={item} className="flex items-center justify-between mb-3 cursor-pointer">
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{item}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded"
                    style={{ accentColor: colors.orange }}
                  />
                </label>
              ))}
            </div>

            <div className="pt-6 border-t" style={{ borderColor: colors.glassBorder }}>
              <h4 className="font-bold text-lg mb-3" style={{ color: colors.textPrimary }}>
                Privacidade
              </h4>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  Perfil visível publicamente
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded"
                  style={{ accentColor: colors.orange }}
                />
              </label>
            </div>
          </div>
        )}
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
