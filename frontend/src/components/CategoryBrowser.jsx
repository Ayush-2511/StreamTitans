import React from 'react';
import { ECOMMERCE_CATEGORIES } from '../data/mockData';
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
        <a href="#" className="view-all-link">
          See All Categories <ArrowRight size={16} />
        </a>
      </div>
      
      <div className="category-grid">
        {ECOMMERCE_CATEGORIES.map((cat, idx) => {
          const colors = ['#e6dac3', '#a3b19b', '#b38f8f', '#a9bcd0', '#e3b5a4', '#d4c5e2', '#c5e2d4', '#e2d5c5', '#e2c5df'];
          const bgColor = colors[idx % colors.length];
          
          return (
            <div 
              key={cat.id} 
              className="category-card brutal-border"
              style={{ backgroundColor: bgColor }}
            >
              <div className="category-img-container">
                <img src={cat.img} alt={cat.title} className="category-img" />
              </div>
              <div className="category-info">
                <h3>{cat.title}</h3>
                <p>{cat.items}</p>
              </div>
            </div>
          );
        })}

        <div className="category-card see-all-card brutal-border">
          <div className="see-all-content">
            <ArrowRight size={48} className="see-all-arrow" />
            <h3>See All</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
