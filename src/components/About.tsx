import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedLetter from './AnimatedLetter';

const About = () => {
  const segments = [
    { text: "Nuestra plataforma es el punto de encuentro definitivo para el arte.", className: "text-primary" },
    { text: "Conectamos coleccionistas apasionados con creadores visionarios.", className: "text-gray-500" },
    { text: "Pintura, Escultura & Arte Contemporáneo.", className: "text-primary italic font-serif" }
  ];

  return (
    <section className="bg-black py-16 px-4 md:py-24 md:px-6">
      <div className="max-w-7xl mx-auto bg-[#101010] rounded-[2rem] p-6 md:p-16 text-center border border-white/5">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8 block">
          Marketplace
        </span>

        <div className="mb-12">
          <WordsPullUpMultiStyle
            segments={segments}
            containerClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto leading-[1.1]"
            className="text-primary"
          />
        </div>

        <div className="max-w-3xl mx-auto mt-20">
          <div className="bg-gradient-to-b from-primary via-primary/80 to-primary/20 bg-clip-text text-transparent">
            <AnimatedLetter
              text="Marketplace de arte contemporáneo diseñado para que artistas de todo el mundo publiquen, exhiban y vendan sus obras directamente a coleccionistas apasionados."
              className="text-[11px] sm:text-xs md:text-sm leading-relaxed justify-center font-medium uppercase tracking-[0.2em]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
