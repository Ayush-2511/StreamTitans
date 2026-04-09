import React, { useRef, useEffect } from 'react';
import LandingHero from '../components/landing/LandingHero';
import AuthSection from '../components/landing/AuthSection';
import './LandingFlow.css';

export default function LandingFlow({ onBuyerSelect, onCreatorSelect, onComplete, startAtAuth, authMode }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (startAtAuth && scrollRef.current) {
      scrollRef.current.scrollTop = window.innerHeight;
    }
  }, [startAtAuth]);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="landing-flow-container no-scrollbar"
    >
      {!startAtAuth && (
        <div className="landing-step">
          <LandingHero onNext={handleNext} />
        </div>
      )}
      <div className="landing-step relative" style={{ height: '100vh' }}>
        <AuthSection 
          onBuyerSelect={onBuyerSelect}
          onCreatorSelect={onCreatorSelect}
          onComplete={onComplete}
          startAtAuth={startAtAuth}
          authMode={authMode}
        />
      </div>
    </div>
  );
}
