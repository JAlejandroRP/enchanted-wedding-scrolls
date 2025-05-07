
import { Image } from 'lucide-react';
import { FormData } from '@/types/wedding';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';

interface GallerySectionProps {
  formData: FormData;
  onGalleryImageChange: (index: number, value: string) => void;
  onAddGalleryImage: () => void;
  onRemoveGalleryImage: (index: number) => void;
}

export const GallerySection = ({
  formData,
  onGalleryImageChange,
  onAddGalleryImage,
  onRemoveGalleryImage
}: GallerySectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Image className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
          <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
            Galería de Imágenes
          </h2>
        </div>
        <Button 
          onClick={onAddGalleryImage} 
          variant="outline" 
          size="sm" 
          style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
        >
          Añadir Imagen
        </Button>
      </div>
      
      <div className="space-y-6">
        {formData.galleryImages.map((image, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              {!image ? (
                <FileUpload
                  onUploadComplete={(url) => onGalleryImageChange(index, url)}
                  buttonText="Subir imagen para galería"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={image} 
                      alt={`Imagen ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm truncate flex-1">{image}</p>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => onRemoveGalleryImage(index)}
                  >
                    X
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
