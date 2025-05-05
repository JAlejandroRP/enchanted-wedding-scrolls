
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Save, Image, RefreshCw } from 'lucide-react';
import { useWeddingData } from '@/hooks/useWeddingData';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

const Admin = () => {
  const navigate = useNavigate();
  const { weddingData, updateWeddingData, resetWeddingData } = useWeddingData();
  
  // Local state for form
  const [formData, setFormData] = useState({
    ...weddingData,
    // Create a copy to avoid modifying the original
    ceremonyLocation: { ...weddingData.ceremonyLocation },
    receptionLocation: { ...weddingData.receptionLocation },
    galleryImages: [...weddingData.galleryImages]
  });

  // Track if date picker is open
  const [dateOpen, setDateOpen] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, nestedField?: string) => {
    if (nestedField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [nestedField]: e.target.value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        weddingDate: date
      }));
      setDateOpen(false);
    }
  };

  // Handle gallery image change
  const handleGalleryImageChange = (index: number, value: string) => {
    const newGalleryImages = [...formData.galleryImages];
    newGalleryImages[index] = value;
    setFormData(prev => ({
      ...prev,
      galleryImages: newGalleryImages
    }));
  };

  // Handle new gallery image
  const handleAddGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ""]
    }));
  };

  // Handle remove gallery image
  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = [...formData.galleryImages];
    newGalleryImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      galleryImages: newGalleryImages
    }));
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
      setFormData({
        ...weddingData,
        ceremonyLocation: { ...weddingData.ceremonyLocation },
        receptionLocation: { ...weddingData.receptionLocation },
        galleryImages: [...weddingData.galleryImages]
      });
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
    <div className="min-h-screen bg-[#E5E0D8]">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair text-[#3E000C]">Panel Administrativo</h1>
          <div className="flex gap-2">
            <Button 
              onClick={handlePreview} 
              variant="outline" 
              className="border-[#D4B2A7] text-[#3E000C] hover:bg-[#D4B2A7]/20"
            >
              Ver Invitación
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-[#D4B2A7] text-[#3E000C] hover:bg-[#D4B2A7]/80"
            >
              <Save className="mr-2 h-4 w-4" /> Guardar Cambios
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-4 text-[#3E000C]">Información Principal</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="groomFirstName">Nombre del Novio</Label>
                  <Input 
                    id="groomFirstName" 
                    value={formData.groomFirstName} 
                    onChange={(e) => handleInputChange(e, 'groomFirstName')}
                  />
                </div>
                <div>
                  <Label htmlFor="groomLastName">Apellido del Novio</Label>
                  <Input 
                    id="groomLastName" 
                    value={formData.groomLastName} 
                    onChange={(e) => handleInputChange(e, 'groomLastName')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brideFirstName">Nombre de la Novia</Label>
                  <Input 
                    id="brideFirstName" 
                    value={formData.brideFirstName} 
                    onChange={(e) => handleInputChange(e, 'brideFirstName')}
                  />
                </div>
                <div>
                  <Label htmlFor="brideLastName">Apellido de la Novia</Label>
                  <Input 
                    id="brideLastName" 
                    value={formData.brideLastName} 
                    onChange={(e) => handleInputChange(e, 'brideLastName')}
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
                      onSelect={handleDateSelect}
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
                  onChange={(e) => handleInputChange(e, 'backgroundImageUrl')}
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
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-4 text-[#3E000C]">Detalles de la Ceremonia</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="ceremonyName">Nombre del Lugar</Label>
                <Input 
                  id="ceremonyName" 
                  value={formData.ceremonyLocation.name} 
                  onChange={(e) => handleInputChange(e, 'ceremonyLocation', 'name')}
                />
              </div>

              <div>
                <Label htmlFor="ceremonyAddress">Dirección</Label>
                <Input 
                  id="ceremonyAddress" 
                  value={formData.ceremonyLocation.address} 
                  onChange={(e) => handleInputChange(e, 'ceremonyLocation', 'address')}
                />
              </div>

              <div>
                <Label htmlFor="ceremonyTime">Hora</Label>
                <Input 
                  id="ceremonyTime" 
                  value={formData.ceremonyLocation.time} 
                  onChange={(e) => handleInputChange(e, 'ceremonyLocation', 'time')}
                />
              </div>

              <div>
                <Label htmlFor="ceremonyMapUrl">URL del Mapa</Label>
                <Input 
                  id="ceremonyMapUrl" 
                  value={formData.ceremonyLocation.mapUrl} 
                  onChange={(e) => handleInputChange(e, 'ceremonyLocation', 'mapUrl')}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-4 text-[#3E000C]">Detalles de la Recepción</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="receptionName">Nombre del Lugar</Label>
                <Input 
                  id="receptionName" 
                  value={formData.receptionLocation.name} 
                  onChange={(e) => handleInputChange(e, 'receptionLocation', 'name')}
                />
              </div>

              <div>
                <Label htmlFor="receptionAddress">Dirección</Label>
                <Input 
                  id="receptionAddress" 
                  value={formData.receptionLocation.address} 
                  onChange={(e) => handleInputChange(e, 'receptionLocation', 'address')}
                />
              </div>

              <div>
                <Label htmlFor="receptionTime">Hora</Label>
                <Input 
                  id="receptionTime" 
                  value={formData.receptionLocation.time} 
                  onChange={(e) => handleInputChange(e, 'receptionLocation', 'time')}
                />
              </div>

              <div>
                <Label htmlFor="receptionMapUrl">URL del Mapa</Label>
                <Input 
                  id="receptionMapUrl" 
                  value={formData.receptionLocation.mapUrl} 
                  onChange={(e) => handleInputChange(e, 'receptionLocation', 'mapUrl')}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-[#3E000C]">Galería de Imágenes</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#D4B2A7] text-[#3E000C] hover:bg-[#D4B2A7]/20"
                  >
                    <Image className="mr-2 h-4 w-4" /> Administrar Imágenes
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Galería de Imágenes</SheetTitle>
                    <SheetDescription>
                      Añade o modifica las URLs de las imágenes para la galería.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    {formData.galleryImages.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input 
                          value={image} 
                          onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                          placeholder="URL de la imagen"
                        />
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleRemoveGalleryImage(index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    <Button 
                      onClick={handleAddGalleryImage} 
                      variant="outline" 
                      className="w-full"
                    >
                      Añadir Imagen
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {formData.galleryImages.slice(0, 6).map((image, index) => (
                <div key={index} className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={image || 'https://via.placeholder.com/150?text=Imagen'} 
                    alt={`Imagen ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {formData.galleryImages.length > 6 && (
                <div className="aspect-square rounded-md overflow-hidden bg-[#D4B2A7]/40 flex items-center justify-center">
                  <span className="text-[#3E000C]">+{formData.galleryImages.length - 6} más</span>
                </div>
              )}
            </div>
          </div>
        </div>

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
