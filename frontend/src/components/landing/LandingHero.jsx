import React from 'react';
import { ChevronDown } from 'lucide-react';
import './LandingHero.css';

const LOCAL_IMAGES = [
  "accessories.jpg", "bags-and-luxury.jpg", "box-logo-hoodie.jpg", "canvas-tote-bag.jpg",
  "cloth-jacket.jpg", "curated-90s-streetwear.jpg", "early-2000s-finds.jpg", "gorpcore-basics.jpg",
  "homemade-preserve-set.jpg", "mechanical-keyboard.jpg", "menswear.jpg", "mini-bag.jpg",
  "minimalist-desk-lamp.jpg", "nylon-mini-bag.jpg", "oversized-leather-jacket.jpg", "retro-gaming-consoles.jpg",
  "sherpa-trucker-jacket.jpg", "shoes.jpg", "silk-scarf.jpg", "silver-chain.jpg",
  "smart-air-fryer-xl.jpg", "upcycled-denim.jpg", "vintage-band-tees.jpg", "vintage-cap.jpg",
  "vintage-denim-jacket.jpg", "wireless-earbuds-pro.jpg", "desklamp.jpg", "ergonomic-chair.jpg"
].map(name => `/assets/products/${name}`);

const MOCK_IMAGES = LOCAL_IMAGES;

// Helper to create massive perfect loops. 
// 20 items per half = 40 items per column.
const createPerfectLoop = (startIndex) => {
  const base = [];
  for (let i = 0; i < 20; i++) {
    // Distribute empty placeholder cards among the images to reduce repetition.
    // Every ~3rd or ~4th item becomes a placeholder.
    const isPlaceholder = (startIndex + i) % 3 === 0;
    
    if (isPlaceholder) {
      base.push(null);
    } else {
      base.push(MOCK_IMAGES[(startIndex + i) % MOCK_IMAGES.length]);
    }
  }
  return [...base, ...base];
};

const COL_1 = createPerfectLoop(0);
const COL_2 = createPerfectLoop(2);
const COL_3 = createPerfectLoop(4);
const COL_4 = createPerfectLoop(1);

const Placeholder = ({ aspectClass }) => (
  <div className={`lh-placeholder ${aspectClass}`}>
    <div className="lh-placeholder-pattern"></div>
    <div className="lh-placeholder-circle">
      <div className="lh-placeholder-dot"></div>
    </div>
  </div>
);

export default function LandingHero({ onNext }) {
  return (
    <div className="landing-hero">
      
      {/* Tilted Infinite Marquee Grid */}
      <div className="lh-marquee-container">
        
        <div className="lh-marquee-grid">
          
          {/* Column 1 (Scrolls Up) */}
          <div className="lh-marquee-col animate-marquee-up" style={{ animationDuration: '70s' }}>
            {COL_1.map((img, i) => (
              img 
                ? <div key={i} className="lh-img aspect-3-4" style={{ backgroundImage: `url(${img})` }}></div>
                : <Placeholder key={i} aspectClass="aspect-3-4" />
            ))}
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="lh-marquee-col animate-marquee-down" style={{ animationDuration: '80s' }}>
            {COL_2.map((img, i) => (
              img
                ? <div key={i} className="lh-img aspect-1-1" style={{ backgroundImage: `url(${img})` }}></div>
                : <Placeholder key={i} aspectClass="aspect-1-1" />
            ))}
          </div>

          {/* Column 3 (Scrolls Up) */}
          <div className="lh-marquee-col animate-marquee-up" style={{ animationDuration: '75s' }}>
            {COL_3.map((img, i) => (
              img
                ? <div key={i} className="lh-img aspect-4-5" style={{ backgroundImage: `url(${img})` }}></div>
                : <Placeholder key={i} aspectClass="aspect-4-5" />
            ))}
          </div>

          {/* Column 4 (Scrolls Down) */}
          <div className="lh-marquee-col animate-marquee-down" style={{ animationDuration: '90s' }}>
            {COL_4.map((img, i) => (
              img
                ? <div key={i} className="lh-img aspect-3-4" style={{ backgroundImage: `url(${img})` }}></div>
                : <Placeholder key={i} aspectClass="aspect-3-4" />
            ))}
          </div>

        </div>
      </div>

      <div className="lh-fade-top"></div>
      <div className="lh-fade-bottom"></div>

      <div className="lh-center-content">
        <h1 className="lh-title">LUMINA</h1>
        <p className="lh-subtitle">
          Digital Studio Experience
        </p>
      </div>

      {/* Downward Navigation Arrow */}
      <button 
        onClick={onNext}
        className="lh-nav-btn"
      >
        <ChevronDown className="lh-chevron-icon" />
      </button>

    </div>
  );
}
