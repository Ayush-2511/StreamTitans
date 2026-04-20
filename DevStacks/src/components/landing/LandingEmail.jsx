import React from 'react';
import { ArrowRight } from 'lucide-react';
import './LandingEmail.css';

export default function LandingEmail({ email, setEmail, onSubmit, isHidden }) {
  return (
    <div className={`auth-step-1 ${isHidden ? 'hidden-step' : 'visible-step'}`}>
      <div className="auth-form-box brutal-border">
        <div>
          <h2 className="auth-heading">Access Archives.</h2>
          <p className="auth-subheading">Start with your email to unlock drops.</p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required
            className="auth-input brutal-border"
          />
          <button 
            type="submit"
            className="auth-submit-btn brutal-border"
          >
            <ArrowRight className="auth-submit-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
