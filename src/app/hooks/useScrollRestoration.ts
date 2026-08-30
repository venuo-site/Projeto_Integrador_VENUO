import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * Hook para restaurar a posição do scroll quando o usuário volta para a página
 */
export function useScrollRestoration(key?: string) {
  const location = useLocation();
  const scrollKey = key || location.pathname;
  const savedPosition = useRef<number>(0);

  useEffect(() => {
    // Restaurar scroll position quando a página carregar
    const saved = sessionStorage.getItem(`scroll_${scrollKey}`);
    if (saved) {
      savedPosition.current = parseInt(saved, 10);
      window.scrollTo(0, savedPosition.current);
    }

    // Salvar scroll position antes de sair da página
    const handleScroll = () => {
      savedPosition.current = window.scrollY;
      sessionStorage.setItem(`scroll_${scrollKey}`, String(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollKey]);

  // Limpar scroll position ao desmontar
  useEffect(() => {
    return () => {
      // Salvar a última posição antes de desmontar
      sessionStorage.setItem(`scroll_${scrollKey}`, String(savedPosition.current));
    };
  }, [scrollKey]);
}
