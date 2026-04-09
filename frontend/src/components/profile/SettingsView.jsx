import React from 'react';
import { ChevronLeft, ChevronRight, Package, Headset, Heart, CreditCard } from 'lucide-react';
import './SettingsView.css';

export default function SettingsView() {
  return (
    <div className="settings-view-container">
      <div className="settings-header">
        <button className="settings-back-icon">
          <ChevronLeft size={20} />
        </button>
        <h2 className="settings-title serif-heading">Settings</h2>
      </div>

      <div className="settings-profile-card">
        <div className="sp-avatar">RS</div>
        <div className="sp-details">
          <h3 className="sp-name serif-heading">R S</h3>
          <p className="sp-contact">+91 XXXXX XXXXX</p>
        </div>
      </div>

      <div className="settings-quick-actions">
        <button className="sq-action-btn">
          <Package size={20} />
          <span>Your Orders</span>
        </button>
        <button className="sq-action-btn">
          <Headset size={20} />
          <span>Help & Support</span>
        </button>
        <button className="sq-action-btn">
          <Heart size={20} />
          <span>Your Wishlist</span>
        </button>
      </div>

      <div className="thrift-credits-card">
        <div className="tc-left">
          <div className="tc-icon-wrap">
            <CreditCard size={20} />
          </div>
          <div className="tc-info">
            <div className="tc-title-row">
              <span className="tc-title">Thrift Credits & Gift Card</span>
              <span className="tc-badge">NEW</span>
            </div>
            <span className="tc-balance">Available balance: ₹0</span>
          </div>
        </div>
        <button className="tc-add-btn">Add Credits</button>
      </div>

      <div className="settings-list-section">
        <h4 className="sl-title">YOUR INFORMATION</h4>
        <div className="sl-group">
          <button className="sl-item">
            <span className="sl-icon">$</span> Your Refunds <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <Heart size={16} className="sl-icon" /> Your Wishlist <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <CreditCard size={16} className="sl-icon" /> E-Gift Cards <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <Headset size={16} className="sl-icon" /> Help & Support <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <span className="sl-icon-pin">📍</span>
            <div className="sl-item-stacked">
              <span>Saved Addresses</span>
              <span className="sl-item-sub">0 addresses</span>
            </div>
            <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <span className="sl-icon">👤</span> Profile <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <span className="sl-icon">🎁</span> Rewards <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <span className="sl-icon">💳</span> Payment Management <ChevronRight className="sl-chevron" size={16} />
          </button>
        </div>
      </div>

      <div className="settings-list-section">
        <h4 className="sl-title">OTHER INFORMATION</h4>
        <div className="sl-group">
          <button className="sl-item">
            <Star size={16} className="sl-icon" /> Suggest Products <ChevronRight className="sl-chevron" size={16} />
          </button>
          <button className="sl-item">
            <span className="sl-icon">🔔</span> Notifications <ChevronRight className="sl-chevron" size={16} />
          </button>
           <button className="sl-item">
            <span className="sl-icon">ⓘ</span> General Info <ChevronRight className="sl-chevron" size={16} />
          </button>
        </div>
      </div>

      <div className="settings-footer">
        <button className="settings-logout-btn">
          <LogOut size={16} style={{transform: 'rotate(180deg)', marginRight: '8px'}} /> Log Out
        </button>
        <p className="app-version">App version 1.0.0 - v1-thrift</p>
      </div>

    </div>
  );
}

// Dummy imports for visual
function Star(props) { return <span {...props}>⭐</span>; }
function LogOut(props) { return <span {...props}>↪</span>; }
