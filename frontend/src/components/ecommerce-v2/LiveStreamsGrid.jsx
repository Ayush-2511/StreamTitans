import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStream } from '../../context/StreamContext';
import { useProduct } from '../../context/ProductContext';
import { subscribeToLiveStreams } from '../../firebase/firestore';
import './LiveStreamsGrid.css';

export default function LiveStreamsGrid() {
  const { openStream } = useStream();
  const { openProduct } = useProduct();
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const unsub = subscribeToLiveStreams((streams) => {
      setLiveStreams(streams);
    });
    return () => unsub();
  }, []);

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
        {liveStreams.length === 0 && <p style={{opacity: 0.5}}>No livestreams currently available</p>}
        {liveStreams.map((stream, idx) => (
          <div 
            key={stream.id} 
            className={`stream-grid-card bg-pattern-${(idx % 4) + 1}`}
            onClick={() => openStream({
              title: stream.title,
              seller: stream.sellerName || 'lumina_seller',
              sellerName: (stream.sellerName || 'lumina').replace('@', ''),
              viewers: stream.viewers || 0,
              category: stream.category || 'Ecommerce'
            })}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-top">
              <span className="live-status-badge">
                <span className="live-dot inline-white"></span> LIVE
              </span>
            </div>
            
            <div className="card-center">
              <div className="big-icon">🎬</div>
              <span className="viewers-count">{stream.viewers || 0}</span>
            </div>

            <div className="lsg-card-bottom">
              <div className="card-category">{stream.category}</div>
              <h3 className="card-title">{stream.title}</h3>
              <p className="card-seller">{stream.sellerName && !stream.sellerName.startsWith('@') ? '@'+stream.sellerName : stream.sellerName || '@lumina_seller'}</p>
              
              <div className="card-action">
                <span className="card-price">Live</span>
                <button className="claim-btn" onClick={(e) => {
                  e.stopPropagation(); // prevent clicking button from opening stream
                  openStream({
                    title: stream.title,
                    seller: stream.sellerName,
                    sellerName: stream.sellerName || 'lumina_seller',
                    viewers: stream.viewers || 0,
                    category: stream.category || 'Ecommerce'
                  });
                }}>Claim</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
