import React, { useRef } from 'react';
import LandingHero from '../components/landing/LandingHero';
import AuthSection from '../components/landing/AuthSection';
import './LandingFlow.css';

export default function LandingFlow({ onBuyerSelect, onCreatorSelect }) {
  const scrollRef = useRef(null);

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
      <div className="landing-step">
        <LandingHero onNext={handleNext} />
      </div>
      <div className="landing-step relative">
        <AuthSection onBuyerSelect={onBuyerSelect} onCreatorSelect={onCreatorSelect} />
      </div>
    </div>
  );
}
