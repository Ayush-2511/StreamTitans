import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import './Login.css';

export default function Login() {
  return (
    <div className="auth-container animate-fade-in-up">
      <Link to="/" className="auth-back-link brutal-border focus-visible">
        <ArrowLeft className="nav-btn-svg" /> Back
      </Link>
      <div className="auth-card brutal-border">
        <div className="auth-header">
          <Sparkles className="auth-icon" />
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to your account</p>
        </div>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="auth-input brutal-border" placeholder="Enter username" />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="auth-input brutal-border" placeholder="Enter password" />
          </div>
          
          <button type="submit" className="auth-submit brutal-border focus-visible">
            Login
          </button>
        </form>
        
        <div className="auth-footer">
          <span>Don't have an account? </span>
          <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
