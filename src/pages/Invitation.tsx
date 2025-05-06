
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PublicInvitationProvider, usePublicInvitation } from '@/hooks/usePublicInvitation';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import Gifts from "@/components/Gifts";
import Tips from "@/components/Tips";
import PhotoShare from "@/components/PhotoShare";
import Footer from "@/components/Footer";
import { useMultipleIntersectionObserver } from "@/hooks/useIntersectionObserver";

const InvitationContent = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const { weddingData, loading, error, loadInvitation } = usePublicInvitation();
  
  // Hook for animations
  useMultipleIntersectionObserver();

  useEffect(() => {
    if (publicId) {
      loadInvitation(publicId);
    }
  }, [publicId, loadInvitation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5E0D8]">
        <div className="animate-pulse">
          <p className="text-[#3E000C] text-lg">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (error || !weddingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#E5E0D8] p-4 animate-fade-in">
        <h1 className="text-3xl font-playfair text-[#3E000C] mb-4">Invitación no encontrada</h1>
        <p className="text-[#3E000C]/70 mb-6 text-center">
          {error || "La invitación que estás buscando no existe o ha sido eliminada."}
        </p>
        <a 
          href="/"
          className="px-4 py-2 bg-[#3E000C] text-white rounded-md hover:bg-[#3E000C]/90 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen w-full">
      <div className="min-h-screen">
        <Header />
        
        <Hero />
        
        <EventDetails 
          weddingDate={weddingData.weddingDate}
          ceremony={weddingData.ceremonyLocation}
          reception={weddingData.receptionLocation}
        />
        
        <Gallery />
        
        <Gifts />
        
        <Tips />
        
        <PhotoShare />
        
        <Footer />
      </div>
    </ScrollArea>
  );
};

const Invitation = () => {
  return (
    <PublicInvitationProvider>
      <InvitationContent />
    </PublicInvitationProvider>
  );
};

export default Invitation;
