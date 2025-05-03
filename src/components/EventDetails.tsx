
import React, { useEffect } from 'react';
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
    <section id="evento" className="section-container bg-[#E5E0D8]/70">
      <h2 className="section-title text-[#3E000C] reveal">Nuestra Boda</h2>
      
      <div className="text-center mb-12 reveal">
        <Calendar size={28} className="mx-auto mb-2 text-[#3E000C]" />
        <p className="font-playfair text-lg md:text-xl text-[#3E000C]">
          {weddingDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="location-card bg-white/90 border-l-4 border-[#D4B2A7] reveal">
          <h3 className="font-playfair text-xl md:text-2xl mb-3 text-[#3E000C]">Ceremonia</h3>
          <div className="flex items-start mb-3">
            <MapPin className="mr-2 mt-1 text-[#D4B2A7]" size={18} />
            <div>
              <p className="font-medium text-[#3E000C]">{ceremony.name}</p>
              <p className="text-[#3E000C]/80 text-sm">{ceremony.address}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="mr-2 text-[#D4B2A7]" size={18} />
            <p className="text-[#3E000C]">{ceremony.time}</p>
          </div>
          <a 
            href={ceremony.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn border border-[#D4B2A7] text-[#3E000C] bg-white/80 hover:bg-[#D4B2A7] hover:text-white text-sm inline-flex items-center transition-all duration-300"
          >
            Ver ubicación 
            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
        
        <div className="location-card bg-white/90 border-l-4 border-[#B3B792] reveal">
          <h3 className="font-playfair text-xl md:text-2xl mb-3 text-[#3E000C]">Recepción</h3>
          <div className="flex items-start mb-3">
            <MapPin className="mr-2 mt-1 text-[#B3B792]" size={18} />
            <div>
              <p className="font-medium text-[#3E000C]">{reception.name}</p>
              <p className="text-[#3E000C]/80 text-sm">{reception.address}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="mr-2 text-[#B3B792]" size={18} />
            <p className="text-[#3E000C]">{reception.time}</p>
          </div>
          <a 
            href={reception.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn border border-[#B3B792] text-[#3E000C] bg-white/80 hover:bg-[#B3B792] hover:text-white text-sm inline-flex items-center transition-all duration-300"
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

      <div className="mt-16 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#D4B2A7]/50 reveal">
        <h3 className="font-playfair text-xl md:text-2xl mb-4 text-center text-[#3E000C]">Código de Vestimenta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-2 text-[#3E000C]">Vestimenta Formal</h4>
            <ul className="list-disc pl-5 space-y-1 text-[#3E000C]/90">
              <li>Hombres: Traje formal o smoking</li>
              <li>Mujeres: Vestido de cóctel o largo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-[#3E000C]">Colores a evitar</h4>
            <ul className="list-disc pl-5 space-y-1 text-[#3E000C]/90">
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
