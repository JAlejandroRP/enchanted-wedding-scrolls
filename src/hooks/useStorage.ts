
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const BUCKET_NAME = 'wedding_images';

export const useStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para asegurarse de que existe el bucket
  const ensureBucketExists = async (): Promise<boolean> => {
    try {
      // Verificar si el bucket existe
      const { data: buckets } = await supabase.storage.listBuckets();
      
      // Si el bucket no existe, intentar crearlo
      if (!buckets?.some(bucket => bucket.name === BUCKET_NAME)) {
        const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
          public: true
        });
        
        if (error) {
          console.error('Error al crear el bucket:', error);
          return false;
        }
      }
      
      return true;
    } catch (err) {
      console.error('Error al verificar bucket:', err);
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;
    
    try {
      setUploading(true);
      setError(null);
      
      // Asegurarse de que el bucket existe
      const bucketExists = await ensureBucketExists();
      if (!bucketExists) {
        throw new Error('No se pudo verificar el almacenamiento');
      }
      
      // Crear un nombre único para el archivo para prevenir colisiones
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Subir el archivo al Storage de Supabase
      const { data, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Obtener la URL pública del archivo subido
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);
      
      return publicUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar la imagen';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    uploadImage
  };
};
