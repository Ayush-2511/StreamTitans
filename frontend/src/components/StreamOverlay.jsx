import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ShoppingCart, Heart, MessageCircle, Share2, X, Flame, Send } from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { useProduct } from '../context/ProductContext';
import './StreamOverlay.css';

export default function StreamOverlay() {
  const { streamData, isStreamLoading, closeStream } = useStream();
  const { openProduct } = useProduct();
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48300);
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([
    { id: 1, avatar: 'M', color: '#7a604a', handle: '@mia_shop', text: 'This looks so good! 😍' },
    { id: 2, avatar: 'R', color: '#4a607a', handle: '@riya_buys', text: 'Is this available in XS?' },
    { id: 3, avatar: 'K', color: '#507a4a', handle: '@kai_trends', text: 'Just claimed mine ✅' },
  ]);
  const commentsEndRef = useRef(null);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => prev + (liked ? -1 : 1));
  };

  const formatLikeCount = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      avatar: 'Y',
      color: '#FF5B22',
      handle: '@you',
      text: comment.trim(),
    }]);
    setComment('');
    setShowComments(true);
  };

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  if (!streamData) return null;

  if (isStreamLoading) {
    return (
      <div className="stream-overlay-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.95)'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <div className="stream-spinner" style={{width: '60px', height: '60px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#FF5B22', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
          <p style={{color: 'white', fontWeight: 500, letterSpacing: '0.05em'}}>Connecting to stream...</p>
        </div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleBuyClick = () => {
    openProduct({
      title: streamData.title || 'Product from Stream',
      seller: streamData.seller,
      sellerName: streamData.sellerName,
      price: '₹1,999',
      originalPrice: '₹3,499',
      category: streamData.category || 'Live',
      subcategory: 'Drop',
      viewers: streamData.viewers,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    });
  };

  return (
    <div className="stream-overlay-container">
      <div className="stream-overlay-bg">
         <div className="stream-overlay-video-placeholder"></div>
      </div>

      <div className="stream-overlay-content">
        <div className="stream-header">
           <div className="stream-seller-info">
              <div className="stream-seller-avatar">
                {streamData.sellerName ? streamData.sellerName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="stream-seller-text">
                 <h3 className="stream-seller-name">{streamData.sellerName || 'Seller Name'}</h3>
                 <p className="stream-seller-handle">{streamData.seller || '@handle'} • {streamData.category || 'Category'}</p>
              </div>
           </div>

           <div className="stream-badges">
              <div className="stream-badge live">
                 <span className="live-dot"></span> LIVE
              </div>
              <div className="stream-badge viewers">
                 {streamData.viewers || '4,527'}
              </div>
           </div>

           <button className="stream-close-btn" onClick={closeStream}>
             <X size={24} />
           </button>
        </div>

        <div className="stream-actions">
           <div className="stream-action-item">
             <button className="stream-action-btn" onClick={handleBuyClick}>
               <ShoppingCart size={20} />
             </button>
             <span className="stream-action-label">Buy</span>
           </div>

           <div className="stream-action-item">
              <button
                className="stream-action-btn"
                onClick={handleLike}
                style={liked ? { background: 'rgba(255, 91, 34, 0.25)', color: '#FF5B22', border: '1px solid rgba(255,91,34,0.5)' } : {}}
              >
                <Heart size={20} fill={liked ? '#FF5B22' : 'none'} color={liked ? '#FF5B22' : 'white'} />
              </button>
              <span className="stream-action-label" style={liked ? { color: '#FF5B22' } : {}}>{formatLikeCount(likeCount)}</span>
           </div>

           <div className="stream-action-item">
              <button
                className="stream-action-btn"
                onClick={() => setShowComments(prev => !prev)}
                style={showComments ? { background: 'rgba(255,255,255,0.2)' } : {}}
              >
                <MessageCircle size={20} />
              </button>
              <span className="stream-action-label">{comments.length}</span>
           </div>

           <div className="stream-action-item">
             <button className="stream-action-btn">
               <Flame size={20} />
             </button>
             <span className="stream-action-label">React</span>
           </div>

           <div className="stream-action-item">
             <button className="stream-action-btn">
               <Share2 size={20} />
             </button>
             <span className="stream-action-label">Share</span>
           </div>
        </div>

        <div className="stream-bottom-section">
           {showComments && (
           <div className="stream-comments">
               {comments.map(c => (
                 <div key={c.id} className="stream-comment-bubble">
                   <div className="stream-comment-avatar" style={{ backgroundColor: c.color }}>{c.avatar}</div>
                   <div className="stream-comment-body">
                     <span className="stream-comment-handle">{c.handle}</span>
                     <span className="stream-comment-text">{c.text}</span>
                   </div>
                 </div>
               ))}
               <div ref={commentsEndRef} />
            </div>
           )}

           <div className="stream-product-drop">
              <h4 className="stream-drop-seller">{streamData.seller || '@seller_handle'}</h4>
              <p className="stream-drop-desc" style={{cursor: 'pointer'}} onClick={handleBuyClick}>Featured drop • Limited stock • Tap Buy →</p>
           </div>

           <div className="stream-input-bar">
             <input
               type="text"
               placeholder="Add a comment..."
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
             />
             <button className="stream-send-btn" onClick={handleCommentSubmit}>
               <Send size={14} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
