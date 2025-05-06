import { useEffect, useState, useRef } from 'react';
import { Image, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useWeddingData } from '@/hooks/useWeddingData';
import { useThemeColors } from '@/hooks/useThemeColors';

const Gallery = () => {
  const { weddingData } = useWeddingData();
  const { primary, secondary } = useThemeColors();
  const { galleryImages } = weddingData;
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayInterval = useRef<NodeJS.Timeout>();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      autoplayInterval.current = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [isPlaying]);

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
    <section id="galeria" className={`section-container bg-[${secondary}]/10`}>
      <h2 className={`section-title reveal text-[${primary}]`}>Nuestra Historia</h2>
      
      <div className="text-center mb-12 max-w-2xl mx-auto reveal">
        <p className={`text-[${primary}]`}>
          Cada imagen cuenta una parte de nuestra historia de amor. 
          Navega por estos momentos especiales que hemos compartido en nuestro viaje juntos.
        </p>
      </div>
      
      <div 
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div 
          ref={carouselRef}
          className="relative overflow-hidden rounded-lg"
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 aspect-video cursor-pointer reveal"
                onClick={() => setActiveImage(image)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image} 
                  alt={`Foto ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoplay}
          className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
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
