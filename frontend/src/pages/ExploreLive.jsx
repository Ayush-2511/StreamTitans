import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, ShoppingBag } from 'lucide-react';
import { HERO_MOSAIC } from '../data/mockData';
import './ExploreLive.css';

export default function ExploreLive() {
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // We can repeat the mock data a few times to create more "reels" to scroll
  const reelFeeds = [...HERO_MOSAIC, ...HERO_MOSAIC];

  return (
    <div className="explore-container">
      {/* Top Navigation Overlay */}
      <div className="explore-nav">
        <Link to="/" className="explore-back-btn focus-visible">
          <ArrowLeft className="explore-icon" />
        </Link>
        <span className="explore-title-bar">Live Feed</span>
      </div>

      <div className="reels-container no-scrollbar">
        {reelFeeds.map((feed, index) => (
          <div key={`${feed.id}-${index}`} className="reel-item">
            {/* Background Feed Image */}
            <div className="reel-bg" style={{ backgroundImage: `url(${feed.img})` }}></div>
            <div className="reel-overlay"></div>

            {/* Seller Info & Description Overlay */}
            <div className="reel-info">
              <div className="reel-seller-header">
                <div className="reel-seller-avatar"></div>
                <div className="reel-seller-name">{feed.seller}</div>
                <div className="reel-live-badge">Live</div>
              </div>
              <h2 className="reel-title">{feed.title}</h2>
              <p className="reel-desc">Join the stream and get exclusive drops directly.</p>
            </div>

            {/* Sidebar Actions */}
            <div className="reel-actions">
              <button className="action-btn" onClick={() => toggleLike(`${feed.id}-${index}`)}>
                <Heart className="action-icon" fill={likes[`${feed.id}-${index}`] ? 'red' : 'none'} color={likes[`${feed.id}-${index}`] ? 'red' : 'white'} />
                <span className="action-label">{likes[`${feed.id}-${index}`] ? '1.2k' : '1.1k'}</span>
              </button>
              <button className="action-btn">
                <MessageCircle className="action-icon" color="white" />
                <span className="action-label">245</span>
              </button>
              <button className="action-btn">
                <Share2 className="action-icon" color="white" />
                <span className="action-label">Share</span>
              </button>
              
              <div className="action-featured-product">
                <div className="product-thumb">
                  <ShoppingBag size={18} color="black"/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
