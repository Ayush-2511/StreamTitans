import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';
import CreatorDashboard from './pages/CreatorDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'buyer' | 'creator'
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  if (currentView === 'landing') {
    return (
      <LandingFlow 
        onBuyerSelect={() => setCurrentView('buyer')}
        onCreatorSelect={() => setCurrentView('creator')}
      />
    );
  }

  if (currentView === 'creator') {
    return <CreatorDashboard isDark={isDark} toggleDark={toggleDark} />;
  }

  // Once unlocked, render main platform framework
  return <Home isDark={isDark} toggleDark={toggleDark} />;
}
