import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Sun, User, ShoppingBag, Search } from 'lucide-react';
import SemanticSearchModal from './SemanticSearchModal';
import { logOut } from '../firebase/auth';
import toast from 'react-hot-toast';
import './Navbar.css';

export default function Navbar({ isDark, toggleDark, isAuthenticated, onOpenAuth, activeTab, setActiveTab }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!showProfileMenu) return;
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showProfileMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      toast.success('Logged out successfully');
      setShowProfileMenu(false);
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

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
          onClick={() => setIsSearchOpen(true)} 
          className="nav-btn-secondary brutal-border"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-orange)' }}
          aria-label="AI Search"
        >
          <Sparkles size={16} />
          <span style={{ fontWeight: 'bold' }}>AI Search</span>
        </button>
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
          <div style={{ position: 'relative' }} ref={profileRef}>
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
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setActiveTab('Profile'); setShowProfileMenu(false); }} style={{ padding: '5px 15px', color: 'var(--text-main)' }}>Profile</a>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setActiveTab('Settings'); setShowProfileMenu(false); }} style={{ padding: '5px 15px', color: 'var(--text-main)' }}>Settings</a>
                <a href="#" className="nav-link" onClick={handleLogout} style={{ padding: '5px 15px', color: 'var(--color-orange)', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: '4px' }}>Log Out</a>
              </div>
            )}
          </div>
        )}
      </div>

      {isSearchOpen && (
        <SemanticSearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      )}
    </header>
  );
}
