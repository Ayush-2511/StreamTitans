import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { LIVE_DECK } from '../data/mockData';
import './PastStreams.css';

export default function PastStreams() {
  return (
    <section className="past-deck animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="past-deck-header">
         <div className="past-deck-title-group">
            <h3 className="past-deck-title">
              <Clock className="past-deck-icon" />
              PAST STREAMS
            </h3>
            <p className="past-deck-subtitle">Catch up on recent drops</p>
         </div>
         <button className="past-deck-see-all">
           See All <ChevronRight className="see-all-icon" />
         </button>
      </div>

      <div className="past-carousel">
         {LIVE_DECK.map((card) => (
            <div 
              key={card.id} 
              className={`past-card brutal-border ${card.variantClass.replace('live-', 'past-')}`}
            >
              <div className="past-card-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80)` }}></div>
              <div className="past-card-overlay"></div>
              
              <div className="past-card-content">
                <div className="past-card-badge">
                  <span className="past-card-dot"></span>
                  Recorded
                </div>
                <h4 className="past-card-title">{card.title}</h4>
                <p className="past-card-seller">{card.seller}</p>
              </div>
            </div>
         ))}
      </div>
    </section>
  );
}
