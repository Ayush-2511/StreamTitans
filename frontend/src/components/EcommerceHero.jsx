import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './EcommerceHero.css';

export default function EcommerceHero() {
  return (
    <section className="ecommerce-hero">
      <div className="ecommerce-hero-left new-thrift-hero brutal-border">
        <div className="thrift-hero-watermark">01</div>
        <div className="thrift-hero-badge">
          <span className="live-dot" style={{backgroundColor: '#FF5B22'}}></span>
          LIVE THRIFT · 6 STREAMS · 3.2K WATCHING
        </div>
        <h1 className="ecommerce-hero-title serif-heading thrift-heading">
          Pre-<br/>loved.<br/>
          <span className="text-orange" style={{fontStyle: 'italic'}}>Not</span><br/>
          Pre-<br/>boring.
        </h1>
        <p className="ecommerce-hero-desc thrift-desc">
          Every piece has a past. Watch sellers unbox, try on, and authenticate rare vintage finds live — and claim them before someone else does.
        </p>
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
