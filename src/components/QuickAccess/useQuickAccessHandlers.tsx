
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface QuickAccessHandlersProps {
  infinityCoreState: any;
  isKeyholderAuthorized: boolean;
  onInfinityCore: () => Promise<void>;
  onSystemStatus: () => void;
  onAutonomousAI: () => void;
  onClearChat: () => void;
}

export const useQuickAccessHandlers = ({
  infinityCoreState,
  isKeyholderAuthorized,
  onInfinityCore,
  onSystemStatus,
  onAutonomousAI,
  onClearChat
}: QuickAccessHandlersProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInfinityCore = async () => {
    try {
      console.log('Infinity Core button clicked');
      
      if (!isKeyholderAuthorized) {
        toast({
          title: "❌ Akses Ditolak",
          description: "Diperlukan otorisasi Keyholder untuk mengakses Infinity Core",
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      if (infinityCoreState?.isBoostActive) {
        toast({
          title: "♾️ Infinity Core Aktif",
          description: "Mengarahkan ke panel kontrol Infinity Core...",
          duration: 2000,
        });
        navigate('/infinity-core');
        return;
      }

      toast({
        title: "♾️ Mengaktifkan Infinity Core",
        description: "Menginisialisasi boost performa quantum...",
        duration: 2000,
      });

      await onInfinityCore();
      
      setTimeout(() => {
        navigate('/infinity-core');
      }, 1500);

    } catch (error) {
      console.error('Infinity Core error:', error);
      toast({
        title: "⚠️ Aktivasi Gagal",
        description: "Tidak dapat mengaktifkan Infinity Core. Coba lagi.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleSystemStatus = () => {
    try {
      console.log('System Status button clicked');
      onSystemStatus();
      toast({
        title: "🔧 Status Sistem",
        description: "Membuka diagnostik internal MIORA...",
        duration: 2000,
      });
    } catch (error) {
      console.error('System status error:', error);
      toast({
        title: "⚠️ Error Sistem",
        description: "Tidak dapat membuka status sistem",
        variant: "destructive",
      });
    }
  };

  const handleAutonomousAI = () => {
    try {
      console.log('Autonomous AI button clicked');
      onAutonomousAI();
      toast({
        title: "🧬 AI Otonom",
        description: "Mengakses modul kecerdasan yang berkembang sendiri...",
        duration: 2000,
      });
    } catch (error) {
      console.error('Autonomous AI error:', error);
      toast({
        title: "⚠️ Error Modul AI",
        description: "Tidak dapat mengakses pembelajaran otonom",
        variant: "destructive",
      });
    }
  };

  const handleClearChat = () => {
    try {
      console.log('Clear Chat button clicked');
      onClearChat();
      toast({
        title: "🔄 Chat Dibersihkan",
        description: "Semua riwayat percakapan telah dihapus. MIORA siap untuk instruksi baru.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Clear chat error:', error);
      toast({
        title: "⚠️ Error Hapus",
        description: "Tidak dapat menghapus riwayat chat",
        variant: "destructive",
      });
    }
  };

  const handleAnalytics = () => {
    try {
      console.log('Analytics button clicked');
      toast({
        title: "📊 Analytics",
        description: "Membuka dashboard analitik MIORA...",
        duration: 2000,
      });
      navigate('/analytics');
    } catch (error) {
      console.error('Analytics navigation error:', error);
      toast({
        title: "⚠️ Error Navigasi",
        description: "Tidak dapat membuka halaman analytics",
        variant: "destructive",
      });
    }
  };

  const handleLearningHub = () => {
    try {
      console.log('Learning Hub button clicked');
      toast({
        title: "🎓 Learning Hub",
        description: "Membuka pusat pembelajaran AI...",
        duration: 2000,
      });
      navigate('/learning');
    } catch (error) {
      console.error('Learning Hub navigation error:', error);
      toast({
        title: "⚠️ Error Navigasi",
        description: "Tidak dapat membuka Learning Hub",
        variant: "destructive",
      });
    }
  };

  return {
    handleInfinityCore,
    handleSystemStatus,
    handleAutonomousAI,
    handleClearChat,
    handleAnalytics,
    handleLearningHub
  };
};
