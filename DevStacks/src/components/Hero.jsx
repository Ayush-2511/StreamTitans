import React from 'react';
import { HERO_MOSAIC } from '../data/mockData';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      {/* HERO LEFT */}
      <div className="hero-left">
        <div>
          <div className="hero-live-badge-wrapper">
            <span className="hero-dot-container">
              <span className="hero-dot-ping"></span>
              <span className="hero-dot-solid"></span>
            </span>
            <span className="hero-badge-live">Live Now</span>
            <span className="hero-badge-text">14 Sellers Streaming</span>
          </div>
          
          <h2 className="hero-title">
            SHOP THE<br />
            <span className="hero-title-accent">STREAM.</span>
          </h2>
          
          <p className="hero-desc">
            The next generation of thrift & fashion. Watch live try-ons, interact with real sellers, and claim exclusive one-off pieces instantly.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary-large">
              Explore Live
            </button>
            <button className="btn-secondary-large brutal-border">
              Start Selling
            </button>
          </div>
        </div>
        
        {/* STATS ROW */}
        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="hero-stat-num">24K+</div>
            <div className="hero-stat-label">Active Users</div>
          </div>
          <div className="hero-stat-item-bordered">
            <div className="hero-stat-num">1.2K</div>
            <div className="hero-stat-label">Daily Drops</div>
          </div>
          <div className="hero-stat-item-bordered">
            <div className="hero-stat-num">₹12M+</div>
            <div className="hero-stat-label">Seller Payouts</div>
          </div>
        </div>
      </div>

      {/* HERO RIGHT (2x2 MOSAIC) fixed sizing and overlap */}
      <div className="hero-mosaic">
        {HERO_MOSAIC.map((item, index) => (
          <div key={item.id} className={`mosaic-item ${index % 2 !== 0 ? 'mosaic-item-border-r' : ''} ${index < 2 ? 'mosaic-item-border-b' : ''}`}>
            <div className="mosaic-img-bg" style={{ backgroundImage: `url(${item.img})` }}></div>
            <div className="mosaic-overlay"></div>
            
            {item.isLive && (
              <div className="mosaic-live-tag brutal-border">
                <span className="mosaic-live-dot"></span>
                <span className="mosaic-live-text">Live</span>
              </div>
            )}
            
            <div className="mosaic-content">
              <h4 className="mosaic-title">{item.title}</h4>
              <p className="mosaic-seller">{item.seller}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
