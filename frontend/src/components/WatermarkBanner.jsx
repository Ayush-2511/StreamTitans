import React from 'react';
import './WatermarkBanner.css';

export default function WatermarkBanner() {
  return (
    <section className="watermark-banner brutal-border">
      <div className="watermark-left">
        <div className="watermark-text">SS</div>
        <div className="watermark-left-header">
          <span className="watermark-subtitle text-orange">THE ARCHIVE SERIES</span>
          <h2 className="watermark-title">The <span className="text-orange">Rare</span><br/>Pieces You<br/>Need.</h2>
        </div>
      </div>
      <div className="watermark-right">
        <div className="editor-pick-card brutal-border">
          <span className="brutal-badge tag-orange">Editor's Pick</span>
          <h3>Vintage Trench Coat</h3>
          <p>₹4,499 · Size M · 9/10 condition</p>
        </div>
        <div className="watermark-img-container">
          <img 
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" 
            alt="Vintage Trench Coat" 
            className="watermark-main-img" 
          />
        </div>
      </div>
      
      {/* Absolute centered circle button at bottom */}
      <button className="scroll-down-btn brutal-border">
        &darr;
      </button>
    </section>
  );
}
