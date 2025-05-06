import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { WeddingData, Location } from '@/types/wedding';
import { Json } from '@/integrations/supabase/types';

export interface Invitation {
  id: string;
  created_at: string;
  user_id: string;
  public_id: string;
  bride_first_name: string;
  bride_last_name: string;
  groom_first_name: string;
  groom_last_name: string;
  wedding_date: string;
  background_image_url: string;
  mobile_background_image_url: string | null;
  ceremony_location: Json;
  reception_location: Json;
  gallery_images: Json;
  dress_code: Json;
  gifts_info: Json;
  theme_colors: Json;
}

export const useInvitations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserInvitations = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('invitations')
        .select('*');

      if (error) throw new Error(error.message);

      return data as Invitation[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al obtener las invitaciones';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getInvitationById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw new Error(error.message);

      return data as Invitation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al obtener la invitación';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getInvitationByPublicId = async (publicId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('public_id', publicId)
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!data) return null;

      return data as Invitation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al obtener la invitación';
      setError(errorMessage);
      console.error('Error loading invitation:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createInvitation = async (weddingData: WeddingData) => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('No hay una sesión de usuario activa');
      }

      const publicId = uuidv4().substring(0, 8); // Generate a short unique ID

      // Convert Location objects to JSON-compatible format for Supabase
      const ceremonyLocationJson = JSON.parse(JSON.stringify(weddingData.ceremonyLocation)) as Json;
      const receptionLocationJson = JSON.parse(JSON.stringify(weddingData.receptionLocation)) as Json;

      const { data, error } = await supabase.from('invitations').insert({
        user_id: session.user.id,
        public_id: publicId,
        bride_first_name: weddingData.brideFirstName,
        bride_last_name: weddingData.brideLastName,
        groom_first_name: weddingData.groomFirstName,
        groom_last_name: weddingData.groomLastName,
        wedding_date: weddingData.weddingDate.toISOString(),
        background_image_url: weddingData.backgroundImageUrl,
        mobile_background_image_url: weddingData.mobileBackgroundImageUrl,
        ceremony_location: ceremonyLocationJson,
        reception_location: receptionLocationJson,
        gallery_images: weddingData.galleryImages as unknown as Json,
        dress_code: weddingData.dressCode as unknown as Json,
        gifts_info: weddingData.giftsInfo as unknown as Json,
        theme_colors: weddingData.themeColors as unknown as Json,
      }).select().single();

      if (error) throw new Error(error.message);

      toast({
        title: 'Invitación creada',
        description: 'La invitación ha sido creada correctamente.',
      });

      return data as Invitation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al crear la invitación';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateInvitation = async (id: string, weddingData: WeddingData) => {
    try {
      setLoading(true);
      setError(null);

      // Convert Location objects to JSON-compatible format for Supabase
      const ceremonyLocationJson = JSON.parse(JSON.stringify(weddingData.ceremonyLocation)) as Json;
      const receptionLocationJson = JSON.parse(JSON.stringify(weddingData.receptionLocation)) as Json;

      const { data, error } = await supabase
        .from('invitations')
        .update({
          bride_first_name: weddingData.brideFirstName,
          bride_last_name: weddingData.brideLastName,
          groom_first_name: weddingData.groomFirstName,
          groom_last_name: weddingData.groomLastName,
          wedding_date: weddingData.weddingDate.toISOString(),
          background_image_url: weddingData.backgroundImageUrl,
          mobile_background_image_url: weddingData.mobileBackgroundImageUrl,
          ceremony_location: ceremonyLocationJson,
          reception_location: receptionLocationJson,
          gallery_images: weddingData.galleryImages as unknown as Json,
          dress_code: weddingData.dressCode as unknown as Json,
          gifts_info: weddingData.giftsInfo as unknown as Json,
          theme_colors: weddingData.themeColors as unknown as Json,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);

      toast({
        title: 'Invitación actualizada',
        description: 'La invitación ha sido actualizada correctamente.',
      });

      return data as Invitation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al actualizar la invitación';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteInvitation = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);

      toast({
        title: 'Invitación eliminada',
        description: 'La invitación ha sido eliminada correctamente.',
      });

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al eliminar la invitación';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getUserInvitations,
    getInvitationById,
    getInvitationByPublicId,
    createInvitation,
    updateInvitation,
    deleteInvitation
  };
};
