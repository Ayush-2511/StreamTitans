import React, { useMemo } from 'react';
import { useStream } from '../context/StreamContext';
import { useProduct } from '../context/ProductContext';
import './MasonryGrid.css';

const MASONRY_ITEMS = [
  { id: 1, title: 'Vintage Denim Jacket', desc: 'Size L • Gently Used', price: '₹1,899', badge: "Editor's Pick", badgeClass: 'masonry-badge-orange', imgClass: 'masonry-img-1', btnClass: 'masonry-btn-dark', btnLabel: 'View', img: 'https://images.unsplash.com/photo-1550614000-4b95dd2cb888?w=500&q=80', category: 'CASUAL' },
  { id: 2, title: 'The Archive Collection', desc: 'A curated selection of rare 90s streetwear pieces, authenticated and ready to ship.', price: 'From ₹4,999', badge: null, imgClass: 'masonry-img-wide', btnClass: 'masonry-btn-wide brutal-border', btnLabel: 'Shop', img: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80', category: 'STREETWEAR', wide: true },
  { id: 3, title: 'Canvas Tote Bag', desc: 'One Size • Brand New', price: '₹699', badge: null, imgClass: 'masonry-img-2', btnClass: 'masonry-btn-light', btnLabel: 'Add', img: 'https://images.unsplash.com/photo-1529139574466-a303027c028b?w=500&q=80', category: 'ACCESSORIES' },
  { id: 4, title: 'Chunky Silver Rings', desc: 'Set of 3 • Sterling Assorted', price: '₹1,299', badge: 'Rare', badgeClass: 'masonry-badge-ink', imgClass: 'masonry-img-3', btnClass: 'masonry-btn-dark', btnLabel: 'Claim', img: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80', category: 'ACCESSORIES' },
  { id: 5, title: 'Retro Sneakers', desc: 'Size UK 9 • 8/10 Condition', price: '₹3,400', badge: null, imgClass: 'masonry-img-highlight', btnClass: 'masonry-btn-orange', btnLabel: 'Buy Now', img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80', category: 'STREETWEAR', highlight: true },
];

export default function MasonryGrid({ activeCategory = 'ALL' }) {
  const { openStream } = useStream();
  const { openProduct } = useProduct();

  const filteredItems = useMemo(() =>
    activeCategory === 'ALL'
      ? MASONRY_ITEMS
      : MASONRY_ITEMS.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const handleCardClick = (title) => {
    openStream({ title, seller: '@masonry_seller', sellerName: 'Curator', viewers: '2.4K', category: 'Trend' });
  };

  const handleBuyClick = (e, item) => {
    e.stopPropagation();
    openProduct({ title: item.title, seller: '@masonry_seller', sellerName: 'Curator', price: item.price, category: 'Trend', viewers: '2.4K', image: item.img });
  };

  if (filteredItems.length === 0) {
    return (
      <section className="masonry-section animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <div className="masonry-header">
          <h3 className="masonry-title">Trending Items</h3>
          <span className="masonry-subtitle">Asymmetric Grid</span>
        </div>
        <p style={{ color: 'var(--text-secondary, #888)', padding: '1rem 0', fontSize: '0.9rem' }}>No trending items in this category right now.</p>
      </section>
    );
  }

  return (
    <section className="masonry-section animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="masonry-header">
         <h3 className="masonry-title">Trending Items</h3>
         <span className="masonry-subtitle">Asymmetric Grid</span>
      </div>

      <div className="masonry-grid">
        {filteredItems.map(item => {
          if (item.wide) {
            return (
              <div key={item.id} className="masonry-card-double brutal-border" onClick={() => handleCardClick(item.title)} style={{ cursor: 'pointer' }}>
                <div className={item.imgClass} style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="masonry-content-wide">
                   <div>
                     <h4 className="masonry-wide-title">{item.title}</h4>
                     <p className="masonry-wide-desc">{item.desc}</p>
                   </div>
                   <div className="masonry-footer-wide">
                     <span className="masonry-price-wide">{item.price}</span>
                     <button className={item.btnClass} onClick={(e) => handleBuyClick(e, item)}>{item.btnLabel}</button>
                   </div>
                </div>
              </div>
            );
          }
          return (
            <div key={item.id} className={`masonry-card ${item.highlight ? 'masonry-card-highlight' : ''} brutal-border`} onClick={() => handleCardClick(item.title)} style={{ cursor: 'pointer' }}>
              <div className={item.imgClass} style={{ backgroundImage: `url(${item.img})` }}></div>
              <div className="masonry-content">
                 <div>
                   {item.badge && <div className={`masonry-badge ${item.badgeClass}`}>{item.badge}</div>}
                   <h4 className={`masonry-item-title ${item.highlight ? 'masonry-item-title-highlight' : ''}`}>{item.title}</h4>
                   <p className={item.highlight ? 'masonry-item-desc-highlight' : 'masonry-item-desc'}>{item.desc}</p>
                 </div>
                 <div className="masonry-footer">
                   <span className={`masonry-price ${item.highlight ? 'masonry-price-highlight' : ''}`}>{item.price}</span>
                   <button className={`masonry-btn ${item.btnClass}`} onClick={(e) => handleBuyClick(e, item)}>{item.btnLabel}</button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
