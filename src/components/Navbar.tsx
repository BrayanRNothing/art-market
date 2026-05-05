import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Contact, User } from 'lucide-react';

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
    ...(isLoggedIn ? [{ label: "My Art", view: 'my-art' }] : [])
  ];

  const ActionButtons = ({ mobile = false }) => (
    <div className={`flex items-center ${mobile ? 'gap-3 ml-2' : 'gap-3'}`}>
      {!mobile && (
        <button
          onClick={onContactClick}
          title="Contacto"
          className="w-8 h-8 rounded-full flex items-center justify-center text-primary transition-all pointer-events-auto border border-white/10 bg-black hover:bg-primary hover:text-black shadow-xl"
        >
          <Contact size={14} />
        </button>
      )}
      <button
        onClick={onProfileClick}
        title="Login / Logout"
        className={`w-8 h-8 rounded-full flex items-center justify-center text-primary transition-all pointer-events-auto border border-white/10 overflow-hidden ${mobile ? 'bg-primary/10' : 'bg-black hover:bg-primary hover:text-black shadow-xl'}`}
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
  );

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center md:pointer-events-none">
      <div
        className="relative w-full md:w-auto bg-black/90 md:bg-black backdrop-blur-md md:backdrop-blur-none px-4 py-3 md:px-12 md:py-3 flex items-center justify-between md:justify-center gap-4 pointer-events-auto md:rounded-b-[20px] border-b border-white/5 md:border-none"
      >
        {/* Notch Inverted Corner Left */}
        <div className="hidden md:block absolute -left-[19px] top-0 w-[20px] h-[20px] pointer-events-none overflow-hidden">
          <div className="w-full h-full rounded-tr-[20px] shadow-[0_0_0_40px_black]" />
        </div>

        {/* Nav Items Scrollable on Mobile */}
        <div className="flex items-center gap-4 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto md:overflow-visible no-scrollbar max-w-[calc(100%-80px)] md:max-w-none">
          <AnimatePresence mode="popLayout">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  color: (item.view === currentView) ? '#e1e0cc' : 'rgba(225, 224, 204, 0.6)'
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  if (item.label === "My Art") {
                    if (isLoggedIn) {
                      onViewChange('my-art');
                    } else {
                      onProfileClick(); // Open login
                    }
                  } else if (item.view) {
                    onViewChange(item.view as any);
                  }
                }}
                className={`relative text-[11px] sm:text-xs md:text-[13px] font-medium tracking-wide transition-colors duration-300 uppercase whitespace-nowrap`}
              >
                {item.label}
                {item.view === currentView && (
                  <motion.div layoutId="nav-underline" className="h-px bg-primary mt-0.5" />
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons inside Navbar for Mobile */}
        <div className="md:hidden flex-shrink-0">
          <ActionButtons mobile />
        </div>

        {/* Notch Inverted Corner Right */}
        <div className="hidden md:block absolute -right-[19px] top-0 w-[20px] h-[20px] pointer-events-none overflow-hidden">
          <div className="w-full h-full rounded-tl-[20px] shadow-[0_0_0_40px_black]" />
        </div>
      </div>

      {/* Floating Action Buttons for Desktop */}
      <div className="hidden md:flex absolute top-4 right-10 h-16 items-center pointer-events-none">
        <ActionButtons />
      </div>
    </nav>
  );
};

export default Navbar;
