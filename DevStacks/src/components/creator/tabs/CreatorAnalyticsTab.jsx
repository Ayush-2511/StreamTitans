import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import './CreatorAnalyticsTab.css';

export default function CreatorAnalyticsTab() {
  const [storeMode, setStoreMode] = useState('Thrifting');

  const thriftData = {
    revenue: '₹18.4k', views: '2.4k', conversion: '8.5%', avgOrder: '₹450',
    topDesc: 'By revenue this period',
    products: [
      { rank: 1, img: 'https://images.unsplash.com/photo-1515347619362-67bd86fa2e72?w=100&q=80', name: 'Floral Midi Dress', sold: '18 sold', rev: '₹5,382' },
      { rank: 2, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80', name: 'Sneakers (Maroon)', sold: '9 sold', rev: '₹8,091' },
      { rank: 3, img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85ce9?w=100&q=80', name: 'Linen Shirt (M)', sold: '11 sold', rev: '₹4,939' },
      { rank: 4, img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100&q=80', name: 'Silk Scarf (Blue)', sold: '5 sold', rev: '₹995' }
    ]
  };

  const retailData = {
    revenue: '₹5.2k', views: '1.2k', conversion: '4.2%', avgOrder: '₹1,250',
    topDesc: 'Retail drops performance',
    products: [
      { rank: 1, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80', name: 'Premium Denim Jeans', sold: '2 sold', rev: '₹2,998' },
      { rank: 2, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=100&q=80', name: 'Classic Leather Watch', sold: '1 sold', rev: '₹2,999' },
      { rank: 3, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80', name: 'Oversized Cotton Tee', sold: '8 sold', rev: '₹4,792' },
      { rank: 4, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&q=80', name: 'Summer Sunglasses', sold: '5 sold', rev: '₹4,495' }
    ]
  };

  const currentData = storeMode === 'Thrifting' ? thriftData : retailData;

  return (
    <div className="analytics-tab animate-slide-up">
      <div className="analytics-header-row">
        <div>
          <h1 className="analytics-title">Analytics</h1>
          <p className="analytics-subtitle">Track your performance and discover audience insights</p>
        </div>
        <div className="analytics-controls">
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
           <div className="time-btn-group">
             <button className="time-btn active">7<br/>days</button>
             <button className="time-btn">30<br/>days</button>
             <button className="time-btn">All<br/>time</button>
           </div>
           <button className="export-btn-ana"><Download size={14} /> Export</button>
        </div>
      </div>

      <div className="metrics-grid-4">
        <div className="metric-box">
           <div className="mb-header">
             <div className="mb-dot d-red"></div>
             <span className="mb-title">REVENUE</span>
           </div>
           <h3 className="mb-val">{currentData.revenue}</h3>
           <div className="mb-footer">
              <span className="trend-pill up"><TrendingUp size={12}/> 32%</span>
              <span>vs last period</span>
           </div>
        </div>
        <div className="metric-box">
           <div className="mb-header">
             <div className="mb-dot d-purple"></div>
             <span className="mb-title">UNIQUE VIEWERS</span>
           </div>
           <h3 className="mb-val">{currentData.views}</h3>
           <div className="mb-footer">
              <span className="trend-pill up"><TrendingUp size={12}/> 18%</span>
              <span>vs last period</span>
           </div>
        </div>
        <div className="metric-box">
           <div className="mb-header">
             <div className="mb-dot d-green"></div>
             <span className="mb-title">CONVERSION RATE</span>
           </div>
           <h3 className="mb-val">{currentData.conversion}</h3>
           <div className="mb-footer">
              <span className="trend-pill up"><TrendingUp size={12}/> 2.1%</span>
              <span>vs last period</span>
           </div>
        </div>
        <div className="metric-box">
           <div className="mb-header">
             <div className="mb-dot d-orange"></div>
             <span className="mb-title">AVG ORDER VALUE</span>
           </div>
           <h3 className="mb-val">{currentData.avgOrder}</h3>
           <div className="mb-footer">
              <span className="trend-pill neutral"><TrendingUp size={12} color="transparent" /> Stable</span>
              <span>vs last period</span>
           </div>
        </div>
      </div>

      <div className="charts-row">
         <div className="chart-card">
            <div className="cc-header">
               <div>
                  <h3 className="cc-title">Revenue vs Views</h3>
                  <p className="cc-sub">Daily breakdown · Apr 3 - Apr 9</p>
               </div>
               <div className="cc-legend">
                  <div className="legend-item"><div className="legend-dot ld-red"></div> Revenue</div>
                  <div className="legend-item"><div className="legend-dot ld-blue"></div> Views</div>
               </div>
            </div>
            <div className="chart-placeholder">
               <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', height: '1.5px', background: '#f3f4f6' }}></div>
            </div>
         </div>
         <div className="chart-card">
            <div className="cc-header">
               <div>
                  <h3 className="cc-title">Sales by category</h3>
                  <p className="cc-sub">Share of total revenue</p>
               </div>
            </div>
            <div className="donut-wrapper">
               <div className="donut-chart">
                 <div className="donut-hole">
                    <span className="donut-val">{storeMode === 'Thrifting' ? '53' : '16'}</span>
                    <span className="donut-lbl">orders</span>
                 </div>
               </div>
               <div className="donut-legend">
                 <div className="dl-item"><div className="legend-dot d-red"></div><div className="dl-info"><div className="dl-name">{storeMode === 'Thrifting' ? "Women's fashion" : "Denim"}</div><div className="dl-pct">40%</div></div></div>
                 <div className="dl-item"><div className="legend-dot d-purple"></div><div className="dl-info"><div className="dl-name">{storeMode === 'Thrifting' ? "Men's casual" : "Watches"}</div><div className="dl-pct">23%</div></div></div>
                 <div className="dl-item"><div className="legend-dot d-green"></div><div className="dl-info"><div className="dl-name">{storeMode === 'Thrifting' ? "Footwear" : "Tees"}</div><div className="dl-pct">15%</div></div></div>
                 <div className="dl-item"><div className="legend-dot d-orange"></div><div className="dl-info"><div className="dl-name">Accessories</div><div className="dl-pct">22%</div></div></div>
               </div>
            </div>
         </div>
      </div>

      <div className="bottom-grid">
         <div className="bg-card">
            <h3 className="tc-title">Top products</h3>
            <p className="tc-sub">{currentData.topDesc}</p>
            <div className="tp-table">
               <div className="tp-header">
                  <span>#PRODUCT</span>
                  <span>REVENUE</span>
               </div>
               {currentData.products.map(p => (
                 <div className="tp-row" key={p.rank}>
                    <span className="tp-rank">{p.rank}</span>
                    <div className="tp-prod">
                       <span className="tp-thumb" style={{ backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: 0 }}></span>
                       <div>
                          <div className="tp-name">{p.name}</div>
                          <div className="tp-sold">{p.sold}</div>
                       </div>
                    </div>
                    <span className="tp-rev">{p.rev}</span>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="bg-card">
            <h3 className="tc-title">Audience insights</h3>
            <p className="tc-sub">Who's watching & buying</p>
            <div className="ai-grid">
               <div className="ai-box">
                  <div className="ai-lbl">AVG<br/>WATCH<br/>TIME</div>
                  <div className="ai-val">12m 40s</div>
                  <div className="ai-sub">Per viewer</div>
               </div>
               <div className="ai-box">
                  <div className="ai-lbl">NEW<br/>FOLLOWERS</div>
                  <div className="ai-val">+843</div>
                  <div className="ai-sub">This period</div>
               </div>
               <div className="ai-box">
                  <div className="ai-lbl">REPEAT<br/>BUYERS</div>
                  <div className="ai-val">34%</div>
                  <div className="ai-sub">Of all orders</div>
               </div>
               <div className="ai-box">
                  <div className="ai-lbl">REACTION<br/>RATE</div>
                  <div className="ai-val">4.2k</div>
                  <div className="ai-sub">Total reactions</div>
               </div>
            </div>
            <div className="tc-cities">TOP CITIES</div>
         </div>
         
         <div className="bg-card">
            <h3 className="tc-title">Stream performance</h3>
            <p className="tc-sub">Your recent broadcasts</p>
            <div className="sp-list">
               <div className="sp-item">
                  <div className="sp-info">
                     <div className="sp-thumb bg-cream"></div>
                     <div>
                        <div className="sp-name">Festive Ethnic Collection</div>
                        <div className="sp-sub">Apr 9 · 45 min · 1.2k peak</div>
                     </div>
                  </div>
                  <div className="sp-rev">₹3,240</div>
               </div>
               <div className="sp-item">
                  <div className="sp-info">
                     <div className="sp-thumb bg-blue"></div>
                     <div>
                        <div className="sp-name">Denim & Basics Drop</div>
                        <div className="sp-sub">Apr 6 · 38 min · 980 peak</div>
                     </div>
                  </div>
                  <div className="sp-rev">₹2,100</div>
               </div>
               <div className="sp-item">
                  <div className="sp-info">
                     <div className="sp-thumb bg-blue" style={{background: '#e0f2fe'}}></div>
                     <div>
                        <div className="sp-name">Footwear Special</div>
                        <div className="sp-sub">Apr 4 · 52 min · 2.1k peak</div>
                     </div>
                  </div>
                  <div className="sp-rev">₹5,800</div>
               </div>
               <div className="sp-item">
                  <div className="sp-info">
                     <div className="sp-thumb bg-green"></div>
                     <div>
                        <div className="sp-name">Summer Essentials</div>
                        <div className="sp-sub">Apr 2 · 29 min · 710 peak</div>
                     </div>
                  </div>
                  <div className="sp-rev">₹1,640</div>
               </div>
               <div className="sp-item">
                  <div className="sp-info">
                     <div className="sp-thumb bg-yellow"></div>
                     <div>
                        <div className="sp-name">Accessories Edit</div>
                        <div className="sp-sub">Mar 30 · 41 min · 890 peak</div>
                     </div>
                  </div>
                  <div className="sp-rev">₹2,890</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
