import { useWeddingData } from '@/hooks/useWeddingData';
import { useThemeColors } from '@/hooks/useThemeColors';
import Countdown from './Countdown';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { weddingData } = useWeddingData();
  const { background } = useThemeColors();
  const [scrollY, setScrollY] = useState(0);
  const { 
    brideFirstName,
    brideLastName,
    groomFirstName,
    groomLastName,
    weddingDate,
    backgroundImageUrl,
    mobileBackgroundImageUrl
  } = weddingData;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="inicio" 
      className={`min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-[${background}] to-white px-4 overflow-hidden`}
    >
      {/* Mobile background with parallax */}
      <div 
        className="md:hidden absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${mobileBackgroundImageUrl || backgroundImageUrl}')`,
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      {/* Desktop background with parallax */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content with reverse parallax */}
      <div 
        className="container mx-auto text-center relative z-10"
        style={{
          transform: `translateY(${scrollY * -0.2}px)`,
          transition: 'transform 0.1s ease-out'
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
        className="absolute bottom-10 left-0 right-0 text-center"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: 'transform 0.1s ease-out'
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
