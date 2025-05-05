
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 bg-[#3E000C]/10 text-center">
      <div className="container mx-auto">
        <h3 className="font-playfair text-2xl text-[#3E000C] mb-4">
          Juan & Elena
        </h3>
        
        <p className="text-sm mb-6 text-[#3E000C]/80">
          Gracias por compartir este momento especial con nosotros.
        </p>
        
        <div className="text-[#3E000C]/60 text-xs">
          &copy; {year} Juan & Elena | Todos los derechos reservados
        </div>
        
        <button 
          onClick={() => navigate('/admin')}
          className="mt-6 text-[#3E000C]/40 text-xs flex items-center mx-auto hover:text-[#3E000C]/60 transition-colors"
        >
          <Settings className="w-3 h-3 mr-1" />
          Administrar
        </button>
      </div>
    </footer>
  );
};

export default Footer;
