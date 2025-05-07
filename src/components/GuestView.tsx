
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Check, X } from 'lucide-react';
import { useGuests, Guest } from '@/hooks/useGuests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useThemeColors } from '@/hooks/useThemeColors';

interface GuestViewProps {
  invitationId: string;
}

export const GuestView = ({ invitationId }: GuestViewProps) => {
  const { primary, secondary } = useThemeColors();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { guests, loading, getGuestsByInvitationId, updateGuestConfirmation } = useGuests();

  useEffect(() => {
    if (invitationId) {
      getGuestsByInvitationId(invitationId);
    }
  }, [invitationId]);

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGuestSelect = (guest: Guest) => {
    setSelectedGuest(guest);
    setConfirmOpen(true);
  };

  const handleConfirm = async (confirmed: boolean) => {
    if (selectedGuest) {
      await updateGuestConfirmation(selectedGuest.id, confirmed);
      setConfirmOpen(false);
      setSelectedGuest(null);
    }
  };

  if (loading && !guests.length) {
    return (
      <div className="text-center py-8" style={{ color: primary }}>
        Cargando invitados...
      </div>
    );
  }

  if (!loading && !guests.length) {
    return null;
  }

  return (
    <section className="section-container">
      <h2 className="section-title reveal">
        <User className="inline-block mr-2 mb-1" size={24} />
        Confirma tu asistencia
      </h2>
      
      <div className="text-center mb-6 max-w-md mx-auto">
        <p style={{ color: primary }}>
          Busca tu nombre en la lista y confirma tu asistencia.
        </p>
        
        <Input
          type="text"
          placeholder="Busca tu nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4"
        />
      </div>
      
      <div className="grid gap-4 max-w-md mx-auto">
        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest) => (
            <div 
              key={guest.id} 
              className="flex justify-between items-center p-4 border rounded-lg bg-white/80"
              style={{ borderColor: secondary }}
            >
              <div>
                <p className="font-medium" style={{ color: primary }}>
                  {guest.name}
                </p>
                <p className="text-sm opacity-70" style={{ color: primary }}>
                  {guest.passes} {guest.passes === 1 ? 'pase' : 'pases'}
                </p>
              </div>
              
              {guest.confirmed ? (
                <div className="flex items-center px-3 py-1 rounded-md bg-green-100">
                  <Check size={16} className="mr-1 text-green-600" />
                  <span className="text-sm text-green-800">Confirmado</span>
                </div>
              ) : (
                <Button 
                  size="sm"
                  variant="outline"
                  style={{ borderColor: secondary, color: primary }}
                  onClick={() => handleGuestSelect(guest)}
                >
                  Confirmar
                </Button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p style={{ color: primary }}>No se encontraron invitados con ese nombre.</p>
          </div>
        )}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar asistencia</DialogTitle>
          </DialogHeader>
          
          {selectedGuest && (
            <div className="py-4">
              <p className="mb-4">
                ¿Deseas confirmar la asistencia para <strong>{selectedGuest.name}</strong> con {selectedGuest.passes} {selectedGuest.passes === 1 ? 'pase' : 'pases'}?
              </p>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleConfirm(false)}
                >
                  <X size={16} className="mr-2" />
                  No asistiré
                </Button>
                <Button 
                  onClick={() => handleConfirm(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check size={16} className="mr-2" />
                  Confirmar
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <p className="text-sm text-gray-500 w-full text-center">
              Por favor confirma tu asistencia antes del evento.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
