import React, { useState, useEffect, useRef } from 'react';
import { User, Moon, Sun } from 'lucide-react';
import { logOut } from '../../firebase/auth';
import toast from 'react-hot-toast';
import './CreatorNavbar.css';

export default function CreatorNavbar({ isDark, toggleDark, activeTab, setActiveTab }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navItems = ['Dashboard', 'My Streams', 'Listings', 'Orders', 'Analytics'];

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

  return (
    <nav className="creator-nav brutal-border bg-cream text-ink">
      <div className="creator-nav-left">
        <div className="creator-logo-container">
          <span className="creator-logo-text text-orange uppercase tracking-widest font-black">Lumina</span>
          <span className="creator-badge bg-ink text-cream brutal-border">CREATOR</span>
        </div>
        
        <div className="creator-nav-links">
          {navItems.map(item => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)} 
              className={`nav-link text-ink font-bold ${activeTab === item ? 'active text-orange' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="creator-nav-right">
        <button onClick={toggleDark} className="icon-btn brutal-border" aria-label="Toggle Dark Mode">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button 
            className="icon-btn brutal-border relative" 
            aria-label="Profile menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <User size={20} />
          </button>
          {showProfileMenu && (
            <div 
              className="brutal-border" 
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                background: 'var(--cream, #F8F5F2)',
                padding: '10px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                minWidth: '120px',
                zIndex: 100,
                boxShadow: '4px 4px 0px 0px #1A1A1A'
              }}
            >
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setActiveTab('Profile'); setShowProfileMenu(false); }} style={{ padding: '5px 15px', color: '#1A1A1A', textDecoration: 'none' }}>Profile</a>
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setShowProfileMenu(false); }} style={{ padding: '5px 15px', color: '#1A1A1A', textDecoration: 'none' }}>Settings</a>
              <a href="#" className="nav-link" onClick={handleLogout} style={{ padding: '5px 15px', color: 'var(--color-orange)', textDecoration: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: '4px', fontWeight: 'bold' }}>Log Out</a>
            </div>
          )}
        </div>
        <button className="go-live-btn brutal-border">
          <span className="live-dot bg-orange"></span>
          Go Live Now
        </button>
      </div>
    </nav>
  );
}
