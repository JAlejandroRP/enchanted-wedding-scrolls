
import { MapPin, Clock, Calendar, Heart, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';

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
      <h2 className="section-title reveal" style={{ color: primary }}>
        <Heart className="inline-block mr-2 mb-1" size={24} style={{ color: primary }} />
        Nuestra Boda
      </h2>
      
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center justify-center">
          <Calendar size={28} className="mr-2" style={{ color: secondary }} />
          <p className="font-playfair text-lg md:text-xl" style={{ color: primary }}>
            {weddingDate instanceof Date && !isNaN(weddingDate.getTime())
              ? weddingDate.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'Fecha por confirmar'}
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className={`reveal space-y-4 ${isMobile ? 'p-6 rounded-lg bg-white/50 shadow-sm' : ''}`}>
            <h3 className={`font-playfair text-xl md:text-2xl mb-3 text-center md:text-left`} style={{ color: primary }}>Ceremonia</h3>
            
            {ceremony?.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={ceremony.imageUrl} 
                  alt={ceremony.name || 'Ceremonia'} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start mb-3">
              <MapPin className="mr-2 mt-1" size={18} style={{ color: secondary }} />
              <div>
                <p className="font-medium" style={{ color: primary }}>{ceremony?.name || 'Por confirmar'}</p>
                <p className="text-sm" style={{ color: `${primary}80` }}>{ceremony?.address || 'Dirección por confirmar'}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Clock className="mr-2" size={18} style={{ color: secondary }} />
              <p style={{ color: primary }}>{ceremony?.time || 'Hora por confirmar'}</p>
            </div>

            {ceremony?.mapUrl && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(ceremony.mapUrl, '_blank', 'noopener,noreferrer')}
                style={{ borderColor: secondary, color: primary }}
              >
                <ExternalLink size={16} className="mr-2" />
                Ver en Google Maps
              </Button>
            )}
          </div>
          
          <div className={`reveal space-y-4 ${isMobile ? 'p-6 rounded-lg bg-white/50 shadow-sm' : ''}`}>
            <h3 className={`font-playfair text-xl md:text-2xl mb-3 text-center md:text-left`} style={{ color: primary }}>Recepción</h3>
            
            {reception?.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={reception.imageUrl} 
                  alt={reception.name || 'Recepción'} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start mb-3">
              <MapPin className="mr-2 mt-1" size={18} style={{ color: secondary }} />
              <div>
                <p className="font-medium" style={{ color: primary }}>{reception?.name || 'Por confirmar'}</p>
                <p className="text-sm" style={{ color: `${primary}80` }}>{reception?.address || 'Dirección por confirmar'}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Clock className="mr-2" size={18} style={{ color: secondary }} />
              <p style={{ color: primary }}>{reception?.time || 'Hora por confirmar'}</p>
            </div>

            {reception?.mapUrl && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(reception.mapUrl, '_blank', 'noopener,noreferrer')}
                style={{ borderColor: secondary, color: primary }}
              >
                <ExternalLink size={16} className="mr-2" />
                Ver en Google Maps
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
