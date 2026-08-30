import { Outlet } from 'react-router';
import { Header } from '../components/venuo/Header';
import { Footer } from '../components/venuo/Footer';
import { ColorBlindFilters } from '../components/venuo/ColorBlindFilters';
import { CNPJRestriction } from '../components/CNPJRestriction';
import { ThemeProvider } from '../components/ThemeContext';
import { SearchProvider } from '../components/SearchContext';
import { ModalProvider, useModal } from '../contexts/ModalContext';
import { useState } from 'react';
import { ContactModal } from '../components/venuo/ContactModal';
import { LoginModal } from '../components/venuo/LoginModal';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function RootContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isAnyModalOpen } = useModal();

  const handleCNPJLogin = (document: string, name: string) => {
    login('cnpj', document, name);
    setIsLoginOpen(false);
    navigate('/dashboard');
  };

  const handleCPFLogin = (document: string, name: string) => {
    login('cpf', document, name);
    setIsLoginOpen(false);
    navigate('/');
  };

  return (
    <CNPJRestriction>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: '#000810' }}
      >
        {/* SVG Filters for Color Blindness */}
        <ColorBlindFilters />

        {/* bubble-bg: 8 soft blobs on #000810 base */}
        <div
          id="bubble-bg"
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0, background: '#000810' }}
        >
          {/* Bubble 1: 400px, #F4622A, 25%, blur 80px, x=100 y=150 */}
          <div style={{ position: 'absolute', left: 100, top: 150, width: 400, height: 400, borderRadius: '50%', background: '#F4622A', opacity: 0.25, filter: 'blur(80px)' }} />
          {/* Bubble 2: 600px, #002147, 45%, blur 120px, x=900 y=80 */}
          <div style={{ position: 'absolute', left: 900, top: 80, width: 600, height: 600, borderRadius: '50%', background: '#002147', opacity: 0.45, filter: 'blur(120px)' }} />
          {/* Bubble 3: 350px, #F4622A, 18%, blur 70px, x=1300 y=400 */}
          <div style={{ position: 'absolute', left: 1300, top: 400, width: 350, height: 350, borderRadius: '50%', background: '#F4622A', opacity: 0.18, filter: 'blur(70px)' }} />
          {/* Bubble 4: 500px, #002147, 40%, blur 100px, x=200 y=600 */}
          <div style={{ position: 'absolute', left: 200, top: 600, width: 500, height: 500, borderRadius: '50%', background: '#002147', opacity: 0.40, filter: 'blur(100px)' }} />
          {/* Bubble 5: 280px, #F4622A, 20%, blur 60px, x=700 y=700 */}
          <div style={{ position: 'absolute', left: 700, top: 700, width: 280, height: 280, borderRadius: '50%', background: '#F4622A', opacity: 0.20, filter: 'blur(60px)' }} />
          {/* Bubble 6: 450px, #002147, 35%, blur 110px, x=1100 y=600 */}
          <div style={{ position: 'absolute', left: 1100, top: 600, width: 450, height: 450, borderRadius: '50%', background: '#002147', opacity: 0.35, filter: 'blur(110px)' }} />
          {/* Bubble 7: 320px, #F4622A, 15%, blur 75px, x=500 y=300 */}
          <div style={{ position: 'absolute', left: 500, top: 300, width: 320, height: 320, borderRadius: '50%', background: '#F4622A', opacity: 0.15, filter: 'blur(75px)' }} />
          {/* Bubble 8: 550px, #002147, 50%, blur 130px, x=1300 y=200 */}
          <div style={{ position: 'absolute', left: 1300, top: 200, width: 550, height: 550, borderRadius: '50%', background: '#002147', opacity: 0.50, filter: 'blur(130px)' }} />
        </div>

      <Header
        onContactClick={() => setIsContactOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        hideForModal={isAnyModalOpen}
      />

      <main className="relative z-10">
        <Outlet />
      </main>

      <Footer />

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onCNPJLogin={handleCNPJLogin}
        onCPFLogin={handleCPFLogin}
      />
    </div>
    </CNPJRestriction>
  );
}

export function RootLayout() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <ModalProvider>
          <RootContent />
        </ModalProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}
