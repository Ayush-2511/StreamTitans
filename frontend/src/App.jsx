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
  // Creator Workspace Tabs
  '#/dashboard': 'Dashboard',
  '#/dashboard/streams': 'My Streams',
  '#/dashboard/listings': 'Listings',
  '#/dashboard/orders': 'Orders',
  '#/dashboard/analytics': 'Analytics',
  '#/dashboard/profile': 'Profile',
};

const getInitialViewFromHash = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#/dashboard')) return 'creator';
  if (hash === '#/login') return 'auth-login';
  if (hash === '#/signup') return 'auth-signup';
  if (hash === '#/creator-auth') return 'creator-auth';
  if (TAB_HASHES[hash]) return 'buyer';
  return 'landing';
};

const getInitialTabFromHash = () => TAB_HASHES[window.location.hash] || 'Discover';

export default function App() {
  const [currentView, setCurrentView] = useState(getInitialViewFromHash);
  const [personaIntent, setPersonaIntent] = useState(null); // 'buyer' or 'seller'
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
      buyer: '#/discover',
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
    } else if (targetHash) {
      // For buyer/creator, we only push if the current hash doesn't already start with the base
      const isCorrectBase = currentHash.startsWith(targetHash.split('/')[0] + '/' + targetHash.split('/')[1]);
      if (!isCorrectBase && currentHash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
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
    setPersonaIntent(null); // Clear intent for direct login/signup clicks
    setCurrentView(mode === 'login' ? 'auth-login' : 'auth-signup');
  };

  const handleAuthComplete = (persona) => {
    const finalPersona = persona || personaIntent || (userRole === 'seller' ? 'seller' : 'buyer');
    setCurrentView(finalPersona === 'seller' ? 'creator' : 'buyer');
    setPersonaIntent(null);
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
      <CreatorAuthFlow 
        onComplete={() => setCurrentView('creator')} 
        onBack={() => setCurrentView('landing')} 
      />
    );
  } else if ((currentView === 'auth-login' || currentView === 'auth-signup') && currentUser) {
     if (userRole !== null) {
       const finalView = personaIntent === 'buyer' ? 'buyer' : (userRole === 'seller' ? 'creator' : 'buyer');
       setTimeout(() => {
         setCurrentView(finalView);
         setPersonaIntent(null);
       }, 0);
     }
     content = null;
  } else if (currentView === 'landing') {
    content = (
      <LandingFlow 
        onBuyerSelect={() => {
          setPersonaIntent('buyer');
          currentUser ? setCurrentView('buyer') : setCurrentView('auth-login');
        }}
        onCreatorSelect={() => {
          setPersonaIntent('seller');
          (currentUser && userRole === 'seller') ? setCurrentView('creator') : setCurrentView('creator-auth');
        }}
        onComplete={handleAuthComplete}
      />
    );
  } else if (currentView === 'auth-login' || currentView === 'auth-signup') {
    content = (
      <LandingFlow 
        startAtAuth
        authMode={currentView === 'auth-login' ? 'login' : 'signup'}
        onComplete={() => handleAuthComplete(currentView === 'auth-login' || currentView === 'auth-signup' ? 'buyer' : null)}
        onCreatorSelect={() => (currentUser && userRole === 'seller') ? setCurrentView('creator') : setCurrentView('creator-auth')}
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
        userRole={userRole}
        onOpenAuth={handleOpenAuth}
        onBackParent={() => setCurrentView('landing')}
        onSwitchDash={() => setCurrentView('creator')}
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
