
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
import { useWeddingData } from "../hooks/useWeddingData";

const Index = () => {
  const { weddingData } = useWeddingData();

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
      
      <Hero />
      
      <EventDetails 
        weddingDate={weddingData.weddingDate}
        ceremony={weddingData.ceremonyLocation}
        reception={weddingData.receptionLocation}
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
