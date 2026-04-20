import React from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { LIVE_DECK } from '../data/mockData';
import './LiveDeck.css';

export default function LiveDeck() {
  return (
    <section className="live-deck animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <div className="live-deck-header">
         <div className="live-deck-title-group">
            <h3 className="live-deck-title">
              <Play className="live-deck-icon" />
              LIVE STREAMS
            </h3>
            <p className="live-deck-subtitle">Ongoing Streams & Try-ons</p>
         </div>
         <button className="live-deck-see-all">
           See All 14 <ChevronRight className="see-all-icon" />
         </button>
      </div>

      <div className="live-carousel">
         {LIVE_DECK.map((card) => (
            <div 
              key={card.id} 
              className={`live-card brutal-border ${card.variantClass}`}
            >
              <div className="live-card-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80)` }}></div>
              <div className="live-card-overlay"></div>
              
              <div className="live-card-content">
                <div className="live-card-badge">
                  <span className="live-card-dot"></span>
                  {card.viewers} Viewers
                </div>
                <h4 className="live-card-title">{card.title}</h4>
                <p className="live-card-seller">{card.seller}</p>
              </div>
            </div>
         ))}
      </div>
    </section>
  );
}
