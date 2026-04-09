import React from 'react';
import { MessageSquare, Plus, Bell, CheckCircle2, Star, Check } from 'lucide-react';
import './CreatorProfileView.css';

// Mock data based on Image 1
const CREATOR_PROFILE = {
  name: "Priya Rawal",
  handle: "@priya.finds",
  location: "Mumbai",
  bio: "Curating fashion that doesn't cost the earth — or your wallet. I drop fresh retail finds & handpicked pre-loved pieces every week. Sustainable style, no compromise.",
  joined: "Oct 2023",
  tier: "Top Seller · Season 3",
  totalStreams: "24 streams total",
  stats: [
    { value: "18.4k", label: "FOLLOWERS", trend: "+380 this week" },
    { value: "₹2.1L", label: "TOTAL EARNED", trend: "↑ 18% vs last month" },
    { value: "847", label: "ITEMS SOLD", trend: "62 this month" },
    { value: "4.9", label: "SELLER RATING", trend: "from 312 reviews" }
  ]
};

const ITEMS = [
  { id: 1, type: "RETAIL", name: "Linen Co-o...", price: "₹1,899", original: "₹2,499", status: "14 sold" },
  { id: 2, type: "THRIFT", name: "Vintage Za...", price: "₹499", status: "Good condition" },
  { id: 3, type: "RETAIL", name: "Block Heel...", price: "₹1,299", original: "₹1,799", status: "8 sold" },
  { id: 4, type: "THRIFT", name: "Denim Jac...", price: "₹799", status: "Like new - 1 left" },
  { id: 5, type: "RETAIL", name: "Floral Midi ...", price: "₹2,199", original: "₹2,799", status: "22 sold - 3 left" },
  { id: 6, type: "THRIFT", name: "Retro Oval...", price: "₹299", status: "Very good condition" }
];

