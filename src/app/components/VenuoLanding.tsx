import { useState } from 'react';
import { Header } from './venuo/Header';
import { Hero } from './venuo/Hero';
import { About } from './venuo/About';
import { Features } from './venuo/Features';
import { Categories } from './venuo/Categories';
import { Benefits } from './venuo/Benefits';
import { CTA } from './venuo/CTA';
import { Footer } from './venuo/Footer';
import { DemoModal } from './venuo/DemoModal';
import { ContactModal } from './venuo/ContactModal';
import { LoginModal } from './venuo/LoginModal';
import { EstablishmentDashboard } from './venuo/EstablishmentDashboard';
import { SearchBar } from './venuo/SearchBar';
import { ColorBlindFilters } from './venuo/ColorBlindFilters';
import { ThemeProvider, useTheme } from './ThemeContext';
import { SearchProvider } from './SearchContext';
import { motion } from 'motion/react';

function VenuoContent() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{ background: colors.gradientBackground }}
    >
      {/* SVG Filters for Color Blindness */}
      <ColorBlindFilters />
      
      {/* Animated Background Blur Balls */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute -top-10 -left-12 w-[250px] h-[250px] rounded-full blur-[80px]"
          style={{ background: colors.orange }}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-16 -right-14 w-[280px] h-[280px] rounded-full blur-[80px]"
          style={{ background: colors.blue }}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-[30%] right-[10%] w-[180px] h-[180px] rounded-full blur-[70px]"
          style={{ background: colors.cyan }}
        />
      </div>

      <Header
        onContactClick={() => setIsContactOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        hideSearchBar={true}
      />
      
      {/* Barra de Busca no Topo - Primeiro Elemento */}
      <SearchBar />
      
      <main className="relative z-10">
        <Hero onDemoClick={() => setIsDemoOpen(true)} />
        
        <About />
        <Features />
        <Categories />
        <Benefits />
        <CTA onContactClick={() => setIsContactOpen(true)} />
      </main>

      <Footer />

      {/* Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onCNPJLogin={() => setIsDashboardOpen(true)}
      />
      <EstablishmentDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
    </div>
  );
}

export function VenuoLanding() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <VenuoContent />
      </SearchProvider>
    </ThemeProvider>
  );
}