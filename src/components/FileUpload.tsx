
import { ChangeEvent, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useStorage } from '@/hooks/useStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  children?: React.ReactNode;
  className?: string;
  buttonText?: string;
  currentValue?: string;
}

export const FileUpload = ({
  onUploadComplete,
  accept = "image/*",
  children,
  className = "",
  buttonText = "Subir imagen",
  currentValue
}: FileUploadProps) => {
  const { uploadImage, uploading } = useStorage();
  const [preview, setPreview] = useState<string | null>(currentValue || null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño máximo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "La imagen no puede ser mayor a 5MB",
        variant: "destructive",
      });
      return;
    }

    // Crear vista previa local
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Subir archivo a storage
    const url = await uploadImage(file);
    
    // Limpiar URL de vista previa
    URL.revokeObjectURL(objectUrl);
    
    if (url) {
      setPreview(url); // Actualizar la vista previa con la URL definitiva
      onUploadComplete(url);
      toast({
        title: "Imagen subida",
        description: "La imagen ha sido cargada correctamente",
      });
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {children}
      
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id={`file-upload-${Math.random().toString(36).substring(2, 9)}`}
        />
        <label htmlFor={`file-upload-${Math.random().toString(36).substring(2, 9)}`} className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            disabled={uploading}
          >
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
            {uploading ? "Subiendo..." : buttonText}
          </Button>
        </label>
      </div>

      {(preview || currentValue) && (
        <div className="mt-2 relative w-full h-40 rounded-md overflow-hidden border">
          <img 
            src={preview || currentValue} 
            alt="Vista previa" 
            className="w-full h-full object-cover"
          />
          {preview && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => setPreview(null)}
            >
              X
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
