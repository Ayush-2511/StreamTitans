import React from 'react';
import './DealOfTheHour.css';
import { Clock } from 'lucide-react';

export default function DealOfTheHour() {
  return (
    <section className="ecom-section">
      <div className="section-header">
        <div className="section-subtitle">LIMITED TIME</div>
        <h2 className="section-title serif-heading">Deal of the Hour</h2>
      </div>

      <div className="deal-card" style={{ marginBottom: '2rem' }}>
        <div className="deal-left">
          <div className="deal-tags">
            <span className="flash-deal-text">FLASH DEAL</span>
            <span className="deal-timer">
              <Clock size={12} className="inline-icon" /> 00:42:17 LEFT
            </span>
          </div>

          <h3 className="deal-title serif-heading">
            Smart LED<br/>Desk Lamp
          </h3>

          <p className="deal-desc">
            Touch-controlled, USB-C charging, 5 colour temperatures. Claimed by 74 buyers in this stream alone.
          </p>

          <div className="deal-pricing">
            <span className="current-price">₹1,199</span>
            <span className="original-price">₹2,499</span>
            <span className="discount-badge">52%<br/>off</span>
          </div>

          <button className="claim-deal-btn">Claim This Deal</button>
        </div>

        <div className="deal-right">
          <div className="deal-visual">
            <div className="glow-ring glow-ring-1"></div>
            <div className="glow-ring glow-ring-2"></div>
            <div className="deal-product-icon">💡</div>
          </div>
          
          <div className="deal-progress-bar">
            <div className="progress-bg">
              <div className="progress-fill" style={{ width: '73%' }}></div>
            </div>
            <span className="progress-text">73% claimed - 27 left</span>
          </div>
        </div>
      </div>

      <div className="deal-card">
        <div className="deal-left">
          <div className="deal-tags">
            <span className="flash-deal-text" style={{ color: '#2A8139' }}>NEW DROP</span>
            <span className="deal-timer">
              <Clock size={12} className="inline-icon" /> 02:15:00 LEFT
            </span>
          </div>

          <h3 className="deal-title serif-heading">
            Ergonomic<br/>Lounge Chair
          </h3>

          <p className="deal-desc">
            Premium vegan leather, memory foam cushions, perfect for any reading nook. Limited batch production. 
          </p>

          <div className="deal-pricing">
            <span className="current-price">₹8,499</span>
            <span className="original-price">₹12,999</span>
            <span className="discount-badge" style={{ backgroundColor: '#2A8139' }}>35%<br/>off</span>
          </div>

          <button className="claim-deal-btn">Claim This Deal</button>
        </div>

        <div className="deal-right">
          <div className="deal-visual">
            <div className="glow-ring glow-ring-1"></div>
            <div className="glow-ring glow-ring-2"></div>
            <div className="deal-product-icon">🪑</div>
          </div>
          
          <div className="deal-progress-bar">
            <div className="progress-bg">
              <div className="progress-fill" style={{ width: '45%' }}></div>
            </div>
            <span className="progress-text">45% claimed - 12 left</span>
          </div>
        </div>
      </div>
    </section>
  );
}
