import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStream } from '../../context/StreamContext';
import { subscribeToProducts } from '../../firebase/firestore';
import './HotRightNow.css';

export default function CuratedPicks() {
  const { openStream } = useStream();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = subscribeToProducts((data) => setProducts(data));
    return () => unsub();
  }, []);

  const displayProducts = products.slice(0, 4);

  return (
    <section className="ecom-section ecom-hot">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: 0, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          <span style={{ color: '#FF5B22', textTransform: 'uppercase' }}>HANDPICKED FOR YOU</span>
          <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>VIEW ALL <ArrowRight size={14}/></a>
        </div>
        <h2 className="section-title serif-heading" style={{ margin: 0, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Curated Picks</h2>
      </div>

      <div className="hot-grid-v2">
        {displayProducts.length === 0 && <p style={{opacity: 0.5}}>No products matching this criteria.</p>}
        {displayProducts.map((item, idx) => {
          const bgColors = ['#e8f0f4', '#f4e8e8', '#f4efe8', '#e8f4ec'];
          const badgeColors = ['#1a1a1a', '#FF5B22', '#3b82f6', '#10b981'];
          const isLive = idx % 2 === 1;
          return (
          <div 
            key={item.id} 
            className="hot-card-v2"
            onClick={() => openStream({
              title: item.title,
              seller: item.sellerName || 'creator',
              sellerName: item.sellerName || 'creator',
              viewers: '1.8K',
              category: item.category || 'Retail'
            })}
            style={{ cursor: 'pointer' }}
          >
            <div className="hot-img-area" style={{ backgroundColor: bgColors[idx % 4] }}>
               <div className="hot-badge" style={{ backgroundColor: badgeColors[idx % 4] }}>
                 {isLive && <span className="live-dot inline-white"></span>}
                 {isLive ? 'LIVE' : 'CHOICE'}
               </div>
               <img src={item.img} alt={item.title} className="hot-product-img"/>
            </div>
            <div className="hot-info-area">
              <div className="hot-seller-status">
                <span className="live-dot" style={{ backgroundColor: badgeColors[idx % 4] }}></span> 
                {'@' + (item.sellerName || 'creator') + (isLive ? ' is streaming' : ' dropped this')}
              </div>
              <div className="hot-category-text">{item.category || 'Apparel'}</div>
              <h4 className="hot-title-text">{item.title}</h4>
              <p className="hot-details-text">{item.price} • {item.stock} left in stock</p>
            </div>
          </div>
        )})}

      </div>
    </section>
  );
}
