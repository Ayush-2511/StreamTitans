import React from 'react';
import { THRIFT_LIVE_DROPS_DATA } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import { useStream } from '../../context/StreamContext';
import { useProduct } from '../../context/ProductContext';
import './ThriftLiveDrops.css';

export default function ThriftLiveDrops() {
  const { openStream } = useStream();
  const { openProduct } = useProduct();

  return (
    <section className="thrift-v2-section thrift-dark-section">
      <div className="thrift-v2-header">
        <div className="thrift-v2-subtitle">
          HAPPENING NOW
          <a href="#" className="thrift-right-link">See all 6 <ArrowRight size={14}/></a>
        </div>
        <h2 className="thrift-v2-title serif-heading">Live Drops</h2>
      </div>

      <div className="thrift-drops-grid">
        {THRIFT_LIVE_DROPS_DATA.map(drop => (
          <div 
            key={drop.id} 
            className="thrift-drop-card"
            onClick={() => openStream({
              title: drop.title,
              seller: `@${drop.brand.toLowerCase().replace(' ', '_')}`,
              sellerName: drop.brand,
              viewers: drop.viewers,
              category: 'Thrift Drops'
            })}
            style={{ cursor: 'pointer' }}
          >
            <div className="drop-card-image-area">
              <div className="drop-card-tags">
                <span className="thrift-live-badge"><span className="live-dot inline-white"></span> {drop.badge}</span>
                <span className="thrift-tag-badge">{drop.tag}</span>
              </div>
              
              <div className="drop-product-visual">
                {/* Normally an actual transparent bg image from mock */}
                <img src={drop.img} alt={drop.title} className="drop-product-img"/>
              </div>

              <div className="drop-viewers-count">{drop.viewers}</div>
            </div>

            <div className="drop-card-info">
              <div className="drop-brand">{drop.brand}</div>
              <h3 className="drop-title serif-heading">{drop.title}</h3>
              <p className="drop-details">{drop.details}</p>
              
              <div className="drop-pricing">
                <span className="drop-price">{drop.price}</span>
                <button className="drop-claim-btn" onClick={(e) => {
                  e.stopPropagation();
                  openProduct({
                    title: drop.title,
                    seller: `@${drop.brand.toLowerCase().replace(' ', '_')}`,
                    sellerName: drop.brand,
                    price: drop.price,
                    category: 'Thrift',
                    viewers: drop.viewers,
                    image: drop.img
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
