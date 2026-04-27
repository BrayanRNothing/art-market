import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const FeatureCard = ({ children, index, delay = 0 }: { children: React.ReactNode, index: number, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15 + delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

const Features = () => {
  const headerSegments = [
    { text: "Herramientas diseñadas para el artista moderno.", className: "text-primary block mb-2" },
    { text: "Tu visión. Tu salón. Tus reglas.", className: "text-gray-500 block" }
  ];

  return (
    <section className="min-h-screen bg-black relative py-16 px-2 md:py-24 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <WordsPullUpMultiStyle 
            segments={headerSegments}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal flex flex-col items-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 - Salón Virtual */}
          <FeatureCard index={0}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[#E1E0CC] font-medium uppercase tracking-widest text-xs">Exhibición Virtual</p>
            </div>
          </FeatureCard>

          {/* Card 2 - Contacto Directo */}
          <FeatureCard index={1}>
            <div className="bg-[#111] border border-white/5 h-full p-8 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check size={24} />
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-primary text-xl font-medium mb-1">Contacto Directo.</h3>
                <span className="text-gray-500 text-xs uppercase tracking-widest">(01)</span>
              </div>
              <ul className="space-y-4 mb-auto">
                {["Sin comisiones ocultas", "Trato personalizado", "Ventas seguras"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="flex items-center gap-2 text-primary group mt-8">
                <span className="text-xs font-bold uppercase tracking-widest">Saber más</span>
                <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </FeatureCard>

          {/* Card 3 - Gestión de Obras */}
          <FeatureCard index={2}>
            <div className="bg-[#111] border border-white/5 h-full p-8 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check size={24} />
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-primary text-xl font-medium mb-1">Tu Salón, Tu Control.</h3>
                <span className="text-gray-500 text-xs uppercase tracking-widest">(02)</span>
              </div>
              <ul className="space-y-4 mb-auto">
                {["Venta o Exhibición", "Historial de éxito", "Edición en tiempo real"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="flex items-center gap-2 text-primary group mt-8">
                <span className="text-xs font-bold uppercase tracking-widest">Saber más</span>
                <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </FeatureCard>

          {/* Card 4 - Comunidad Curada */}
          <FeatureCard index={3}>
            <div className="bg-[#111] border border-white/5 h-full p-8 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check size={24} />
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-primary text-xl font-medium mb-1">Alcance Global.</h3>
                <span className="text-gray-500 text-xs uppercase tracking-widest">(03)</span>
              </div>
              <ul className="space-y-4 mb-auto">
                {["Artistas verificados", "Coleccionistas de élite", "Visibilidad premium"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="flex items-center gap-2 text-primary group mt-8">
                <span className="text-xs font-bold uppercase tracking-widest">Saber más</span>
                <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
