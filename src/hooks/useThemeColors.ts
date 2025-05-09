
import { useWeddingData } from './useWeddingData';
import { useLocation } from 'react-router-dom';

export const useThemeColors = () => {
  const { weddingData } = useWeddingData();
  const location = useLocation();
  const { themeColors } = weddingData;
  
  // Solo aplicar los colores personalizados en la ruta /invitation/
  const isInvitationPage = location.pathname.includes('/invitation/');
  
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
