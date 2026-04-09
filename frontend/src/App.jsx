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
import { useAuth } from './context/AuthContext';
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
  const { currentUser, userRole, loading } = useAuth();

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
      landing: '', 
      creator: '#/dashboard',
      'creator-auth': '#/creator-auth',
      'auth-login': '#/login',
      'auth-signup': '#/signup',
    };
    const targetHash = viewToHash[currentView];
    const currentHash = window.location.hash;

    if (currentView === 'landing') {
      if (currentHash !== '' && currentHash !== '#/') {
        window.history.pushState(null, '', '/');
      }
    } else if (targetHash && currentHash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  }, [currentView]);

  // Browser back button support
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      const view = getInitialViewFromHash();
      if (view !== currentView) {
        setCurrentView(view);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  const toggleDark = () => setIsDark(!isDark);

  const handleOpenAuth = (mode) => {
    setCurrentView(mode === 'login' ? 'auth-login' : 'auth-signup');
  };

  const handleAuthComplete = () => {
    setCurrentView(userRole === 'seller' ? 'creator' : 'buyer');
  };

  // If Firebase is checking login state, show nothing or spinner.
  if (loading) return null;

  // Check for missing configuration (Diagnostic for team collaborators)
  if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'your_api_key_here') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', padding: '2rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: '600px', border: '2px solid #FF5B22', padding: '2.5rem', borderRadius: '16px' }}>
          <h1 style={{ color: '#FF5B22', fontSize: '2rem', marginBottom: '1.5rem' }}>Configuration Missing</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', opacity: 0.9 }}>
            It looks like you've pulled the code but haven't set up your <strong>.env</strong> file yet. 
            Firebase and AI features will not work without it.
          </p>
          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', textAlign: 'left', marginBottom: '2rem' }}>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>QUICK FIX:</p>
            <p style={{ fontSize: '0.95rem' }}>1. Rename <strong>.env.example</strong> to <strong>.env</strong></p>
            <p style={{ fontSize: '0.95rem' }}>2. Paste the keys provided by your team lead</p>
            <p style={{ fontSize: '0.95rem' }}>3. Restart your dev server (<code>npm run dev</code>)</p>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>StreamTitans © 2026 · Project Collaboration Mode</p>
        </div>
      </div>
    );
  }

  let content;

  // Protect creator route
  if (currentView === 'creator' && (!currentUser || userRole !== 'seller')) {
    content = (
      <LandingFlow 
        startAtAuth
        authMode="login"
        onComplete={handleAuthComplete}
      />
    );
  } else if ((currentView === 'landing' || currentView === 'auth-login' || currentView === 'auth-signup') && currentUser) {
     // Auto-redirect if logged in and on landing OR auth views
     // Wait for userRole to be populated from Firestore
     if (userRole !== null) {
       setTimeout(() => setCurrentView(userRole === 'seller' ? 'creator' : 'buyer'), 0);
     }
     content = null;
  } else if (currentView === 'landing') {
    content = (
      <LandingFlow 
        onBuyerSelect={() => setCurrentView('auth-login')}
        onCreatorSelect={() => setCurrentView('creator-auth')}
        onComplete={handleAuthComplete}
      />
    );
  } else if (currentView === 'auth-login' || currentView === 'auth-signup') {
    content = (
      <LandingFlow 
        startAtAuth
        authMode={currentView === 'auth-login' ? 'login' : 'signup'}
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
        isAuthenticated={!!currentUser}
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
