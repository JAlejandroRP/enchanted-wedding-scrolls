
import { ChangeEvent, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useStorage } from '@/hooks/useStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  children?: React.ReactNode;
  className?: string;
  buttonText?: string;
}

export const FileUpload = ({
  onUploadComplete,
  accept = "image/*",
  children,
  className = "",
  buttonText = "Subir imagen"
}: FileUploadProps) => {
  const { uploadImage, uploading } = useStorage();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Upload file to storage
    const url = await uploadImage(file);
    
    // Clean up preview URL
    URL.revokeObjectURL(objectUrl);
    
    if (url) {
      onUploadComplete(url);
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
          id="file-upload"
        />
        <label htmlFor="file-upload" className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            disabled={uploading}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            {uploading ? "Subiendo..." : buttonText}
          </Button>
        </label>
      </div>

      {preview && (
        <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
