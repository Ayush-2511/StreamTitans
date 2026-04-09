import React, { useState, useEffect } from 'react';
import LandingEmail from './LandingEmail';
import LandingPersona from './LandingPersona';
import LandingAuthForm from './LandingAuthForm';
import './AuthSection.css';

export default function AuthSection({ onBuyerSelect, onCreatorSelect, onComplete, startAtAuth, authMode, onBack }) {
  const [emailEntered, setEmailEntered] = useState(false);
  const [email, setEmail] = useState('');
  const [personaSelected, setPersonaSelected] = useState(false);
  const [isTransitioningHome, setIsTransitioningHome] = useState(false);

  useEffect(() => {
    if (startAtAuth) {
      setEmailEntered(true);
      setPersonaSelected(true);
    }
  }, [startAtAuth]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setEmailEntered(true);
    }
  };

  const handleShopperClick = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (onBuyerSelect) {
      setIsTransitioningHome(true);
      setTimeout(() => {
        onBuyerSelect();
      }, 800);
    } else {
      setPersonaSelected(true);
    }
  };

  const handleCreatorClick = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (onCreatorSelect) {
      setIsTransitioningHome(true);
      setTimeout(() => {
        onCreatorSelect();
      }, 800);
    } else {
      setPersonaSelected(true);
    }
  };

  const handleAuthComplete = (authenticated) => {
    setIsTransitioningHome(true);
    setTimeout(() => {
      onComplete(authenticated);
    }, 800);
  };

  if (startAtAuth) {
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
          isHidden={!emailEntered || personaSelected}
        />
        <LandingAuthForm
          onComplete={handleAuthComplete}
          isHidden={!personaSelected}
          initialMode={authMode || 'signup'}
          onBack={onBack}
          onCreatorSelect={handleCreatorClick}
        />
      </div>
    );
  }

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
