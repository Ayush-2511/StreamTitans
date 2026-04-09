import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, X, Search, Star } from 'lucide-react';
import './BuyerFilterSidebar.css';

export default function BuyerFilterSidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="bf-overlay" onClick={onClose} />
      <div className="bf-sidebar">
        
        {/* Header (optional, but good for closing) */}
        <div className="bf-header">
          <h2 className="bf-title">Filters</h2>
          <button className="bf-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="bf-content">
          
          {/* Active Filters */}
          <div className="bf-section">
            <div className="bf-active-tags">
              <span className="bf-tag">Queen <X size={12} className="bf-tag-icon"/></span>
              <span className="bf-tag">Cotton <X size={12} className="bf-tag-icon"/></span>
              <span className="bf-tag">50% off <X size={12} className="bf-tag-icon"/></span>
            </div>
          </div>

          <div className="bf-divider"></div>

          {/* PRICE */}
          <div className="bf-section">
            <div className="bf-section-header">
              <span className="bf-label">PRICE</span>
              <ChevronUp size={18} color="#aaa" />
            </div>
            <div className="bf-price-labels">
              <span>₹0</span>
              <span>₹3,500</span>
            </div>
            <div className="bf-price-slider-container">
              <div className="bf-slider-track">
                <div className="bf-slider-thumb"></div>
              </div>
            </div>
            <div className="bf-price-inputs">
              <input type="text" value="0" readOnly className="bf-input-box" />
              <span className="bf-price-dash">—</span>
              <input type="text" value="3500" readOnly className="bf-input-box" />
            </div>
          </div>

          <div className="bf-divider"></div>

          {/* SIZE */}
          <div className="bf-section">
            <div className="bf-section-header">
              <span className="bf-label">SIZE</span>
              <ChevronUp size={18} color="#aaa" />
            </div>
            <div className="bf-size-grid">
              <button className="bf-size-btn">Single</button>
              <button className="bf-size-btn">Double</button>
              <button className="bf-size-btn active">Queen</button>
              <button className="bf-size-btn">King</button>
              <button className="bf-size-btn">Full</button>
              <button className="bf-size-btn">Small</button>
            </div>
          </div>

          <div className="bf-divider"></div>

          {/* BRAND */}
          <div className="bf-section">
            <div className="bf-section-header">
              <span className="bf-label">BRAND</span>
              <ChevronUp size={18} color="#aaa" />
            </div>
            <div className="bf-search-box">
              <input type="text" placeholder="Search brand..." className="bf-search-input" />
            </div>
            <div className="bf-brand-list">
              <label className="bf-checkbox-row">
                <div className="bf-checkbox-wrap">
                  <input type="checkbox" />
                  <span className="bf-checkbox-custom"></span>
                </div>
                <span className="bf-brand-name">Solimo</span>
                <span className="bf-brand-count">340</span>
              </label>
              <label className="bf-checkbox-row">
                <div className="bf-checkbox-wrap">
                  <input type="checkbox" />
                  <span className="bf-checkbox-custom"></span>
                </div>
                <span className="bf-brand-name">Umi</span>
                <span className="bf-brand-count">218</span>
              </label>
              <label className="bf-checkbox-row">
                <div className="bf-checkbox-wrap">
                  <input type="checkbox" />
                  <span className="bf-checkbox-custom"></span>
                </div>
                <span className="bf-brand-name">Jaipur Prints</span>
                <span className="bf-brand-count">193</span>
              </label>
              <label className="bf-checkbox-row">
                <div className="bf-checkbox-wrap">
                  <input type="checkbox" />
                  <span className="bf-checkbox-custom"></span>
                </div>
                <span className="bf-brand-name">PUMA</span>
                <span className="bf-brand-count">87</span>
              </label>
              <label className="bf-checkbox-row">
                <div className="bf-checkbox-wrap">
                  <input type="checkbox" />
                  <span className="bf-checkbox-custom"></span>
                </div>
                <span className="bf-brand-name">Wildcraft</span>
                <span className="bf-brand-count">64</span>
              </label>
            </div>
            <button className="bf-more-brands-btn">+ 4,382 more brands</button>
          </div>

          <div className="bf-divider"></div>

          {/* COLOUR */}
          <div className="bf-section">
            <div className="bf-section-header">
              <span className="bf-label">COLOUR</span>
              <ChevronUp size={18} color="#aaa" />
            </div>
            <div className="bf-colour-grid">
              <span className="bf-swatch active" style={{background: '#000'}}></span>
              <span className="bf-swatch" style={{background: '#888'}}></span>
              <span className="bf-swatch" style={{background: '#fff', border: '1px solid #ddd'}}></span>
              <span className="bf-swatch" style={{background: '#8b4513'}}></span>
              <span className="bf-swatch" style={{background: '#bdb76b'}}></span>
              <span className="bf-swatch" style={{background: '#a52a2a'}}></span>
              <span className="bf-swatch" style={{background: '#ffb6c1'}}></span>
              <span className="bf-swatch" style={{background: '#ff8c00'}}></span>
              <span className="bf-swatch" style={{background: '#ffd700'}}></span>
              <span className="bf-swatch" style={{background: '#f5f5dc'}}></span>
              <span className="bf-swatch" style={{background: '#00fa9a'}}></span>
              <span className="bf-swatch" style={{background: '#20b2aa'}}></span>
              <span className="bf-swatch" style={{background: '#0000cd'}}></span>
              <span className="bf-swatch" style={{background: '#8a2be2'}}></span>
              <span className="bf-swatch" style={{background: '#deb887'}}></span>
              <span className="bf-swatch bf-rainbow-swatch"></span>
            </div>
          </div>

          <div className="bf-divider"></div>

          <div className="bf-section">
            <div className="bf-section-header no-margin">
              <span className="bf-label">MATERIAL</span>
              <ChevronDown size={18} color="#aaa" />
            </div>
          </div>

          <div className="bf-divider"></div>

          <div className="bf-section">
            <div className="bf-section-header no-margin">
              <span className="bf-label">PATTERN</span>
              <ChevronDown size={18} color="#aaa" />
            </div>
          </div>

          <div className="bf-divider"></div>

          {/* CUSTOMER RATINGS */}
          <div className="bf-section">
            <div className="bf-section-header">
              <span className="bf-label">CUSTOMER RATINGS</span>
              <ChevronUp size={18} color="#aaa" />
            </div>
            <div className="bf-ratings-list">
              {[4, 3, 2].map((stars) => (
                <div className="bf-rating-row" key={stars}>
                  <div className="bf-stars">
                    {[1,2,3,4,5].map((i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i <= stars ? "#f59e0b" : "transparent"} 
                        color={i <= stars ? "#f59e0b" : "#d1d5db"} 
                      />
                    ))}
                  </div>
                  <span className="bf-rating-text">& above</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bf-divider"></div>

          {/* DISCOUNT */}
          <div className="bf-section">
            <div className="bf-section-header">
              <span className="bf-label">DISCOUNT</span>
              <ChevronUp size={18} color="#aaa" />
            </div>
            <div className="bf-discount-grid">
              <button className="bf-size-btn">10%+</button>
              <button className="bf-size-btn">25%+</button>
              <button className="bf-size-btn active">50%+</button>
              <button className="bf-size-btn">60%+</button>
              <button className="bf-size-btn">70%+</button>
            </div>
          </div>

          <div className="bf-divider"></div>

          <div className="bf-section">
            <div className="bf-section-header no-margin">
              <span className="bf-label">AVAILABILITY</span>
              <ChevronDown size={18} color="#aaa" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bf-footer">
          <button className="bf-btn-secondary" onClick={onClose}>Reset</button>
          <button className="bf-btn-primary" onClick={onClose}>Show results</button>
        </div>
      </div>
    </>,
    document.body
  );
}
