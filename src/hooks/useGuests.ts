
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  phone: string | null;
  passes: number;
  confirmed: boolean;
  created_at: string;
  updated_at: string;
}

export interface GuestInput {
  name: string;
  phone?: string;
  passes: number;
}

export const useGuests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);

  const getGuestsByInvitationId = async (invitationId: string): Promise<Guest[]> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('name', { ascending: true });

      if (error) throw new Error(error.message);

      const guestsData = data as Guest[];
      setGuests(guestsData);
      return guestsData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener los invitados';
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

  const addGuest = async (invitationId: string, guestData: GuestInput): Promise<Guest | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('guests')
        .insert({
          invitation_id: invitationId,
          name: guestData.name,
          phone: guestData.phone || null,
          passes: guestData.passes
        })
        .select()
        .single();

      if (error) throw new Error(error.message);

      toast({
        title: 'Invitado agregado',
        description: `${guestData.name} ha sido agregado correctamente.`
      });

      // Update the local state
      await getGuestsByInvitationId(invitationId);
      
      return data as Guest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al agregar el invitado';
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

  const bulkAddGuests = async (invitationId: string, guests: GuestInput[]): Promise<number> => {
    if (!guests || guests.length === 0) return 0;
    
    try {
      setLoading(true);
      setError(null);
      
      // Prepare the data for bulk insert
      const guestsToInsert = guests.map(guest => ({
        invitation_id: invitationId,
        name: guest.name,
        phone: guest.phone || null,
        passes: guest.passes
      }));
      
      const { data, error } = await supabase
        .from('guests')
        .insert(guestsToInsert)
        .select();
        
      if (error) throw new Error(error.message);
      
      toast({
        title: 'Invitados agregados',
        description: `Se han agregado ${guestsToInsert.length} invitados correctamente.`
      });
      
      // Update the local state
      await getGuestsByInvitationId(invitationId);
      
      return guestsToInsert.length;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al agregar los invitados';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return 0;
    } finally {
      setLoading(false);
    }
  };

  const updateGuestConfirmation = async (guestId: string, confirmed: boolean): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('guests')
        .update({ confirmed, updated_at: new Date().toISOString() })
        .eq('id', guestId);

      if (error) throw new Error(error.message);

      toast({
        title: confirmed ? 'Asistencia confirmada' : 'Asistencia no confirmada',
        description: confirmed ? 'Gracias por confirmar tu asistencia.' : 'Has cancelado tu asistencia.'
      });

      // Update the local state
      setGuests(prevGuests => 
        prevGuests.map(guest => 
          guest.id === guestId ? { ...guest, confirmed } : guest
        )
      );
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la confirmación';
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

  const deleteGuest = async (guestId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', guestId);

      if (error) throw new Error(error.message);

      toast({
        title: 'Invitado eliminado',
        description: 'El invitado ha sido eliminado correctamente.'
      });

      // Update the local state
      setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestId));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el invitado';
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
    guests,
    getGuestsByInvitationId,
    addGuest,
    bulkAddGuests,
    updateGuestConfirmation,
    deleteGuest
  };
};
