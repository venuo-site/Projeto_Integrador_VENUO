import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface CNPJRestrictionProps {
  children: React.ReactNode;
}

export function CNPJRestriction({ children }: CNPJRestrictionProps) {
  const { isCNPJ, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Se for CNPJ e estiver autenticado, só permite acesso ao dashboard e rotas relacionadas
    if (isCNPJ && isAuthenticated) {
      const allowedPaths = ['/dashboard', '/cadastro-estabelecimento'];
      const isAllowedPath = allowedPaths.some(path => location.pathname.startsWith(path));

      if (!isAllowedPath) {
        navigate('/dashboard');
      }
    }
  }, [isCNPJ, isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
}
