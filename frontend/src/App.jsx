import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';
import CreatorDashboard from './pages/CreatorDashboard';
import { StreamProvider } from './context/StreamContext';
import StreamOverlay from './components/StreamOverlay';
import { ProductProvider } from './context/ProductContext';
import ProductOverlay from './components/ProductOverlay';
import { ArrowLeft } from 'lucide-react';

import { useAuth } from './context/AuthContext';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'buyer' | 'creator' | 'auth-login' | 'auth-signup'
  const [isDark, setIsDark] = useState(false);
  const { currentUser, userRole, loading } = useAuth();


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

  const handleAuthComplete = () => {
    setCurrentView(userRole === 'seller' ? 'creator' : 'buyer');
  };

  // If Firebase is checking login state, show nothing or spinner.
  if (loading) return null;

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
        onCreatorSelect={() => setCurrentView('creator')}
        onComplete={handleAuthComplete}
      />
    );
  } else if (currentView === 'auth-login' || currentView === 'auth-signup') {
    content = (
      <LandingFlow 
        startAtAuth
        authMode={currentView === 'auth-login' ? 'login' : 'signup'}
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
        isAuthenticated={!!currentUser}
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

        <StreamOverlay />
        <ProductOverlay />
      </StreamProvider>
    </ProductProvider>
  );
}
