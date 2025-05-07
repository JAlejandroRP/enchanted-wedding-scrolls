
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useInvitations } from '@/hooks/useInvitations';
import { useWeddingData } from '@/hooks/useWeddingData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, PlusCircleIcon, Share2Icon, Pencil, Trash2, LogOut } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { invitations, loading, getUserInvitations, deleteInvitation } = useInvitations();
  const { resetWeddingData } = useWeddingData();
  const navigate = useNavigate();
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [invitationToDelete, setInvitationToDelete] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Fetch invitations when component mounts
  useEffect(() => {
    getUserInvitations();
  }, []);

  const handleEditInvitation = (publicId: string) => {
    navigate(`/admin?id=${publicId}`);
  };

  const confirmDelete = (id: string) => {
    setInvitationToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (invitationToDelete) {
      await deleteInvitation(invitationToDelete);
      setShowDeleteDialog(false);
      setInvitationToDelete(null);
    }
  };

  const handleCreateNew = () => {
    resetWeddingData();
    navigate('/admin');
  };

  const handleShare = (publicId: string) => {
    const shareUrl = `${window.location.origin}/invitation/${publicId}`;
    setShareUrl(shareUrl);
    setShowShareDialog(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Enlace copiado",
      description: "El enlace ha sido copiado al portapapeles.",
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: 'Error',
        description: 'No se pudo cerrar sesión.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E0D8]/50">
      <header className="bg-[#3E000C] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-playfair">Mi Panel</h1>
          <div className="flex items-center gap-4">
            <span>Hola, {user?.user_metadata?.full_name || 'Usuario'}</span>
            <Button 
              variant="outline" 
              className="bg-transparent hover:bg-white/10 text-white border-white flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair text-[#3E000C]">Mis Invitaciones</h2>
          <Button onClick={handleCreateNew} className="bg-[#3E000C] hover:bg-[#3E000C]/90 text-white">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Crear Nueva Invitación
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#3E000C]/60">Cargando invitaciones...</p>
          </div>
        ) : invitations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-[#3E000C] mb-2">No tienes invitaciones</h3>
            <p className="text-[#3E000C]/60 mb-6">Crea tu primera invitación para comenzar</p>
            <Button onClick={handleCreateNew} className="bg-[#3E000C] hover:bg-[#3E000C]/90 text-white">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Crear Invitación
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <Card key={invitation.id} className="overflow-hidden">
                <div 
                  className="h-40 bg-center bg-cover" 
                  style={{ backgroundImage: `url(${invitation.background_image_url})` }}
                ></div>
                <CardHeader>
                  <CardTitle>{invitation.bride_first_name} & {invitation.groom_first_name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(invitation.wedding_date), "PPP", { locale: es })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Creada: {format(new Date(invitation.created_at), "dd/MM/yyyy")}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditInvitation(invitation.public_id)}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => confirmDelete(invitation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#3E000C] hover:bg-[#3E000C]/90 text-white"
                    onClick={() => handleShare(invitation.public_id)}
                  >
                    <Share2Icon className="h-4 w-4 mr-1" /> Compartir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente tu invitación y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Compartir Invitación</AlertDialogTitle>
            <AlertDialogDescription>
              Comparte este enlace con tus invitados:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2 my-4">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button onClick={copyToClipboard} className="bg-[#3E000C]">Copiar</Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
