
import { MapPin, Clock, Calendar } from 'lucide-react';

interface Location {
  name: string;
  address: string;
  time: string;
  mapUrl: string;
}

interface EventDetailsProps {
  weddingDate: Date;
  ceremony: Location;
  reception: Location;
}

const EventDetails = ({ weddingDate, ceremony, reception }: EventDetailsProps) => {
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
      <h2 className="section-title reveal">Nuestra Boda</h2>
      
      <div className="text-center mb-12 reveal">
        <Calendar size={28} className="mx-auto mb-2" />
        <p className="font-playfair text-lg md:text-xl">
          {weddingDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="location-card reveal">
          <h3 className="font-playfair text-xl md:text-2xl mb-3">Ceremonia</h3>
          <div className="flex items-start mb-3">
            <MapPin className="mr-2 mt-1 text-wedding-gold" size={18} />
            <div>
              <p className="font-medium">{ceremony.name}</p>
              <p className="text-gray-600 text-sm">{ceremony.address}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="mr-2 text-wedding-gold" size={18} />
            <p>{ceremony.time}</p>
          </div>
          <a 
            href={ceremony.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline text-sm inline-flex items-center"
          >
            Ver ubicación 
            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
        
        <div className="location-card reveal">
          <h3 className="font-playfair text-xl md:text-2xl mb-3">Recepción</h3>
          <div className="flex items-start mb-3">
            <MapPin className="mr-2 mt-1 text-wedding-gold" size={18} />
            <div>
              <p className="font-medium">{reception.name}</p>
              <p className="text-gray-600 text-sm">{reception.address}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="mr-2 text-wedding-gold" size={18} />
            <p>{reception.time}</p>
          </div>
          <a 
            href={reception.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline text-sm inline-flex items-center"
          >
            Ver ubicación
            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-16 bg-wedding-cream p-6 md:p-8 rounded-lg reveal">
        <h3 className="font-playfair text-xl md:text-2xl mb-4 text-center">Código de Vestimenta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-2">Vestimenta Formal</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Hombres: Traje formal o smoking</li>
              <li>Mujeres: Vestido de cóctel o largo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Colores a evitar</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Blanco (reservado para la novia)</li>
              <li>Negro completo</li>
              <li>Rojo intenso</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
