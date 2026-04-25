import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const STATIC_ART = [
  {
    id: 1,
    title: "Celestial Echo",
    artist: "Elena Vance",
    price: "$2,400",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Midnight Theory",
    artist: "Marcus Chen",
    price: "$1,850",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop"
  }
];

const ArtGallery = ({ onArtClick }: { onArtClick: (id: any) => void }) => {
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/art');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setArtworks(data.map((art: any) => ({
              id: art.id,
              title: art.title,
              artist: art.artist_name,
              price: `${art.price} ETH`,
              image: art.main_image_url
            })));
          } else {
            setArtworks(STATIC_ART);
          }
        } else {
          setArtworks(STATIC_ART);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setArtworks(STATIC_ART);
      }
    };

    fetchArt();
  }, []);

  return (
    <section className="bg-black py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-primary text-3xl md:text-5xl font-medium mb-4">Agregados Recientemente</h2>
            <p className="text-gray-500 max-w-md">Nuestra colección presenta obras exclusivas de artistas emergentes y consagrados de todo el mundo.</p>
          </div>
          <button className="text-primary border border-primary/20 hover:bg-primary hover:text-black transition-all px-8 py-3 rounded-full text-sm font-medium">
            Ver Galería Completa
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artworks.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => onArtClick(piece.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={piece.image} 
                  alt={piece.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">Nuevo</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-primary text-lg font-medium">{piece.title}</h3>
                  <p className="text-gray-500 text-sm italic">por {piece.artist}</p>
                </div>
                <p className="text-primary font-bold">{piece.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtGallery;
