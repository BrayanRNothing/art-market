import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtGallery from './components/ArtGallery';
import ArtistInvite from './components/ArtistInvite';
import About from './components/About';
import Features from './components/Features';
import CustomCursor from './components/CustomCursor';
import ContactModal from './components/ContactModal';
import AuthModal from './components/AuthModal';
import MyArt from './components/MyArt';
import ArtMarket from './components/ArtMarket';
import ArtDetail from './components/ArtDetail';
import { useState } from 'react';

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cursorStatus, setCursorStatus] = useState<'default' | 'success' | 'error' | 'loading'>('default');
  const [currentView, setCurrentView] = useState<'home' | 'my-art' | 'market' | 'gallery' | 'art-detail'>('home');
  const [selectedArtId, setSelectedArtId] = useState<string | null>(null);

  // Check for existing session
  useState(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  });

  const handleViewArt = (id: string) => {
    setSelectedArtId(id);
    setCurrentView('art-detail');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <ArtGallery onArtClick={handleViewArt} />
            <ArtistInvite />
            <About />
            <Features />
          </>
        );
      case 'market':
        return <ArtMarket />;
      case 'gallery':
        return <ArtGallery onArtClick={handleViewArt} />;
      case 'art-detail':
        return selectedArtId ? (
          <ArtDetail 
            artId={selectedArtId} 
            onBack={() => setCurrentView(isLoggedIn && currentView === 'art-detail' ? 'gallery' : 'home')} 
          />
        ) : <Hero />;
      case 'my-art':
        return isLoggedIn ? (
          <MyArt 
            user={user} 
            onArtClick={handleViewArt}
            onUpdateUser={(updatedUser: any) => {
              setUser(updatedUser);
              const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
              storage.setItem('user', JSON.stringify(updatedUser));
            }} 
          />
        ) : (
          <>
            <Hero />
            <ArtGallery onArtClick={handleViewArt} />
            <ArtistInvite />
            <About />
            <Features />
          </>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <main className="bg-black min-h-screen">
      <CustomCursor status={cursorStatus} />
      <Navbar
        onContactClick={() => setShowContact(true)}
        onProfileClick={() => setShowAuth(true)}
        onViewChange={(view: any) => setCurrentView(view)}
        isLoggedIn={isLoggedIn}
        user={user}
        currentView={currentView as any}
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
          setCurrentView('home');
          setShowAuth(false);
        }}
        onError={() => {
          setCursorStatus('error');
          setTimeout(() => setCursorStatus('default'), 2000);
        }}
      />

      {renderContent()}

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