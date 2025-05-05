
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInvitations } from '@/hooks/useInvitations';
import { WeddingData } from '@/types/wedding';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import Gifts from "@/components/Gifts";
import Tips from "@/components/Tips";
import PhotoShare from "@/components/PhotoShare";
import Footer from "@/components/Footer";
import { useMultipleIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Invitation = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const { getInvitationByPublicId } = useInvitations();
  const [loading, setLoading] = useState(true);
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  const [error, setError] = useState('');
  
  // Hook for animations
  useMultipleIntersectionObserver();

  useEffect(() => {
    const fetchInvitation = async () => {
      if (!publicId) {
        setError('No se encontró la invitación');
        setLoading(false);
        return;
      }
      
      try {
        const invitation = await getInvitationByPublicId(publicId);
        
        if (!invitation) {
          setError('No se encontró la invitación');
          setLoading(false);
          return;
        }
        
        // Transform database invitation to WeddingData format
        const data: WeddingData = {
          brideFirstName: invitation.bride_first_name,
          brideLastName: invitation.bride_last_name,
          groomFirstName: invitation.groom_first_name,
          groomLastName: invitation.groom_last_name,
          weddingDate: new Date(invitation.wedding_date),
          backgroundImageUrl: invitation.background_image_url,
          mobileBackgroundImageUrl: invitation.mobile_background_image_url || undefined,
          ceremonyLocation: invitation.ceremony_location as any,
          receptionLocation: invitation.reception_location as any,
          galleryImages: invitation.gallery_images as string[],
          dressCode: invitation.dress_code as any,
          giftsInfo: invitation.gifts_info as any,
          themeColors: invitation.theme_colors as any
        };
        
        setWeddingData(data);
        
        // Apply theme colors to CSS variables
        if (data.themeColors) {
          document.documentElement.style.setProperty('--wedding-primary', data.themeColors.primary);
          document.documentElement.style.setProperty('--wedding-secondary', data.themeColors.secondary);
          document.documentElement.style.setProperty('--wedding-accent', data.themeColors.accent);
          document.documentElement.style.setProperty('--wedding-background', data.themeColors.background);
        }
        
      } catch (err) {
        console.error('Error loading invitation:', err);
        setError('Error al cargar la invitación');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvitation();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize animations
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
    handleScroll(); // Initialize for elements visible on load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [publicId, getInvitationByPublicId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5E0D8]">
        <p className="text-[#3E000C] text-lg">Cargando invitación...</p>
      </div>
    );
  }

  if (error || !weddingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#E5E0D8] p-4">
        <h1 className="text-3xl font-playfair text-[#3E000C] mb-4">Invitación no encontrada</h1>
        <p className="text-[#3E000C]/70 mb-6 text-center">
          La invitación que estás buscando no existe o ha sido eliminada.
        </p>
        <a 
          href="/"
          className="px-4 py-2 bg-[#3E000C] text-white rounded-md hover:bg-[#3E000C]/90 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <Hero />
      
      <EventDetails 
        weddingDate={weddingData.weddingDate}
        ceremony={weddingData.ceremonyLocation}
        reception={weddingData.receptionLocation}
      />
      
      <Gallery />
      
      <Gifts />
      
      <Tips />
      
      <PhotoShare />
      
      <Footer />
    </div>
  );
};

export default Invitation;
