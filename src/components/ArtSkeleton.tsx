import { motion } from 'framer-motion';

export const ArtCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.03]">
        <motion.div
          animate={{
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full bg-primary/10"
        />
      </div>
      <div className="space-y-3 px-1">
        <div className="flex justify-between items-start gap-4">
          <div className="h-6 bg-white/[0.02] rounded-md w-3/4 animate-pulse" />
          <div className="h-4 bg-primary/10 rounded-md w-1/4 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-px bg-primary/10" />
          <div className="h-3 bg-white/[0.02] rounded-md w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const ArtMarketSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <ArtCardSkeleton key={i} />
      ))}
    </div>
  );
};
