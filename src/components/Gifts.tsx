
import { useEffect } from 'react';
import { Gift } from 'lucide-react';

const Gifts = () => {
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
    <section id="regalos" className="section-container">
      <h2 className="section-title reveal">Mesa de Regalos</h2>
      
      <div className="text-center mb-12 max-w-2xl mx-auto reveal">
        <Gift size={32} className="mx-auto mb-4 text-wedding-gold" />
        <p className="text-gray-700">
          El regalo más valioso para nosotros es contar con tu presencia en este día tan especial.
          Sin embargo, si deseas obsequiarnos algo, aquí te dejamos algunas opciones.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow reveal">
          <h3 className="font-playfair text-xl mb-3">Mesa de Regalos</h3>
          <p className="text-gray-600 mb-4">
            Hemos creado una mesa de regalos en las siguientes tiendas departamentales.
          </p>
          <div className="space-y-3">
            <a href="#" className="block p-3 border border-wedding-gold/50 rounded-md hover:bg-wedding-cream/50 transition-colors text-center">
              Liverpool
            </a>
            <a href="#" className="block p-3 border border-wedding-gold/50 rounded-md hover:bg-wedding-cream/50 transition-colors text-center">
              Palacio de Hierro
            </a>
            <a href="#" className="block p-3 border border-wedding-gold/50 rounded-md hover:bg-wedding-cream/50 transition-colors text-center">
              Amazon
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow reveal">
          <h3 className="font-playfair text-xl mb-3">Luna de Miel</h3>
          <p className="text-gray-600 mb-4">
            Si prefieres, puedes contribuir a nuestra luna de miel con un obsequio monetario.
          </p>
          <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-2">Datos bancarios:</p>
            <p className="mb-1"><span className="font-medium">Banco:</span> Ejemplo</p>
            <p className="mb-1"><span className="font-medium">Titular:</span> Nombres de los novios</p>
            <p className="mb-1"><span className="font-medium">CLABE:</span> 1234 5678 9012 3456</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow reveal">
          <h3 className="font-playfair text-xl mb-3">Lista de Deseos</h3>
          <p className="text-gray-600 mb-4">
            Hemos preparado una lista de artículos específicos que nos encantaría recibir.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Electrodomésticos para el hogar
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Artículos de decoración
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Utensilios de cocina
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Experiencias para nuestra luna de miel
            </li>
          </ul>
          <a href="#" className="btn btn-outline w-full mt-4 text-center">Ver lista completa</a>
        </div>
      </div>
    </section>
  );
};

export default Gifts;
