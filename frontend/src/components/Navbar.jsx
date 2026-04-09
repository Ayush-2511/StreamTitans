import React, { useState } from 'react';
import { Sparkles, Moon, Sun, User, ShoppingBag } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isDark, toggleDark, isAuthenticated, onOpenAuth, activeTab, setActiveTab }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = isAuthenticated
    ? ['Discover', 'E-commerce', 'Thrift', 'Wallet']
    : ['Discover', 'E-commerce', 'Thrift'];

  return (
    <header className="navbar animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <div className="nav-brand-container">
        <h1 className="nav-brand">
          <Sparkles className="nav-brand-icon" />
          LUMINA
        </h1>
      </div>
      
      <nav className="nav-links">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className={`nav-link ${activeTab === item ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (setActiveTab) setActiveTab(item);
            }}
            style={activeTab === item ? { fontWeight: 'bold', color: 'var(--text-main)' } : {}}
          >
            {item}
          </a>
        ))}
      </nav>
      
      <div className="nav-actions">
        <button 
          onClick={toggleDark} 
          className="nav-btn-icon brutal-border focus-visible"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="nav-btn-svg" /> : <Moon className="nav-btn-svg" />}
        </button>
        <button
          onClick={() => setActiveTab && setActiveTab('Cart')}
          className="nav-btn-icon brutal-border focus-visible"
          aria-label="View cart"
        >
          <ShoppingBag className="nav-btn-svg" />
        </button>
        {!isAuthenticated ? (
          <>
            <button 
              className="nav-btn-secondary brutal-border"
              onClick={() => onOpenAuth('login')}
            >
              Log In
            </button>
            <button 
              className="nav-btn-primary brutal-border"
              onClick={() => onOpenAuth('signup')}
            >
              Sign Up
            </button>
          </>
        ) : (
          <div style={{ position: 'relative' }}>
            <button
              className="nav-btn-icon brutal-border focus-visible"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-label="Profile menu"
            >
              <User className="nav-btn-svg" />
            </button>
            {showProfileMenu && (
              <div 
                className="profile-dropdown brutal-border" 
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: 'var(--bg-main, #fff)',
                  padding: '10px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  minWidth: '120px',
                  zIndex: 100,
                  boxShadow: 'var(--shadow-brutal, 4px 4px 0px 0px rgba(0,0,0,1))'
                }}
              >
                <a href="#" className="nav-link" style={{ padding: '5px 15px', color: 'var(--text-main)' }}>Profile</a>
                <a href="#" className="nav-link" style={{ padding: '5px 15px', color: 'var(--text-main)' }}>About</a>
                <a href="#" className="nav-link" style={{ padding: '5px 15px', color: 'var(--text-main)' }}>Settings</a>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
