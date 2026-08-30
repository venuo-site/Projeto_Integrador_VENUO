import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Building2, MapPin, Tag, Check, X, Edit2, Trash2, Eye, Users, UtensilsCrossed, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { EstablishmentDetails } from './EstablishmentDetails';
import { SingleEstablishmentManager } from './SingleEstablishmentManager';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  garnishes?: string[];
}

export function EstablishmentManager() {
  const { colors } = useTheme();
  const { establishments, addEstablishment, updateEstablishment, deleteEstablishment } = useAuth();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [viewingEstablishment, setViewingEstablishment] = useState<any>(null);
  const [managingEstablishmentId, setManagingEstablishmentId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<any>({
    cnpj: '',
    name: '',
    address: '',
    category: 'restaurante',
    isActive: true,
    targetAudience: {
      ageRange: [],
      familyFriendly: false,
      petFriendly: false,
      accessibility: false,
      musicStyle: [],
    },
    menu: [],
    photos: [],
  });

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    garnishes: '',
  });

  const [newPhoto, setNewPhoto] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    addEstablishment(formData);
    setIsAddingNew(false);

    setFormData({
      cnpj: '',
      name: '',
      address: '',
      category: 'restaurante',
      isActive: true,
      targetAudience: {
        ageRange: [],
        familyFriendly: false,
        petFriendly: false,
        accessibility: false,
        musicStyle: [],
      },
      menu: [],
      photos: [],
    });
    setCurrentStep(1);
  };

  const handleEdit = (id: string) => {
    setManagingEstablishmentId(id);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setCurrentStep(1);
    setFormData({
      cnpj: '',
      name: '',
      address: '',
      category: 'restaurante',
      isActive: true,
      targetAudience: {
        ageRange: [],
        familyFriendly: false,
        petFriendly: false,
        accessibility: false,
        musicStyle: [],
      },
      menu: [],
      photos: [],
    });
  };

  const addMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      const menuItem: MenuItem = {
        id: Date.now().toString(),
        name: newMenuItem.name,
        description: newMenuItem.description,
        price: newMenuItem.price,
        garnishes: newMenuItem.garnishes ? newMenuItem.garnishes.split(',').map(g => g.trim()) : [],
      };

      setFormData({
        ...formData,
        menu: [...formData.menu, menuItem],
      });

      setNewMenuItem({
        name: '',
        description: '',
        price: '',
        garnishes: '',
      });
    }
  };

  const removeMenuItem = (id: string) => {
    setFormData({
      ...formData,
      menu: formData.menu.filter((item: MenuItem) => item.id !== id),
    });
  };

  const addPhoto = () => {
    if (newPhoto) {
      setFormData({
        ...formData,
        photos: [...formData.photos, newPhoto],
      });
      setNewPhoto('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_: string, i: number) => i !== index),
    });
  };

  const toggleAgeRange = (age: string) => {
    const ageRange = formData.targetAudience.ageRange.includes(age)
      ? formData.targetAudience.ageRange.filter((a: string) => a !== age)
      : [...formData.targetAudience.ageRange, age];

    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        ageRange,
      },
    });
  };

  const toggleMusicStyle = (style: string) => {
    const musicStyle = formData.targetAudience.musicStyle?.includes(style)
      ? formData.targetAudience.musicStyle.filter((s: string) => s !== style)
      : [...(formData.targetAudience.musicStyle || []), style];

    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        musicStyle,
      },
    });
  };

  const categories = [
    { value: 'restaurante', label: '🍽️ Restaurante' },
    { value: 'bar', label: '🍸 Bar' },
    { value: 'cafe', label: '☕ Café' },
    { value: 'eventos', label: '🎉 Espaço de Eventos' },
    { value: 'lazer', label: '🎮 Lazer' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
            Meus Estabelecimentos
          </h2>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            Gerencie todos os seus estabelecimentos em um só lugar
          </p>
        </div>

        {!isAddingNew && (
          <motion.button
            onClick={() => setIsAddingNew(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"
            style={{
              backgroundColor: colors.orange,
              color: 'white',
            }}
          >
            <Plus size={20} />
            Adicionar Estabelecimento
          </motion.button>
        )}
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="border-2 rounded-2xl p-6 backdrop-blur-xl"
              style={{
                backgroundColor: colors.theme === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(10, 37, 64, 0.98)',
                borderColor: colors.orange,
              }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                Novo Estabelecimento
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CNPJ */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                    CNPJ
                  </label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.glassBorder,
                      color: colors.textPrimary,
                    }}
                    required
                  />
                </div>

                {/* Nome */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                    Nome do Estabelecimento
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Restaurante Sabor & Arte"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.glassBorder,
                      color: colors.textPrimary,
                    }}
                    required
                  />
                </div>

                {/* Endereço */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.textPrimary }}>
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Rua, número, bairro, cidade"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none font-semibold"
                    style={{
                      backgroundColor: colors.glassBg,
                      borderColor: colors.glassBorder,
                      color: colors.textPrimary,
                    }}
                    required
                  />
                </div>

                {/* Categoria */}
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
                    {categories.map((cat) => (
                      <option
                        key={cat.value}
                        value={cat.value}
                        style={{
                          backgroundColor: '#FFFFFF',
                          color: '#000000',
                        }}
                      >
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
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

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                  style={{
                    backgroundColor: colors.orange,
                    color: 'white',
                  }}
                >
                  <Check size={20} />
                  Adicionar
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleCancel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 border-2"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: colors.glassBorder,
                    color: colors.textSecondary,
                  }}
                >
                  <X size={20} />
                  Cancelar
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Establishments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {establishments.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Building2 size={64} className="mx-auto mb-4 opacity-30" style={{ color: colors.textMuted }} />
            <p className="text-lg font-bold" style={{ color: colors.textSecondary }}>
              Nenhum estabelecimento cadastrado
            </p>
            <p className="text-sm mt-2" style={{ color: colors.textMuted }}>
              Clique em "Adicionar Estabelecimento" para começar
            </p>
          </div>
        ) : (
          establishments.map((establishment) => (
            <motion.div
              key={establishment.id}
              whileHover={{ scale: 1.02 }}
              className="border-2 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden"
              style={{
                backgroundColor: colors.theme === 'light'
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'rgba(10, 37, 64, 0.95)',
                borderColor: establishment.isActive ? colors.orange : colors.glassBorder,
              }}
            >
              {/* Status Badge */}
              <div
                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: establishment.isActive ? `${colors.orange}20` : `${colors.textMuted}20`,
                  color: establishment.isActive ? colors.orange : colors.textMuted,
                }}
              >
                {establishment.isActive ? 'Ativo' : 'Inativo'}
              </div>

              {/* Content */}
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.textPrimary }}>
                  {establishment.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <Building2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: colors.orange }} />
                    <span style={{ color: colors.textSecondary }}>{establishment.cnpj}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: colors.cyan }} />
                    <span style={{ color: colors.textSecondary }}>{establishment.address}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <Tag size={16} className="mt-0.5 flex-shrink-0" style={{ color: colors.blueLight }} />
                    <span style={{ color: colors.textSecondary }}>
                      {categories.find(c => c.value === establishment.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex gap-2 mb-4 text-xs">
                  {establishment.menu && establishment.menu.length > 0 && (
                    <span
                      className="px-2 py-1 rounded-full font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: `${colors.orange}15`,
                        color: colors.orange,
                      }}
                    >
                      <UtensilsCrossed size={12} />
                      {establishment.menu.length} itens
                    </span>
                  )}
                  {establishment.photos && establishment.photos.length > 0 && (
                    <span
                      className="px-2 py-1 rounded-full font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: `${colors.cyan}15`,
                        color: colors.cyan,
                      }}
                    >
                      <ImageIcon size={12} />
                      {establishment.photos.length} fotos
                    </span>
                  )}
                  {establishment.targetAudience && establishment.targetAudience.ageRange.length > 0 && (
                    <span
                      className="px-2 py-1 rounded-full font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: `${colors.blueLight}15`,
                        color: colors.blueLight,
                      }}
                    >
                      <Users size={12} />
                      Público
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setViewingEstablishment(establishment)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: `${colors.blueLight}20`,
                      color: colors.blueLight,
                    }}
                  >
                    <Eye size={16} />
                    Ver
                  </motion.button>

                  <motion.button
                    onClick={() => handleEdit(establishment.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: `${colors.cyan}20`,
                      color: colors.cyan,
                    }}
                  >
                    <Edit2 size={16} />
                    Editar
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja excluir este estabelecimento?')) {
                        deleteEstablishment(establishment.id);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl font-bold"
                    style={{
                      backgroundColor: `${colors.orange}20`,
                      color: colors.orange,
                    }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {viewingEstablishment && (
          <EstablishmentDetails
            establishment={viewingEstablishment}
            onClose={() => setViewingEstablishment(null)}
          />
        )}
      </AnimatePresence>

      {/* Full Management Modal */}
      <AnimatePresence>
        {managingEstablishmentId && (
          <SingleEstablishmentManager
            establishmentId={managingEstablishmentId}
            onClose={() => setManagingEstablishmentId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