export default function CreatorProfileView() {
  return (
    <div className="creator-profile-container">
      {/* Top Banner Area */}
      <div className="cp-banner">
        <div className="cp-banner-indicator">
          <span className="cp-live-dot"></span> LIVE TODAY · 7 PM
        </div>
      </div>
      
      {/* Profile Header Info */}
      <div className="cp-header-content">
        <div className="cp-avatar-wrap">
          <div className="cp-avatar">PR</div>
          <div className="cp-verified-badge"><Check size={12} strokeWidth={3} /></div>
        </div>
        
        <div className="cp-header-main">
          <div className="cp-name-row">
            <h1 className="cp-name">{CREATOR_PROFILE.name}</h1>
            <div className="cp-action-btns">
              <button className="cp-btn-outline"><MessageSquare size={16} /> Message</button>
              <button className="cp-btn-outline"><Plus size={16} /> Follow</button>
            </div>
          </div>
          
          <div className="cp-meta-row">
            <span className="cp-handle">{CREATOR_PROFILE.handle} · {CREATOR_PROFILE.location}</span>
          </div>
          
          <div className="cp-tags">
            <span className="cp-tag-dark">Retail</span>
            <span className="cp-tag-outline">Thrift</span>
          </div>
          
          <p className="cp-bio">{CREATOR_PROFILE.bio}</p>
          
          <div className="cp-small-stats">
            <span>👤 Joined {CREATOR_PROFILE.joined}</span>
            <span>⭐ {CREATOR_PROFILE.tier}</span>
            <span>📅 {CREATOR_PROFILE.totalStreams}</span>
          </div>
        </div>
      </div>
      
      {/* 4 Stats Cards */}
      <div className="cp-stats-grid">
        {CREATOR_PROFILE.stats.map((stat, i) => (
          <div key={i} className="cp-stat-card">
            <h3>{stat.value}</h3>
            <p className="cp-stat-label">{stat.label}</p>
            <p className="cp-stat-trend">{stat.trend}</p>
          </div>
        ))}
      </div>
      
      {/* Sub-Navigation Tabs */}
      <div className="cp-tabs">
        <button className="cp-tab active">Listings</button>
        <button className="cp-tab">Past Streams</button>
        <button className="cp-tab">Reviews</button>
        <button className="cp-tab">About</button>
      </div>
      
      {/* 2-Column Body Layout */}
      <div className="cp-body-split">
        {/* Left Column: Listings Grid */}
        <div className="cp-listings-grid">
          {ITEMS.map((item, idx) => (
            <div key={idx} className="cp-item-card">
              <div className="cp-item-img-placeholder">
                <span className={`cp-item-badge ${item.type.toLowerCase()}`}>{item.type}</span>
                {/* SVG mock icons for the items depending on id could go here, for now it's a structural div */}
              </div>
              <div className="cp-item-details">
                <h4>{item.name}</h4>
                <div className="cp-item-price-row">
                  <span className="cp-price">{item.price}</span>
                  {item.original && <span className="cp-original">{item.original}</span>}
                </div>
                <p className="cp-status">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right Column: Widgets */}
        <div className="cp-widgets">
          
          {/* Next Live Stream Black Card */}
          <div className="cp-widget-dark">
            <p className="c-widget-super">NEXT LIVE STREAM</p>
            <h2>Today · 7:00 PM</h2>
            <p className="c-widget-desc">Summer Refresh Drop — new retail arrivals + 12 thrift surprises under ₹500</p>
            <button className="c-notify-btn"><Bell size={16} /> Notify Me</button>
          </div>
          
          {/* Seller Trust White Card */}
          <div className="cp-widget-light">
            <h3 className="cw-title">SELLER TRUST</h3>
            <div className="cw-list">
              <div className="cw-row">
                <div className="cw-icon green"><CheckCircle2 size={16} /></div>
                <div className="cw-text">
                  <strong>Verified Seller</strong>
                  <span>ID & payments confirmed</span>
                </div>
              </div>
              <div className="cw-row">
                <div className="cw-icon orange"><Star size={16} /></div>
                <div className="cw-text">
                  <strong>Top Seller · Season 3</strong>
                  <span>Top 5% of creators</span>
                </div>
              </div>
              <div className="cw-row">
                <div className="cw-icon yellow"><Check size={16} /></div>
                <div className="cw-text">
                  <strong>Ships in 24 hrs</strong>
                  <span>98.2% on-time dispatch</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews White Card */}
          <div className="cp-widget-light">
            <h3 className="cw-title">REVIEWS</h3>
            <div className="cw-rating-section">
              <div className="cw-rating-big">4.9</div>
              <div className="cw-bars">
                {/* 5 bars */}
                <div className="cw-bar-row"><span>5</span><div className="cw-bar-track"><div className="cw-bar-fill" style={{width: '90%'}}></div></div></div>
                <div className="cw-bar-row"><span>4</span><div className="cw-bar-track"><div className="cw-bar-fill" style={{width: '20%'}}></div></div></div>
                <div className="cw-bar-row"><span>3</span><div className="cw-bar-track"><div className="cw-bar-fill" style={{width: '5%'}}></div></div></div>
                <div className="cw-bar-row"><span>2</span><div className="cw-bar-track"></div></div>
                <div className="cw-bar-row"><span>1</span><div className="cw-bar-track"></div></div>
              </div>
            </div>
            
            <div className="cw-review-list">
              <div className="cw-review">
                <div className="cw-rev-header">
                  <strong>Ananya S.</strong>
                  <span className="cw-stars">★★★★★</span>
                </div>
                <p>The thrift jacket was even better IRL. Fast shipping and super carefully packed!</p>
                <span className="cw-rev-date">2 days ago</span>
              </div>
              <hr className="cw-divider" />
              <div className="cw-review">
                <div className="cw-rev-header">
                  <strong>Meera R.</strong>
                  <span className="cw-stars">★★★★★</span>
                </div>
                <p>Bought the linen set on stream, it arrived next day. Quality is amazing for the price.</p>
                <span className="cw-rev-date">5 days ago</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
