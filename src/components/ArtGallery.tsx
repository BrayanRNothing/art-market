import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArtMarketSkeleton } from './ArtSkeleton';
import { Sparkles } from 'lucide-react';

import API_URL from '../config';

interface ArtGalleryProps {
  onArtClick: (id: string) => void;
}

const ArtGallery = ({ onArtClick }: ArtGalleryProps) => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/art`);
        if (response.ok) {
          const data = await response.json();
          // Solo mostrar obras en exhibición
          const exhibitionWorks = data.filter((art: any) => art.status === 'exhibition');
          setArtworks(exhibitionWorks);
        }
      } catch (err) {
        console.error("Error fetching exhibition gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, []);

  return (
    <div className="min-h-screen bg-black p-2 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0d0d0d] min-h-[calc(100dvh-120px)] flex flex-col">
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />

        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] opacity-40" />
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col pt-16 pb-12 px-4 md:pt-20 md:pb-16 md:px-12 lg:px-16 overflow-y-auto no-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col mb-12 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-primary/20 text-[9px] uppercase tracking-[0.2em] font-black ml-1">Curaduría Exclusiva</span>
                <h2 className="text-[#e1e0cc] text-3xl md:text-4xl font-serif italic tracking-tight mb-2">Galeria de Exhibición</h2>
                <div className="w-12 h-px bg-primary/20 mb-6" />
                <p className="text-primary/30 max-w-lg text-xs leading-relaxed font-light italic">
                  Una selección meticulosa de obras maestras contemporáneas disponibles para contemplación artística.
                </p>
              </motion.div>
            </div>

            {loading ? (
              <ArtMarketSkeleton />
            ) : artworks.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                {artworks.map((piece, index) => (
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => onArtClick(piece.id)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-white/[0.02] border border-white/[0.03]">
                      <motion.img
                        src={piece.main_image_url}
                        alt={piece.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full object-cover filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex flex-col">
                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Contemplar</span>
                            <span className="text-white/40 text-[8px] uppercase tracking-[0.2em]">Detalles</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-md text-black flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 px-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-[#e1e0cc] text-base md:text-xl font-serif italic font-medium truncate flex-1">{piece.title}</h3>
                        <div className="px-2 py-0.5 border border-primary/5 rounded-full">
                          <span className="text-primary/20 text-[7px] uppercase tracking-widest font-black">Exhibición</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-px bg-primary/20" />
                        <p className="text-primary/30 text-[9px] uppercase tracking-widest font-bold">por {piece.artist_name}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-40 border border-dashed border-white/5 rounded-[2rem] bg-white/[0.01] flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 mb-6">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-[#e1e0cc] text-2xl font-serif italic mb-3">Galería en Curaduría</h3>
                <p className="text-primary/30 text-xs max-w-xs mx-auto mb-8 leading-relaxed italic">
                  Estamos seleccionando las próximas obras maestras que formarán parte de esta exhibición. Vuelve pronto.
                </p>
              </motion.div>
            )}

            {/* Section Footer */}
            {artworks.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-16 md:mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-primary/10" />
                  <p className="text-primary/20 text-[9px] uppercase tracking-[0.5em]">Fin de la exhibición actual</p>
                </div>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-primary/40 hover:text-primary text-[9px] uppercase tracking-widest transition-colors"
                >
                  Volver al inicio ↑
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtGallery;

