import React, { useRef, useEffect } from 'react';
import LandingHero from '../components/landing/LandingHero';
import AuthSection from '../components/landing/AuthSection';
import './LandingFlow.css';

export default function LandingFlow({ onComplete, startAtAuth, authMode }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // If starting at auth, instantly jump down (or we could just hide the hero)
    if (startAtAuth && scrollRef.current) {
      scrollRef.current.scrollTop = window.innerHeight;
    }
  }, [startAtAuth]);

  const handleNext = () => {
    // Scroll down by 1 window height smoothly
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="landing-flow-container no-scrollbar"
    >
      <div className="landing-step" style={{ display: startAtAuth ? 'none' : 'block' }}>
        <LandingHero onNext={handleNext} />
      </div>
      <div className="landing-step relative" style={{ height: startAtAuth ? '100vh' : '100vh' }}>
        <AuthSection 
          onComplete={onComplete} 
          startAtAuth={startAtAuth} 
          authMode={authMode} 
        />
      </div>
    </div>
  );
}
