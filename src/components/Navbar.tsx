import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = ({ onContactClick, onProfileClick, onViewChange, isLoggedIn, user, currentView }: {
  onContactClick: () => void,
  onProfileClick: () => void,
  onViewChange: (view: 'home' | 'my-art') => void,
  isLoggedIn?: boolean,
  user?: any,
  currentView: 'home' | 'my-art'
}) => {


  const navItems = [
    { label: "Home", view: 'home' },
    { label: "Art Market", view: 'market' },
    { label: "Art Gallery", view: 'gallery' },
    ...(isLoggedIn ? [{ label: "My Art", view: 'my-art' }] : []),
    { label: "Contact", view: null }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className="relative bg-black px-8 py-2.5 md:px-12 md:py-3 flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 pointer-events-auto rounded-b-[20px]"
      >
        {/* Notch Inverted Corner Left */}
        <div className="absolute -left-[19px] top-0 w-[20px] h-[20px] pointer-events-none overflow-hidden">
          <div className="w-full h-full rounded-tr-[20px] shadow-[0_0_0_40px_black]" />
        </div>

        {/* Notch Inverted Corner Right */}
        <div className="absolute -right-[19px] top-0 w-[20px] h-[20px] pointer-events-none overflow-hidden">
          <div className="w-full h-full rounded-tl-[20px] shadow-[0_0_0_40px_black]" />
        </div>

        <AnimatePresence mode="popLayout">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              layout
              initial={{ opacity: 0, scale: 0.8, x: item.label === "My Art" ? -10 : 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0,
                color: (item.view === currentView && item.label !== "Contact") ? '#e1e0cc' : 'rgba(225, 224, 204, 0.6)'
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (item.label === "Contact") {
                  onContactClick();
                } else if (item.label === "My Art") {
                  if (isLoggedIn) {
                    onViewChange('my-art');
                  } else {
                    onProfileClick(); // Open login
                  }
                } else if (item.view) {
                  onViewChange(item.view as any);
                }
              }}
              className={`relative text-[10px] sm:text-xs md:text-[13px] font-medium tracking-wide transition-colors duration-300 uppercase`}
            >
              {item.label === "My Art" && isLoggedIn && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-primary/30 rounded-full blur-md"
                />
              )}
              {item.label}
              {item.view === currentView && item.label !== "Contact" && (
                <motion.div layoutId="nav-underline" className="h-px bg-primary mt-0.5" />
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-10 h-12 md:h-16 flex items-center gap-3 pointer-events-none">
        <button
          title="Carrito"
          className="w-8 h-8 bg-black border border-white/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all pointer-events-auto shadow-xl"
        >
          <ShoppingCart size={14} />
        </button>
        <button
          onClick={onProfileClick}
          title="Login / Logout"
          className="w-8 h-8 bg-black border border-white/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all pointer-events-auto shadow-xl overflow-hidden"
        >
          {isLoggedIn && user ? (
            user.avatar_url ? (
              <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] font-bold uppercase font-serif italic">{user.username[0]}</span>
            )
          ) : (
            <User size={14} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
