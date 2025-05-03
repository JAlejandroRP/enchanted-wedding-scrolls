
import { useState, useEffect } from 'react';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-white/90 backdrop-blur-sm shadow-sm py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="font-playfair text-xl md:text-2xl">J & E</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <button onClick={() => scrollToSection('inicio')} className="hover:text-wedding-gold transition-colors">Inicio</button>
            <button onClick={() => scrollToSection('evento')} className="hover:text-wedding-gold transition-colors">Evento</button>
            <button onClick={() => scrollToSection('galeria')} className="hover:text-wedding-gold transition-colors">Galería</button>
            <button onClick={() => scrollToSection('regalos')} className="hover:text-wedding-gold transition-colors">Regalos</button>
            <button onClick={() => scrollToSection('recomendaciones')} className="hover:text-wedding-gold transition-colors">Recomendaciones</button>
            <button onClick={() => scrollToSection('compartir')} className="hover:text-wedding-gold transition-colors">Compartir</button>
          </nav>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-md p-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('inicio')} className="hover:text-wedding-gold transition-colors">Inicio</button>
              <button onClick={() => scrollToSection('evento')} className="hover:text-wedding-gold transition-colors">Evento</button>
              <button onClick={() => scrollToSection('galeria')} className="hover:text-wedding-gold transition-colors">Galería</button>
              <button onClick={() => scrollToSection('regalos')} className="hover:text-wedding-gold transition-colors">Regalos</button>
              <button onClick={() => scrollToSection('recomendaciones')} className="hover:text-wedding-gold transition-colors">Recomendaciones</button>
              <button onClick={() => scrollToSection('compartir')} className="hover:text-wedding-gold transition-colors">Compartir</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
