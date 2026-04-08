import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isDark, toggleDark }) {
  return (
    <header className="navbar animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <div className="nav-brand-container">
        <h1 className="nav-brand">
          <Sparkles className="nav-brand-icon" />
          LUMINA
        </h1>
      </div>
      
      <nav className="nav-links">
        <a href="#" className="nav-link">Discover</a>
        <a href="#" className="nav-link">Sellers</a>
        <a href="#" className="nav-link">Thrift</a>
        <a href="#" className="nav-link">About</a>
      </nav>
      
      <div className="nav-actions">
        <button 
          onClick={toggleDark} 
          className="nav-btn-icon brutal-border focus-visible"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="nav-btn-svg" /> : <Moon className="nav-btn-svg" />}
        </button>
        <button className="nav-btn-secondary brutal-border">Log In</button>
        <button className="nav-btn-primary brutal-border">Sign Up</button>
      </div>
    </header>
  );
}
