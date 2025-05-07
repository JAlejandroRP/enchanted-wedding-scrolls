import { useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';

const Tips = () => {
  const { background, secondary, accent } = useThemeColors();

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
    <section id="recomendaciones" className={`section-container bg-[${background}]/30`}>
      <h2 className="section-title reveal">Recomendaciones</h2>
      
      <div className="max-w-3xl mx-auto">
        <div className="p-6 mb-6 reveal">
          <h3 className="font-playfair text-xl mb-4">Consejos para nuestros invitados</h3>
          
          <div className="space-y-5">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[${secondary}] text-[${accent}]`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12" y2="16"></line>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Llegada</h4>
                <p className="text-gray-600 mt-1">
                  Te recomendamos llegar 15-30 minutos antes del inicio de la ceremonia para que puedas encontrar un buen lugar.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[${secondary}] text-[${accent}]`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Clima</h4>
                <p className="text-gray-600 mt-1">
                  La recepción será al aire libre, te sugerimos traer un abrigo ligero para la noche, ya que puede refrescar.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[${secondary}] text-[${accent}]`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Estacionamiento</h4>
                <p className="text-gray-600 mt-1">
                  Contamos con servicio de valet parking. Si prefieres usar servicios de transporte, te recomendamos solicitar tu viaje con anticipación.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[${secondary}] text-[${accent}]`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Confirmación</h4>
                <p className="text-gray-600 mt-1">
                  Por favor confirma tu asistencia antes del [fecha límite]. Es importante para nosotros conocer el número exacto de invitados.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[${secondary}] text-[${accent}]`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Alojamiento</h4>
                <p className="text-gray-600 mt-1">
                  Para los invitados que vienen de fuera, hemos conseguido tarifas especiales en hoteles cercanos. Contáctanos para más información.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center reveal">
          <p className="italic text-gray-700">
            "Estamos emocionados de compartir este día tan especial con ustedes y crear hermosos recuerdos juntos."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tips;
