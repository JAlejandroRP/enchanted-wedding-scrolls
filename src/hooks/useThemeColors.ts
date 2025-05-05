import { useWeddingData } from './useWeddingData';

export const useThemeColors = () => {
  const { weddingData } = useWeddingData();
  const { themeColors } = weddingData;

  return {
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    accent: themeColors.accent,
    background: themeColors.background,
  };
}; 