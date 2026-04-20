import React from 'react';
import { ArrowRight, Star, PenBox, Trash2, Copy } from 'lucide-react';
import { RECENT_ORDERS, TOP_PRODUCTS } from '../../data/creatorMockData';
import './CreatorPerformance.css';

export default function CreatorPerformance() {
  const topSeller = TOP_PRODUCTS.find(p => p.isTopSeller);
  const otherProducts = TOP_PRODUCTS.filter(p => !p.isTopSeller);

  return (
    <div className="performance-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="perf-left">
        {/* Weekly Performance Mock Chart */}
        <div className="weekly-perf-card brutal-border bg-ink text-cream">
          <div className="perf-header">
            <h2>📊 This week's performance</h2>
            <span className="perf-date">Apr 3 – Apr 9</span>
          </div>
          <div className="perf-stats">
            <div className="perf-stat-item">
              <h3 className="perf-h3">₹18.4k</h3>
              <p>REVENUE</p>
              <span className="trend text-orange">↑ 32%</span>
            </div>
            <div className="perf-stat-item">
              <h3 className="perf-h3">6,240</h3>
              <p>TOTAL VIEWS</p>
              <span className="trend text-orange">↑ 18%</span>
            </div>
            <div className="perf-stat-item">
              <h3 className="perf-h3">94</h3>
              <p>ITEMS SOLD</p>
              <span className="trend text-orange">↑ 41%</span>
            </div>
            <div className="perf-stat-item">
              <h3 className="perf-h3">843</h3>
              <p>FOLLOWERS</p>
              <span className="trend text-orange">+380 this wk</span>
            </div>
          </div>
          <div className="perf-chart-section">
            <p className="chart-title">DAILY REVENUE</p>
            <div className="chart-bars">
              <div className="bar brutal-border bg-surface-light" style={{ height: '20%' }}></div>
              <div className="bar brutal-border bg-surface-light" style={{ height: '35%' }}></div>
              <div className="bar brutal-border bg-surface-light" style={{ height: '25%' }}></div>
              <div className="bar brutal-border bg-surface-light" style={{ height: '40%' }}></div>
              <div className="bar brutal-border bg-surface-light" style={{ height: '30%' }}></div>
              <div className="bar brutal-border bg-surface-light" style={{ height: '45%' }}></div>
              <div className="bar brutal-border bg-orange" style={{ height: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="perf-right">
        {/* Recent Orders */}
        <div className="recent-orders-card brutal-border bg-surface">
          <div className="orders-header">
            <h3>🛍️ Recent Orders</h3>
            <a href="#" className="see-all text-orange">See all <ArrowRight size={16} /></a>
          </div>
          <div className="orders-list">
            {RECENT_ORDERS.map(order => (
              <div key={order.id} className="order-item">
                <img src={order.img} alt={order.title} className="order-img brutal-border" />
                <div className="order-info">
                  <h4 className="text-ink">{order.title}</h4>
                  <p className="text-ink opacity-70">{order.user}</p>
                </div>
                <div className="order-status-price">
                  <span className="order-price text-ink font-bold">{order.price}</span>
                  <span className={`status-badge brutal-border ${order.status === 'NEW' ? 'bg-orange text-cream' : 'bg-cream text-ink'}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="perf-catalog">
        {/* Catalog Items */}
        <div className="top-seller-card brutal-border bg-orange text-cream">
          <div className="top-seller-badge brutal-border bg-cream text-ink">
            <Star size={14} className="text-orange" fill="currentColor" /> Top Seller
          </div>
          <img src={topSeller.img} alt={topSeller.title} className="top-seller-img brutal-border" />
          <div className="product-details bg-cream text-ink brutal-border">
            <h4>{topSeller.title}</h4>
            <p>{topSeller.stock} · {topSeller.type}</p>
            <div className="product-bottom text-orange">
              <span className="product-price">{topSeller.price}</span>
              <span className="product-cat brutal-border bg-surface-light text-ink">{topSeller.type}</span>
            </div>
            <div className="product-actions">
              <button className="action-btn brutal-border bg-surface text-ink"><PenBox size={16} /> Edit</button>
              <button className="action-btn brutal-border bg-orange text-cream">Feature this</button>
            </div>
          </div>
        </div>

        {otherProducts.map(product => (
          <div key={product.id} className="product-card brutal-border bg-surface">
            <img src={product.img} alt={product.title} className="product-img brutal-border" />
            <div className="product-details text-ink">
              <h4>{product.title}</h4>
              <p>{product.stock}</p>
              <div className="product-bottom text-orange">
                <span className="product-price">{product.price}</span>
                {product.inStream ? (
                  <span className="in-stream-badge brutal-border bg-cream text-orange font-bold uppercase text-xs px-2 py-1 flex items-center gap-1 rounded-full"><span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span> In stream</span>
                ) : (
                  <span className="product-cat brutal-border bg-cream text-ink">{product.type}</span>
                )}
              </div>
              <div className="product-actions mt-3">
                <button className="action-btn brutal-border bg-cream text-ink flex-1"><PenBox size={16} /> Edit</button>
                <button className="action-btn brutal-border bg-cream text-ink flex-1">{product.inStream ? <><Copy size={16} /> Duplicate</> : <Trash2 size={16} />}</button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Listing Card */}
        <div className="add-listing-card brutal-border bg-cream text-ink flex flex-col justify-center items-center py-10 px-4 min-h-[300px]">
           <div className="add-icon-circle w-16 h-16 rounded-full border-2 border-dashed border-ink flex justify-center items-center mb-4 transition-transform hover:scale-110 cursor-pointer text-orange">
             <span className="text-3xl">+</span>
           </div>
           <h4 className="font-bold text-center text-lg">Add New Item</h4>
           <p className="text-center opacity-70 mt-2 text-sm">Expand your catalog</p>
        </div>
      </div>
    </div>
  );
}
