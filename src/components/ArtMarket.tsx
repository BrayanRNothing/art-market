import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, ArrowRight, Filter, Ghost } from 'lucide-react';
import { ArtMarketSkeleton } from './ArtSkeleton';

import API_URL from '../config';

interface ArtMarketProps {
  onArtClick: (id: string) => void;
}

const ArtMarket = ({ onArtClick }: ArtMarketProps) => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/art`);
        if (response.ok) {
          const data = await response.json();
          setArtworks(data);
        }
      } catch (err) {
        console.error("Error fetching market art:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, []);

  const categories = ['All', ...new Set(artworks.map(art => art.category).filter(Boolean))];

  const filteredArtworks = artworks.filter(art => {
    const matchesStatus = art.status === 'sale' || art.status === 'sold';
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black p-2 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0d0d0d] min-h-[calc(100vh-120px)] flex flex-col">
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />

        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] opacity-40" />
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col pt-20 pb-16 px-6 md:px-12 lg:px-16 overflow-y-auto no-scrollbar">
          <div className="max-w-7xl mx-auto w-full relative">
            {/* Minimal Header & Filters Row */}
            <div className="flex flex-col gap-8 mb-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl md:text-4xl font-serif italic text-[#e1e0cc] tracking-tight">Obras en Venta</h1>
                  <div className="w-12 h-px bg-primary/20 mt-2" />
                </motion.div>

                <div className="flex flex-col gap-3">
                  <span className="text-primary/20 text-[9px] uppercase tracking-[0.2em] font-black ml-1">Categorías</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat
                          ? 'bg-primary text-black border-primary shadow-[0_10px_20px_rgba(225,224,204,0.1)]'
                          : 'bg-white/[0.03] text-primary/40 hover:text-primary hover:bg-white/[0.08] border-white/5'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Art Grid */}
            {loading ? (
              <ArtMarketSkeleton />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12"
              >
                <AnimatePresence mode='popLayout'>
                  {filteredArtworks.map((art, index) => (
                    <motion.div
                      key={art.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => onArtClick(art.id)}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-white/[0.02] border border-white/[0.03]">
                        <img
                          src={art.main_image_url}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                          <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex flex-col">
                              <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Explorar</span>
                              <span className="text-white/40 text-[8px] uppercase tracking-[0.2em]">Ver detalles</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/80 backdrop-blur-md text-black flex items-center justify-center group-active:scale-90 transition-transform shadow-[0_0_20px_rgba(225,224,204,0.3)]">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                        {art.status === 'sold' && (
                          <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <span className="text-white text-[9px] font-black uppercase tracking-widest">Vendido</span>
                          </div>
                        )}

                      </div>

                      <div className="space-y-2 px-1">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-[#e1e0cc] text-base md:text-xl font-serif italic font-medium truncate flex-1">{art.title}</h3>
                          <div className="flex flex-col items-end">
                            <span className="text-primary font-bold text-sm">
                              {art.price ? `${art.currency || '$'} ${art.price}` : 'Consultar'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-px bg-primary/20" />
                          <p className="text-primary/30 text-[10px] uppercase tracking-widest font-bold">por {art.artist_name}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!loading && filteredArtworks.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-40 border border-dashed border-white/5 rounded-[2rem] bg-white/[0.01] flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 mb-6">
                  <Ghost size={32} />
                </div>
                <h3 className="text-[#e1e0cc] text-2xl font-serif italic mb-3">Búsqueda Silenciosa</h3>
                <p className="text-primary/30 text-xs max-w-xs mx-auto mb-8 leading-relaxed italic">
                  Parece que no hay obras que coincidan con esta selección en este momento. Intenta explorar otra categoría.
                </p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full text-primary/40 text-[10px] uppercase tracking-widest hover:text-primary transition-all border border-white/5"
                >
                  Restablecer filtros
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ArtMarket;
