import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';
import CreatorDashboard from './pages/CreatorDashboard';
import { StreamProvider } from './context/StreamContext';
import StreamOverlay from './components/StreamOverlay';
import { ProductProvider } from './context/ProductContext';
import ProductOverlay from './components/ProductOverlay';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'buyer' | 'creator' | 'auth-login' | 'auth-signup'
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  const handleOpenAuth = (mode) => {
    setCurrentView(mode === 'login' ? 'auth-login' : 'auth-signup');
  };

  const handleAuthComplete = (authenticated) => {
    setIsAuthenticated(authenticated);
    setCurrentView('buyer');
  };

  let content;

  if (currentView === 'landing') {
    content = (
      <LandingFlow 
        onBuyerSelect={() => setCurrentView('auth-login')}
        onCreatorSelect={() => setCurrentView('creator')}
      />
    );
  } else if (currentView.startsWith('auth-')) {
    content = (
      <LandingFlow
        startAtAuth
        authMode={currentView.replace('auth-', '')}
        onComplete={handleAuthComplete}
      />
    );
  } else if (currentView === 'creator') {
    content = <CreatorDashboard isDark={isDark} toggleDark={toggleDark} />;
  } else {
    content = (
      <Home
        isDark={isDark}
        toggleDark={toggleDark}
        isAuthenticated={isAuthenticated}
        onOpenAuth={handleOpenAuth}
      />
    );
  }

  return (
    <ProductProvider>
      <StreamProvider>
        <div key={currentView} className="animate-fade-in-up" style={{ minHeight: '100vh', width: '100%' }}>
          {content}
        </div>
        
        {currentView !== 'landing' && (
          <button 
            onClick={() => setCurrentView('landing')}
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '30px',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1a1a1a',
              color: '#fff',
              border: '1.5px solid #1a1a1a',
              padding: '12px 24px',
              borderRadius: '40px',
              boxShadow: '4px 4px 0 0 #FF5B22',
              cursor: 'pointer',
              fontWeight: '600',
              fontFamily: 'system-ui, sans-serif',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <ArrowLeft size={16} /> Exit to Gateway
          </button>
        )}

        <StreamOverlay />
        <ProductOverlay />
      </StreamProvider>
    </ProductProvider>
  );
}
