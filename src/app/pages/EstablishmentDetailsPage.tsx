import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { establishments } from '../data/establishments';
import { EstablishmentModal } from '../components/venuo/EstablishmentModal';

export function EstablishmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [establishment, setEstablishment] = useState<typeof establishments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const found = establishments.find(est => est.id === id);
    if (found) {
      setEstablishment(found);
      setIsModalOpen(true);
    } else {
      // Se não encontrar, redireciona para home
      navigate('/', { replace: true });
    }
  }, [id, navigate]);

  const handleClose = () => {
    setIsModalOpen(false);
    // Após fechar o modal, volta para a página anterior ou home
    navigate(-1);
  };

  return (
    <div className="min-h-screen py-24">
      <EstablishmentModal
        establishment={establishment}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
}
