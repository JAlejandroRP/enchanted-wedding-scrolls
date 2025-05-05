import { Palette } from 'lucide-react';
import { FormData } from '@/types/wedding';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ThemeSectionProps {
  formData: FormData;
  onColorChange: (e: React.ChangeEvent<HTMLInputElement>, colorKey: keyof FormData['themeColors']) => void;
  onApplyPreset: (preset: typeof themePresets[0]) => void;
}

// Predefined theme colors
const themePresets = [
  { name: "Borgoña y Rosa", primary: "#3E000C", secondary: "#D4B2A7", accent: "#B3B792", background: "#E5E0D8" },
  { name: "Azul y Dorado", primary: "#14213D", secondary: "#FCA311", accent: "#E5E5E5", background: "#FFFFFF" },
  { name: "Verde y Terracota", primary: "#344E41", secondary: "#A3B18A", accent: "#DAD7CD", background: "#F8F9FA" },
  { name: "Lavanda y Melocotón", primary: "#6B5CA5", secondary: "#F8B195", accent: "#F67280", background: "#FAF3F3" }
];

export const ThemeSection = ({
  formData,
  onColorChange,
  onApplyPreset
}: ThemeSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Palette className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
        <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
          Colores del Tema
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="primaryColor">Color Primario</Label>
          <div className="flex gap-2 items-center">
            <Input 
              id="primaryColor" 
              type="color"
              value={formData.themeColors.primary} 
              onChange={(e) => onColorChange(e, 'primary')}
              className="w-12 h-10 p-1"
            />
            <Input 
              value={formData.themeColors.primary} 
              onChange={(e) => onColorChange(e, 'primary')}
              className="flex-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="secondaryColor">Color Secundario</Label>
          <div className="flex gap-2 items-center">
            <Input 
              id="secondaryColor" 
              type="color"
              value={formData.themeColors.secondary} 
              onChange={(e) => onColorChange(e, 'secondary')}
              className="w-12 h-10 p-1"
            />
            <Input 
              value={formData.themeColors.secondary} 
              onChange={(e) => onColorChange(e, 'secondary')}
              className="flex-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="accentColor">Color Acento</Label>
          <div className="flex gap-2 items-center">
            <Input 
              id="accentColor" 
              type="color"
              value={formData.themeColors.accent} 
              onChange={(e) => onColorChange(e, 'accent')}
              className="w-12 h-10 p-1"
            />
            <Input 
              value={formData.themeColors.accent} 
              onChange={(e) => onColorChange(e, 'accent')}
              className="flex-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="backgroundColor">Color de Fondo</Label>
          <div className="flex gap-2 items-center">
            <Input 
              id="backgroundColor" 
              type="color"
              value={formData.themeColors.background} 
              onChange={(e) => onColorChange(e, 'background')}
              className="w-12 h-10 p-1"
            />
            <Input 
              value={formData.themeColors.background} 
              onChange={(e) => onColorChange(e, 'background')}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Label>Temas Predefinidos</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {themePresets.map((preset, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="h-auto py-2 justify-start flex-col items-start"
              onClick={() => onApplyPreset(preset)}
            >
              <span className="text-xs font-medium mb-2">{preset.name}</span>
              <div className="flex w-full gap-1">
                <div className="h-4 flex-1 rounded-sm" style={{ backgroundColor: preset.primary }}></div>
                <div className="h-4 flex-1 rounded-sm" style={{ backgroundColor: preset.secondary }}></div>
                <div className="h-4 flex-1 rounded-sm" style={{ backgroundColor: preset.accent }}></div>
                <div className="h-4 flex-1 rounded-sm border" style={{ backgroundColor: preset.background }}></div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}; 