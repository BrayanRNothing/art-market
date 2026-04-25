import { motion } from 'framer-motion';

const ArtMarket = () => {
  return (
    <div className="min-h-screen bg-black px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif italic text-[#e1e0cc] mb-6">Art Market</h1>
        <p className="text-primary/40 text-lg mb-12">
          Próximamente: El mercado descentralizado donde el arte cobra vida. 
          Estamos construyendo el espacio perfecto para conectar artistas y coleccionistas.
        </p>
        <div className="w-24 h-px bg-primary/20 mx-auto" />
      </motion.div>
    </div>
  );
};

export default ArtMarket;
