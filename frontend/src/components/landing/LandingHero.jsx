import React from 'react';
import { ChevronDown } from 'lucide-react';
import './LandingHero.css';

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c028b?w=600&q=80",
  "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&q=80",
  "https://images.unsplash.com/photo-1550614000-4b95dd2cb888?w=600&q=80",
  "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80",
  "https://images.unsplash.com/photo-1434389678232-0675a580a6c6?w=600&q=80",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"
];

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
