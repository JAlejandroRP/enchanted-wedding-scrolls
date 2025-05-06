
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { WeddingData } from '@/types/wedding';
import { nanoid } from 'nanoid';
import { toast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

export interface Invitation {
  id: string;
  public_id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  bride_first_name: string;
  bride_last_name: string;
  groom_first_name: string;
  groom_last_name: string;
  wedding_date: string;
  ceremony_location: Json;
  reception_location: Json;
  background_image_url: string;
  mobile_background_image_url: string | null;
  gallery_images: Json;
  dress_code: Json;
  gifts_info: Json;
  theme_colors: Json;
}

export const useInvitations = () => {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserInvitations();
    } else {
      setInvitations([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserInvitations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data as Invitation[]);
    } catch (error: any) {
      console.error('Error fetching invitations:', error.message);
      toast({
        title: "Error",
        description: "No se pudieron cargar las invitaciones",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getInvitationByPublicId = async (publicId: string) => {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('public_id', publicId)
        .maybeSingle();

      if (error) throw error;
      return data as Invitation | null;
    } catch (error: any) {
      console.error('Error fetching invitation:', error.message);
      return null;
    }
  };

  const saveInvitation = async (weddingData: WeddingData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para guardar invitaciones",
        variant: "destructive"
      });
      return null;
    }

    try {
      // Convert wedding date to ISO string for database storage
      const weddingDate = weddingData.weddingDate.toISOString();

      const invitation = {
        user_id: user.id,
        public_id: nanoid(10),
        bride_first_name: weddingData.brideFirstName,
        bride_last_name: weddingData.brideLastName,
        groom_first_name: weddingData.groomFirstName,
        groom_last_name: weddingData.groomLastName,
        wedding_date: weddingDate,
        background_image_url: weddingData.backgroundImageUrl,
        mobile_background_image_url: weddingData.mobileBackgroundImageUrl || null,
        ceremony_location: weddingData.ceremonyLocation as Json,
        reception_location: weddingData.receptionLocation as Json,
        gallery_images: weddingData.galleryImages as unknown as Json,
        dress_code: weddingData.dressCode as unknown as Json,
        gifts_info: weddingData.giftsInfo as unknown as Json,
        theme_colors: weddingData.themeColors as unknown as Json
      };

      const { data, error } = await supabase
        .from('invitations')
        .insert([invitation])
        .select()
        .single();

      if (error) throw error;

      await fetchUserInvitations();

      toast({
        title: "Éxito",
        description: "Invitación guardada correctamente",
      });

      return data;

    } catch (error: any) {
      console.error('Error saving invitation:', error.message);
      toast({
        title: "Error",
        description: "No se pudo guardar la invitación",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateInvitation = async (id: string, weddingData: WeddingData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para actualizar invitaciones",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Convert wedding date to ISO string for database storage
      const weddingDate = weddingData.weddingDate.toISOString();

      const updates = {
        bride_first_name: weddingData.brideFirstName,
        bride_last_name: weddingData.brideLastName,
        groom_first_name: weddingData.groomFirstName,
        groom_last_name: weddingData.groomLastName,
        wedding_date: weddingDate,
        background_image_url: weddingData.backgroundImageUrl,
        mobile_background_image_url: weddingData.mobileBackgroundImageUrl || null,
        ceremony_location: weddingData.ceremonyLocation as unknown as Json,
        reception_location: weddingData.receptionLocation as unknown as Json,
        gallery_images: weddingData.galleryImages as unknown as Json,
        dress_code: weddingData.dressCode as unknown as Json,
        gifts_info: weddingData.giftsInfo as unknown as Json,
        theme_colors: weddingData.themeColors as unknown as Json,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('invitations')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchUserInvitations();

      toast({
        title: "Éxito",
        description: "Invitación actualizada correctamente",
      });

      return true;

    } catch (error: any) {
      console.error('Error updating invitation:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar la invitación",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteInvitation = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setInvitations(invitations.filter(inv => inv.id !== id));

      toast({
        title: "Éxito",
        description: "Invitación eliminada correctamente",
      });

      return true;

    } catch (error: any) {
      console.error('Error deleting invitation:', error.message);
      toast({
        title: "Error",
        description: "No se pudo eliminar la invitación",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    invitations,
    loading,
    saveInvitation,
    updateInvitation,
    deleteInvitation,
    getInvitationByPublicId,
    fetchUserInvitations
  };
};
