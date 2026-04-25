import { motion } from 'framer-motion';
import { ChevronLeft, Construction, Clock, Palette } from 'lucide-react';

interface ArtDetailProps {
  artId: string;
  onBack: () => void;
}

const ArtDetail = ({ artId, onBack }: ArtDetailProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-[#e1e0cc] flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-2xl text-center space-y-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary relative z-10 bg-black">
              <Construction size={40} className="animate-pulse" />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-dashed border-primary/20 rounded-full"
            />
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-serif italic font-bold tracking-tighter"
          >
            Vista en <br /> Construcción
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-primary/40 text-lg md:text-xl font-light italic max-w-md mx-auto leading-relaxed"
          >
            Estamos curando una experiencia inmersiva y única para los detalles de esta obra. Vuelve pronto para verla en todo su esplendor.
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
        >
          <button 
            onClick={onBack}
            className="px-10 py-4 bg-primary text-black rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(225,224,204,0.15)]"
          >
            <ChevronLeft size={16} /> Regresar a la Galería
          </button>
          
          <div className="flex items-center gap-3 text-primary/30 text-[9px] uppercase tracking-widest font-bold border border-white/5 px-6 py-4 rounded-full">
            <Clock size={14} /> Próximamente: Mayo 2026
          </div>
        </motion.div>

        {/* Footer Accent */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-12 flex justify-center gap-8 text-primary/10"
        >
          <Palette size={24} />
          <div className="w-px h-6 bg-primary/10" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Art Market Studios</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtDetail;
