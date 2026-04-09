import React from 'react';
import './PromoHero.css';
import { ArrowRight, Play, User, ArrowDown } from 'lucide-react';

export default function PromoHero() {
  return (
    <section className="promo-hero-wrapper">
      <div className="promo-hero-top-bar">
        <span className="live-dot" style={{backgroundColor: '#FF5B22'}}></span>
        <span className="top-bar-bold">Live shopping</span> <span className="top-bar-divider">·</span> 14 streams <span className="top-bar-divider">·</span> <span className="top-bar-bold">8.4K watching</span> <span className="top-bar-divider">·</span> <span className="top-bar-dim">New stream every ~4 min</span>
      </div>
      
      <div className="promo-hero-split">
        <div className="promo-hero-left">
          <div className="promo-hero-content">
            <h1 className="hero-heading serif-heading">
              Watch.<br/>
              <span className="italic-orange">Want.</span><br/>
              Buy.<br/>
              Instantly.
            </h1>

            <p className="hero-desc">
              Lumina is live commerce — real sellers,<br/>
              real products, real time. From handmade<br/>
              food to the latest gadgets, claim it<br/>
              before the stream ends.
            </p>

            <div className="hero-actions">
              <button className="join-btn">Join a live<br/>stream</button>
              <button className="browse-btn">Browse all<br/> <ArrowRight size={16} style={{marginTop: '4px'}} /></button>
            </div>
          </div>
        </div>

        <div className="promo-hero-right">
          <div className="hero-stream-card">
            <div className="stream-top-bar">
              <span className="live-badge">LIVE</span>
              <span className="stream-viewers">
                <User size={14} style={{marginRight: '6px'}} /> 1.1K watching
              </span>
            </div>
            
            <div className="play-button-center">
              <div className="play-icon-circle">
                <Play fill="#ccc" color="#ccc" size={32} />
              </div>
            </div>

            <div className="stream-bottom-bar">
              <div className="stream-info-container">
                <div className="stream-info">
                  <h3>Kitchen Gadgets Unboxing</h3>
                  <p>@chef_gadgets · Electronics & Home</p>
                </div>
                <div className="stream-arrow-down">
                  <ArrowDown size={18} color="#fff" />
                </div>
              </div>

              <div className="stream-featured-product">
                <span className="featured-tag">Featured now</span>
                <span className="featured-title">Air Fryer Pro 5L</span>
                <span className="featured-price">$49.99</span>
                <button className="claim-now-btn">Claim now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

