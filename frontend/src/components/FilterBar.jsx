import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import BuyerFilterSidebar from './BuyerFilterSidebar';
import './FilterBar.css';

export default function FilterBar() {
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="filter-bar animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="filter-group">
        <span className="filter-label">Vibe</span>
        <div className="filter-categories">
          {CATEGORIES.map((cat, i) => (
            <button key={cat} className={`filter-btn brutal-border ${i === 0 ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-spacer"></div>
      <div className="filter-actions">
        <button 
          className={`action-btn brutal-border ${isLiveOnly ? 'action-live-active' : ''}`}
          onClick={() => setIsLiveOnly(!isLiveOnly)}
        >
          <div className={`toggle-track ${isLiveOnly ? 'toggle-on' : 'toggle-off'}`}>
            <span className="toggle-thumb"></span>
          </div>
          <span style={{color: isLiveOnly ? 'var(--color-orange)' : 'inherit'}}>LIVE ONLY</span>
        </button>
        <button className="action-btn brutal-border" onClick={() => setIsSidebarOpen(true)}>
          <Filter className="action-icon" /> Filters
        </button>
      </div>

      <BuyerFilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
