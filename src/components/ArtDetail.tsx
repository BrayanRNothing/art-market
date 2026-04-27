import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Clock,
  Palette,
  MessageCircle,
  Heart,
  Share2,
  ArrowRight,
  User,
  Maximize,
  Layers,
  Calendar,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';

import API_URL from '../config';

interface ArtDetailProps {
  artId: string;
  onBack: () => void;
}

const ArtDetail = ({ artId, onBack }: ArtDetailProps) => {
  const [art, setArt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/art/${artId}`);
        if (response.ok) {
          const data = await response.json();
          setArt(data);
          setActiveImage(data.main_image_url);
        }
      } catch (err) {
        console.error("Error fetching art details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtDetails();
  }, [artId]);

  useEffect(() => {
    if (art) {
      document.title = `${art.title} | Art Market`;
    }
  }, [art]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 border-2 border-primary/40 rounded-full bg-primary/5 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-primary rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-primary text-2xl font-serif mb-4">Obra no encontrada</h2>
        <button onClick={onBack} className="text-primary/60 hover:text-primary flex items-center gap-2">
          <ChevronLeft size={20} /> Regresar a la Galería
        </button>
      </div>
    );
  }

  const allImages = [art.main_image_url, ...(art.extra_images?.map((img: any) => img.image_url) || [])];

  const handleWhatsApp = () => {
    const message = `Hola, estoy interesado en tu obra "${art.title}" que vi en Art Market.`;
    const url = `https://wa.me/${art.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen lg:h-screen bg-black p-4 lg:p-6 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full bg-[#141414] text-[#e1e0cc] pt-12 lg:pt-16 pb-6 px-4 lg:px-8 relative overflow-y-auto lg:overflow-hidden flex flex-col rounded-2xl lg:rounded-[2rem] border border-white/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.8)] no-scrollbar"
      >
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
        {/* Background Glows - Slightly more vivid to break the darkness */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-primary/10 rounded-full blur-[180px] opacity-40" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[200px]" />
        </div>

        <div className="w-full h-full relative z-10 flex flex-col min-h-0">

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-6 lg:gap-0 lg:px-4">

            {/* 1. THUMBNAILS (Fixed Width) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-32 flex-shrink-0 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:pr-6"
            >
              {allImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + (idx * 0.1),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${activeImage === img ? 'border-primary shadow-[0_0_20px_rgba(225,224,204,0.2)]' : 'border-transparent opacity-30 hover:opacity-100'}`}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={img}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}

              {/* Decorative Empty Placeholders (if less than 6 images) */}
              {Array.from({ length: Math.max(0, 6 - allImages.length) }).map((_, idx) => (
                <motion.div
                  key={`empty-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + ((allImages.length + idx) * 0.1) }}
                  className="flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-center group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/[0.05] group-hover:bg-primary/20 transition-colors" />
                </motion.div>
              ))}
            </motion.div>

            {/* 2. IMAGE DISPLAY (Flexible Space) */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex items-center justify-center min-h-0 relative px-2 lg:px-12"
            >
              <div className="relative w-full h-full max-h-[55vh] lg:max-h-full rounded-2xl overflow-hidden bg-black/40 shadow-2xl shadow-black/80 group">
                {/* Background Ambient Blur - Fills the empty space for different aspect ratios */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`bg-${activeImage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      src={activeImage}
                      className="w-full h-full object-cover blur-3xl scale-110 opacity-30"
                    />
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                    src={activeImage}
                    alt={art.title}
                    className="w-full h-full object-contain cursor-zoom-in relative z-10"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* 3. INFO SIDEBAR (Fixed Width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-[380px] flex-shrink-0 flex flex-col gap-5 lg:overflow-y-auto lg:pl-6 lg:pr-2 scrollbar-hide pb-4"
            >

              {/* Back Button Integrated */}
              <div className="flex-shrink-0">
                <button
                  onClick={onBack}
                  className="group flex items-center gap-3 text-primary/40 hover:text-primary transition-colors uppercase tracking-[0.2em] text-[9px] font-bold"
                >
                  <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  Regresar a Galería
                </button>
              </div>

              {/* Title & Artist Section */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, filter: 'blur(15px)', scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl lg:text-5xl font-serif italic font-bold tracking-tighter leading-[0.9] text-white"
                  >
                    {art.title}
                  </motion.h1>
                </div>

                {/* 1. Artist Section */}
                <div className="py-6 border-t border-white/10">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 bg-primary/5 p-1 group-hover:border-primary/40 transition-colors">
                        {art.artist_avatar ? (
                          <img src={art.artist_avatar} alt={art.artist_name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary/40">
                            <User size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-primary font-serif italic text-xl leading-none mb-1.5">{art.artist_name}</h4>
                        <div className="flex items-center gap-4 text-primary/30 text-[9px] uppercase tracking-widest font-black">
                          <span className="flex items-center gap-1.5"><Maximize size={10} /> {art.dimensions || 'Dimensiones variables'}</span>
                          <span className="flex items-center gap-1.5"><Layers size={10} /> {art.technique || 'Técnica mixta'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-primary/20 group-hover:text-primary transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Artist Social Links - Moved above description */}
                <div className="flex flex-wrap gap-3 py-4 border-t border-white/5">
                  {art.instagram && (
                    <a href={`https://instagram.com/${art.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary/40 hover:text-primary transition-all group" title="Instagram">
                      <Instagram size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest hidden group-hover:block transition-all">Instagram</span>
                    </a>
                  )}
                  {art.facebook && (
                    <a href={art.facebook.startsWith('http') ? art.facebook : `https://facebook.com/${art.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary/40 hover:text-primary transition-all group" title="Facebook">
                      <Facebook size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest hidden group-hover:block transition-all">Facebook</span>
                    </a>
                  )}
                  {art.twitter && (
                    <a href={`https://twitter.com/${art.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary/40 hover:text-primary transition-all group" title="Twitter/X">
                      <Twitter size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest hidden group-hover:block transition-all">Twitter</span>
                    </a>
                  )}
                  {art.tiktok && (
                    <a href={`https://tiktok.com/@${art.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary/40 hover:text-primary transition-all group" title="TikTok">
                      <Share2 size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest hidden group-hover:block transition-all">TikTok</span>
                    </a>
                  )}
                  {art.personal_web && (
                    <a href={art.personal_web.startsWith('http') ? art.personal_web : `https://${art.personal_web}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary/40 hover:text-primary transition-all group" title="Sitio Web">
                      <Globe size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest hidden group-hover:block transition-all">Web</span>
                    </a>
                  )}
                  {art.whatsapp && (
                    <a href={`https://wa.me/${art.whatsapp.replace('+', '').replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary/40 hover:text-primary transition-all group" title="WhatsApp">
                      <MessageCircle size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest hidden group-hover:block transition-all">WhatsApp</span>
                    </a>
                  )}
                </div>

                {/* 2. Description Section */}
                <div className="py-8 border-t border-white/10 space-y-4">
                  <p className="text-primary/20 text-[9px] uppercase tracking-[0.3em] font-black">Descripción</p>
                  <p className="text-primary/60 text-base leading-relaxed font-light italic pr-4">
                    "{art.description || "Esta obra explora la intersección entre la luz natural y las formas geométricas orgánicas."}"
                  </p>
                </div>



                <div className="border-t border-white/10 pt-4" />
              </div>

              {/* Spacer to push buttons to bottom */}
              <div className="flex-1" />

              {/* Price & Actions Section (No Container) */}
              <div className="space-y-5 pt-4">
                {art.status === 'venta' && (
                  <div className="flex items-baseline gap-2 opacity-50">
                    <span className="text-xl lg:text-2xl font-bold tracking-tight">
                      {art.price ? `${art.currency || '$'} ${art.price}` : 'Consultar'}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-primary text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(225,224,204,0.1)]"
                  >
                    <MessageCircle size={18} /> Contactar al Artista
                  </button>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtDetail;
