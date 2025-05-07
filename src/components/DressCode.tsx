import { useWeddingData } from '@/hooks/useWeddingData';
import { useThemeColors } from '@/hooks/useThemeColors';

const DressCode = () => {
  const { weddingData } = useWeddingData();
  const { primary, secondary, accent } = useThemeColors();

  return (
    <section id="vestimenta" className="section-container">
      <h2 className="section-title reveal">Código de Vestimenta</h2>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6 reveal">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <img 
                src="https://img.icons8.com/ios/100/suit.png" 
                alt="suit" 
                className="w-12 h-12 mx-auto mb-2"
              />
            </div>
            <div className="text-center">
              <img 
                src="https://img.icons8.com/ios/50/wedding-dress.png" 
                alt="wedding-dress" 
                className="w-12 h-12 mx-auto mb-2 text-red-500"
              />
            </div>
          </div>
          <div>
            <ul className={`list-disc pl-5 space-y-2 text-[${primary}]/90`}>
              {weddingData.dressCode.formalWear.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-playfair text-xl mb-4 text-center">Colores a Evitar</h3>
            <ul className={`list-disc pl-5 space-y-2 text-[${primary}]/90`}>
              {weddingData.dressCode.avoidColors.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode; 