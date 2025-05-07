
import { Map } from 'lucide-react';
import { FormData } from '@/types/wedding';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Map className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
          <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
            Ceremonia
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="ceremonyName">Nombre del Lugar</Label>
            <Input 
              id="ceremonyName" 
              value={formData.ceremonyLocation.name} 
              onChange={(e) => onInputChange(e, 'ceremonyLocation', 'name')}
            />
          </div>

          <div>
            <Label htmlFor="ceremonyAddress">Dirección</Label>
            <Input 
              id="ceremonyAddress" 
              value={formData.ceremonyLocation.address} 
              onChange={(e) => onInputChange(e, 'ceremonyLocation', 'address')}
            />
          </div>

          <div>
            <Label htmlFor="ceremonyTime">Hora</Label>
            <Input 
              id="ceremonyTime" 
              value={formData.ceremonyLocation.time} 
              onChange={(e) => onInputChange(e, 'ceremonyLocation', 'time')}
            />
          </div>

          <div>
            <Label htmlFor="ceremonyImageUrl">URL de la Imagen</Label>
            <Input 
              id="ceremonyImageUrl" 
              value={formData.ceremonyLocation.imageUrl || ''} 
              onChange={(e) => onInputChange(e, 'ceremonyLocation', 'imageUrl')}
            />
            {formData.ceremonyLocation.imageUrl && (
              <div className="mt-2 h-32 rounded-md overflow-hidden">
                <img 
                  src={formData.ceremonyLocation.imageUrl} 
                  alt="Ceremonia" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Map className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
          <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
            Recepción
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="receptionName">Nombre del Lugar</Label>
            <Input 
              id="receptionName" 
              value={formData.receptionLocation.name} 
              onChange={(e) => onInputChange(e, 'receptionLocation', 'name')}
            />
          </div>

          <div>
            <Label htmlFor="receptionAddress">Dirección</Label>
            <Input 
              id="receptionAddress" 
              value={formData.receptionLocation.address} 
              onChange={(e) => onInputChange(e, 'receptionLocation', 'address')}
            />
          </div>

          <div>
            <Label htmlFor="receptionTime">Hora</Label>
            <Input 
              id="receptionTime" 
              value={formData.receptionLocation.time} 
              onChange={(e) => onInputChange(e, 'receptionLocation', 'time')}
            />
          </div>

          <div>
            <Label htmlFor="receptionImageUrl">URL de la Imagen</Label>
            <Input 
              id="receptionImageUrl" 
              value={formData.receptionLocation.imageUrl || ''} 
              onChange={(e) => onInputChange(e, 'receptionLocation', 'imageUrl')}
            />
            {formData.receptionLocation.imageUrl && (
              <div className="mt-2 h-32 rounded-md overflow-hidden">
                <img 
                  src={formData.receptionLocation.imageUrl} 
                  alt="Recepción" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
