import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import './FilterBar.css';

export default function FilterBar() {
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
        <button className="action-btn brutal-border">
          <span className="action-live-dot"></span> Live Only
        </button>
        <button className="action-btn brutal-border">
          <Filter className="action-icon" /> Filters
        </button>
      </div>
    </div>
  );
}
