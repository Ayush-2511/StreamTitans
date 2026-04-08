import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import './Signup.css';

export default function Signup() {
  return (
    <div className="auth-container animate-fade-in-up">
      <Link to="/" className="auth-back-link brutal-border focus-visible">
        <ArrowLeft className="nav-btn-svg" /> Back
      </Link>
      <div className="auth-card brutal-border">
        <div className="auth-header">
          <Sparkles className="auth-icon" />
          <h2 className="auth-title">Join Lumina</h2>
          <p className="auth-subtitle">Create an account to start thrifting</p>
        </div>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" className="auth-input brutal-border" placeholder="Enter full name" />
          </div>
          <div className="auth-input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" className="auth-input brutal-border" placeholder="Enter email address" />
          </div>
          <div className="auth-input-group">
            <label htmlFor="username">Username (Set)</label>
            <input type="text" id="username" className="auth-input brutal-border" placeholder="Choose username" />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password (Set)</label>
            <input type="password" id="password" className="auth-input brutal-border" placeholder="Create a password" />
          </div>
          
          <button type="submit" className="auth-submit brutal-border focus-visible">
            Sign Up
          </button>
        </form>
        
        <div className="auth-footer">
          <span>Already have an account? </span>
          <Link to="/login" className="auth-link">Log In</Link>
        </div>
      </div>
    </div>
  );
}
