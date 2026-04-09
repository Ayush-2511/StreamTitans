import React from 'react';
import { useStream } from '../context/StreamContext';
import { useProduct } from '../context/ProductContext';
import './MasonryGrid.css';

export default function MasonryGrid() {
  const { openStream } = useStream();
  const { openProduct } = useProduct();

  const handleCardClick = (title) => {
    openStream({
      title: title,
      seller: '@masonry_seller',
      sellerName: 'Curator',
      viewers: '2.4K',
      category: 'Trend'
    });
  };

  const handleBuyClick = (e, title, price, img) => {
    e.stopPropagation();
    openProduct({
      title: title,
      seller: '@masonry_seller',
      sellerName: 'Curator',
      price: price,
      category: 'Trend',
      viewers: '2.4K',
      image: img || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    });
  };

  return (
    <section className="masonry-section animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="masonry-header">
         <h3 className="masonry-title">Trending Items</h3>
         <span className="masonry-subtitle">Asymmetric Grid</span>
      </div>

      <div className="masonry-grid">
        
        <div className="masonry-card brutal-border" onClick={() => handleCardClick('Vintage Denim Jacket')} style={{ cursor: 'pointer' }}>
          <div className="masonry-img-1" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550614000-4b95dd2cb888?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <div className="masonry-badge masonry-badge-orange">Editor's Pick</div>
               <h4 className="masonry-item-title">Vintage Denim Jacket</h4>
               <p className="masonry-item-desc">Size L • Gently Used</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price">₹1,899</span>
               <button className="masonry-btn masonry-btn-dark" onClick={(e) => handleBuyClick(e, 'Vintage Denim Jacket', '₹1,899', 'https://images.unsplash.com/photo-1550614000-4b95dd2cb888?w=500&q=80')}>View</button>
             </div>
          </div>
        </div>

        <div className="masonry-card-double brutal-border" onClick={() => handleCardClick('The Archive Collection')} style={{ cursor: 'pointer' }}>
          <div className="masonry-img-wide" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80)' }}></div>
          <div className="masonry-content-wide">
             <div>
               <h4 className="masonry-wide-title">The Archive Collection</h4>
               <p className="masonry-wide-desc">
                 A curated selection of rare 90s streetwear pieces, authenticated and ready to ship.
               </p>
             </div>
             <div className="masonry-footer-wide">
               <span className="masonry-price-wide">From ₹4,999</span>
               <button className="masonry-btn-wide brutal-border" onClick={(e) => handleBuyClick(e, 'The Archive Collection', '₹4,999', 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80')}>Shop</button>
             </div>
          </div>
        </div>

        <div className="masonry-card brutal-border" onClick={() => handleCardClick('Canvas Tote Bag')} style={{ cursor: 'pointer' }}>
          <div className="masonry-img-2" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529139574466-a303027c028b?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <h4 className="masonry-item-title">Canvas Tote Bag</h4>
               <p className="masonry-item-desc">One Size • Brand New</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price">₹699</span>
               <button className="masonry-btn masonry-btn-light" onClick={(e) => handleBuyClick(e, 'Canvas Tote Bag', '₹699', 'https://images.unsplash.com/photo-1529139574466-a303027c028b?w=500&q=80')}>Add</button>
             </div>
          </div>
        </div>
        
         <div className="masonry-card brutal-border" onClick={() => handleCardClick('Chunky Silver Rings')} style={{ cursor: 'pointer' }}>
          <div className="masonry-img-3" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <div className="masonry-badge masonry-badge-ink">Rare</div>
               <h4 className="masonry-item-title">Chunky Silver Rings</h4>
               <p className="masonry-item-desc">Set of 3 • Sterling Assorted</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price">₹1,299</span>
               <button className="masonry-btn masonry-btn-dark" onClick={(e) => handleBuyClick(e, 'Chunky Silver Rings', '₹1,299', 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80')}>Claim</button>
             </div>
          </div>
        </div>

         <div className="masonry-card masonry-card-highlight brutal-border" onClick={() => handleCardClick('Retro Sneakers')} style={{ cursor: 'pointer' }}>
          <div className="masonry-img-highlight" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <h4 className="masonry-item-title masonry-item-title-highlight">Retro Sneakers</h4>
               <p className="masonry-item-desc-highlight">Size UK 9 • 8/10 Condition</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price masonry-price-highlight">₹3,400</span>
               <button className="masonry-btn masonry-btn-orange" onClick={(e) => handleBuyClick(e, 'Retro Sneakers', '₹3,400', 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80')}>Buy Now</button>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
