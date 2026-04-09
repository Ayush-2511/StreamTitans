import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './LandingAuthForm.css';

export default function LandingAuthForm({ isHidden, onComplete, initialMode = 'signup', onBack }) {
  const [mode, setMode] = useState(initialMode); // 'signup' or 'login'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful authentication
    onComplete(true); 
  };

  const handleSkip = () => {
    // Skip without authenticating
    onComplete(false);
  };

  return (
    <div className={`auth-form-step ${isHidden ? 'hidden-step' : 'visible-step'}`}>
      <div className="auth-form-wrapper brutal-border">
        
        <div className="auth-form-header">
          <h2 className="auth-form-title">
            {mode === 'signup' ? 'Join Lumina.' : 'Welcome back.'}
          </h2>
          <p className="auth-form-subtitle">
            {mode === 'signup' 
              ? 'Create your account to unlock drops.' 
              : 'Sign in to continue to Lumina.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-fields">
          {mode === 'signup' && (
            <input 
              type="text" 
              placeholder="Your name" 
              required
              className="auth-input-field brutal-border"
            />
          )}
          <input 
            type="email" 
            placeholder="Email address" 
            required
            className="auth-input-field brutal-border"
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="auth-input-field brutal-border"
          />

          <button type="submit" className="auth-action-btn brutal-border">
            {mode === 'signup' ? 'Sign Up' : 'Log In'}
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="auth-switch-text">
          {mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <span className="auth-switch-link" onClick={() => setMode('login')}>
                Log in
              </span>
            </>
          ) : (
            <>
              New user?{' '}
              <span className="auth-switch-link" onClick={() => setMode('signup')}>
                Sign up
              </span>
            </>
          )}
        </p>

        {onBack && (
          <button onClick={onBack} className="auth-back-btn">
            <ArrowLeft size={15} /> Back to Home
          </button>
        )}

        <button onClick={handleSkip} className="auth-skip-btn">
          SKIP FOR NOW <ArrowRight className="auth-skip-icon" />
        </button>

      </div>
    </div>
  );
}
