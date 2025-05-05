import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';

const Footer = () => {
  const navigate = useNavigate();
  const { primary } = useThemeColors();
  const year = new Date().getFullYear();

  return (
    <footer className={`py-8 bg-[${primary}]/10 text-center`}>
      <div className="container mx-auto">
        <h3 className={`font-playfair text-2xl text-[${primary}] mb-4`}>
          Juan & Elena
        </h3>
        
        <p className={`text-sm mb-6 text-[${primary}]/80`}>
          Gracias por compartir este momento especial con nosotros.
        </p>
        
        <div className={`text-[${primary}]/60 text-xs`}>
          &copy; {year} Juan & Elena | Todos los derechos reservados
        </div>
        
        <button 
          onClick={() => navigate('/admin')}
          className={`mt-6 text-[${primary}]/40 text-xs flex items-center mx-auto hover:text-[${primary}]/60 transition-colors`}
        >
          <Settings className="w-3 h-3 mr-1" />
          Administrar
        </button>
      </div>
    </footer>
  );
};

export default Footer;
