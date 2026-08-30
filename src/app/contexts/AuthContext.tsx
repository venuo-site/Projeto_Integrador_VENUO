import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  garnishes?: string[];
}

interface Establishment {
  id: string;
  cnpj: string;
  name: string;
  address: string;
  category: string;
  isActive: boolean;
  targetAudience?: {
    ageRange: string[];
    familyFriendly: boolean;
    petFriendly: boolean;
    accessibility: boolean;
    musicStyle?: string[];
  };
  menu?: MenuItem[];
  photos?: string[];
}

interface User {
  type: 'cpf' | 'cnpj';
  document: string;
  name?: string;
  avatar?: string;
  notifications?: Notification[];
  establishments?: Establishment[];
}

interface AuthContextType {
  user: User | null;
  login: (type: 'cpf' | 'cnpj', document: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isCNPJ: boolean;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
  establishments: Establishment[];
  addEstablishment: (establishment: Omit<Establishment, 'id'>) => void;
  updateEstablishment: (id: string, data: Partial<Establishment>) => void;
  deleteEstablishment: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Tentar recuperar usuário do localStorage
    const savedUser = localStorage.getItem('venuo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Notificações mockadas para demonstração
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Bem-vindo ao Venuo!',
      message: 'Explore os melhores eventos e estabelecimentos da sua região.',
      time: 'Agora',
      read: false,
    },
    {
      id: '2',
      title: 'Novo evento perto de você',
      message: 'Festival de Jazz acontece este fim de semana.',
      time: '2h atrás',
      read: false,
    },
    {
      id: '3',
      title: 'Promoção especial',
      message: 'Happy hour com 30% de desconto no Bar do Centro.',
      time: '5h atrás',
      read: true,
    },
  ]);

  const login = (type: 'cpf' | 'cnpj', document: string, name?: string) => {
    // Gerar nome baseado no tipo se não fornecido
    const defaultName = name || (type === 'cnpj' ? 'Estabelecimento' : 'Usuário');

    const newUser: User = {
      type,
      document,
      name: defaultName,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(defaultName)}&background=FF6B35&color=fff&size=128`,
      establishments: type === 'cnpj' ? [] : undefined,
    };
    setUser(newUser);
    localStorage.setItem('venuo_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('venuo_user');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const addEstablishment = (establishment: Omit<Establishment, 'id'>) => {
    if (!user || user.type !== 'cnpj') return;

    const newEstablishment: Establishment = {
      ...establishment,
      id: Date.now().toString(),
    };

    const updatedUser = {
      ...user,
      establishments: [...(user.establishments || []), newEstablishment],
    };

    setUser(updatedUser);
    localStorage.setItem('venuo_user', JSON.stringify(updatedUser));
  };

  const updateEstablishment = (id: string, data: Partial<Establishment>) => {
    if (!user || user.type !== 'cnpj') return;

    const updatedUser = {
      ...user,
      establishments: user.establishments?.map(est =>
        est.id === id ? { ...est, ...data } : est
      ),
    };

    setUser(updatedUser);
    localStorage.setItem('venuo_user', JSON.stringify(updatedUser));
  };

  const deleteEstablishment = (id: string) => {
    if (!user || user.type !== 'cnpj') return;

    const updatedUser = {
      ...user,
      establishments: user.establishments?.filter(est => est.id !== id),
    };

    setUser(updatedUser);
    localStorage.setItem('venuo_user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = user !== null;
  const isCNPJ = user?.type === 'cnpj';
  const unreadCount = notifications.filter(n => !n.read).length;
  const establishments = user?.establishments || [];

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isCNPJ,
      notifications,
      markNotificationAsRead,
      unreadCount,
      establishments,
      addEstablishment,
      updateEstablishment,
      deleteEstablishment,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
