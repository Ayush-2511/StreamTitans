import React from 'react';
import { ECOMMERCE_V2_LIVE_STREAMS } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import './LiveStreamsGrid.css';

export default function LiveStreamsGrid() {
  return (
    <section className="ecom-section ecom-streams">
      <div className="section-header">
        <div className="section-subtitle">
          HAPPENING NOW
          <a href="#" className="right-aligned-link">See all 14 <ArrowRight size={14}/></a>
        </div>
        <h2 className="section-title serif-heading">Live Streams</h2>
      </div>

      <div className="streams-grid">
        {ECOMMERCE_V2_LIVE_STREAMS.map((stream, idx) => (
          <div key={stream.id} className={`stream-grid-card bg-pattern-${idx}`}>
            <div className="card-top">
              <span className="live-status-badge">
                <span className="live-dot inline-white"></span> LIVE
              </span>
            </div>
            
            <div className="card-center">
              <div className="big-icon">{stream.icon}</div>
              <span className="viewers-count">{stream.viewers}</span>
            </div>

            <div className="card-bottom">
              <div className="card-category">{stream.category}</div>
              <h3 className="card-title">{stream.title}</h3>
              <p className="card-seller">{stream.seller}</p>
              
              <div className="card-action">
                <span className="card-price">{stream.price}</span>
                <button className="claim-btn">Claim</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
