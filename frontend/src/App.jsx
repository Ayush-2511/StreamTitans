import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';
import CreatorDashboard from './pages/CreatorDashboard';
import CreatorAuthFlow from './pages/CreatorAuthFlow';
import { StreamProvider } from './context/StreamContext';
import StreamOverlay from './components/StreamOverlay';
import { ProductProvider } from './context/ProductContext';
import ProductOverlay from './components/ProductOverlay';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'buyer' | 'creator' | 'auth-login' | 'auth-signup' | 'creator-auth'
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
        onCreatorSelect={() => setCurrentView('creator-auth')}
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
  } else if (currentView === 'creator-auth') {
    content = <CreatorAuthFlow onComplete={() => setCurrentView('creator')} />;
  } else if (currentView === 'creator') {
    content = <CreatorDashboard isDark={isDark} toggleDark={toggleDark} />;
  } else {
    content = (
      <Home
        isDark={isDark}
        toggleDark={toggleDark}
        isAuthenticated={isAuthenticated}
        onOpenAuth={handleOpenAuth}
        onBackParent={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <ProductProvider>
      <StreamProvider>
        <div key={currentView} className="animate-fade-in-up" style={{ minHeight: '100vh', width: '100%' }}>
          {content}
        </div>

        <StreamOverlay />
        <ProductOverlay />
      </StreamProvider>
    </ProductProvider>
  );
}
