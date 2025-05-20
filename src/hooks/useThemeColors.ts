
import { useWeddingData } from './useWeddingData';
import { useLocation } from 'react-router-dom';
import { usePublicInvitation } from './usePublicInvitation';

export const useThemeColors = () => {
  const { weddingData: privateWeddingData } = useWeddingData();
  const { weddingData: publicWeddingData } = usePublicInvitation();
  const location = useLocation();
  
  // Solo aplicar los colores personalizados en la ruta /invitation/
  const isInvitationPage = location.pathname.includes('/invitation/');
  
  // Seleccionar la fuente correcta de datos
  const themeColors = isInvitationPage && publicWeddingData 
    ? publicWeddingData.themeColors
    : privateWeddingData.themeColors;
  
  // Colores predeterminados para resto de páginas (admin, dashboard, etc)
  const defaultColors = {
    primary: '#3E000C',
    secondary: '#D4B2A7',
    accent: '#B3B792',
    background: '#E5E0D8',
  };
  
  // Usar colores personalizados solo en la página de invitación
  return {
    primary: isInvitationPage ? themeColors.primary : defaultColors.primary,
    secondary: isInvitationPage ? themeColors.secondary : defaultColors.secondary,
    accent: isInvitationPage ? themeColors.accent : defaultColors.accent,
    background: isInvitationPage ? themeColors.background : defaultColors.background,
  };
};
