import React from 'react';
import { ECOMMERCE_V2_CATEGORIES } from '../../data/mockData';
import LucideIcon from '../common/LucideIcon';
import './CategorySection.css';

export default function CategorySection() {
  return (
    <section className="ecom-section ecom-categories">
      <div className="section-header">
        <div className="section-subtitle">SHOP BY CATEGORY</div>
        <h2 className="section-title serif-heading">What are you into today?</h2>
      </div>

      <div className="category-grid-v2">
        {ECOMMERCE_V2_CATEGORIES.map(cat => (
          <div key={cat.id} className="cat-card-v2" style={{ backgroundColor: cat.bg }}>
            <div className="cat-icon-v2">
              <LucideIcon name={cat.icon} size={32} />
            </div>
            <h4 className="cat-title-v2">{cat.title}</h4>
            <p className="cat-items-v2">{cat.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
