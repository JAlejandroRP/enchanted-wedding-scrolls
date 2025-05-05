import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Save, Image, RefreshCw, Map, Gift, Palette } from 'lucide-react';
import { useWeddingData } from '@/hooks/useWeddingData';
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

const Admin = () => {
  const navigate = useNavigate();
  const { weddingData, updateWeddingData, resetWeddingData } = useWeddingData();
  
  // Local state for form
  const [formData, setFormData] = useState({
    ...weddingData,
    // Create deep copies to avoid modifying the original
    ceremonyLocation: { ...weddingData.ceremonyLocation },
    receptionLocation: { ...weddingData.receptionLocation },
    galleryImages: [...weddingData.galleryImages],
    dressCode: {
      formalWear: [...weddingData.dressCode.formalWear],
      avoidColors: [...weddingData.dressCode.avoidColors]
    },
    giftsInfo: {
      giftRegistries: [...weddingData.giftsInfo.giftRegistries.map(item => ({...item}))],
      bankInfo: {...weddingData.giftsInfo.bankInfo},
      wishlist: [...weddingData.giftsInfo.wishlist]
    },
    themeColors: {...weddingData.themeColors}
  });

  // Track if date picker is open
  const [dateOpen, setDateOpen] = useState(false);

  // Handle simple input changes
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

  // Handle nested object changes
  const handleNestedInputChange = (e: React.ChangeEvent<HTMLInputElement>, parent: string, child: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [child]: {
          ...((prev[parent as keyof typeof prev] as any)[child]),
          [field]: e.target.value
        }
      }
    }));
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

  // Handle dress code item changes
  const handleDressCodeItemChange = (index: number, value: string, type: 'formalWear' | 'avoidColors') => {
    const newItems = [...formData.dressCode[type]];
    newItems[index] = value;
    setFormData(prev => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [type]: newItems
      }
    }));
  };

  // Handle add dress code item
  const handleAddDressCodeItem = (type: 'formalWear' | 'avoidColors') => {
    setFormData(prev => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [type]: [...prev.dressCode[type], ""]
      }
    }));
  };

  // Handle remove dress code item
  const handleRemoveDressCodeItem = (index: number, type: 'formalWear' | 'avoidColors') => {
    const newItems = [...formData.dressCode[type]];
    newItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [type]: newItems
      }
    }));
  };

  // Handle gift registry item changes
  const handleGiftRegistryChange = (index: number, field: 'name' | 'url', value: string) => {
    const newRegistries = [...formData.giftsInfo.giftRegistries];
    newRegistries[index] = {
      ...newRegistries[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        giftRegistries: newRegistries
      }
    }));
  };

  // Handle add gift registry
  const handleAddGiftRegistry = () => {
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        giftRegistries: [...prev.giftsInfo.giftRegistries, { name: "", url: "" }]
      }
    }));
  };

  // Handle remove gift registry
  const handleRemoveGiftRegistry = (index: number) => {
    const newRegistries = [...formData.giftsInfo.giftRegistries];
    newRegistries.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        giftRegistries: newRegistries
      }
    }));
  };

  // Handle wishlist item changes
  const handleWishlistItemChange = (index: number, value: string) => {
    const newWishlist = [...formData.giftsInfo.wishlist];
    newWishlist[index] = value;
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        wishlist: newWishlist
      }
    }));
  };

  // Handle add wishlist item
  const handleAddWishlistItem = () => {
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        wishlist: [...prev.giftsInfo.wishlist, ""]
      }
    }));
  };

  // Handle remove wishlist item
  const handleRemoveWishlistItem = (index: number) => {
    const newWishlist = [...formData.giftsInfo.wishlist];
    newWishlist.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        wishlist: newWishlist
      }
    }));
  };

  // Handle theme color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorKey: string) => {
    setFormData(prev => ({
      ...prev,
      themeColors: {
        ...prev.themeColors,
        [colorKey]: e.target.value
      }
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
        galleryImages: [...weddingData.galleryImages],
        dressCode: {
          formalWear: [...weddingData.dressCode.formalWear],
          avoidColors: [...weddingData.dressCode.avoidColors]
        },
        giftsInfo: {
          giftRegistries: [...weddingData.giftsInfo.giftRegistries.map(item => ({...item}))],
          bankInfo: {...weddingData.giftsInfo.bankInfo},
          wishlist: [...weddingData.giftsInfo.wishlist]
        },
        themeColors: {...weddingData.themeColors}
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

  // Predefined theme colors
  const themePresets = [
    { name: "Borgoña y Rosa", primary: "#3E000C", secondary: "#D4B2A7", accent: "#B3B792", background: "#E5E0D8" },
    { name: "Azul y Dorado", primary: "#14213D", secondary: "#FCA311", accent: "#E5E5E5", background: "#FFFFFF" },
    { name: "Verde y Terracota", primary: "#344E41", secondary: "#A3B18A", accent: "#DAD7CD", background: "#F8F9FA" },
    { name: "Lavanda y Melocotón", primary: "#6B5CA5", secondary: "#F8B195", accent: "#F67280", background: "#FAF3F3" }
  ];

  // Apply theme preset
  const applyThemePreset = (preset: typeof themePresets[0]) => {
    setFormData(prev => ({
      ...prev,
      themeColors: preset
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: formData.themeColors.background }}>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair" style={{ color: formData.themeColors.primary }}>Panel Administrativo</h1>
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

          {/* Información Tab */}
          <TabsContent value="info" className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium mb-4" style={{ color: formData.themeColors.primary }}>Información Principal</h2>
              
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

                <div>
                  <Label htmlFor="mobileBackgroundImageUrl">Imagen de Fondo Móvil (URL)</Label>
                  <Input 
                    id="mobileBackgroundImageUrl" 
                    value={formData.mobileBackgroundImageUrl || ''} 
                    onChange={(e) => handleInputChange(e, 'mobileBackgroundImageUrl')}
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

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Palette className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
                <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>Colores del Tema</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="primaryColor">Color Primario</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="primaryColor" 
                      type="color"
                      value={formData.themeColors.primary} 
                      onChange={(e) => handleColorChange(e, 'primary')}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={formData.themeColors.primary} 
                      onChange={(e) => handleColorChange(e, 'primary')}
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
                      onChange={(e) => handleColorChange(e, 'secondary')}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={formData.themeColors.secondary} 
                      onChange={(e) => handleColorChange(e, 'secondary')}
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
                      onChange={(e) => handleColorChange(e, 'accent')}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={formData.themeColors.accent} 
                      onChange={(e) => handleColorChange(e, 'accent')}
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
                      onChange={(e) => handleColorChange(e, 'background')}
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={formData.themeColors.background} 
                      onChange={(e) => handleColorChange(e, 'background')}
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
                      onClick={() => applyThemePreset(preset)}
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
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Map className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
                <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>Ceremonia</h2>
              </div>
              
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

                <div>
                  <Label htmlFor="ceremonyImageUrl">URL de la Imagen</Label>
                  <Input 
                    id="ceremonyImageUrl" 
                    value={formData.ceremonyLocation.imageUrl || ''} 
                    onChange={(e) => handleInputChange(e, 'ceremonyLocation', 'imageUrl')}
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

                <div>
                  <Label htmlFor="ceremonyMapIframe">Iframe del Mapa (código HTML)</Label>
                  <Textarea 
                    id="ceremonyMapIframe" 
                    value={formData.ceremonyLocation.mapIframe || ''} 
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ceremonyLocation: {
                        ...prev.ceremonyLocation,
                        mapIframe: e.target.value
                      }
                    }))}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Map className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
                <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>Recepción</h2>
              </div>
              
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

                <div>
                  <Label htmlFor="receptionImageUrl">URL de la Imagen</Label>
                  <Input 
                    id="receptionImageUrl" 
                    value={formData.receptionLocation.imageUrl || ''} 
                    onChange={(e) => handleInputChange(e, 'receptionLocation', 'imageUrl')}
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

                <div>
                  <Label htmlFor="receptionMapIframe">Iframe del Mapa (código HTML)</Label>
                  <Textarea 
                    id="receptionMapIframe" 
                    value={formData.receptionLocation.mapIframe || ''} 
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      receptionLocation: {
                        ...prev.receptionLocation,
                        mapIframe: e.target.value
                      }
                    }))}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Image className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
                  <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>Galería de Imágenes</h2>
                </div>
                <Button 
                  onClick={handleAddGalleryImage} 
                  variant="outline" 
                  size="sm" 
                  style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
                >
                  Añadir Imagen
                </Button>
              </div>
              
              <div className="space-y-4">
                {formData.galleryImages.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={image} 
                      onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                      placeholder="URL de la imagen"
                      className="flex-1"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleRemoveGalleryImage(index)}
                    >
                      X
                    </Button>
                    {image && (
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={image} 
                          alt={`Imagen ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Dress Code Tab */}
          <TabsContent value="dresscode">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium mb-4" style={{ color: formData.themeColors.primary }}>Código de Vestimenta</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Vestimenta Formal</Label>
                    <Button 
                      onClick={() => handleAddDressCodeItem('formalWear')} 
                      variant="outline" 
                      size="sm"
                      style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
                    >
                      Añadir
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.dressCode.formalWear.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          value={item} 
                          onChange={(e) => handleDressCodeItemChange(index, e.target.value, 'formalWear')}
                          placeholder="Ej. Hombres: Traje formal"
                          className="flex-1"
                        />
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => handleRemoveDressCodeItem(index, 'formalWear')}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Colores a Evitar</Label>
                    <Button 
                      onClick={() => handleAddDressCodeItem('avoidColors')} 
                      variant="outline" 
                      size="sm"
                      style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
                    >
                      Añadir
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.dressCode.avoidColors.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          value={item} 
                          onChange={(e) => handleDressCodeItemChange(index, e.target.value, 'avoidColors')}
                          placeholder="Ej. Blanco (reservado para la novia)"
                          className="flex-1"
                        />
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => handleRemoveDressCodeItem(index, 'avoidColors')}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Gifts Tab */}
          <TabsContent value="gifts">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Gift className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
                <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>Mesa de Regalos</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Tiendas Departamentales</Label>
                    <Button 
                      onClick={handleAddGiftRegistry} 
                      variant="outline" 
                      size="sm"
                      style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
                    >
                      Añadir
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.giftsInfo.giftRegistries.map((registry, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex gap-2">
                          <Input 
                            value={registry.name} 
                            onChange={(e) => handleGiftRegistryChange(index, 'name', e.target.value)}
                            placeholder="Nombre de la tienda"
                            className="flex-1"
                          />
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => handleRemoveGiftRegistry(index)}
                          >
                            X
                          </Button>
                        </div>
                        <Input 
                          value={registry.url} 
                          onChange={(e) => handleGiftRegistryChange(index, 'url', e.target.value)}
                          placeholder="URL del sitio web"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Datos Bancarios</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="bankName" className="text-sm">Nombre del Banco</Label>
                      <Input 
                        id="bankName" 
                        value={formData.giftsInfo.bankInfo.bank} 
                        onChange={(e) => handleNestedInputChange(e, 'giftsInfo', 'bankInfo', 'bank')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountHolder" className="text-sm">Titular de la Cuenta</Label>
                      <Input 
                        id="accountHolder" 
                        value={formData.giftsInfo.bankInfo.accountHolder} 
                        onChange={(e) => handleNestedInputChange(e, 'giftsInfo', 'bankInfo', 'accountHolder')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber" className="text-sm">Número de Cuenta / CLABE</Label>
                      <Input 
                        id="accountNumber" 
                        value={formData.giftsInfo.bankInfo.accountNumber} 
                        onChange={(e) => handleNestedInputChange(e, 'giftsInfo', 'bankInfo', 'accountNumber')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <Label>Lista de Deseos</Label>
                  <Button 
                    onClick={handleAddWishlistItem} 
                    variant="outline" 
                    size="sm"
                    style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
                  >
                    Añadir
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {formData.giftsInfo.wishlist.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={item} 
                        onChange={(e) => handleWishlistItemChange(index, e.target.value)}
                        placeholder="Elemento de la lista de deseos"
                        className="flex-1"
                      />
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleRemoveWishlistItem(index)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
