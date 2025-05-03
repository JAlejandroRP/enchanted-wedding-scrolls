
import Countdown from './Countdown';

interface HeroProps {
  brideFirstName: string;
  brideLastName: string;
  groomFirstName: string;
  groomLastName: string;
  weddingDate: Date;
}

const Hero = ({
  brideFirstName,
  brideLastName,
  groomFirstName,
  groomLastName,
  weddingDate
}: HeroProps) => {
  return (
    <section 
      id="inicio" 
      className="min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-wedding-cream to-white px-4"
      style={{
        backgroundImage: `url('/placeholder.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto text-center relative z-10">
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
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
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
