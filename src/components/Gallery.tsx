
import { useEffect, useState } from 'react';
import { Image, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useIsMobile } from '@/hooks/use-mobile';
import { useParams } from 'react-router-dom';
import { usePublicInvitation } from '@/hooks/usePublicInvitation';

interface GalleryProps {
  images?: string[];
}

const Gallery = ({ images: propImages }: GalleryProps) => {
  const { primary, secondary } = useThemeColors();
  const isMobile = useIsMobile();
  const params = useParams();
  const { weddingData } = usePublicInvitation();
  
  // Determinar la fuente correcta de imágenes
  const isPublicPage = !!params.publicId;
  
  // Array estático de imágenes de ejemplo (usado cuando no se proporcionan imágenes)
  const defaultImages = [
    '/images/gallery/1.jpg',
    '/images/gallery/2.jpg',
    '/images/gallery/3.jpg',
    '/images/gallery/4.jpg',
    '/images/gallery/5.jpg',
    '/images/gallery/6.jpg'
  ];

  // Usar las imágenes proporcionadas, las del contexto público, o las imágenes por defecto
  const galleryImages = propImages || 
    (isPublicPage && weddingData?.galleryImages) || 
    defaultImages;
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Precargar imágenes
  useEffect(() => {
    const loadStatus: {[key: string]: boolean} = {};
    let loadedCount = 0;
    
    galleryImages.forEach((imageUrl, index) => {
      if (!imageUrl) {
        loadStatus[index] = true;
        loadedCount++;
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        loadStatus[index] = true;
        loadedCount++;
        setImagesLoaded({...loadStatus});
        if (loadedCount === galleryImages.length) {
          setAllImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadStatus[index] = true; // Marcar como cargada aunque haya error
        loadedCount++;
        setImagesLoaded({...loadStatus});
        console.error(`Error loading gallery image: ${imageUrl}`);
        if (loadedCount === galleryImages.length) {
          setAllImagesLoaded(true);
        }
      };
      img.src = imageUrl;
    });
    
    // Si no hay imágenes, marcar como cargadas
    if (galleryImages.length === 0) {
      setAllImagesLoaded(true);
    }
    
    return () => {
      // Limpiar eventos de carga de imagen al desmontar
      galleryImages.forEach(imageUrl => {
        const img = new Image();
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [galleryImages]);

  // Función para animar elementos cuando se hacen visibles
  useEffect(() => {
    if (!allImagesLoaded) return;
    
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
  }, [allImagesLoaded]);

  const handlePrevImage = () => {
    if (activeImage) {
      const currentIndex = galleryImages.indexOf(activeImage);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
      setActiveImage(galleryImages[prevIndex]);
    }
  };

  const handleNextImage = () => {
    if (activeImage) {
      const currentIndex = galleryImages.indexOf(activeImage);
      const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
      setActiveImage(galleryImages[nextIndex]);
    }
  };

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section id="galeria" className="section-container" style={{ backgroundColor: `${secondary}10` }}>
      <h2 className="section-title reveal" style={{ color: primary }}>
        <Image className="inline-block mr-2 mb-1" size={24} />
        Nuestra Historia
      </h2>
      
      <div className="text-center mb-12 max-w-2xl mx-auto reveal">
        <p style={{ color: primary }}>
          Cada imagen cuenta una parte de nuestra historia de amor. 
          Navega por estos momentos especiales que hemos compartido en nuestro viaje juntos.
        </p>
      </div>
      
      {isMobile ? (
        <div className="relative">
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-3 pl-4 pr-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-72 aspect-square overflow-hidden rounded-lg cursor-pointer reveal"
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
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
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
      )}
      
      {/* Modal para ver imagen ampliada */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full animate-fade-in">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              className="absolute top-1/2 -translate-y-1/2 -left-12 text-white p-2 rounded-full bg-black/30 hover:bg-black/50"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={24} />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              className="absolute top-1/2 -translate-y-1/2 -right-12 text-white p-2 rounded-full bg-black/30 hover:bg-black/50"
            >
              <ChevronRight size={24} />
            </button>
            
            <img 
              src={activeImage} 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              alt="Imagen ampliada" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
