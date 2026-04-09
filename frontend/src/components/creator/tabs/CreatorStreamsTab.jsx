import React, { useState } from 'react';
import { Calendar, Video, Users, PlayCircle, Settings } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { createStream } from '../../../firebase/firestore';
import toast from 'react-hot-toast';
import './CreatorStreamsTab.css';

export default function CreatorStreamsTab() {
  const [storeMode, setStoreMode] = useState('Thrifting');
  const { currentUser } = useAuth();

  const streamData = storeMode === 'Thrifting' 
    ? { title: "Festive Ethnic Collection Drop", date: "Today · 7:00 PM · 3 products scheduled", views: "14.2k", watchTime: "8,450h", msg: "32.1k", rev: "₹48.2k" }
    : { title: "Retail Clearance Bulk Drop", date: "Today · 5:00 PM · 150 items scheduled", views: "8.1k", watchTime: "4,120h", msg: "12.5k", rev: "₹18.5k" };

  const handleGoLive = async () => {
    if (!currentUser) return toast.error("Not authenticated");
    try {
      await createStream({
        title: streamData.title,
        category: storeMode,
        sellerId: currentUser.userId,
        sellerName: currentUser.name || "Creator",
        isLive: true,
      });
      toast.success("You are now LIVE! 🔴");
    } catch (err) {
      toast.error("Error going live: " + err.message);
    }
  };

  return (
    <div className="streams-tab animate-slide-up">
      <div className="streams-header-area">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 className="streams-title" style={{ fontSize: '40px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-ink)' }}>My Streams</h1>
            <p className="streams-subtitle" style={{ fontSize: '18px', opacity: 0.8, fontWeight: 500, margin: 0, color: 'var(--color-ink)' }}>Manage your live broadcasts, schedule drops, and more</p>
          </div>
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
        </div>
      </div>

      <div className="stream-cards-grid">
        <div className="s-card white">
          <div className="s-card-icon bg-gray">
             <Calendar size={24} />
          </div>
          <h3 className="s-card-title">Schedule<br/>Stream</h3>
          <p className="s-card-desc">Plan your next broadcast and set a date, time, and product drop list. &rarr;</p>
        </div>
        
        <div className="s-card white">
          <div className="s-card-icon bg-gray">
             <Video size={24} />
          </div>
          <h3 className="s-card-title">Test<br/>Stream</h3>
          <p className="s-card-desc">Check your camera, mic, and connection quality before going live. &rarr;</p>
        </div>
        
        <div className="s-card black relative">
          <span className="s-badge-new">New</span>
          <div className="s-card-icon bg-dark">
             <Users size={24} />
          </div>
          <h3 className="s-card-title">Co-<br/>Stream</h3>
          <p className="s-card-desc">Invite a guest creator to your live. Grow your audience together. &rarr;</p>
        </div>
        
        <div className="s-card white">
          <div className="s-card-icon bg-gray">
             <PlayCircle size={24} />
          </div>
          <h3 className="s-card-title">Past<br/>Replays</h3>
          <p className="s-card-desc">Rewatch, clip, and reshare your previous broadcasts to any platform. &rarr;</p>
        </div>
        
        <div className="s-card orange" onClick={handleGoLive} style={{ cursor: 'pointer' }}>
          <div className="s-card-icon bg-orange-light">
             <Settings size={24} />
          </div>
          <h3 className="s-card-title">Go Live<br/>Now</h3>
          <p className="s-card-desc">Start a broadcast instantly. Your followers will be notified right away.&rarr;</p>
        </div>
      </div>

      <div className="upcoming-bar">
         <div className="ub-left">
            <div className="ub-icon"><Calendar size={20} color="#4f46e5" /></div>
            <div>
               <h4 className="ub-title">Upcoming — {streamData.title}</h4>
               <p className="ub-sub">{streamData.date}</p>
            </div>
         </div>
         <div className="ub-actions">
            <button className="ub-btn">Edit</button>
            <button className="ub-btn">Preview</button>
            <button className="ub-btn primary" onClick={handleGoLive}>Go Live &rarr;</button>
         </div>
      </div>

      <div className="streams-metrics">
         <div className="sm-card">
            <h4 className="sm-label">TOTAL VIEWS</h4>
            <h3 className="sm-val">{streamData.views}</h3>
         </div>
         <div className="sm-card">
            <h4 className="sm-label">WATCH TIME</h4>
            <h3 className="sm-val">{streamData.watchTime}</h3>
         </div>
         <div className="sm-card">
            <h4 className="sm-label">CHAT MESSAGES</h4>
            <h3 className="sm-val">{streamData.msg}</h3>
         </div>
         <div className="sm-card">
            <h4 className="sm-label">AVG. PEAK VIEWERS</h4>
            <h3 className="sm-val">940</h3>
            <p className="sm-sub">Last 7 streams</p>
         </div>
         <div className="sm-card">
            <h4 className="sm-label">REVENUE FROM STREAMS</h4>
            <h3 className="sm-val">{streamData.rev}</h3>
            <p className="sm-sub">All time</p>
         </div>
      </div>
    </div>
  );
}
