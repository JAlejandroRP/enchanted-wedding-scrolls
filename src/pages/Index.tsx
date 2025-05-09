
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMultipleIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  Calendar, 
  Image, 
  Palette, 
  MapPin, 
  Users, 
  Share, 
  CheckCircle, 
  Bell, 
  Whatsapp,
  Heart
} from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';

const Index = () => {
  const navigate = useNavigate();
  const { primary, secondary, background } = useThemeColors();
  
  // Hook para animar elementos cuando aparecen en viewport
  useMultipleIntersectionObserver();
  
  // Efecto para inicializar animaciones en scroll
  useEffect(() => {
    // Inicializamos el efecto de scroll
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Inicializar para elementos visibles al cargar
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Invitaciones Personalizables",
      description: "Crea invitaciones de boda totalmente personalizadas que reflejen tu estilo y personalidad.",
      icon: <Heart className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Selección de Colores",
      description: "Personaliza cada aspecto visual con una amplia selección de colores para crear el tema perfecto.",
      icon: <Palette className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Galería de Fotos",
      description: "Sube y muestra tus mejores fotos en una elegante galería integrada en tu invitación.",
      icon: <Image className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Detalles del Evento",
      description: "Incluye toda la información importante: fecha, ubicación, horarios y detalles adicionales.",
      icon: <Calendar className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Ubicaciones con Mapa",
      description: "Comparte la ubicación exacta de la ceremonia y recepción con enlaces de Google Maps.",
      icon: <MapPin className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Lista de Invitados",
      description: "Gestiona fácilmente tu lista de invitados con importación desde formato CSV.",
      icon: <Users className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Compartir Invitaciones",
      description: "Envía invitaciones personalizadas a cada uno de tus invitados de forma sencilla.",
      icon: <Share className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Confirmación de Asistencia",
      description: "Permite a tus invitados confirmar su asistencia directamente desde la invitación.",
      icon: <CheckCircle className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Control de Asistencia",
      description: "Seguimiento en tiempo real de quiénes han confirmado su asistencia a tu boda.",
      icon: <Bell className="w-12 h-12" style={{ color: primary }} />
    },
    {
      title: "Notificaciones WhatsApp",
      description: "Envía recordatorios y actualizaciones por WhatsApp a tus invitados.",
      icon: <Whatsapp className="w-12 h-12" style={{ color: primary }} />
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[${background}]`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
          <img 
            src="/images/wedding-hero.jpg" 
            alt="Boda" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair text-white mb-6 animate-fade-in">
              Crea Invitaciones de Boda Perfectas
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Diseña, personaliza y comparte invitaciones digitales elegantes para el día más especial de tu vida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={() => navigate("/auth")}
                size="lg" 
                className={`bg-[${primary}] hover:bg-[${primary}]/90 text-white px-8 py-6 text-lg`}
              >
                Comenzar Ahora
              </Button>
              <Button 
                onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
              >
                Ver Características
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4 reveal" style={{ color: primary }}>
              Todo lo que necesitas para tu invitación perfecta
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto reveal">
              Nuestra plataforma te ofrece todas las herramientas para crear y gestionar invitaciones de boda digitales que impresionarán a tus invitados.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300 h-full reveal">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className={`py-24 bg-[${background}]/10`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4 reveal" style={{ color: primary }}>
              Cómo Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto reveal">
              Crear y compartir tu invitación de boda perfecta nunca ha sido más fácil con nuestro proceso simple
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center reveal">
              <div className="rounded-full w-16 h-16 bg-white flex items-center justify-center mx-auto mb-4 shadow-md" style={{ borderColor: secondary, borderWidth: '2px' }}>
                <span className="text-2xl font-bold" style={{ color: primary }}>1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: primary }}>Crea tu cuenta</h3>
              <p className="text-gray-600">Regístrate para acceder a todas las herramientas de personalización</p>
            </div>
            
            <div className="text-center reveal" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full w-16 h-16 bg-white flex items-center justify-center mx-auto mb-4 shadow-md" style={{ borderColor: secondary, borderWidth: '2px' }}>
                <span className="text-2xl font-bold" style={{ color: primary }}>2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: primary }}>Personaliza tu invitación</h3>
              <p className="text-gray-600">Añade todos los detalles, fotos y elige los colores perfectos</p>
            </div>
            
            <div className="text-center reveal" style={{ animationDelay: '0.4s' }}>
              <div className="rounded-full w-16 h-16 bg-white flex items-center justify-center mx-auto mb-4 shadow-md" style={{ borderColor: secondary, borderWidth: '2px' }}>
                <span className="text-2xl font-bold" style={{ color: primary }}>3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: primary }}>Comparte y gestiona</h3>
              <p className="text-gray-600">Envía las invitaciones y gestiona las confirmaciones de asistencia</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-[#3E000C] to-[#6B0014] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6 reveal">
            ¿Listo para crear tu invitación perfecta?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto reveal">
            Comienza hoy mismo y haz que el día más especial de tu vida sea aún más memorable con nuestras invitaciones digitales.
          </p>
          <Button 
            onClick={() => navigate("/auth")}
            size="lg" 
            className="bg-white text-[#3E000C] hover:bg-white/90 px-8 py-6 text-lg reveal"
          >
            Crear Mi Invitación
          </Button>
        </div>
      </section>
      
      {/* Testimonials or Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4 reveal" style={{ color: primary }}>
              Vive la Experiencia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto reveal">
              Descubre cómo nuestras invitaciones digitales pueden transformar la forma en que invitas a tus seres queridos
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-lg reveal">
            <div className="relative pt-[56.25%]">
              <img 
                src="/images/invitation-preview.jpg" 
                alt="Vista previa de la invitación" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-playfair mb-2">Tu historia de amor, en digital</h3>
                  <p>Invitaciones elegantes que tus invitados recordarán para siempre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
