import { useState, useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const { background } = useThemeColors();
  
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('inicio');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsPastHero(heroBottom <= 0);
      }
      
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

  const textColorClass = isPastHero ? 'text-black' : 'text-white';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky 
          ? `bg-[${background}]/90 backdrop-blur-sm shadow-sm py-3` 
          : isPastHero 
            ? `py-5 bg-[${background}]/50 backdrop-blur-sm`
            : `py-5 bg-transparent`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className={`font-playfair text-xl md:text-2xl ${textColorClass}`}>J & E</div>
          
          {/* Mobile menu button */}
          <button 
            className={`md:hidden ${textColorClass}`}
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
            <button onClick={() => scrollToSection('inicio')} className={`${textColorClass} hover:text-[#D4B2A7] transition-colors`}>Inicio</button>
            <button onClick={() => scrollToSection('evento')} className={`${textColorClass} hover:text-[#D4B2A7] transition-colors`}>Evento</button>
            <button onClick={() => scrollToSection('galeria')} className={`${textColorClass} hover:text-[#D4B2A7] transition-colors`}>Galería</button>
            <button onClick={() => scrollToSection('regalos')} className={`${textColorClass} hover:text-[#D4B2A7] transition-colors`}>Regalos</button>
            <button onClick={() => scrollToSection('recomendaciones')} className={`${textColorClass} hover:text-[#D4B2A7] transition-colors`}>Recomendaciones</button>
            <button onClick={() => scrollToSection('compartir')} className={`${textColorClass} hover:text-[#D4B2A7] transition-colors`}>Compartir</button>
          </nav>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-md p-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('inicio')} className="text-black hover:text-[#D4B2A7] transition-colors">Inicio</button>
              <button onClick={() => scrollToSection('evento')} className="text-black hover:text-[#D4B2A7] transition-colors">Evento</button>
              <button onClick={() => scrollToSection('galeria')} className="text-black hover:text-[#D4B2A7] transition-colors">Galería</button>
              <button onClick={() => scrollToSection('regalos')} className="text-black hover:text-[#D4B2A7] transition-colors">Regalos</button>
              <button onClick={() => scrollToSection('recomendaciones')} className="text-black hover:text-[#D4B2A7] transition-colors">Recomendaciones</button>
              <button onClick={() => scrollToSection('compartir')} className="text-black hover:text-[#D4B2A7] transition-colors">Compartir</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
