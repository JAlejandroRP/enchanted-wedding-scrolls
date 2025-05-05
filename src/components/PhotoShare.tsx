import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';

const PhotoShare = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { primary, secondary, accent } = useThemeColors();
  
  // Función para manejar la selección de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      // Crear URL para previsualización de imagen
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileUrl);
    }
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí normalmente enviarías la imagen y datos al servidor
    // Por ahora solo mostraremos un mensaje de éxito
    setIsSubmitted(true);
    
    // Reset del formulario
    setTimeout(() => {
      setFile(null);
      setName('');
      setMessage('');
      setPreviewUrl(null);
      setIsSubmitted(false);
    }, 3000);
  };

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
    <section id="compartir" className="section-container">
      <h2 className={`section-title reveal text-[${primary}]`}>Comparte tus Fotos</h2>
      
      <div className="text-center mb-12 max-w-2xl mx-auto reveal">
        <Camera size={32} className={`mx-auto mb-4 text-[${secondary}]`} />
        <p className={`text-[${primary}]`}>
          Ayúdanos a crear un álbum de recuerdos más completo compartiendo tus fotos de nuestra boda.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`reveal border-b md:border-b-0 md:border-r border-[${secondary}]/30 pb-6 md:pb-0 md:pr-8`}>
          <h3 className={`font-playfair text-xl mb-4 text-[${primary}]`}>Sube tus fotos</h3>
          
          {isSubmitted ? (
            <div className="text-center py-8 animate-fade-in">
              <svg className={`w-16 h-16 mx-auto text-[${accent}] mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 className={`text-xl font-medium mb-2 text-[${primary}]`}>¡Gracias por compartir!</h4>
              <p className={`text-[${primary}]/80`}>Tu foto ha sido recibida con éxito.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block text-sm font-medium text-[${primary}] mb-1`}>Tu nombre</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 border border-[${secondary}] rounded-md focus:ring-[${secondary}] focus:border-[${secondary}] bg-transparent text-[${primary}]`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className={`block text-sm font-medium text-[${primary}] mb-1`}>Mensaje (opcional)</label>
                <textarea 
                  className={`w-full px-4 py-2 border border-[${secondary}] rounded-md focus:ring-[${secondary}] focus:border-[${secondary}] bg-transparent text-[${primary}]`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="mb-6">
                <label className={`block text-sm font-medium text-[${primary}] mb-1`}>Selecciona una imagen</label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[${secondary}]/50 border-dashed rounded-md`}>
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="mb-3">
                        <img src={previewUrl} alt="Vista previa" className="mx-auto h-32 object-contain" />
                      </div>
                    ) : (
                      <svg className={`mx-auto h-12 w-12 text-[${secondary}]/70`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    
                    <div className={`flex text-sm text-[${primary}]`}>
                      <label
                        htmlFor="file-upload"
                        className={`relative cursor-pointer rounded-md font-medium text-[${secondary}] hover:text-[${secondary}]/80 focus-within:outline-none`}
                      >
                        <span>Sube una imagen</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className={`text-xs text-[${primary}]/70`}>PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn btn-primary"
                disabled={!file}
              >
                Compartir foto
              </button>
            </form>
          )}
        </div>
        
        <div className="reveal">
          <h3 className={`font-playfair text-xl mb-4 text-[${primary}]`}>Etiquetas para redes sociales</h3>
          <p className={`text-[${primary}] mb-6`}>
            Si compartes fotos en tus redes sociales, utiliza nuestro hashtag para que podamos encontrarlas fácilmente.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <div className={`bg-[${secondary}]/20 rounded-full px-4 py-2 text-lg text-[${primary}] border border-[${secondary}]/30`}>
              #AmorEterno
            </div>
            <div className={`bg-[${secondary}]/20 rounded-full px-4 py-2 text-lg text-[${primary}] border border-[${secondary}]/30`}>
              #BodaJE2025
            </div>
            <div className={`bg-[${secondary}]/20 rounded-full px-4 py-2 text-lg text-[${primary}] border border-[${secondary}]/30`}>
              #NuevaVidaJuntos
            </div>
          </div>
          
          <h4 className={`font-medium mb-3 text-[${primary}]`}>Encuéntranos en:</h4>
          <div className="flex space-x-4">
            <a href="#" className={`text-[${primary}]/70 hover:text-[${secondary}] transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className={`text-[${primary}]/70 hover:text-[${secondary}] transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className={`text-[${primary}]/70 hover:text-[${secondary}] transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoShare;
