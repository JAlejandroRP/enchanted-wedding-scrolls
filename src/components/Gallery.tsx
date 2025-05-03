
import { useEffect, useState } from 'react';
import { Image } from 'lucide-react';

const Gallery = () => {
  // Arreglo de imágenes de ejemplo (aquí se utilizan imágenes de placeholder)
  const images = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];
  
  const [activeImage, setActiveImage] = useState<string | null>(null);

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
    <section id="galeria" className="section-container bg-[#D4B2A7]/10">
      <h2 className="section-title reveal text-[#3E000C]">Nuestra Historia</h2>
      
      <div className="text-center mb-12 max-w-2xl mx-auto reveal">
        <p className="text-[#3E000C]">
          Cada imagen cuenta una parte de nuestra historia de amor. 
          Navega por estos momentos especiales que hemos compartido en nuestro viaje juntos.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="aspect-square overflow-hidden rounded-lg cursor-pointer reveal"
            onClick={() => setActiveImage(image)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img 
              src={image} 
              alt={`Foto ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
            />
          </div>
        ))}
      </div>
      
      {/* Modal para ver imagen ampliada */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full animate-fade-in">
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={activeImage} 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              alt="Imagen ampliada" 
            />
          </div>
        </div>
      )}
      
      <div className="text-center mt-12 reveal">
        <a href="#compartir" className="btn btn-primary inline-flex items-center">
          <Image size={20} className="mr-2" />
          Comparte tus fotos
        </a>
      </div>
    </section>
  );
};

export default Gallery;
