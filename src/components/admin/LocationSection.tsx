
import { Map } from 'lucide-react';
import { FormData } from '@/types/wedding';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FileUpload } from '@/components/FileUpload';

interface LocationSectionProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData, nestedField?: string) => void;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>, location: 'ceremonyLocation' | 'receptionLocation') => void;
}

export const LocationSection = ({
  formData,
  onInputChange,
  onTextareaChange
}: LocationSectionProps) => {
  
  const handleImageUpload = (url: string, location: 'ceremonyLocation' | 'receptionLocation') => {
    const syntheticEvent = {
      target: { 
        value: url 
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInputChange(syntheticEvent, location, 'imageUrl');
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Map className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
        <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
          Ubicaciones
        </h2>
      </div>
      
      <div className="space-y-6">
        {/* Ceremony Location */}
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-4" style={{ color: formData.themeColors.primary }}>
            Ceremonia
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="ceremonyName">Nombre del lugar</Label>
              <Input 
                id="ceremonyName" 
                value={formData.ceremonyLocation?.name || ''} 
                onChange={(e) => onInputChange(e, 'ceremonyLocation', 'name')}
                placeholder="Ej: Parroquia Santa María"
              />
            </div>
            
            <div>
              <Label htmlFor="ceremonyAddress">Dirección</Label>
              <Input 
                id="ceremonyAddress" 
                value={formData.ceremonyLocation?.address || ''} 
                onChange={(e) => onInputChange(e, 'ceremonyLocation', 'address')}
                placeholder="Ej: Calle Principal 123, Ciudad"
              />
            </div>
            
            <div>
              <Label htmlFor="ceremonyTime">Hora</Label>
              <Input 
                id="ceremonyTime" 
                value={formData.ceremonyLocation?.time || ''} 
                onChange={(e) => onInputChange(e, 'ceremonyLocation', 'time')}
                placeholder="Ej: 16:00 hrs"
              />
            </div>
            
            <div>
              <Label>Imagen del lugar</Label>
              <FileUpload 
                onUploadComplete={(url) => handleImageUpload(url, 'ceremonyLocation')}
                buttonText="Subir imagen de la ceremonia"
                currentValue={formData.ceremonyLocation?.imageUrl || ''}
              >
                <p className="text-sm text-gray-500">
                  Sube una imagen representativa del lugar de la ceremonia
                </p>
              </FileUpload>
            </div>
            
            <div>
              <Label htmlFor="ceremonyMap">Mapa (iframe de Google Maps)</Label>
              <Textarea 
                id="ceremonyMap" 
                value={formData.ceremonyLocation?.mapIframe || ''} 
                onChange={(e) => onTextareaChange(e, 'ceremonyLocation')}
                placeholder="Pega aquí el código iframe de Google Maps"
                className="h-32"
              />
              <p className="text-xs mt-1 text-gray-500">
                Ve a Google Maps, busca la ubicación, haz clic en "Compartir", selecciona "Incorporar un mapa" y copia el código HTML.
              </p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Reception Location */}
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-4" style={{ color: formData.themeColors.primary }}>
            Recepción
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="receptionName">Nombre del lugar</Label>
              <Input 
                id="receptionName" 
                value={formData.receptionLocation?.name || ''} 
                onChange={(e) => onInputChange(e, 'receptionLocation', 'name')}
                placeholder="Ej: Salón de Eventos El Jardín"
              />
            </div>
            
            <div>
              <Label htmlFor="receptionAddress">Dirección</Label>
              <Input 
                id="receptionAddress" 
                value={formData.receptionLocation?.address || ''} 
                onChange={(e) => onInputChange(e, 'receptionLocation', 'address')}
                placeholder="Ej: Avenida Principal 456, Ciudad"
              />
            </div>
            
            <div>
              <Label htmlFor="receptionTime">Hora</Label>
              <Input 
                id="receptionTime" 
                value={formData.receptionLocation?.time || ''} 
                onChange={(e) => onInputChange(e, 'receptionLocation', 'time')}
                placeholder="Ej: 18:00 hrs"
              />
            </div>
            
            <div>
              <Label>Imagen del lugar</Label>
              <FileUpload 
                onUploadComplete={(url) => handleImageUpload(url, 'receptionLocation')}
                buttonText="Subir imagen de la recepción"
                currentValue={formData.receptionLocation?.imageUrl || ''}
              >
                <p className="text-sm text-gray-500">
                  Sube una imagen representativa del lugar de la recepción
                </p>
              </FileUpload>
            </div>
            
            <div>
              <Label htmlFor="receptionMap">Mapa (iframe de Google Maps)</Label>
              <Textarea 
                id="receptionMap" 
                value={formData.receptionLocation?.mapIframe || ''} 
                onChange={(e) => onTextareaChange(e, 'receptionLocation')}
                placeholder="Pega aquí el código iframe de Google Maps"
                className="h-32"
              />
              <p className="text-xs mt-1 text-gray-500">
                Ve a Google Maps, busca la ubicación, haz clic en "Compartir", selecciona "Incorporar un mapa" y copia el código HTML.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
