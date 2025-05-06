
import { useWeddingData } from '@/hooks/useWeddingData';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useParallax } from '@/hooks/useParallax';
import Countdown from './Countdown';

const Hero = () => {
  const { weddingData } = useWeddingData();
  const { background } = useThemeColors();
  const { 
    brideFirstName,
    brideLastName,
    groomFirstName,
    groomLastName,
    weddingDate,
    backgroundImageUrl,
    mobileBackgroundImageUrl
  } = weddingData;

  const parallaxOffset = useParallax({ speed: 0.3 });
  const textParallax = useParallax({ speed: 0.15, reverse: true });

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
          transform: `translateY(${parallaxOffset * 0.5}px)`,
          backgroundSize: '120% auto',
        }}
      ></div>
      
      {/* Desktop background with parallax */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          transform: `translateY(${parallaxOffset}px)`,
          backgroundSize: '110% auto',
        }}
      ></div>
      
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div 
        className="container mx-auto text-center relative z-10"
        style={{ transform: `translateY(${textParallax}px)` }}
      >
        <div className="mb-2 text-sm md:text-base text-white font-light animate-fade-in opacity-0" 
             style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          TE INVITAMOS A NUESTRA BODA
        </div>
        
        <h1 className="font-playfair text-5xl md:text-7xl text-white animate-fade-in opacity-0" 
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          {groomFirstName} <span className="inline-block mx-2 animate-pulse-slow">&</span> {brideFirstName}
        </h1>
        
        <div className="mt-4 mb-10 text-xl md:text-2xl text-white font-light animate-fade-in opacity-0" 
             style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          {weddingDate.toLocaleDateString('es-ES', { 
            year: 'numeric',
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <div className="mt-12 md:mt-16 animate-fade-in opacity-0" 
             style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Countdown weddingDate={weddingDate} />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <button 
          onClick={() => document.getElementById('evento')?.scrollIntoView({behavior: 'smooth'})}
          className="animate-bounce inline-block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" 
               fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="animate-pulse-slow">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
