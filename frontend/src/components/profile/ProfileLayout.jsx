import React from 'react';
import { User, MapPin, ShoppingBag, TrendingUp, Heart, Settings, Clock, Star, KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProfileInfo from './ProfileInfo';
import SettingsView from './SettingsView';
import './ProfileLayout.css';

export default function ProfileLayout({ activeSubTab, onChange }) {
  const { currentUser } = useAuth();
  
  // Get display name from Google Auth or Firestore
  const displayName = currentUser?.name || currentUser?.displayName || '';
  const nameParts = displayName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const initials = (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase() || '?';
  
  // Get current time greeting
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  
  // We unified the sidebar from both screenshots
  
  return (
    <div className="profile-layout-container">
      <aside className="profile-sidebar">
        
        <div className="sidebar-header">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-details">
            <h3 className="sidebar-user-name">{displayName || 'User'}</h3>
            <p className="sidebar-user-meta">{timeStr}</p>
          </div>
        </div>

        <div className="sidebar-scroll">
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">ACCOUNT</h4>
            <button 
              className={`sidebar-item ${activeSubTab === 'profile' ? 'active' : ''}`}
              onClick={() => onChange('Profile')}
            >
              <User size={16} /> My Profile
            </button>
            <button className="sidebar-item">
              <MapPin size={16} /> Delivery Address
              <span className="sidebar-badge">0</span>
            </button>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">SHOPPING</h4>
            <button className="sidebar-item">
              <ShoppingBag size={16} /> My Orders
              <span className="sidebar-badge">0</span>
            </button>
            <button className="sidebar-item">
              <TrendingUp size={16} /> Top Ordered
            </button>
            <button className="sidebar-item">
              <Heart size={16} /> Saved Finds
            </button>
            <button 
              className={`sidebar-item ${activeSubTab === 'settings' ? 'active' : ''}`}
              onClick={() => onChange('Settings')}
            >
              <Settings size={16} /> Settings
            </button>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">DISCOVER</h4>
            <button className="sidebar-item">
              <Clock size={16} /> Recently Viewed
            </button>
            <button className="sidebar-item">
              <Star size={16} /> Saved Finds
            </button>
            <button className="sidebar-item">
              <KeyRound size={16} /> Change Password
            </button>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-logout">
            <LogOut size={16} style={{ transform: 'rotate(180deg)' }} /> Log Out
          </button>
        </div>
      </aside>

      <main className="profile-main-content">
        {activeSubTab === 'profile' && <ProfileInfo />}
        {activeSubTab === 'settings' && <SettingsView />}
      </main>
    </div>
  );
}
