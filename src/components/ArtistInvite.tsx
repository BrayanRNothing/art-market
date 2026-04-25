import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ArtistInvite = () => {
  return (
    <section className="bg-black py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-[#101010] border border-white/5">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        
        <div className="relative z-10 px-8 py-16 md:px-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-primary text-4xl md:text-6xl font-medium leading-[1.1] mb-8">
              ¿Eres artista? <br />
              <span className="text-gray-500 italic font-serif">Muestra tu visión al mundo.</span>
            </h2>
            <p className="text-primary/60 text-lg mb-10 max-w-md">
              Únete a nuestra comunidad exclusiva de creadores. Registra tu perfil, sube tus obras y conecta con una red global de coleccionistas apasionados.
            </p>
            <button className="group flex items-center gap-4 bg-primary text-black rounded-full px-8 py-4 transition-all hover:gap-6">
              <span className="font-medium">Registrarme como Artista</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop" 
              alt="Art Creation" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistInvite;
