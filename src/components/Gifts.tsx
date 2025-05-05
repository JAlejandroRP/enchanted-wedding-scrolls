import { useEffect } from 'react';
import { Gift } from 'lucide-react';
import { useWeddingData } from '@/hooks/useWeddingData';
import { useThemeColors } from '@/hooks/useThemeColors';

const Gifts = () => {
  const { weddingData } = useWeddingData();
  const { giftsInfo } = weddingData;
  const { secondary } = useThemeColors();

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
      <h2 className="section-title reveal text-black">Mesa de Regalos</h2>
      
      <div className="text-center mb-12 max-w-2xl mx-auto reveal">
        <Gift size={32} className="mx-auto mb-4" style={{ color: secondary }} />
        <p className="text-black">
          El regalo más valioso para nosotros es contar con tu presencia en este día tan especial.
          Sin embargo, si deseas obsequiarnos algo, aquí te dejamos algunas opciones.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="reveal border-b border-[${secondary}]/30 pb-6">
          <h3 className="font-playfair text-xl mb-3 text-black">Mesa de Regalos</h3>
          <p className="text-black/80 mb-4">
            Hemos creado una mesa de regalos en las siguientes tiendas departamentales.
          </p>
          <div className="space-y-3">
            {giftsInfo.giftRegistries.map((registry, index) => (
              <a 
                key={index}
                href={registry.url} 
                className="block p-3 border rounded-md hover:bg-[${secondary}]/10 transition-colors text-center text-black"
                style={{ borderColor: secondary }}
                target="_blank"
                rel="noreferrer"
              >
                {registry.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="reveal border-b border-[${secondary}]/30 pb-6">
          <h3 className="font-playfair text-xl mb-3 text-black">Luna de Miel</h3>
          <p className="text-black/80 mb-4">
            Si prefieres, puedes contribuir a nuestra luna de miel con un obsequio monetario.
          </p>
          <div className="border-t border-dashed border-[${secondary}]/50 pt-4 mt-4">
            <p className="text-sm text-black/70 mb-2">Datos bancarios:</p>
            <p className="mb-1 text-black"><span className="font-medium">Banco:</span> {giftsInfo.bankInfo.bank}</p>
            <p className="mb-1 text-black"><span className="font-medium">Titular:</span> {giftsInfo.bankInfo.accountHolder}</p>
            <p className="mb-1 text-black"><span className="font-medium">CLABE:</span> {giftsInfo.bankInfo.accountNumber}</p>
          </div>
        </div>
        
        <div className="reveal">
          <h3 className="font-playfair text-xl mb-3 text-black">Lista de Deseos</h3>
          <p className="text-black/80 mb-4">
            Hemos preparado una lista de artículos específicos que nos encantaría recibir.
          </p>
          <ul className="space-y-2 text-black">
            {giftsInfo.wishlist.map((item, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-4 h-4 mr-2" style={{ color: secondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <a href="#" className="btn btn-outline w-full mt-4 text-center text-black" style={{ borderColor: secondary }}>Ver lista completa</a>
        </div>
      </div>
    </section>
  );
};

export default Gifts;
