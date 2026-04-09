import React from 'react';
import { ShoppingBag, Camera } from 'lucide-react';
import './LandingPersona.css';

export default function LandingPersona({ onShopperClick, onCreatorClick, isHidden }) {
  const handleCreatorAction = (e) => {
    e.stopPropagation();
    if (onCreatorClick) {
      onCreatorClick();
    } else {
      alert('Creator flow not mapped yet.');
    }
  };

  const handleShopperAction = (e) => {
    e.stopPropagation();
    if (onShopperClick) {
      onShopperClick();
    }
  };

  return (
    <div className={`auth-step-2 ${isHidden ? 'hidden-step' : 'visible-step'}`}>
      
      {/* SHOPPER BLOCK (Left) */}
      <div className="persona-block shopper brutal-border" onClick={handleShopperAction}>
        <div className="persona-bg-img" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80)` }}></div>
        <div className="persona-overlay"></div>

        <div className="persona-content">
          <div className="persona-icon-container brutal-border">
            <ShoppingBag className="persona-icon" strokeWidth={1.5} />
          </div>
          <h2 className="persona-title">SHOPPER</h2>
          <p className="persona-desc">
            Access archives, participate in live drops.
          </p>
          <button className="persona-btn brutal-border" onClick={handleShopperAction}>
            Enter Gallery
          </button>
        </div>
      </div>

      {/* CREATOR BLOCK (Right) */}
      <div className="persona-block creator brutal-border" onClick={handleCreatorAction}>
        <div className="persona-bg-img" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&q=80)` }}></div>
        <div className="persona-overlay"></div>

        <div className="persona-content">
          <div className="persona-icon-container brutal-border">
            <Camera className="persona-icon" strokeWidth={1.5} />
          </div>
          <h2 className="persona-title">CREATOR</h2>
          <p className="persona-desc">
            Launch studio, manage archives, go live.
          </p>
          <button className="persona-btn brutal-border" onClick={handleCreatorAction}>
            Open Studio
          </button>
        </div>
      </div>
    </div>
  );
}
