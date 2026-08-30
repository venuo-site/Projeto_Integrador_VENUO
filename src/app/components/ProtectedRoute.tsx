import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireCNPJ?: boolean;
}

export function ProtectedRoute({ children, requireCNPJ = false }: ProtectedRouteProps) {
  const { isAuthenticated, isCNPJ } = useAuth();

  if (!isAuthenticated) {
    // Redireciona para home se não estiver autenticado
    return <Navigate to="/" replace />;
  }

  if (requireCNPJ && !isCNPJ) {
    // Redireciona para perfil se não for CNPJ
    return <Navigate to="/perfil" replace />;
  }

  return <>{children}</>;
}
