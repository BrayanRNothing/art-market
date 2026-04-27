import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "La Evolución del Arte Digital en 2026",
    excerpt: "Exploramos cómo la inteligencia artificial y el blockchain están redefiniendo la propiedad artística.",
    date: "24 Abr, 2026",
    author: "Elena R.",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Nuevas Voces: La Curaduría de Mayo",
    excerpt: "Presentamos a los 5 artistas emergentes que están rompiendo esquemas en nuestra galería.",
    date: "20 Abr, 2026",
    author: "Marco V.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Minimalismo: Menos es Más",
    excerpt: "Un análisis profundo sobre el resurgimiento de las formas simples en el arte contemporáneo.",
    date: "15 Abr, 2026",
    author: "Sofía L.",
    image: "https://images.unsplash.com/photo-1515405299443-f7157a1cdd74?auto=format&fit=crop&q=80&w=800"
  }
];

const News = () => {
  return (
    <section className="py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-primary/20 text-[9px] uppercase tracking-[0.2em] font-black ml-1">Journal & News</span>
            <h2 className="text-[#e1e0cc] text-4xl md:text-5xl font-serif italic tracking-tight mt-2 mb-6">Crónicas del Arte</h2>
            <p className="text-primary/30 text-sm leading-relaxed italic">
              Perspectivas, entrevistas y las últimas tendencias del mundo artístico seleccionadas por nuestro equipo editorial.
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="group flex items-center gap-3 text-primary/40 hover:text-primary transition-colors uppercase tracking-[0.2em] text-[9px] font-bold"
          >
            Ver todas las entradas
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-white/[0.02] border border-white/[0.03]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 text-[8px] uppercase tracking-widest font-black text-primary/20">
                  <span className="flex items-center gap-1.5"><Calendar size={10} /> {item.date}</span>
                  <span className="flex items-center gap-1.5"><User size={10} /> {item.author}</span>
                </div>
                
                <h3 className="text-[#e1e0cc] text-2xl font-serif italic group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-primary/30 text-xs leading-relaxed line-clamp-2 italic">
                  {item.excerpt}
                </p>
                
                <div className="pt-2">
                  <div className="w-8 h-px bg-primary/20 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
