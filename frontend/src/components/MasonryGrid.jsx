import React from 'react';
import './MasonryGrid.css';

export default function MasonryGrid() {
  return (
    <section className="masonry-section animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="masonry-header">
         <h3 className="masonry-title">Trending Items</h3>
         <span className="masonry-subtitle">Asymmetric Grid</span>
      </div>

      <div className="masonry-grid">
        
        <div className="masonry-card brutal-border">
          <div className="masonry-img-1" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550614000-4b95dd2cb888?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <div className="masonry-badge masonry-badge-orange">Editor's Pick</div>
               <h4 className="masonry-item-title">Vintage Denim Jacket</h4>
               <p className="masonry-item-desc">Size L • Gently Used</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price">₹1,899</span>
               <button className="masonry-btn masonry-btn-dark">View</button>
             </div>
          </div>
        </div>

        <div className="masonry-card-double brutal-border">
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
               <button className="masonry-btn-wide brutal-border">Shop</button>
             </div>
          </div>
        </div>

        <div className="masonry-card brutal-border">
          <div className="masonry-img-2" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529139574466-a303027c028b?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <h4 className="masonry-item-title">Canvas Tote Bag</h4>
               <p className="masonry-item-desc">One Size • Brand New</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price">₹699</span>
               <button className="masonry-btn masonry-btn-light">Add</button>
             </div>
          </div>
        </div>
        
         <div className="masonry-card brutal-border">
          <div className="masonry-img-3" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <div className="masonry-badge masonry-badge-ink">Rare</div>
               <h4 className="masonry-item-title">Chunky Silver Rings</h4>
               <p className="masonry-item-desc">Set of 3 • Sterling Assorted</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price">₹1,299</span>
               <button className="masonry-btn masonry-btn-dark">Claim</button>
             </div>
          </div>
        </div>

         <div className="masonry-card masonry-card-highlight brutal-border">
          <div className="masonry-img-highlight" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80)' }}></div>
          <div className="masonry-content">
             <div>
               <h4 className="masonry-item-title masonry-item-title-highlight">Retro Sneakers</h4>
               <p className="masonry-item-desc-highlight">Size UK 9 • 8/10 Condition</p>
             </div>
             <div className="masonry-footer">
               <span className="masonry-price masonry-price-highlight">₹3,400</span>
               <button className="masonry-btn masonry-btn-orange">Buy Now</button>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
