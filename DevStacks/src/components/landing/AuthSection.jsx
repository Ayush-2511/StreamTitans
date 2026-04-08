import React, { useState } from 'react';
import LandingEmail from './LandingEmail';
import LandingPersona from './LandingPersona';
import './AuthSection.css';

export default function AuthSection({ onBuyerSelect, onCreatorSelect }) {
  const [emailEntered, setEmailEntered] = useState(false);
  const [email, setEmail] = useState("");
  const [isTransitioningHome, setIsTransitioningHome] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setEmailEntered(true);
    }
  };

  const handleShopperClick = () => {
    setIsTransitioningHome(true);
    // Wait for the exit animation to finish before unmounting via App.jsx
    setTimeout(() => {
      onBuyerSelect();
    }, 800);
  };

  const handleCreatorClick = () => {
    setIsTransitioningHome(true);
    setTimeout(() => {
      onCreatorSelect();
    }, 800);
  };

  return (
    <div className={`auth-container ${isTransitioningHome ? 'transitioning-out' : 'transitioning-in'}`}>
      
      <LandingEmail 
        email={email}
        setEmail={setEmail}
        onSubmit={handleEmailSubmit}
        isHidden={emailEntered}
      />
      
      <LandingPersona 
        onShopperClick={handleShopperClick}
        onCreatorClick={handleCreatorClick}
        isHidden={!emailEntered}
      />

    </div>
  );
}
