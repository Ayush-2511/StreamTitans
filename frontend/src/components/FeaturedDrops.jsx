import React from 'react';
import { FEATURED_DROPS } from '../data/mockData';
import { ArrowRight } from 'lucide-react';
import './FeaturedDrops.css';

export default function FeaturedDrops() {
  return (
    <section className="featured-drops-section">
      <div className="section-header featured-header">
        <div>
          <span className="section-subtitle">HAND-PICKED FOR YOU</span>
          <h2 className="section-title">Featured Drops</h2>
        </div>
        <a href="#" className="view-all-link">
          View All <ArrowRight size={16} />
        </a>
      </div>

      <div className="drops-grid">
        {FEATURED_DROPS.map((drop, idx) => {
          // Dark/Olive thematic backgrounds from screenshots
          const bgColors = ['#3e3523', '#253545', '#382531'];
          const bgColor = bgColors[idx % bgColors.length];

          return (
            <div key={drop.id} className="drop-card brutal-border">
              <div 
                className="drop-img-area brutal-border-bottom"
                style={{ backgroundColor: bgColor }}
              >
                <img src={drop.img} alt={drop.title} className="drop-main-img" />
              </div>
              <div className="drop-details">
                <span className="drop-brand">{drop.brand}</span>
                <h3 className="drop-title">{drop.title}</h3>
                <p className="drop-specs">{drop.size} · {drop.condition}</p>
                <div className="drop-footer">
                  <span className="drop-price">{drop.price}</span>
                  <button className="drop-claim-btn brutal-border">Claim</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
