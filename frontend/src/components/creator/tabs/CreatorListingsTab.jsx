import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowDownUp, Plus, MoreHorizontal, Sparkles, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { subscribeToProducts, addProduct } from '../../../firebase/firestore';
import { uploadMediaToCloudinary } from '../../../firebase/cloudinary';
import { GoogleGenerativeAI } from '@google/generative-ai';
import toast from 'react-hot-toast';
import './CreatorListingsTab.css';

export default function CreatorListingsTab() {
  const [storeMode, setStoreMode] = useState('Thrifting');
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', stock: '1', category: '', condition: 'Gently Used' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const handleEstimatePrice = async () => {
    if (!newProduct.title || !newProduct.category) return toast.error("Enter Title & Category to estimate");
    setIsEstimating(true);
    setEstimatedPrice('');
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy_key");
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const prompt = `You are a pricing expert for second hand and thrifted clothing in India.
      Suggest an optimal selling price in INR (e.g., "₹800 - ₹1,200") for the following item:
      Title: ${newProduct.title}
      Category: ${newProduct.category}
      Condition: ${newProduct.condition}
      
      Return ONLY the suggested price range. Nothing else.`;
      let responseText = "";
      let retries = 3;
      
      while (retries > 0) {
        try {
          const result = await model.generateContent(prompt);
          responseText = result.response.text().trim();
          break;
        } catch (e) {
          if (e.message.includes("503") && retries > 1) {
            retries--;
            console.warn("Google API 503 Overload detected. Retrying smoothly in 2 seconds...", retries, "attempts left");
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            throw e;
          }
        }
      }
      setEstimatedPrice(responseText);
    } catch(err) {
      console.error(err);
      setEstimatedPrice('Failed to estimate.');
    } finally {
      setIsEstimating(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToProducts((data) => setProducts(data), 'seller', currentUser.userId);
    return () => unsubscribe();
  }, [currentUser]);

  const currentProducts = products.filter(p => storeMode === 'Thrifting' ? p.type === 'thrift' : p.type === 'regular');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload an image!");
    if (!newProduct.title || !newProduct.price || !newProduct.stock) return toast.error("Fill in all details!");

    try {
      setUploading(true);
      const imageUrl = await uploadMediaToCloudinary(file);
      if (!imageUrl) throw new Error("Upload failed");

      await addProduct({
        ...newProduct,
        type: storeMode === 'Thrifting' ? 'thrift' : 'regular',
        sellerId: currentUser.userId,
        img: imageUrl,
        views: 0,
        sold: 0,
        rating: 'N/A'
      });
      
      toast.success("Product added!");
      setShowAddModal(false);
      setNewProduct({ title: '', price: '', stock: '1', category: '', condition: 'Gently Used' });
      setFile(null);
    } catch(err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="listings-tab animate-slide-up">
      {/* Header */}
      <div className="listings-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="listings-title">Inventory</h1>
          <p className="listings-subtitle">Manage products, drops,<br/>and upcoming listings</p>
        </div>
        <div className="listings-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
          <div className="store-mode-toggle brutal-border" style={{ display: 'flex', background: 'var(--color-surface)', borderRadius: '99px', padding: '4px', border: '1.5px solid var(--color-ink)' }}>
            <button 
              className="mode-btn"
              onClick={() => setStoreMode('Thrifting')}
              style={{ padding: '6px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', border: '1.5px solid transparent', background: storeMode === 'Thrifting' ? 'var(--color-ink)' : 'transparent', color: storeMode === 'Thrifting' ? '#fff' : 'var(--color-ink)', transition: 'all 0.2s' }}
            >
              Thrifting
            </button>
            <button 
              className="mode-btn"
              onClick={() => setStoreMode('Retailing')}
              style={{ padding: '6px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', border: '1.5px solid transparent', background: storeMode === 'Retailing' ? 'var(--color-ink)' : 'transparent', color: storeMode === 'Retailing' ? '#fff' : 'var(--color-ink)', transition: 'all 0.2s' }}
            >
              Retailing
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div className="search-box">
              <Search size={16} style={{ opacity: 0.5, marginRight: '8px' }} />
              <input type="text" placeholder="Search listings..." />
            </div>
            <button className="export-btn">
              <Filter size={14} /> Filters
            </button>
            <button className="export-btn">
              <ArrowDownUp size={14} /> Sort
            </button>
            <button className="export-btn text-cream" style={{ backgroundColor: 'var(--color-ink)' }} onClick={() => setShowAddModal(true)}>
              <Plus size={14} /> Add product
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="add-modal-overlay">
          <div className="add-modal-content">
            <button className="add-modal-close" onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>
            <h2 className="add-modal-title">Add New Listing</h2>
            
            <div>
              <div className="add-modal-form-group">
                <label className="add-modal-label">Title</label>
                <input type="text" className="add-modal-input" placeholder="e.g. Vintage Denim Jacket" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
              </div>
              <div className="add-modal-form-group">
                <label className="add-modal-label">Category</label>
                <input type="text" className="add-modal-input" placeholder="e.g. Women's Fashion" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              </div>
              <div className="add-modal-form-group">
                <label className="add-modal-label">Condition</label>
                <select className="add-modal-input" value={newProduct.condition} onChange={e => setNewProduct({...newProduct, condition: e.target.value})}>
                  <option>Brand New</option>
                  <option>Like New</option>
                  <option>Gently Used</option>
                  <option>Well Worn</option>
                </select>
              </div>
              
              <div className="add-modal-form-group">
                <button 
                  onClick={handleEstimatePrice}
                  disabled={!newProduct.title || !newProduct.category || isEstimating}
                  className="add-modal-estimate-btn"
                >
                  {isEstimating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
                  AI Price Estimator
                </button>
                {estimatedPrice && (
                  <p className="add-modal-estimated-price">Suggested: {estimatedPrice}</p>
                )}
              </div>

              <div className="add-modal-form-group">
                <label className="add-modal-label">Price</label>
                <input type="text" className="add-modal-input" placeholder="e.g. ₹999" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              </div>

              <div className="add-modal-form-group">
                <label className="add-modal-label">Stock</label>
                <input type="number" className="add-modal-input" placeholder="1" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
              </div>

              <div className="add-modal-form-group">
                <label className="add-modal-label">Product Image</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" className="add-modal-input" />
              </div>

              <button className="add-modal-save-btn" onClick={handleAddProduct} disabled={uploading}>
                {uploading ? 'Publishing...' : 'Save & Publish Listing'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="inventory-metrics" style={{ marginTop: '24px' }}>
        <div className="inv-metric-card">
          <p className="inv-metric-label">TOTAL LISTINGS</p>
          <h2 className="inv-metric-val">{storeMode === 'Thrifting' ? '12' : '45'}</h2>
          <p className="inv-metric-sub">{storeMode === 'Thrifting' ? '+2 this week' : '+15 bulk added'}</p>
        </div>
        <div className="inv-metric-card">
          <p className="inv-metric-label">LIVE NOW</p>
          <h2 className="inv-metric-val">{storeMode === 'Thrifting' ? '4' : '38'}</h2>
          <p className="inv-metric-sub">Visible in store</p>
        </div>
        <div className="inv-metric-card warning">
          <p className="inv-metric-label">LOW STOCK</p>
          <h2 className="inv-metric-val warning-text">{storeMode === 'Thrifting' ? '3' : '1'}</h2>
          <p className="inv-metric-sub">Restock needed</p>
        </div>
        <div className="inv-metric-card">
          <p className="inv-metric-label">TOTAL REVENUE</p>
          <h2 className="inv-metric-val">{storeMode === 'Thrifting' ? '₹48.2k' : '₹12.5k'}</h2>
          <p className="inv-metric-sub">{storeMode === 'Thrifting' ? 'From 53 orders' : 'From 8 retail orders'}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-pills">
        <button className="filter-pill">All <span className="pill-count">{storeMode === 'Thrifting' ? '12' : '45'}</span></button>
        <button className="filter-pill inactive">Live <span className="pill-count">{storeMode === 'Thrifting' ? '4' : '38'}</span></button>
        <button className="filter-pill inactive">Draft <span className="pill-count">5</span></button>
        <button className="filter-pill inactive">Paused <span className="pill-count">2</span></button>
        <button className="filter-pill inactive">Out of stock <span className="pill-count">1</span></button>
      </div>

      {/* Scheduled Row */}
      <div className="scheduled-section">
        <div className="scheduled-header">
          <h3>Scheduled for next {storeMode === 'Thrifting' ? 'stream' : 'bulk drop'}</h3>
          <button className="schedule-more">+ Schedule more</button>
        </div>
        <div className="scheduled-cards">
          <div className="sched-card pink">
            <div className="sched-thumb"></div>
            <div className="sched-info">
              <h4 className="sched-title">{storeMode === 'Thrifting' ? 'Floral Midi Dress' : 'Cotton Tees (10x)'}</h4>
              <p className="sched-sub">Drop #1 ·<br/>Today 7 PM</p>
            </div>
            <span className="sched-badge">Scheduled</span>
          </div>
          <div className="sched-card purple">
            <div className="sched-thumb"></div>
            <div className="sched-info">
              <h4 className="sched-title">{storeMode === 'Thrifting' ? 'Linen Shirt (M)' : 'Jeans Restock'}</h4>
              <p className="sched-sub">Drop #2 ·<br/>Today 7 PM</p>
            </div>
            <span className="sched-badge">Scheduled</span>
          </div>
          <div className="sched-card blue">
            <div className="sched-thumb"></div>
            <div className="sched-info">
              <h4 className="sched-title">{storeMode === 'Thrifting' ? 'Sneakers' : 'Watches'}</h4>
              <p className="sched-sub">Drop #3 ·<br/>Today 7 PM</p>
            </div>
            <span className="sched-badge">Scheduled</span>
          </div>
        </div>
      </div>

      {/* Live Products */}
      <div className="section-title-wrapper mt-8">
        <h3 className="section-title m-0">LIVE PRODUCTS</h3>
        <div className="section-line"></div>
      </div>

      <div className="products-grid mt-4">

        {currentProducts.map((item, i) => (
          <div key={i} className="product-card brutal-shadow">
            <div className="product-cover" style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
               <div className="cover-header">
                 <span className="status-badge live"><div className="status-dot"></div> Live</span>
                 <button className="more-btn"><MoreHorizontal size={14} color="#1a1a1a" /></button>
               </div>
            </div>
            <div className="product-details">
              <h4 className="prod-title">{item.title}</h4>
              <p className="prod-cat">{item.category}</p>
              <div className="prod-price-row">
                <span className="prod-price">{item.price}</span>
                <span className="stock-badge ok">{item.stock} left</span>
              </div>
              <div className="prod-stats">
                <div className="stat-col">
                  <div className="stat-val">{item.views}</div>
                  <div className="stat-lbl">VIEWS</div>
                </div>
                <div className="stat-col mid">
                  <div className="stat-val">{item.sold}</div>
                  <div className="stat-lbl">SOLD</div>
                </div>
                <div className="stat-col">
                  <div className="stat-val">{item.rating}</div>
                  <div className="stat-lbl">RATING</div>
                </div>
              </div>
              <div className="prod-actions">
                <button className="grid-btn">Edit</button>
                <button className="grid-btn"><span>Drop in</span><span>stream</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DRAFTS */}
      <div className="section-title-wrapper mt-8">
        <h3 className="section-title m-0">DRAFTS & PAUSED</h3>
        <div className="section-line"></div>
      </div>
      
      <div className="products-grid mt-4">
          <div className="product-card brutal-shadow">
            <div className="product-cover" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1583391733959-f58302025ed9?w=500&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
               <div className="cover-header">
                 <span className="status-badge draft">Draft</span>
                 <button className="more-btn"><MoreHorizontal size={14} color="#1a1a1a" /></button>
               </div>
            </div>
            <div className="product-details">
              <h4 className="prod-title">Embroidered Kurta</h4>
              <p className="prod-cat">Ethnic wear</p>
              <div className="prod-price-row">
                <span className="prod-price">₹649</span>
                <span className={`stock-badge ok`}>10 in stock</span>
              </div>
              <div className="prod-stats">
                <div className="stat-col">
                  <div className="stat-val">—</div>
                  <div className="stat-lbl">VIEWS</div>
                </div>
                <div className="stat-col mid">
                  <div className="stat-val">—</div>
                  <div className="stat-lbl">SOLD</div>
                </div>
                <div className="stat-col">
                  <div className="stat-val">—</div>
                  <div className="stat-lbl">RATING</div>
                </div>
              </div>
              <div className="prod-actions">
                <button className="grid-btn">Edit</button>
                <button className="grid-btn">Publish</button>
              </div>
            </div>
          </div>
          
          <div className="product-card brutal-shadow">
            <div className="product-cover" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
               <div className="cover-header">
                 <span className="status-badge paused"><div className="status-dot paused-dot"></div> Paused</span>
                 <button className="more-btn"><MoreHorizontal size={14} color="#1a1a1a" /></button>
               </div>
            </div>
            <div className="product-details">
              <h4 className="prod-title">Vintage Denim Jac...</h4>
              <p className="prod-cat">Women's fashion</p>
              <div className="prod-price-row">
                <span className="prod-price">₹1,299</span>
                <span className={`stock-badge out`}>Out of stock</span>
              </div>
              <div className="prod-stats">
                <div className="stat-col">
                  <div className="stat-val">94</div>
                  <div className="stat-lbl">VIEWS</div>
                </div>
                <div className="stat-col mid">
                  <div className="stat-val">11</div>
                  <div className="stat-lbl">SOLD</div>
                </div>
                <div className="stat-col">
                  <div className="stat-val">4.7</div>
                  <div className="stat-lbl">RATING</div>
                </div>
              </div>
              <div className="prod-actions">
                <button className="grid-btn">Edit</button>
                <button className="grid-btn">Restock</button>
              </div>
            </div>
          </div>
          
          <div className="new-product-card" style={{ cursor: 'pointer' }} onClick={() => setShowAddModal(true)}>
             <div className="add-circle">
                <Plus size={20} />
             </div>
             <h4 className="new-prod-title">New product</h4>
             <p className="new-prod-sub">Start a draft</p>
          </div>
      </div>
    </div>
  );
}
