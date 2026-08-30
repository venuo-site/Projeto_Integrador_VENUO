import { useState } from 'react';
import { Hero } from '../components/venuo/Hero';
import { FeaturedCarousel } from '../components/venuo/FeaturedCarousel';
import { CategoriesWithEstablishments } from '../components/venuo/CategoriesWithEstablishments';
import { CTA } from '../components/venuo/CTA';
import { ContactModal } from '../components/venuo/ContactModal';

export function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <div className="mt-14">
        <Hero />
      </div>
      <div className="-mt-12">
        <FeaturedCarousel />
      </div>
      <CategoriesWithEstablishments />
      <CTA onContactClick={() => setIsContactOpen(true)} />

      {/* Modals específicos da Home */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
