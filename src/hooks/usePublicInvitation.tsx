import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeddingData, ThemeColors, Location, DressCode, GiftsInfo } from '@/types/wedding';
import { useInvitations, Invitation } from '@/hooks/useInvitations';

interface PublicInvitationContextType {
  weddingData: WeddingData | null;
  loading: boolean;
  error: string | null;
  loadInvitation: (publicId: string) => Promise<void>;
}

const PublicInvitationContext = createContext<PublicInvitationContextType | undefined>(undefined);

export const PublicInvitationProvider = ({ children }: { children: ReactNode }) => {
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getInvitationByPublicId } = useInvitations();

  const loadInvitation = async (publicId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const invitation = await getInvitationByPublicId(publicId);
      
      if (!invitation) {
        setError('Invitación no encontrada');
        setWeddingData(null);
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
        ceremonyLocation: invitation.ceremony_location as unknown as Location,
        receptionLocation: invitation.reception_location as unknown as Location,
        galleryImages: invitation.gallery_images as string[],
        dressCode: invitation.dress_code as unknown as DressCode,
        giftsInfo: invitation.gifts_info as unknown as GiftsInfo,
        themeColors: invitation.theme_colors as unknown as ThemeColors
      };
      
      setWeddingData(data);
      
      // Apply theme colors to CSS variables ONLY on invitation pages
      if (data.themeColors) {
        if (window.location.pathname.startsWith('/invitation/')) {
          document.documentElement.style.setProperty('--wedding-primary', data.themeColors.primary);
          document.documentElement.style.setProperty('--wedding-secondary', data.themeColors.secondary);
          document.documentElement.style.setProperty('--wedding-accent', data.themeColors.accent);
          document.documentElement.style.setProperty('--wedding-background', data.themeColors.background);
        }
      }
      
    } catch (err) {
      console.error('Error loading invitation:', err);
      setError('Error al cargar la invitación');
      setWeddingData(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Limpia las variables CSS cuando se desmonta el componente
  useEffect(() => {
    return () => {
      // Restaurar valores predeterminados al salir de la invitación
      document.documentElement.style.removeProperty('--wedding-primary');
      document.documentElement.style.removeProperty('--wedding-secondary');
      document.documentElement.style.removeProperty('--wedding-accent');
      document.documentElement.style.removeProperty('--wedding-background');
    };
  }, []);

  return (
    <PublicInvitationContext.Provider value={{ weddingData, loading, error, loadInvitation }}>
      {children}
    </PublicInvitationContext.Provider>
  );
};

export const usePublicInvitation = () => {
  const context = useContext(PublicInvitationContext);
  if (context === undefined) {
    throw new Error('usePublicInvitation must be used within a PublicInvitationProvider');
  }
  return context;
};
