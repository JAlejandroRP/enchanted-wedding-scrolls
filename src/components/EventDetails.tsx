
import { MapPin, Clock, Calendar, Heart } from 'lucide-react';
import { useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useIsMobile } from '@/hooks/use-mobile';

interface Location {
  name: string;
  address: string;
  time: string;
  mapUrl: string;
  imageUrl?: string;
  mapIframe?: string;
}

interface EventDetailsProps {
  weddingDate: Date;
  ceremony: Location;
  reception: Location;
}

const EventDetails = ({ weddingDate, ceremony, reception }: EventDetailsProps) => {
  const { primary, secondary } = useThemeColors();
  const isMobile = useIsMobile();

  // Función para animar elementos cuando se hacen visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="evento" className="section-container">
      <h2 className="section-title reveal">
        <Heart className="inline-block mr-2 mb-1" size={24} />
        Nuestra Boda
      </h2>
      
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center justify-center">
          <Calendar size={28} className={`mr-2 text-[${secondary}]`} />
          <p className={`font-playfair text-lg md:text-xl text-[${primary}]`}>
            {weddingDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className={`reveal space-y-4 ${isMobile ? 'p-6 rounded-lg bg-white/50 shadow-sm' : ''}`}>
            <h3 className={`font-playfair text-xl md:text-2xl mb-3 text-[${primary}] text-center md:text-left`}>Ceremonia</h3>
            
            {ceremony.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={ceremony.imageUrl} 
                  alt={ceremony.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start mb-3">
              <MapPin className={`mr-2 mt-1 text-[${secondary}]`} size={18} />
              <div>
                <p className={`font-medium text-[${primary}]`}>{ceremony.name}</p>
                <p className={`text-[${primary}]/80 text-sm`}>{ceremony.address}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Clock className={`mr-2 text-[${secondary}]`} size={18} />
              <p className={`text-[${primary}]`}>{ceremony.time}</p>
            </div>
          </div>
          
          <div className={`reveal space-y-4 ${isMobile ? 'p-6 rounded-lg bg-white/50 shadow-sm' : ''}`}>
            <h3 className={`font-playfair text-xl md:text-2xl mb-3 text-[${primary}] text-center md:text-left`}>Recepción</h3>
            
            {reception.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={reception.imageUrl} 
                  alt={reception.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start mb-3">
              <MapPin className={`mr-2 mt-1 text-[${secondary}]`} size={18} />
              <div>
                <p className={`font-medium text-[${primary}]`}>{reception.name}</p>
                <p className={`text-[${primary}]/80 text-sm`}>{reception.address}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Clock className={`mr-2 text-[${secondary}]`} size={18} />
              <p className={`text-[${primary}]`}>{reception.time}</p>
            </div>
          </div>
        </div>

        <div className={`mt-16 bg-[${secondary}]/20 p-6 md:p-8 rounded-lg reveal`}>
          <h3 className={`font-playfair text-xl md:text-2xl mb-4 text-center text-[${primary}]`}>
            Código de Vestimenta
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className={`font-medium mb-2 text-[${primary}] flex items-center`}>
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2v6a6 6 0 0 0 12 0V2"></path>
                  <path d="M12 2v22"></path>
                </svg>
                Vestimenta Formal
              </h4>
              <ul className={`list-disc pl-5 space-y-1 text-[${primary}]/90`}>
                <li>Hombres: Traje formal o smoking</li>
                <li>Mujeres: Vestido de cóctel o largo</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-medium mb-2 text-[${primary}] flex items-center`}>
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <path d="M16 17h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4"></path>
                  <path d="M9 7h6v14H9z"></path>
                </svg>
                Colores a evitar
              </h4>
              <ul className={`list-disc pl-5 space-y-1 text-[${primary}]/90`}>
                <li>Blanco (reservado para la novia)</li>
                <li>Negro completo</li>
                <li>Rojo intenso</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
