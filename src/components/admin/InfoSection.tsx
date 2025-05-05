import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { FormData } from '@/types/wedding';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface InfoSectionProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData, nestedField?: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  dateOpen: boolean;
  setDateOpen: (open: boolean) => void;
}

export const InfoSection = ({
  formData,
  onInputChange,
  onDateSelect,
  dateOpen,
  setDateOpen
}: InfoSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-medium mb-4" style={{ color: formData.themeColors.primary }}>
        Información Principal
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groomFirstName">Nombre del Novio</Label>
            <Input 
              id="groomFirstName" 
              value={formData.groomFirstName} 
              onChange={(e) => onInputChange(e, 'groomFirstName')}
            />
          </div>
          <div>
            <Label htmlFor="groomLastName">Apellido del Novio</Label>
            <Input 
              id="groomLastName" 
              value={formData.groomLastName} 
              onChange={(e) => onInputChange(e, 'groomLastName')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brideFirstName">Nombre de la Novia</Label>
            <Input 
              id="brideFirstName" 
              value={formData.brideFirstName} 
              onChange={(e) => onInputChange(e, 'brideFirstName')}
            />
          </div>
          <div>
            <Label htmlFor="brideLastName">Apellido de la Novia</Label>
            <Input 
              id="brideLastName" 
              value={formData.brideLastName} 
              onChange={(e) => onInputChange(e, 'brideLastName')}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="weddingDate">Fecha de la Boda</Label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.weddingDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formData.weddingDate ? (
                  format(formData.weddingDate, "PPP", { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.weddingDate}
                onSelect={onDateSelect}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="backgroundImageUrl">Imagen de Fondo (URL)</Label>
          <Input 
            id="backgroundImageUrl" 
            value={formData.backgroundImageUrl} 
            onChange={(e) => onInputChange(e, 'backgroundImageUrl')}
          />
          {formData.backgroundImageUrl && (
            <div className="mt-2 h-32 rounded-md overflow-hidden">
              <img 
                src={formData.backgroundImageUrl} 
                alt="Fondo" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="mobileBackgroundImageUrl">Imagen de Fondo Móvil (URL)</Label>
          <Input 
            id="mobileBackgroundImageUrl" 
            value={formData.mobileBackgroundImageUrl || ''} 
            onChange={(e) => onInputChange(e, 'mobileBackgroundImageUrl')}
          />
          {formData.mobileBackgroundImageUrl && (
            <div className="mt-2 h-32 rounded-md overflow-hidden">
              <img 
                src={formData.mobileBackgroundImageUrl} 
                alt="Fondo Móvil" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 