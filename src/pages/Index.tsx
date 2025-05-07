import { useEffect } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import EventDetails from "../components/EventDetails";
import Gallery from "../components/Gallery";
import Gifts from "../components/Gifts";
import Tips from "../components/Tips";
import Footer from "../components/Footer";
import DressCode from "../components/DressCode";
import { useMultipleIntersectionObserver } from "../hooks/useIntersectionObserver";

const Index = () => {
  // Hook para animar elementos cuando aparecen en viewport
  useMultipleIntersectionObserver();
  
  // Efecto para inicializar animaciones en scroll
  useEffect(() => {
    // Inicializamos el efecto de scroll
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
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
      
      <Hero />
      
      <EventDetails 
        weddingDate={new Date('2024-12-31')}
        ceremony={{
          name: "Iglesia Principal",
          address: "Calle Principal 123",
          time: "15:00",
          mapUrl: "https://maps.google.com",
          imageUrl: "/images/ceremony.jpg"
        }}
        reception={{
          name: "Salón de Eventos",
          address: "Avenida Central 456",
          time: "19:00",
          mapUrl: "https://maps.google.com",
          imageUrl: "/images/reception.jpg"
        }}
      />
      
      <Gallery />
      
      <DressCode />
      
      <Gifts />
      
      <Tips />
      
      <Footer />
    </div>
  );
};

export default Index;
