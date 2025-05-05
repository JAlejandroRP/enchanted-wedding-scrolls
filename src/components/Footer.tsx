
import { useNavigate } from 'react-router-dom';
import { Settings, LogIn, User } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAuth } from '@/hooks/useAuth';

const Footer = () => {
  const navigate = useNavigate();
  const { primary } = useThemeColors();
  const { user } = useAuth();
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
        
        <div className="flex justify-center gap-4 mt-6">
          {user ? (
            <>
              <button 
                onClick={() => navigate('/dashboard')}
                className={`text-[${primary}]/40 text-xs flex items-center hover:text-[${primary}]/60 transition-colors`}
              >
                <User className="w-3 h-3 mr-1" />
                Mi Panel
              </button>
              
              <button 
                onClick={() => navigate('/admin')}
                className={`text-[${primary}]/40 text-xs flex items-center hover:text-[${primary}]/60 transition-colors`}
              >
                <Settings className="w-3 h-3 mr-1" />
                Crear Invitación
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/auth')}
              className={`text-[${primary}]/40 text-xs flex items-center hover:text-[${primary}]/60 transition-colors`}
            >
              <LogIn className="w-3 h-3 mr-1" />
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
