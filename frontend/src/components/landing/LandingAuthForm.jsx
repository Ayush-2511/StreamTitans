import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { logIn, signUp, logInWithGoogle } from '../../firebase/auth';
import './LandingAuthForm.css';

export default function LandingAuthForm({ isHidden, onComplete, initialMode = 'signup', onBack, onCreatorSelect }) {
  const [mode, setMode] = useState(initialMode); // 'signup' or 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'buyer';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        await signUp(email, password, role, name);
        toast.success("Account created successfully!");
      } else {
        await logIn(email, password);
        toast.success("Welcome back!");
      }
      onComplete(true);
    } catch (err) {
      if (err.code === 'auth/configuration-not-found' || err.code === 'auth/invalid-api-key') {
        toast.error("Firebase keys are missing or invalid. Check your .env file!");
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await logInWithGoogle(role);
      toast.success("Authenticated with Google!");
      onComplete(true);
    } catch (err) {
      if (err.code === 'auth/unauthorized-domain') {
        toast.error("This domain/IP is not authorized in Firebase Console. Add it to 'Authorized Domains'!", { duration: 6000 });
      } else if (err.code === 'auth/operation-not-allowed') {
        toast.error("Google login is not enabled in Firebase > Auth > Sign-in Method.", { duration: 6000 });
      } else {
        toast.error(err.message);
      }
    }
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
            <>
              <input 
                type="text" 
                placeholder="Your name" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="auth-input-field brutal-border"
              />
            </>
          )}
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="auth-input-field brutal-border"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="auth-input-field brutal-border"
          />

          <button type="submit" className="auth-action-btn brutal-border">
            {mode === 'signup' ? 'Sign Up' : 'Log In'}
            <ArrowRight size={20} />
          </button>
        </form>

        <button onClick={handleGoogleAuth} className="auth-action-btn brutal-border" style={{ marginTop: '1rem', backgroundColor: '#f0f0f0', color: '#111', width: '100%' }}>
          Continue with Google
        </button>

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

        {onCreatorSelect && (
          <p className="auth-switch-text" style={{ marginTop: '0.5rem' }}>
            Want to sell on Lumina?{' '}
            <span className="auth-switch-link" onClick={onCreatorSelect} style={{ color: 'var(--color-orange)' }}>
              Join as a Seller
            </span>
          </p>
        )}

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
