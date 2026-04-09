import React from 'react';
import { THRIFT_SHOP_EDIT_DATA } from '../data/mockData';
import { ArrowRight } from 'lucide-react';
import './CategoryBrowser.css';

export default function CategoryBrowser() {
  return (
    <section className="category-browser-section">
      <div className="section-header">
        <div>
          <span className="section-subtitle">BROWSE BY VIBE</span>
          <h2 className="section-title">Shop the Edit</h2>
        </div>
        <a href="#" className="view-all-link" style={{color: '#FF5B22', fontWeight: 500}}>
          See All <ArrowRight size={16} />
        </a>
      </div>
      
      <div className="vibe-grid">
        {THRIFT_SHOP_EDIT_DATA.map((cat) => (
          <div key={cat.id} className="vibe-card" style={{ backgroundColor: cat.bg }}>
            {cat.badge && (
              <span className="vibe-badge" style={{ backgroundColor: cat.badgeColor }}>
                {cat.badge}
              </span>
            )}
            <div className="vibe-img-container">
              <img src={cat.img} alt={cat.title} className="vibe-img" />
            </div>
            <div className="vibe-info">
              <h3>{cat.title}</h3>
              <p>{cat.items}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
