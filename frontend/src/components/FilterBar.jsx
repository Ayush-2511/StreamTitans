import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import BuyerFilterSidebar from './BuyerFilterSidebar';
import './FilterBar.css';

export default function FilterBar({ activeCategory, onCategoryChange, isLiveOnly, onLiveOnlyChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="filter-bar animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="filter-group">
        <span className="filter-label">Vibe</span>
        <div className="filter-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn brutal-border ${activeCategory === cat ? 'filter-btn-active' : 'filter-btn-inactive'}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-spacer"></div>
      <div className="filter-actions">
        <button
          className={`action-btn brutal-border live-only-btn ${isLiveOnly ? 'action-live-active' : ''}`}
          onClick={() => onLiveOnlyChange(!isLiveOnly)}
        >
          <span className={`live-only-dot ${isLiveOnly ? 'live-only-dot-on' : 'live-only-dot-off'}`}>
            {isLiveOnly && <span className="live-only-dot-ping"></span>}
          </span>
          <span>LIVE ONLY</span>
        </button>
        <button className="action-btn brutal-border" onClick={() => setIsSidebarOpen(true)}>
          <Filter className="action-icon" /> Filters
        </button>
      </div>

      <BuyerFilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
