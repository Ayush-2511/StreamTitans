import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'app'
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

  const handleLandingComplete = (authenticated) => {
    if (authenticated) {
      setIsAuthenticated(true);
    }
    setCurrentView('app');
  };

  const handleOpenAuth = (mode) => {
    // To go strictly back to the auth component, we can use a simpler view. 
    // Since we need the full background, it's easier to implement a full screen overlay 
    // or set the view back to 'landing' but starting at the auth step directly.
    // For now, we will add a new view state 'auth'.
    setCurrentView(`auth-${mode}`); // 'auth-login' or 'auth-signup'
  };

  if (currentView === 'landing' || currentView.startsWith('auth-')) {
    return (
      <LandingFlow 
        onComplete={handleLandingComplete} 
        startAtAuth={currentView.startsWith('auth-')}
        authMode={currentView.replace('auth-', '')}
      />
    );
  }

  // Once unlocked, render main platform framework
  return (
    <Home 
      isDark={isDark} 
      toggleDark={toggleDark} 
      isAuthenticated={isAuthenticated}
      onOpenAuth={handleOpenAuth} 
    />
  );
}
