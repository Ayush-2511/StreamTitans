import React, { useState, useEffect } from 'react';
import LandingEmail from './LandingEmail';
import LandingPersona from './LandingPersona';
import LandingAuthForm from './LandingAuthForm';
import './AuthSection.css';

export default function AuthSection({ onComplete, startAtAuth, authMode }) {
  // Step 1: Email entered
  const [emailEntered, setEmailEntered] = useState(false);
  const [email, setEmail] = useState("");

  // Step 2: Persona selected
  const [personaSelected, setPersonaSelected] = useState(false);

  // Exiting animation state
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
    // Reveal step 3 (auth form)
    setPersonaSelected(true);
  };

  const handleAuthComplete = (authenticated) => {
    setIsTransitioningHome(true);
    // Wait for the exit animation to finish
    setTimeout(() => {
      onComplete(authenticated);
    }, 800);
  };

  return (
    <div className={`auth-container ${isTransitioningHome ? 'transitioning-out' : 'transitioning-in'}`}>
      
      {/* step 1 */}
      {!startAtAuth && (
        <LandingEmail 
          email={email}
          setEmail={setEmail}
          onSubmit={handleEmailSubmit}
          isHidden={emailEntered}
        />
      )}
      
      {/* step 2 */}
      {!startAtAuth && (
        <LandingPersona 
          onShopperClick={handleShopperClick}
          isHidden={!emailEntered || personaSelected}
        />
      )}

      {/* step 3 */}
      <LandingAuthForm
        onComplete={handleAuthComplete}
        isHidden={!personaSelected}
        initialMode={authMode || 'signup'}
      />

    </div>
  );
}
