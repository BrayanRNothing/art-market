import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, isLoading }: DeleteConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[300]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[301] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto"
            >
              <div className="p-8 md:p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20 mb-6">
                  <AlertTriangle size={40} />
                </div>
                
                <h3 className="text-2xl font-serif italic text-[#e1e0cc] mb-4">¿Eliminar Obra?</h3>
                <p className="text-primary/40 text-sm leading-relaxed mb-8">
                  Estás a punto de eliminar <span className="text-[#e1e0cc] font-medium">"{title}"</span>. Esta acción es permanente y no podrá deshacerse.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-primary/60 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 py-4 bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-[0_10px_30px_rgba(239,68,68,0.2)] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Decorative side bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500/50 via-red-500 to-red-500/50" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
