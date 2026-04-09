import React, { useEffect, useState } from 'react';
import './PromoHero.css';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function PromoHero() {
  const [showEggAnimation, setShowEggAnimation] = useState(false);

  useEffect(() => {
    // A little extra touch: periodic floating reaction animation to simulate 'live commerce' feeling
    const interval = setInterval(() => {
      setShowEggAnimation(true);
      setTimeout(() => setShowEggAnimation(false), 3000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="promo-hero-wrapper">
      <div className="promo-hero-left">
        <div className="promo-hero-content">
          <div className="hero-status-pill">
            <span className="live-dot" style={{backgroundColor: '#FF5B22'}}></span>
            LIVE SHOPPING · 14 STREAMS · 8.4K WATCHING
          </div>
          
          <h1 className="hero-heading serif-heading">
            Watch.<br/>
            <span className="italic-orange">Want.</span><br/>
            Buy.<br/>
            Instantly.
          </h1>

          <p className="hero-desc">
            Lumina is live commerce — real sellers, real products, real time. From handmade food to the latest gadgets, claim it before the stream ends.
          </p>

          <div className="hero-actions">
            <button className="join-btn">Join a Live Stream</button>
            <button className="browse-btn">Browse All <ArrowRight size={16} /></button>
          </div>
          

        </div>
      </div>

      <div className="promo-hero-right">
        {/* Simulating the live stream featured area in right panel */}
        <div className="hero-stream-card">
          <div className="stream-badges">
             <span className="live-badge"><span className="live-dot inline"></span> LIVE</span>
          </div>
          
          <div className="stream-info">
            <h3>Kitchen Gadgets Unboxing</h3>
            <p>@chef_gadgets · Electronics & Home</p>
          </div>

          <div className="stream-viewers">
            1.1K
          </div>

          {showEggAnimation && (
            <div className="floating-reaction">
              <div className="reaction-bubble">🍳</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
