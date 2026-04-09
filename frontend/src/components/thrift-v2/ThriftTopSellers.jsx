import React from 'react';
import { THRIFT_TOP_SELLERS_DATA } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import './ThriftTopSellers.css';

export default function ThriftTopSellers() {
  return (
    <section className="thrift-v2-section thrift-darker-section">
      <div className="thrift-v2-header">
        <div className="thrift-v2-subtitle">
          MEET THE CURATORS
          <a href="#" className="thrift-right-link">See All <ArrowRight size={14}/></a>
        </div>
        <h2 className="thrift-v2-title serif-heading">Top Thrift Sellers</h2>
      </div>

      <div className="top-sellers-grid">
        {THRIFT_TOP_SELLERS_DATA.map(seller => (
          <div key={seller.id} className="thrift-seller-card">
            
            <div className="seller-avatar-wrapper">
              <div className="seller-avatar">
                {seller.img}
              </div>
            </div>

            <div className="seller-live-indicator">
              <span className="live-dot" style={{backgroundColor: '#FF5B22'}}></span> Live now
            </div>
            
            <h3 className="seller-name">{seller.name}</h3>
            <p className="seller-handle">{seller.handle}</p>
            
            <div className="seller-tags-list">
              {seller.tags.map(tag => (
                <span key={tag} className="seller-tag">{tag}</span>
              ))}
            </div>

            <div className="seller-divider"></div>

            <div className="seller-stats-row">
              <div className="seller-stat-col">
                <span className="stat-val">{seller.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="seller-stat-col">
                <span className="stat-val">{seller.rating}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="seller-stat-col">
                <span className="stat-val">{seller.sold}</span>
                <span className="stat-label">Sold</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
