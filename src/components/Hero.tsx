import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from './WordsPullUp';

const Hero = () => {
  return (
    <section className="h-screen w-full p-4 md:p-6 overflow-hidden bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_074327_a4d6275d-82d9-4c83-bfbe-f1fb2213c17c.mp4" type="video/mp4" />
        </video>

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Title */}
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text="ART MARKET"
                className="text-[14vw] sm:text-[13vw] md:text-[12vw] lg:text-[11vw] xl:text-[10vw] font-medium leading-[0.85] tracking-[-0.04em] uppercase"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Description + CTAs */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/90 text-xs sm:text-sm md:text-base leading-[1.2] max-w-xs"
              >
                Explora una colección curada de arte contemporáneo. El punto de encuentro donde los coleccionistas encuentran piezas únicas y los artistas expanden su visión al mundo.
              </motion.p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-2 bg-primary text-black rounded-full px-1 py-1 pr-1 pl-6 w-fit transition-all duration-300 hover:gap-3"
                >
                  <span className="font-medium text-sm sm:text-base whitespace-nowrap">Explora el arte</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white/90" />
                  </div>
                </motion.button>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-2 bg-primary text-black rounded-full px-1 py-1 pr-1 pl-6 w-fit transition-all duration-300 hover:gap-3"
                >
                  <span className="font-medium text-sm sm:text-base whitespace-nowrap">Publica tu arte</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white/90" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .text-custom { color: #E1E0CC; }
      `}} />
    </section>
  );
};

export default Hero;
