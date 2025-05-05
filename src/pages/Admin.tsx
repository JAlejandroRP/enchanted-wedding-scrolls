import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Save, Image, RefreshCw, Map, Gift, Palette } from 'lucide-react';
import { useWeddingData } from '@/hooks/useWeddingData';
import { useWeddingForm } from '@/hooks/useWeddingForm';
import { WeddingData, ThemeColors } from '@/types/wedding';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { InfoSection } from '@/components/admin/InfoSection';
import { ThemeSection } from '@/components/admin/ThemeSection';
import { LocationSection } from '@/components/admin/LocationSection';
import { GallerySection } from '@/components/admin/GallerySection';
import { DressCodeSection } from '@/components/admin/DressCodeSection';
import { GiftsSection } from '@/components/admin/GiftsSection';

interface ThemePreset {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const themePresets: ThemePreset[] = [
  { name: "Borgoña y Rosa", primary: "#8B0000", secondary: "#FFB6C1", accent: "#FF69B4", background: "#FFF0F5" },
  { name: "Azul y Dorado", primary: "#00008B", secondary: "#FFD700", accent: "#FFA500", background: "#F0F8FF" },
  { name: "Verde y Terracota", primary: "#006400", secondary: "#E2725B", accent: "#8B4513", background: "#F5F5DC" },
  { name: "Lavanda y Melocotón", primary: "#6B5CA5", secondary: "#F8B195", accent: "#F67280", background: "#FAF3F3" }
];

const Admin = () => {
  const navigate = useNavigate();
  const { weddingData, updateWeddingData, resetWeddingData } = useWeddingData();
  const [dateOpen, setDateOpen] = useState(false);
  
  const {
    formData,
    handleInputChange,
    handleNestedInputChange,
    handleDateSelect,
    handleGalleryImageChange,
    handleAddGalleryImage,
    handleRemoveGalleryImage,
    handleDressCodeItemChange,
    handleAddDressCodeItem,
    handleRemoveDressCodeItem,
    handleGiftRegistryChange,
    handleAddGiftRegistry,
    handleRemoveGiftRegistry,
    handleWishlistItemChange,
    handleAddWishlistItem,
    handleRemoveWishlistItem,
    handleColorChange,
    resetForm
  } = useWeddingForm(weddingData);

  // Handle textarea changes for location iframes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, location: 'ceremonyLocation' | 'receptionLocation') => {
    // Create a synthetic input event with the textarea value
    const syntheticEvent = {
      target: { value: e.target.value },
      currentTarget: { value: e.target.value },
      preventDefault: () => {},
      stopPropagation: () => {},
      nativeEvent: new Event('change'),
      bubbles: true,
      cancelable: true,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      timeStamp: Date.now(),
      type: 'change'
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(syntheticEvent, location, 'mapIframe');
  };

  // Apply theme preset
  const applyThemePreset = (preset: ThemePreset) => {
    // Create a synthetic input event for color changes
    const createColorEvent = (value: string): React.ChangeEvent<HTMLInputElement> => {
      const input = document.createElement('input');
      input.value = value;
      
      return {
        target: input,
        currentTarget: input,
        preventDefault: () => {},
        stopPropagation: () => {},
        nativeEvent: new Event('change'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'change'
      } as React.ChangeEvent<HTMLInputElement>;
    };

    handleColorChange(createColorEvent(preset.primary), 'primary');
    handleColorChange(createColorEvent(preset.secondary), 'secondary');
    handleColorChange(createColorEvent(preset.accent), 'accent');
    handleColorChange(createColorEvent(preset.background), 'background');
  };

  // Save changes
  const handleSave = () => {
    updateWeddingData(formData);
    toast({
      title: "Cambios guardados",
      description: "Los cambios han sido guardados correctamente."
    });
  };

  // Reset to defaults
  const handleReset = () => {
    if (confirm("¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer.")) {
      resetWeddingData();
      resetForm(weddingData);
      toast({
        title: "Datos restablecidos",
        description: "Los datos han sido restablecidos a sus valores predeterminados."
      });
    }
  };

  // Go to preview
  const handlePreview = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: formData.themeColors.background }}>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair" style={{ color: formData.themeColors.primary }}>
            Panel Administrativo
          </h1>
          <div className="flex gap-2">
            <Button 
              onClick={handlePreview} 
              variant="outline" 
              className="border-[#D4B2A7] hover:bg-[#D4B2A7]/20"
              style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
            >
              Ver Invitación
            </Button>
            <Button 
              onClick={handleSave} 
              className="text-white"
              style={{ backgroundColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
            >
              <Save className="mr-2 h-4 w-4" /> Guardar Cambios
            </Button>
          </div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="grid grid-cols-5 w-full mb-8">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="locations">Ubicaciones</TabsTrigger>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="dresscode">Vestimenta</TabsTrigger>
            <TabsTrigger value="gifts">Regalos</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-8">
            <InfoSection
              formData={formData}
              onInputChange={handleInputChange}
              onDateSelect={handleDateSelect}
              dateOpen={dateOpen}
              setDateOpen={setDateOpen}
            />
            <ThemeSection
              formData={formData}
              onColorChange={handleColorChange}
              onApplyPreset={applyThemePreset}
            />
          </TabsContent>

          <TabsContent value="locations">
            <LocationSection
              formData={formData}
              onInputChange={handleInputChange}
              onTextareaChange={handleTextareaChange}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <GallerySection
              formData={formData}
              onGalleryImageChange={handleGalleryImageChange}
              onAddGalleryImage={handleAddGalleryImage}
              onRemoveGalleryImage={handleRemoveGalleryImage}
            />
          </TabsContent>

          <TabsContent value="dresscode">
            <DressCodeSection
              formData={formData}
              onDressCodeItemChange={handleDressCodeItemChange}
              onAddDressCodeItem={handleAddDressCodeItem}
              onRemoveDressCodeItem={handleRemoveDressCodeItem}
            />
          </TabsContent>

          <TabsContent value="gifts">
            <GiftsSection
              formData={formData}
              onGiftRegistryChange={handleGiftRegistryChange}
              onAddGiftRegistry={handleAddGiftRegistry}
              onRemoveGiftRegistry={handleRemoveGiftRegistry}
              onNestedInputChange={handleNestedInputChange}
              onWishlistItemChange={handleWishlistItemChange}
              onAddWishlistItem={handleAddWishlistItem}
              onRemoveWishlistItem={handleRemoveWishlistItem}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> 
            Restablecer valores predeterminados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
