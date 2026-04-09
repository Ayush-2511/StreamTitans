import React from 'react';
import { ECOMMERCE_V2_TRENDING } from '../../data/mockData';
import { ChevronRight } from 'lucide-react';
import LucideIcon from '../common/LucideIcon';
import './TrendingBar.css';

export default function TrendingBar() {
  return (
    <div className="trending-bar-container">
      <div className="trending-label">TRENDING</div>
      <div className="trending-scroll">
        {ECOMMERCE_V2_TRENDING.map(item => (
          <button key={item.id} className="pill-btn">
            <LucideIcon name={item.icon} size={14} style={{ marginRight: '6px' }} /> {item.label}
          </button>
        ))}
        <button className="pill-btn icon-only-btn">
          <ChevronRight size={18} color="#888" />
        </button>
      </div>
    </div>
  );
}
