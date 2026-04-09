import React from 'react';
import { ECOMMERCE_V2_CURATED_PICKS } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import './HotRightNow.css';

export default function CuratedPicks() {
  return (
    <section className="ecom-section ecom-hot">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: 0, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          <span style={{ color: '#FF5B22', textTransform: 'uppercase' }}>HANDPICKED FOR YOU</span>
          <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>VIEW ALL <ArrowRight size={14}/></a>
        </div>
        <h2 className="section-title serif-heading" style={{ margin: 0, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Curated Picks</h2>
      </div>

      <div className="hot-grid-v2">
        {ECOMMERCE_V2_CURATED_PICKS.map(item => (
          <div key={item.id} className="hot-card-v2">
            <div className="hot-img-area" style={{ backgroundColor: item.bg }}>
               <div className="hot-badge" style={{ backgroundColor: item.badgeColor }}>
                 {item.badge === 'LIVE' && <span className="live-dot inline-white"></span>}
                 {item.badge}
               </div>
               <img src={item.img} alt={item.title} className="hot-product-img"/>
            </div>
            <div className="hot-info-area">
              <div className="hot-seller-status">
                <span className="live-dot" style={{ backgroundColor: item.badgeColor }}></span> 
                {item.seller}
              </div>
              <div className="hot-category-text">{item.category}</div>
              <h4 className="hot-title-text">{item.title}</h4>
              <p className="hot-details-text">{item.details}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
