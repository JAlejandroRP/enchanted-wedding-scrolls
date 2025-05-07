
import { useState, useEffect } from 'react';
import { User, Plus, Trash } from 'lucide-react';
import { useGuests } from '@/hooks/useGuests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuestUpload } from './GuestUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';

interface GuestSectionProps {
  invitationId: string;
  formData: any;
}

export const GuestSection = ({
  invitationId,
  formData
}: GuestSectionProps) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestPasses, setGuestPasses] = useState(1);

  const {
    guests,
    loading,
    getGuestsByInvitationId,
    addGuest,
    deleteGuest
  } = useGuests();

  const loadGuests = () => {
    if (invitationId) {
      getGuestsByInvitationId(invitationId);
    }
  };

  useEffect(() => {
    loadGuests();
  }, [invitationId]);

  const handleAddGuest = async () => {
    if (!guestName.trim()) return;

    await addGuest(invitationId, {
      name: guestName,
      phone: guestPhone,
      passes: guestPasses
    });

    // Reset form
    setGuestName('');
    setGuestPhone('');
    setGuestPasses(1);
    setAddDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este invitado?')) {
      await deleteGuest(id);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <User className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
          <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
            Lista de Invitados
          </h2>
        </div>
        <div className="flex gap-2">
          <GuestUpload 
            invitationId={invitationId} 
            onUploadComplete={loadGuests} 
          />
          <Button
            onClick={() => setAddDialogOpen(true)}
            variant="outline"
            style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Invitado
          </Button>
        </div>
      </div>

      {loading && !guests.length ? (
        <p className="text-center py-6">Cargando invitados...</p>
      ) : guests.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Pases</TableHead>
                <TableHead>Confirmado</TableHead>
                <TableHead className="w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map(guest => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.phone || '-'}</TableCell>
                  <TableCell>{guest.passes}</TableCell>
                  <TableCell>
                    {guest.confirmed ? 'Sí' : 'No'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(guest.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-6 border rounded-md bg-gray-50">
          <p className="text-gray-500">No hay invitados registrados</p>
          <p className="text-sm text-gray-400 mt-1">
            Agrega invitados individualmente o importa una lista en formato CSV
          </p>
        </div>
      )}

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Invitado</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="guestName">Nombre</Label>
              <Input
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nombre del invitado o familia"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guestPhone">Teléfono (opcional)</Label>
              <Input
                id="guestPhone"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="Número de teléfono"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guestPasses">Número de pases</Label>
              <Input
                id="guestPasses"
                type="number"
                min="1"
                value={guestPasses}
                onChange={(e) => setGuestPasses(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddGuest}>
              Agregar Invitado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
