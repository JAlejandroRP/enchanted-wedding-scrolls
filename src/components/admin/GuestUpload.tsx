
import { useState } from 'react';
import { parseCSV } from '@/utils/csvParser';
import { useGuests } from '@/hooks/useGuests';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface GuestUploadProps {
  invitationId: string;
  onUploadComplete: () => void;
}

export const GuestUpload = ({
  invitationId,
  onUploadComplete
}: GuestUploadProps) => {
  const [open, setOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [parsedGuests, setParsedGuests] = useState<Array<{ name: string; phone?: string; passes: number }>>([]);
  const { bulkAddGuests, loading } = useGuests();

  const handleCSVChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCsvText(text);
    
    if (text.trim()) {
      const guests = parseCSV(text);
      setParsedGuests(guests);
    } else {
      setParsedGuests([]);
    }
  };

  const handleImport = async () => {
    if (parsedGuests.length === 0) {
      toast({
        title: "Sin datos",
        description: "No hay invitados para importar",
        variant: "destructive"
      });
      return;
    }

    const count = await bulkAddGuests(invitationId, parsedGuests);
    
    if (count > 0) {
      toast({
        title: "Importación exitosa",
        description: `Se importaron ${count} invitados correctamente`
      });
      onUploadComplete();
      setOpen(false);
      setCsvText('');
      setParsedGuests([]);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
      >
        Importar lista de invitados (CSV)
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Importar invitados desde CSV</DialogTitle>
            <DialogDescription>
              Ingresa la lista de invitados en formato CSV: nombre, teléfono, pases.
              <br />
              Ejemplo:
              <br />
              <code>Familia Rodriguez,4444222459,4</code>
              <br />
              <code>Roberto,4444222455,2</code>
            </DialogDescription>
          </DialogHeader>

          <Textarea 
            value={csvText}
            onChange={handleCSVChange}
            placeholder="Nombre,Teléfono,Pases"
            rows={8}
          />

          {parsedGuests.length > 0 && (
            <div className="max-h-60 overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Pases</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedGuests.map((guest, index) => (
                    <TableRow key={index}>
                      <TableCell>{guest.name}</TableCell>
                      <TableCell>{guest.phone || "-"}</TableCell>
                      <TableCell>{guest.passes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              disabled={parsedGuests.length === 0 || loading}
            >
              {loading ? "Importando..." : `Importar ${parsedGuests.length} invitados`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
