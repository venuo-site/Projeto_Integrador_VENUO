import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Tag, Calendar, Save, Trash2, Plus, Edit2, Building2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../ThemeContext';

interface EstablishmentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryType = 'Bares' | 'Restaurantes' | 'Eventos' | 'Lazer';
type TabType = 'horarios' | 'promocoes' | 'eventos';
type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

interface Schedule {
  day: DayOfWeek;
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
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const initialSchedule: Schedule[] = [
  { day: 'Segunda', open: '10:00', close: '22:00', closed: false },
  { day: 'Terça', open: '10:00', close: '22:00', closed: false },
  { day: 'Quarta', open: '10:00', close: '22:00', closed: false },
  { day: 'Quinta', open: '10:00', close: '22:00', closed: false },
  { day: 'Sexta', open: '10:00', close: '23:00', closed: false },
  { day: 'Sábado', open: '12:00', close: '23:00', closed: false },
  { day: 'Domingo', open: '12:00', close: '20:00', closed: true },
];

export function EstablishmentDashboard({ isOpen, onClose }: EstablishmentDashboardProps) {
  const { colors } = useTheme();
  const [category, setCategory] = useState<CategoryType>('Bares');
  const [activeTab, setActiveTab] = useState<TabType>('horarios');
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedule);
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Happy Hour',
      description: 'Cerveja em dobro das 17h às 19h',
      discount: '50%',
      validUntil: '2026-12-31',
    },
  ]);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Show ao Vivo',
      description: 'Banda local tocando rock',
      date: '2026-04-15',
      time: '20:00',
    },
  ]);
  const [isAddingPromotion, setIsAddingPromotion] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const categoryIcons = {
    Bares: '🍸',
    Restaurantes: '🍽️',
    Eventos: '🎉',
    Lazer: '🌆',
  };

  const categoryColors = {
    Bares: '#FF6B6B',
    Restaurantes: '#4ECDC4',
    Eventos: '#FFD93D',
    Lazer: '#6BCF7F',
  };

  const handleScheduleChange = (index: number, field: keyof Schedule, value: string | boolean) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  const handleSaveSchedule = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Horários salvos com sucesso!');
    }, 1000);
  };

  const handleAddPromotion = (promotion: Omit<Promotion, 'id'>) => {
    const newPromotion = { ...promotion, id: Date.now().toString() };
    setPromotions([...promotions, newPromotion]);
    setIsAddingPromotion(false);
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
    setIsAddingEvent(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-lg"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
            onClick={onClose}
          />

          {/* Dashboard */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] border-4 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.orange,
            }}
          >
            {/* Header */}
            <div 
              className="relative px-8 py-6 border-b-4 flex items-center justify-between"
              style={{
                backgroundColor: colors.orange,
                borderColor: colors.orange,
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <Building2 size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Painel do Estabelecimento</h1>
                  <p className="text-white/80 text-sm">Gerencie seu negócio no Venuo</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl backdrop-blur-xl flex items-center gap-2 font-bold"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  }}
                >
                  <LogOut size={18} />
                  Sair
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full backdrop-blur-xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  }}
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

            {/* Category Selector */}
            <div 
              className="px-8 py-5 border-b-2"
              style={{ 
                backgroundColor: colors.theme === 'light' ? '#F9FAFB' : '#0F172A',
                borderColor: colors.glassBorder 
              }}
            >
              <p className="text-sm font-bold mb-3" style={{ color: colors.textSecondary }}>
                Categoria do Estabelecimento
              </p>
              <div className="flex gap-3">
                {(['Bares', 'Restaurantes', 'Eventos', 'Lazer'] as CategoryType[]).map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategory(cat)}
                    className="px-5 py-3 rounded-xl font-bold text-sm transition-all border-2 flex items-center gap-2"
                    style={{
                      backgroundColor: category === cat
                        ? categoryColors[cat]
                        : 'rgba(0, 0, 0, 0)',
                      borderColor: category === cat
                        ? categoryColors[cat]
                        : colors.glassBorder,
                      color: category === cat
                        ? 'white'
                        : colors.textSecondary,
                    }}
                  >
                    <span className="text-lg">{categoryIcons[cat]}</span>
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div 
              className="px-8 py-4 border-b-2 flex gap-2"
              style={{ 
                backgroundColor: colors.theme === 'light' ? '#FFFFFF' : '#1E293B',
                borderColor: colors.glassBorder 
              }}
            >
              {[
                { id: 'horarios' as TabType, label: 'Horários de Funcionamento', icon: Clock },
                { id: 'promocoes' as TabType, label: 'Promoções', icon: Tag },
                { id: 'eventos' as TabType, label: 'Eventos', icon: Calendar },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all border-2"
                  style={{
                    backgroundColor: activeTab === tab.id
                      ? colors.orange
                      : 'rgba(0, 0, 0, 0)',
                    borderColor: activeTab === tab.id
                      ? colors.orange
                      : colors.glassBorder,
                    color: activeTab === tab.id 
                      ? 'white'
                      : colors.textSecondary,
                  }}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                {/* Horários Tab */}
                {activeTab === 'horarios' && (
                  <motion.div
                    key="horarios"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {schedules.map((schedule, index) => (
                      <motion.div
                        key={schedule.day}
                        whileHover={{ scale: 1.01 }}
                        className="p-5 rounded-2xl border-2 flex items-center gap-4"
                        style={{
                          backgroundColor: colors.theme === 'light' ? '#FFFFFF' : '#1E293B',
                          borderColor: schedule.closed ? '#EF4444' : colors.glassBorder,
                        }}
                      >
                        <div className="flex-1">
                          <p className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                            {schedule.day}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={schedule.closed}
                              onChange={(e) => handleScheduleChange(index, 'closed', e.target.checked)}
                              className="w-5 h-5 rounded accent-red-500"
                            />
                            <span className="font-semibold text-sm" style={{ color: colors.textSecondary }}>
                              Fechado
                            </span>
                          </label>

                          {!schedule.closed && (
                            <>
                              <input
                                type="time"
                                value={schedule.open}
                                onChange={(e) => handleScheduleChange(index, 'open', e.target.value)}
                                className="px-4 py-2 rounded-xl border-2 font-semibold"
                                style={{
                                  backgroundColor: colors.glassBg,
                                  borderColor: colors.glassBorder,
                                  color: colors.textPrimary,
                                }}
                              />
                              <span style={{ color: colors.textSecondary }}>até</span>
                              <input
                                type="time"
                                value={schedule.close}
                                onChange={(e) => handleScheduleChange(index, 'close', e.target.value)}
                                className="px-4 py-2 rounded-xl border-2 font-semibold"
                                style={{
                                  backgroundColor: colors.glassBg,
                                  borderColor: colors.glassBorder,
                                  color: colors.textPrimary,
                                }}
                              />
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveSchedule}
                      disabled={isSaving}
                      className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl"
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
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Salvar Horários
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* Promoções Tab */}
                {activeTab === 'promocoes' && (
                  <motion.div
                    key="promocoes"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsAddingPromotion(true)}
                      className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl border-2 border-dashed"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: colors.orange,
                        color: colors.orange,
                      }}
                    >
                      <Plus size={24} />
                      Adicionar Nova Promoção
                    </motion.button>

                    {isAddingPromotion && (
                      <PromotionForm 
                        onSave={handleAddPromotion} 
                        onCancel={() => setIsAddingPromotion(false)}
                        colors={colors}
                      />
                    )}

                    {promotions.map((promo) => (
                      <motion.div
                        key={promo.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-6 rounded-2xl border-2"
                        style={{
                          backgroundColor: colors.theme === 'light' ? '#FFFFFF' : '#1E293B',
                          borderColor: colors.orange,
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">🏷️</span>
                              <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                                {promo.title}
                              </h3>
                              <span 
                                className="px-3 py-1 rounded-full text-sm font-bold"
                                style={{ 
                                  backgroundColor: colors.orange,
                                  color: 'white' 
                                }}
                              >
                                -{promo.discount}
                              </span>
                            </div>
                            <p style={{ color: colors.textSecondary }} className="mb-2">
                              {promo.description}
                            </p>
                            <p className="text-sm font-semibold" style={{ color: colors.cyan }}>
                              Válido até: {new Date(promo.validUntil).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeletePromotion(promo.id)}
                            className="p-2 rounded-xl"
                            style={{ 
                              backgroundColor: '#FEE2E2',
                              color: '#DC2626' 
                            }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Eventos Tab */}
                {activeTab === 'eventos' && (
                  <motion.div
                    key="eventos"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsAddingEvent(true)}
                      className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl border-2 border-dashed"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: colors.cyan,
                        color: colors.cyan,
                      }}
                    >
                      <Plus size={24} />
                      Adicionar Novo Evento
                    </motion.button>

                    {isAddingEvent && (
                      <EventForm 
                        onSave={handleAddEvent} 
                        onCancel={() => setIsAddingEvent(false)}
                        colors={colors}
                      />
                    )}

                    {events.map((event) => (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-6 rounded-2xl border-2"
                        style={{
                          backgroundColor: colors.theme === 'light' ? '#FFFFFF' : '#1E293B',
                          borderColor: colors.cyan,
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">🎊</span>
                              <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                                {event.title}
                              </h3>
                            </div>
                            <p style={{ color: colors.textSecondary }} className="mb-2">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-semibold flex items-center gap-1" style={{ color: colors.orange }}>
                                <Calendar size={16} />
                                {new Date(event.date).toLocaleDateString('pt-BR')}
                              </p>
                              <p className="text-sm font-semibold flex items-center gap-1" style={{ color: colors.cyan }}>
                                <Clock size={16} />
                                {event.time}
                              </p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-2 rounded-xl"
                            style={{ 
                              backgroundColor: '#FEE2E2',
                              color: '#DC2626' 
                            }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Promotion Form Component
function PromotionForm({ onSave, onCancel, colors }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, discount, validUntil });
    setTitle('');
    setDescription('');
    setDiscount('');
    setValidUntil('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl border-2 space-y-4"
      style={{
        backgroundColor: colors.theme === 'light' ? '#FFF7ED' : '#0F172A',
        borderColor: colors.orange,
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da promoção"
        required
        className="w-full px-4 py-3 rounded-xl border-2 font-semibold"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.glassBorder,
          color: colors.textPrimary,
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da promoção"
        required
        rows={3}
        className="w-full px-4 py-3 rounded-xl border-2 font-semibold"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.glassBorder,
          color: colors.textPrimary,
        }}
      />
      <div className="flex gap-3">
        <input
          type="text"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Desconto (ex: 50%)"
          required
          className="flex-1 px-4 py-3 rounded-xl border-2 font-semibold"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.glassBorder,
            color: colors.textPrimary,
          }}
        />
        <input
          type="date"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-xl border-2 font-semibold"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.glassBorder,
            color: colors.textPrimary,
          }}
        />
      </div>
      <div className="flex gap-3">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            backgroundColor: colors.orange,
            color: '#FFFFFF',
          }}
        >
          <Save size={18} />
          Salvar
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-6 py-3 rounded-xl font-bold border-2"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: colors.glassBorder,
            color: colors.textSecondary,
          }}
        >
          Cancelar
        </motion.button>
      </div>
    </motion.form>
  );
}

// Event Form Component
function EventForm({ onSave, onCancel, colors }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, date, time });
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl border-2 space-y-4"
      style={{
        backgroundColor: colors.theme === 'light' ? '#ECFEFF' : '#0F172A',
        borderColor: colors.cyan,
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do evento"
        required
        className="w-full px-4 py-3 rounded-xl border-2 font-semibold"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.glassBorder,
          color: colors.textPrimary,
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição do evento"
        required
        rows={3}
        className="w-full px-4 py-3 rounded-xl border-2 font-semibold"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.glassBorder,
          color: colors.textPrimary,
        }}
      />
      <div className="flex gap-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-xl border-2 font-semibold"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.glassBorder,
            color: colors.textPrimary,
          }}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-xl border-2 font-semibold"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.glassBorder,
            color: colors.textPrimary,
          }}
        />
      </div>
      <div className="flex gap-3">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            backgroundColor: colors.orange,
            color: 'white',
          }}
        >
          <Save size={18} />
          Salvar
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-6 py-3 rounded-xl font-bold border-2"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: colors.glassBorder,
            color: colors.textSecondary,
          }}
        >
          Cancelar
        </motion.button>
      </div>
    </motion.form>
  );
}
