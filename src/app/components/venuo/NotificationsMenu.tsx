import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();
  const { notifications, markNotificationAsRead, unreadCount } = useAuth();

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <div className="relative">
      {/* Notifications Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-[48px] h-[48px] backdrop-blur-xl transition-all flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          borderRadius: '12px',
          border: 'none',
        }}
        aria-label="Notificações"
      >
        <Bell size={24} strokeWidth={2} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{
              backgroundColor: colors.orange,
              boxShadow: `0 4px 12px ${colors.orange}60`,
            }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-80 rounded-2xl backdrop-blur-2xl overflow-hidden z-50"
              style={{
                backgroundColor: colors.theme === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(10, 37, 64, 0.98)',
                border: 'none',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
            {/* Header */}
            <div
              className="px-5 py-4 border-b-2"
              style={{
                borderColor: colors.orange,
                backgroundColor: colors.orange,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p className="text-base font-bold text-white flex items-center gap-2">
                <Bell size={18} />
                Notificações
              </p>
              {unreadCount > 0 && (
                <p className="text-sm text-white/80 mt-1">
                  {unreadCount} não lida{unreadCount > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={40} className="mx-auto mb-3 opacity-30" style={{ color: colors.textSecondary }} />
                  <p style={{ color: colors.textSecondary }}>
                    Nenhuma notificação
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    whileHover={{
                      x: 6,
                      backgroundColor: colors.theme === 'light'
                        ? 'rgba(255, 122, 61, 0.08)'
                        : 'rgba(72, 202, 228, 0.15)',
                    }}
                    className="w-full text-left p-4 border-b transition-all"
                    style={{
                      borderColor: colors.theme === 'light'
                        ? 'rgba(0, 0, 0, 0.08)'
                        : 'rgba(255, 255, 255, 0.08)',
                      backgroundColor: notification.read
                        ? 'rgba(0, 0, 0, 0)'
                        : colors.theme === 'light'
                        ? 'rgba(255, 122, 61, 0.12)'
                        : 'rgba(72, 202, 228, 0.2)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.read && (
                        <div
                          className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                          style={{
                            backgroundColor: colors.orange,
                            boxShadow: `0 0 8px ${colors.orange}80`,
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-sm mb-1" style={{ color: colors.textPrimary }}>
                          {notification.title}
                        </p>
                        <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                          {notification.message}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
