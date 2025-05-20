
import { useWeddingData } from '@/hooks/useWeddingData';
import { useThemeColors } from '@/hooks/useThemeColors';
import Countdown from './Countdown';
import { useEffect, useState } from 'react';
import { usePublicInvitation } from '@/hooks/usePublicInvitation';
import { useParams } from 'react-router-dom';

const Hero = () => {
  const params = useParams();
  const isPublicPage = !!params.publicId;
  
  // Usar weddingData del contexto correspondiente
  const { weddingData: privateWeddingData } = useWeddingData();
  const { weddingData: publicWeddingData } = usePublicInvitation();
  
  // Elegir la fuente correcta de datos
  const weddingData = isPublicPage ? publicWeddingData || privateWeddingData : privateWeddingData;
  
  const { background } = useThemeColors();
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState({
    desktop: false,
    mobile: false
  });

  const { 
    brideFirstName,
    brideLastName,
    groomFirstName,
    groomLastName,
    weddingDate,
    backgroundImageUrl,
    mobileBackgroundImageUrl
  } = weddingData;

  // Efecto para manejar el scroll para parallax
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Precargar imágenes
  useEffect(() => {
    if (backgroundImageUrl) {
      const img = new Image();
      img.onload = () => setIsLoaded(prev => ({ ...prev, desktop: true }));
      img.src = backgroundImageUrl;
    } else {
      setIsLoaded(prev => ({ ...prev, desktop: true }));
    }
    
    if (mobileBackgroundImageUrl) {
      const img = new Image();
      img.onload = () => setIsLoaded(prev => ({ ...prev, mobile: true }));
      img.src = mobileBackgroundImageUrl;
    } else if (backgroundImageUrl) {
      // Usar la imagen de escritorio como fallback para móvil
      setIsLoaded(prev => ({ ...prev, mobile: true }));
    } else {
      setIsLoaded(prev => ({ ...prev, mobile: true }));
    }
  }, [backgroundImageUrl, mobileBackgroundImageUrl]);

  return (
    <section 
      id="inicio" 
      className="min-h-screen flex flex-col justify-center relative px-4 overflow-hidden pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: background }}
    >
      {/* Mobile background with parallax */}
      {(mobileBackgroundImageUrl || backgroundImageUrl) && (
        <div 
          className="md:hidden absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${mobileBackgroundImageUrl || backgroundImageUrl}')`,
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isLoaded.mobile ? 1 : 0,
            filter: isLoaded.mobile ? 'none' : 'blur(8px)'
          }}
        ></div>
      )}
      
      {/* Desktop background with parallax */}
      {backgroundImageUrl && (
        <div 
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease, filter 1s ease',
            opacity: isLoaded.desktop ? 1 : 0,
            filter: isLoaded.desktop ? 'none' : 'blur(8px)'
          }}
        ></div>
      )}
      
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content with reverse parallax */}
      <div 
        className="container mx-auto text-center relative z-10"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="mb-2 text-sm md:text-base text-white font-light animate-fade-in">
          TE INVITAMOS A NUESTRA BODA
        </div>
        
        <h1 className="font-playfair text-5xl md:text-7xl text-white animate-fade-in" style={{animationDelay: '0.2s'}}>
          {groomFirstName} <span className="inline-block mx-2">&</span> {brideFirstName}
        </h1>
        
        <div className="mt-4 mb-10 text-xl md:text-2xl text-white font-light animate-fade-in" style={{animationDelay: '0.4s'}}>
          {weddingDate.toLocaleDateString('es-ES', { 
            year: 'numeric',
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <div className="mt-12 md:mt-16 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Countdown weddingDate={weddingDate} />
        </div>
      </div>
      
      <div 
        className="absolute bottom-[calc(2.5rem+env(safe-area-inset-bottom))] left-0 right-0 text-center"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <button 
          onClick={() => document.getElementById('evento')?.scrollIntoView({behavior: 'smooth'})}
          className="animate-bounce inline-block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" 
               fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
