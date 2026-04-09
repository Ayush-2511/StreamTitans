import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, MessageCircle, Share2, X, Flame } from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { subscribeToChat, sendMessage } from '../firebase/firestore';
import toast from 'react-hot-toast';
import './StreamOverlay.css';

export default function StreamOverlay() {
  const { streamData, isStreamLoading, closeStream } = useStream();
  const { openProduct } = useProduct();
  const { currentUser } = useAuth();
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!streamData) return;
    const streamId = streamData.id || streamData.title; // Fallback to title if no ID
    const unsub = subscribeToChat(streamId, (data) => {
      setMessages(data);
    });
    return () => unsub();
  }, [streamData]);

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
    // We intentionally DO NOT close stream here, so ProductOverlay acts as a layer over the live stream!
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
             <button className="stream-action-btn">
               <Heart size={20} />
             </button>
             <span className="stream-action-label">48.3K</span>
           </div>
           
           <div className="stream-action-item">
             <button className="stream-action-btn">
               <MessageCircle size={20} />
             </button>
             <span className="stream-action-label">78</span>
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
           <div className="stream-comments">
              {messages.length === 0 && (
                <div style={{color: 'rgba(255,255,255,0.5)', padding: '1rem', fontSize: '13px'}}>Be the first to comment...</div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className="stream-comment-bubble">
                   <div className="stream-comment-avatar" style={{backgroundColor: `hsl(${(msg.author?.length || 0) * 30}, 50%, 50%)`}}>
                     {msg.author ? msg.author.charAt(0).toUpperCase() : '?'}
                   </div>
                   <div className="stream-comment-body">
                     <span className="stream-comment-handle">@{msg.author || 'Guest'}</span>
                     <span className="stream-comment-text">{msg.text}</span>
                   </div>
                </div>
              ))}
           </div>

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
               onKeyDown={async (e) => {
                 if (e.key === 'Enter') {
                   if (!comment.trim()) return;
                   if (!currentUser) return toast.error("Log in to chat");
                   try {
                     await sendMessage(streamData.id || streamData.title, currentUser.name || 'User', comment.trim());
                     setComment('');
                   } catch(err) {
                     toast.error("Failed to post comment");
                   }
                 }
               }}
             />
           </div>
        </div>
      </div>
    </div>
  );
}
