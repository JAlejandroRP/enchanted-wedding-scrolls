
import { useEffect } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import EventDetails from "../components/EventDetails";
import Gallery from "../components/Gallery";
import Gifts from "../components/Gifts";
import Tips from "../components/Tips";
import PhotoShare from "../components/PhotoShare";
import Footer from "../components/Footer";
import { useMultipleIntersectionObserver } from "../hooks/useIntersectionObserver";

const Index = () => {
  // Datos de ejemplo (aquí pondrías los datos reales de la boda)
  const weddingDate = new Date('2025-05-15T16:00:00');
  const brideData = {
    firstName: 'Elena',
    lastName: 'García'
  };
  const groomData = {
    firstName: 'Juan',
    lastName: 'López'
  };
  const ceremonyLocation = {
    name: 'Catedral de Santa María',
    address: 'Calle Principal 123, Ciudad',
    time: '16:00 hrs',
    mapUrl: 'https://maps.google.com'
  };
  const receptionLocation = {
    name: 'Hacienda Los Laureles',
    address: 'Carretera Norte km 15, Ciudad',
    time: '18:00 hrs',
    mapUrl: 'https://maps.google.com'
  };

  // Hook para animar elementos cuando aparecen en viewport
  useMultipleIntersectionObserver();
  
  // Efecto para inicializar animaciones en scroll
  useEffect(() => {
    // Inicializamos el efecto de scroll
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.animate-on-scroll');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in');
          element.classList.remove('opacity-0');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Inicializar para elementos visibles al cargar
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <Hero 
        brideFirstName={brideData.firstName}
        brideLastName={brideData.lastName}
        groomFirstName={groomData.firstName}
        groomLastName={groomData.lastName}
        weddingDate={weddingDate}
      />
      
      <EventDetails 
        weddingDate={weddingDate}
        ceremony={ceremonyLocation}
        reception={receptionLocation}
      />
      
      <Gallery />
      
      <Gifts />
      
      <Tips />
      
      <PhotoShare />
      
      <Footer />
    </div>
  );
};

export default Index;
