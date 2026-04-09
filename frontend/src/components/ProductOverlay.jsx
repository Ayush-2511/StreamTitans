import React, { useState } from 'react';
import { X, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { useStream } from '../context/StreamContext';
import { useAuth } from '../context/AuthContext';
import { buyRegularProduct, claimThriftProduct } from '../firebase/firestore';
import toast from 'react-hot-toast';
import './ProductOverlay.css';

export default function ProductOverlay() {
  const { productData, closeProduct } = useProduct();
  const { openStream } = useStream();
  const { currentUser } = useAuth();
  
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Option A');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!productData) return null;

  const handleBuy = async () => {
    if (!currentUser) {
      toast.error("Please login to complete your purchase.");
      return;
    }
    if (!productData.id) {
      // If it's mock data or missing Firestore ID, we simulate success
      toast.success("Item successfully purchased! (Demo mode)");
      closeProduct();
      return;
    }

    try {
      setIsProcessing(true);
      if (productData.type === 'thrift') {
         await claimThriftProduct(productData.id, currentUser.userId);
         toast.success("Item successfully claimed! It's yours.");
      } else {
         await buyRegularProduct(productData.id, currentUser.userId, qty);
         toast.success("Item successfully purchased!");
      }
      closeProduct();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWatchLive = () => {
    closeProduct();
    openStream({
      title: productData.title,
      seller: productData.seller,
      sellerName: productData.sellerName,
      viewers: productData.viewers || '1.2K',
      category: productData.category
    });
  };

  return (
    <div className="pdp-overlay-container">
      <div className="pdp-overlay-backdrop" onClick={closeProduct}></div>
      
      <div className="pdp-modal">
        <button className="pdp-close-btn" onClick={closeProduct}>
          <X size={24} />
        </button>

        <div className="pdp-content-scroll">
          <div className="pdp-main-grid">
            
            {/* Left Column: Images */}
            <div className="pdp-image-section">
              <div className="pdp-thumbnails">
                <div className="pdp-thumb active"></div>
                <div className="pdp-thumb"></div>
                <div className="pdp-thumb"></div>
                <div className="pdp-thumb"></div>
              </div>
              <div className="pdp-main-image-container">
                <img src={productData.image} alt={productData.title} className="pdp-main-img" />
                
                {/* As Seen On Stream Widget */}
                <div className="pdp-stream-widget" onClick={handleWatchLive}>
                  <div className="stream-widget-header">
                    <span className="stream-widget-tag">AS SEEN ON STREAM</span>
                  </div>
                  <div className="stream-widget-bottom">
                    <div className="stream-widget-info">
                      <p className="stream-widget-seller">{productData.seller} is live right now</p>
                      <p className="stream-widget-viewers">
                        <span className="live-dot-small" style={{backgroundColor: '#FF5B22'}}></span>
                        {productData.viewers} people watching · Answering questions
                      </p>
                    </div>
                    <button className="stream-widget-join-btn">Join Stream</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="pdp-details-section">
              <div className="pdp-breadcrumbs">
                Home / Thrift / {productData.category} / <span style={{color: '#000'}}>{productData.title.split('—')[0]}</span>
              </div>

              <div className="pdp-category-label">
                {productData.category} · {productData.subcategory}
              </div>

              <h1 className="pdp-title serif-heading">{productData.title}</h1>
              <p className="pdp-description">
                Short product description line. Key material, key feature, key detail.
              </p>

              <div className="pdp-ratings-row">
                <div className="pdp-stars">
                  <Star fill="#FF5B22" color="#FF5B22" size={16} />
                  <Star fill="#FF5B22" color="#FF5B22" size={16} />
                  <Star fill="#FF5B22" color="#FF5B22" size={16} />
                  <Star fill="#FF5B22" color="#FF5B22" size={16} />
                  <Star color="#ccc" size={16} />
                  <span className="pdp-rating-num">4.2</span>
                </div>
                <span className="pdp-ratings-count">186 ratings</span>
                <span className="pdp-sales-badge">100+ this month</span>
              </div>

              <div className="pdp-pricing-section">
                <div className="pdp-price">
                  <span className="pdp-current-price">{productData.price}</span>
                  {productData.originalPrice && <span className="pdp-original-price">{productData.originalPrice}</span>}
                  <span className="pdp-discount-badge">XX% OFF</span>
                </div>
                <p className="pdp-tax-note">Inclusive of all taxes</p>
                
                <div className="pdp-promo-box">
                  <div className="promo-text">Extra savings with code</div>
                  <div className="promo-code">LUMINA200</div>
                  <div className="promo-note">— applied at checkout</div>
                </div>
              </div>

              <div className="pdp-variants-section">
                <h4 className="pdp-section-title">SELECT VARIANT</h4>
                <div className="pdp-variants-grid">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map(opt => (
                    <button 
                      key={opt}
                      className={`pdp-variant-btn ${selectedVariant === opt ? 'selected' : ''}`}
                      onClick={() => setSelectedVariant(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pdp-qty-section">
                <span className="pdp-qty-label">QTY</span>
                <div className="pdp-qty-controls">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              <div className="pdp-actions">
                <button className="pdp-buy-btn" onClick={handleBuy} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : (productData.type === 'thrift' ? `Claim Now — ${productData.price}` : `Buy Now — ${productData.price}`)}
                </button>
                <button className="pdp-wishlist-btn">
                  <Heart size={20} />
                </button>
              </div>

              <div className="pdp-perks">
                <span className="perk-badge">✓ Lumina Verified</span>
                <span className="perk-badge">↔ 7-day returns</span>
                <span className="perk-badge">↑ Free shipping ₹999+</span>
                <span className="perk-badge">₹ Pay on delivery</span>
              </div>

              <div className="pdp-delivery-section">
                <h4 className="pdp-section-title">CHECK DELIVERY</h4>
                <div className="pdp-pincode-input">
                  <input type="text" placeholder="Enter pincode" />
                  <button>Check</button>
                </div>
                <ul className="pdp-delivery-notes">
                  <li><span className="bullet-dot"></span>Ships within 24 hours of stream ending</li>
                  <li><span className="bullet-dot"></span>Express delivery available in select cities</li>
                  <li><span className="bullet-dot"></span>Secure packaging, fully insured</li>
                </ul>
              </div>

              <div className="pdp-seller-card">
                <div className="seller-card-avatar">
                   {productData.sellerName ? productData.sellerName.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="seller-card-info">
                  <h4 className="seller-card-name">{productData.sellerName}</h4>
                  <p className="seller-card-stats">98% positive · 1.4K sold</p>
                  <p className="seller-card-live-status">
                    <span className="live-status-dot"></span>
                    Live now · {productData.viewers} watching
                  </p>
                </div>
                <button className="seller-follow-btn">+ Follow</button>
              </div>

            </div>
          </div>

          <div className="pdp-divider"></div>

          {/* Bottom Stream Banner */}
          <div className="pdp-bottom-stream-banner">
            <div className="banner-content">
              <span className="banner-dot"></span>
              <div>
                <h3 className="banner-title">Seller is streaming this product right now</h3>
                <p className="banner-subtitle">Ask questions, see it live, and unlock stream-only pricing</p>
              </div>
            </div>
            <button className="banner-watch-btn" onClick={handleWatchLive}>Watch Live →</button>
          </div>

          {/* Recommended Streams */}
          <div className="pdp-recommendations">
            <div className="rec-header">
              <div>
                <div className="rec-subtitle">YOU MAY ALSO LIKE</div>
                <h2 className="rec-title serif-heading">Live streams you'd enjoy</h2>
              </div>
              <a href="#" className="rec-see-all">See all →</a>
            </div>

            <div className="rec-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rec-card" onClick={handleWatchLive}>
                   <div className="rec-card-top">
                     <span className="rec-live-badge"><span className="live-dot-inline"></span> LIVE</span>
                     <span className="rec-viewers-badge">{Math.floor(Math.random() * 500) + 50} watching</span>
                   </div>
                   <div className="rec-card-seller-bar">
                     <div className="rec-seller-avatar" style={{backgroundColor: `hsl(${i * 60}, 70%, 50%)`}}>
                        {String.fromCharCode(64 + i)}
                     </div>
                     <div className="rec-seller-info">
                       <p className="rec-seller-handle">@seller_{i}</p>
                       <p className="rec-seller-cat">Category · Subcategory</p>
                     </div>
                   </div>
                   <div className="rec-card-content">
                     <div className="rec-cat">CATEGORY</div>
                     <h4 className="rec-item-title">Product Name Here</h4>
                     <p className="rec-item-desc">Key detail · Variant · Condition</p>
                     <div className="rec-item-price-row">
                       <span className="rec-item-price">₹X,XXX</span>
                       <span className="rec-item-orig-price">₹X,XXX</span>
                       <span className="rec-item-discount">XX% off</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
