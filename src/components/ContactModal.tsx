import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Instagram, Twitter, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-none"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none"
          >
            <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-y-auto md:overflow-hidden max-h-[90dvh] flex flex-col md:flex-row pointer-events-auto shadow-2xl relative no-scrollbar">
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-500 hover:text-primary transition-colors z-10"
              >
                <X size={24} />
              </button>

              {/* Left Side: Info */}
              <div className="w-full md:w-2/5 bg-primary p-8 md:p-14 flex flex-col justify-between text-black">
                <div>
                  <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-4 md:mb-6 italic font-serif">Let's Talk Art.</h2>
                  <p className="text-black/70 text-xs md:text-base leading-relaxed mb-8 md:mb-12">
                    Si tienes dudas sobre cómo publicar, necesitas soporte técnico o simplemente quieres colaborar con nosotros.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Mail size={18} />
                      </div>
                      <span className="text-sm font-medium tracking-wide">brayan@updm.mx</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <span className="font-bold text-xs">TEL</span>
                      </div>
                      <span className="text-sm font-medium tracking-wide">+52 8112169211</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="w-full md:w-3/5 p-8 md:p-14">
                <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Tu Nombre</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Email</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Asunto</label>
                    <input 
                      type="text" 
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Mensaje</label>
                    <textarea 
                      placeholder="Escribe tu mensaje aquí..."
                      rows={4}
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800 resize-none"
                    />
                  </div>

                  <button className="group w-full py-4 bg-white/5 hover:bg-primary hover:text-black border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden relative">
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">Enviar Mensaje</span>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
