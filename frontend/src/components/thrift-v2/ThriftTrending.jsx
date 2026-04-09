import React from 'react';
import { THRIFT_TRENDING_WEEK_DATA } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import { useStream } from '../../context/StreamContext';
import { useProduct } from '../../context/ProductContext';
import './ThriftTrending.css';

export default function ThriftTrending() {
  const { openStream } = useStream();
  const { openProduct } = useProduct();

  return (
    <section className="thrift-v2-section thrift-light-section">
      <div className="thrift-v2-header">
        <div className="thrift-v2-subtitle light-theme-subtitle">
          HANDPICKED RARITIES
          <a href="#" className="thrift-right-link">View All <ArrowRight size={14}/></a>
        </div>
        <h2 className="thrift-v2-title serif-heading light-theme-title">Trending This Week</h2>
      </div>

      <div className="thrift-trending-grid">
        {THRIFT_TRENDING_WEEK_DATA.map(item => (
          <div 
            key={item.id} 
            className="thrift-trending-card"
            onClick={() => openStream({
              title: item.title,
              seller: `@${item.seller.replace(' ', '_').toLowerCase()}`,
              sellerName: item.seller,
              viewers: item.viewers || '1.1K',
              category: 'Trending'
            })}
            style={{ cursor: 'pointer' }}
          >
            <div className="trending-img-area">
              <span className="trending-badge" style={{ backgroundColor: item.badgeColor }}>
                {item.badge === 'LIVE' && <span className="live-dot inline-white"></span>}
                {item.badge}
              </span>
              <img src={item.img} alt={item.title} className="trending-product-img"/>
              <span className="trending-rating">{item.rating}</span>
            </div>

            <div className="trending-info-area">
              <div className="trending-seller">
                <span className="live-dot" style={{ backgroundColor: item.badgeColor }}></span>
                {item.seller} <br/> streaming
              </div>

              <div className="trending-brand">{item.brand}</div>
              <h3 className="trending-title serif-heading">{item.title}</h3>
              <p className="trending-details">{item.details}</p>

              <div className="trending-pricing-row">
                <div className="prices">
                  <span className="trending-price">{item.price}</span>
                  {item.originalPrice && <span className="trending-original-price">{item.originalPrice}</span>}
                </div>
                <button className="trending-claim-btn" onClick={(e) => {
                  e.stopPropagation();
                  openProduct({
                    title: item.title,
                    seller: `@${item.seller.replace(' ', '_').toLowerCase()}`,
                    sellerName: item.seller,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    category: 'Trending',
                    viewers: item.viewers || '1.1K',
                    image: item.img
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
