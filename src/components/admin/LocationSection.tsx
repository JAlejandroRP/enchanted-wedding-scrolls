
import { Map, MapPin } from 'lucide-react';
import { FormData } from '@/types/wedding';
import { FileUpload } from '@/components/FileUpload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
            <Label htmlFor="ceremonyMapUrl">URL de Google Maps</Label>
            <Input 
              id="ceremonyMapUrl" 
              value={formData.ceremonyLocation.mapUrl || ''} 
              onChange={(e) => onInputChange(e, 'ceremonyLocation', 'mapUrl')}
              placeholder="https://maps.google.com/?q=..."
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen del Lugar</Label>
            {!formData.ceremonyLocation.imageUrl ? (
              <FileUpload
                onUploadComplete={(url) => {
                  const syntheticEvent = {
                    target: { value: url },
                    currentTarget: { value: url }
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  onInputChange(syntheticEvent, 'ceremonyLocation', 'imageUrl');
                }}
                buttonText="Subir imagen del lugar de ceremonia"
              />
            ) : (
              <div className="mt-2 h-48 rounded-md overflow-hidden">
                <img 
                  src={formData.ceremonyLocation.imageUrl} 
                  alt="Ceremonia" 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const syntheticEvent = {
                      target: { value: "" },
                      currentTarget: { value: "" }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onInputChange(syntheticEvent, 'ceremonyLocation', 'imageUrl');
                  }}
                  className="mt-2"
                >
                  Cambiar imagen
                </Button>
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
            <Label htmlFor="receptionMapUrl">URL de Google Maps</Label>
            <Input 
              id="receptionMapUrl" 
              value={formData.receptionLocation.mapUrl || ''} 
              onChange={(e) => onInputChange(e, 'receptionLocation', 'mapUrl')}
              placeholder="https://maps.google.com/?q=..."
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen del Lugar</Label>
            {!formData.receptionLocation.imageUrl ? (
              <FileUpload
                onUploadComplete={(url) => {
                  const syntheticEvent = {
                    target: { value: url },
                    currentTarget: { value: url }
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  onInputChange(syntheticEvent, 'receptionLocation', 'imageUrl');
                }}
                buttonText="Subir imagen del lugar de recepción"
              />
            ) : (
              <div className="mt-2 h-48 rounded-md overflow-hidden">
                <img 
                  src={formData.receptionLocation.imageUrl} 
                  alt="Recepción" 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const syntheticEvent = {
                      target: { value: "" },
                      currentTarget: { value: "" }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onInputChange(syntheticEvent, 'receptionLocation', 'imageUrl');
                  }}
                  className="mt-2"
                >
                  Cambiar imagen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

