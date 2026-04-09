import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';
import CreatorDashboard from './pages/CreatorDashboard';
import CreatorAuthFlow from './pages/CreatorAuthFlow';
import { StreamProvider } from './context/StreamContext';
import StreamOverlay from './components/StreamOverlay';
import { ProductProvider } from './context/ProductContext';
import ProductOverlay from './components/ProductOverlay';
import { UserActivityProvider } from './context/UserActivityContext';
import Chatbot from './components/Chatbot';
import { ArrowLeft } from 'lucide-react';

const TAB_HASHES = {
  '#/discover': 'Discover',
  '#/ecommerce': 'E-commerce',
  '#/thrift': 'Thrift',
  '#/cart': 'Cart',
  '#/wallet': 'Wallet',
  '#/profile': 'Profile',
  '#/settings': 'Settings',
};

const getInitialViewFromHash = () => {
  const hash = window.location.hash;
  if (hash === '#/dashboard') return 'creator';
  if (hash === '#/login') return 'auth-login';
  if (hash === '#/signup') return 'auth-signup';
  if (hash === '#/creator-auth') return 'creator-auth';
  if (TAB_HASHES[hash]) return 'buyer';
  return 'landing';
};

const getInitialTabFromHash = () => TAB_HASHES[window.location.hash] || 'Discover';

export default function App() {
  const [currentView, setCurrentView] = useState(getInitialViewFromHash);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('lumina-theme') === 'dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lumina-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lumina-theme', 'light');
    }
  }, [isDark]);

  // Sync top-level view → URL hash
  useEffect(() => {
    const viewToHash = {
      landing: '#/',
      creator: '#/dashboard',
      'creator-auth': '#/creator-auth',
      'auth-login': '#/login',
      'auth-signup': '#/signup',
    };
    if (viewToHash[currentView]) {
      window.history.pushState(null, '', viewToHash[currentView]);
    }
  }, [currentView]);

  // Browser back button support
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/') setCurrentView('landing');
      else if (hash === '#/dashboard') setCurrentView('creator');
      else if (hash === '#/login') setCurrentView('auth-login');
      else if (hash === '#/signup') setCurrentView('auth-signup');
      else if (hash === '#/creator-auth') setCurrentView('creator-auth');
      else if (TAB_HASHES[hash]) setCurrentView('buyer');
      else setCurrentView('landing');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
        onBack={() => setCurrentView('landing')}
      />
    );
  } else if (currentView === 'creator-auth') {
    content = <CreatorAuthFlow onComplete={() => setCurrentView('creator')} onBack={() => setCurrentView('landing')} />;
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
        initialTab={getInitialTabFromHash()}
      />
    );
  }

  return (
    <UserActivityProvider>
      <ProductProvider>
        <StreamProvider>
          <div key={currentView} className="animate-fade-in-up" style={{ minHeight: '100vh', width: '100%' }}>
            {content}
          </div>

          <StreamOverlay />
          <ProductOverlay />
          <Chatbot />
        </StreamProvider>
      </ProductProvider>
    </UserActivityProvider>
  );
}
