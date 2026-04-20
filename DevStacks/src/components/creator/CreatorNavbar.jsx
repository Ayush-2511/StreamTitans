import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import './CreatorNavbar.css';

export default function CreatorNavbar({ isDark, toggleDark, activeTab, setActiveTab }) {
  const navItems = ['Dashboard', 'My Streams', 'Listings', 'Orders', 'Analytics'];

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
        <button className="icon-btn brutal-border relative" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot bg-orange brutal-border"></span>
        </button>
        <button className="go-live-btn brutal-border">
          <span className="live-dot bg-orange"></span>
          Go Live Now
        </button>
      </div>
    </nav>
  );
}
