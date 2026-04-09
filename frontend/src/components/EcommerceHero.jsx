import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './EcommerceHero.css';

export default function EcommerceHero() {
  return (
    <section className="ecommerce-hero">
      <div className="ecommerce-hero-left brutal-border">
        <p className="ecommerce-hero-subtitle">SPRING / SUMMER 2026 EDIT</p>
        <h1 className="ecommerce-hero-title">
          Wear <br/>
          <span className="text-orange">Stories,</span><br/>
          Not Just Clothes.
        </h1>
        <p className="ecommerce-hero-desc">
          Every piece on Lumina has lived a life. Authenticated, curated, and ready for its next chapter — with you.
        </p>
        <div className="ecommerce-hero-actions">
          <button className="brutal-btn-primary">Enter Live</button>
          <a href="#" className="ecommerce-hero-link">View Lookbook &rarr;</a>
        </div>
      </div>
      
      <div className="ecommerce-hero-right brutal-border">
        <div className="hero-product-col" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80')" }}>
          <div className="hero-product-card brutal-border">
            <span className="brutal-badge">
              <span className="hero-live-dot"></span>
              Rare Find
            </span>
            <h3>90s Denim</h3>
            <p>₹1,899</p>
          </div>
        </div>
        <div className="hero-product-col" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588626639556-9ceca62a8ed7?w=800&q=80')" }}>
          <div className="hero-product-card brutal-border">
            <span className="brutal-badge">
              <span className="hero-live-dot"></span>
              Luxury
            </span>
            <h3>Silk Scarf</h3>
            <p>₹2,299</p>
          </div>
        </div>
      </div>
    </section>
  );
}
