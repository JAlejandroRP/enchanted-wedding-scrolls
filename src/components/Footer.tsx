
import { useNavigate } from 'react-router-dom';
import { Settings, LogIn, User, Heart } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const navigate = useNavigate();
  const { primary, secondary } = useThemeColors();
  const { user } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className={`py-12 bg-[${primary}]/10 text-center`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <Heart className="w-8 h-8 mb-2" style={{ color: primary }} />
          <h3 className={`font-playfair text-2xl text-[${primary}] mb-2`}>
            Invitaciones de Boda Digitales
          </h3>
          <p className={`text-sm mb-6 text-[${primary}]/80 max-w-md mx-auto`}>
            Crea invitaciones personalizadas y gestiona todos los aspectos de tu boda con nuestra plataforma digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4" style={{ color: primary }}>Características</h4>
            <ul className={`space-y-2 text-sm text-[${primary}]/80`}>
              <li>Invitaciones Personalizadas</li>
              <li>Galería de Fotos</li>
              <li>Información del Evento</li>
              <li>Gestión de Invitados</li>
              <li>Confirmaciones de Asistencia</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ color: primary }}>Enlaces Rápidos</h4>
            <ul className={`space-y-2 text-sm text-[${primary}]/80`}>
              <li><button onClick={() => document.getElementById('inicio')?.scrollIntoView({behavior: 'smooth'})}>Inicio</button></li>
              <li><button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}>Características</button></li>
              <li><button onClick={() => navigate('/auth')}>Iniciar Sesión</button></li>
              {user && (
                <>
                  <li><button onClick={() => navigate('/dashboard')}>Mi Panel</button></li>
                  <li><button onClick={() => navigate('/admin')}>Crear Invitación</button></li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ color: primary }}>Comienza Ahora</h4>
            <p className={`text-sm mb-4 text-[${primary}]/80`}>
              Crea tu cuenta para comenzar a diseñar tu invitación de boda perfecta
            </p>
            {!user ? (
              <Button 
                onClick={() => navigate('/auth')}
                className={`bg-[${primary}] text-white hover:bg-[${primary}]/90 w-full`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className={`bg-[${primary}] text-white hover:bg-[${primary}]/90 w-full`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Mi Panel
                </Button>
                
                <Button 
                  onClick={() => navigate('/admin')}
                  variant="outline"
                  className={`border-[${primary}] text-[${primary}] hover:bg-[${primary}]/10 w-full`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Crear Invitación
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className={`text-[${primary}]/60 text-xs border-t border-[${primary}]/10 pt-6`}>
          &copy; {year} Invitaciones de Boda | Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
