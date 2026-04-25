import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtGallery from './components/ArtGallery';
import ArtistInvite from './components/ArtistInvite';
import About from './components/About';
import Features from './components/Features';
import CustomCursor from './components/CustomCursor';
import ContactModal from './components/ContactModal';
import AuthModal from './components/AuthModal';
import { useState } from 'react';

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cursorStatus, setCursorStatus] = useState<'default' | 'success' | 'error' | 'loading'>('default');

  return (
    <main className="bg-black min-h-screen">
      <CustomCursor status={cursorStatus} />
      <Navbar
        onContactClick={() => setShowContact(true)}
        onProfileClick={() => setShowAuth(true)}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        isLoggedIn={isLoggedIn}
        onLogin={(userData) => {
          setIsLoggedIn(true);
          setUser(userData);
          setCursorStatus('success');
          setTimeout(() => setCursorStatus('default'), 2000);
          setShowAuth(false);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
          setShowAuth(false);
        }}
        onError={() => {
          setCursorStatus('error');
          setTimeout(() => setCursorStatus('default'), 2000);
        }}
      />
      <Hero />
      <ArtGallery />
      <ArtistInvite />
      <About />
      <Features />

      {/* Footer / Simple spacing at the end */}
      <footer className="bg-black py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-primary/50 text-xs tracking-widest uppercase">
            © 2026 Art Market
          </p>
          <div className="flex gap-8">
            {['Instagram', 'Twitter', 'Vimeo', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-primary/50 hover:text-primary text-xs transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;