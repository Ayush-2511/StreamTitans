import React from 'react';
import { Play, Share2, Trash2, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { CREATOR_STATS } from '../../data/creatorMockData';
import './CreatorWelcome.css';

export default function CreatorWelcome() {
  return (
    <div>
      <div className="welcome-header-area" style={{ marginBottom: '2rem' }}>
        <h1 className="welcome-title text-ink">
          Welcome back,
        </h1>
        <p className="welcome-subtitle text-ink">
          Your last stream made ₹3,240 in 45 min. Today's your chance to beat it — 843 followers are waiting.
        </p>
      </div>

      <div className="creator-welcome-section animate-slide-up">
        <div className="welcome-left">
          <div className="stat-card brutal-border bg-surface">
            <h3 className="stat-value text-ink">{CREATOR_STATS.todayEarnings}</h3>
            <p className="stat-label text-ink">TODAY'S EARNINGS</p>
            <p className="stat-trend text-orange">{CREATOR_STATS.earningsGrowth}</p>
          </div>
          <div className="stat-card brutal-border bg-surface">
            <h3 className="stat-value text-ink">{CREATOR_STATS.peakViewers}</h3>
            <p className="stat-label text-ink">PEAK VIEWERS</p>
            <p className="stat-trend text-orange">{CREATOR_STATS.viewersGrowth}</p>
          </div>
          <div className="stat-card brutal-border bg-surface">
            <h3 className="stat-value text-ink">{CREATOR_STATS.itemsSold}</h3>
            <p className="stat-label text-ink">ITEMS SOLD</p>
            <p className="stat-trend text-orange">{CREATOR_STATS.soldBreakdown}</p>
          </div>
        </div>

      <div className="welcome-right">
        <div className="last-stream-card brutal-border bg-surface">
          <div className="last-stream-header">
            <h3 className="card-title text-ink">Your last stream</h3>
            <span className="time-badge brutal-border bg-cream text-ink">ENDED 2H AGO</span>
          </div>
          
          <div className="stream-preview brutal-border" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80)' }}>
            <div className="preview-overlay">
              <span className="duration-badge brutal-border bg-ink text-cream">45:12 duration</span>
              <span className="earned-badge brutal-border bg-orange text-cream">₹3,240 earned</span>
            </div>
          </div>
          
          <div className="stream-metrics text-ink">
            <span><strong>1,247</strong> peak</span>
            <span><strong>4.2k</strong> reactions</span>
            <span><strong>318</strong> messages</span>
            <span><strong>18</strong> sold</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="creator-quests-wrapper">
      <div className="quests-header">
        <div className="qh-left">
          <div className="qh-icon">
            <Zap size={20} fill="currentColor" />
          </div>
          <div className="qh-texts">
            <h2>Creator Quests</h2>
            <p>Complete quests to level up and unlock perks</p>
          </div>
        </div>
        <div className="qh-level">LVL 2</div>
      </div>
      
      <div className="season-xp">
        <div className="xp-header">
          <span className="xp-text">Season XP</span>
          <span>450 / 1000 <span className="xp-next">Next level &rarr;</span></span>
        </div>
        <div className="xp-bar-bg">
          <div className="xp-bar-fill" style={{ width: '45%' }}></div>
        </div>
      </div>
      
      <div className="quests-grid">
        <div className="quest-card completed">
           <div className="qc-header">
              <div className="qc-icon-bg">
                <CheckCircle2 size={18} />
              </div>
              <span className="qc-xp">+100 XP</span>
           </div>
           <h3 className="qc-title">Drop 5 new listings</h3>
           <p className="qc-desc">Add at least 5 products to your inventory and publish them live.</p>
           <div className="qc-footer">
             <div className="qc-progress-row">
               <span>Completed</span>
               <span className="qc-val">5 / 5</span>
             </div>
             <div className="qc-bar-bg">
               <div className="qc-bar-fill" style={{ width: '100%' }}></div>
               <div className="qc-check"><CheckCircle2 size={10} strokeWidth={4} /></div>
             </div>
           </div>
        </div>

        <div className="quest-card">
           <div className="qc-header">
              <div className="qc-icon-bg">
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>&#9202;</span>
              </div>
              <span className="qc-xp">+250 XP</span>
           </div>
           <h3 className="qc-title">Go live for 30 minutes</h3>
           <p className="qc-desc">Host a single live stream for at least 30 continuous minutes.</p>
           <div className="qc-footer">
             <div className="qc-progress-row">
               <span>Progress</span>
               <span className="qc-val">18 / 30 min</span>
             </div>
             <div className="qc-bar-bg">
               <div className="qc-bar-fill" style={{ width: '60%' }}></div>
             </div>
           </div>
        </div>

        <div className="quest-card">
           <div className="qc-header">
              <div className="qc-icon-bg">
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>&#128214;</span>
              </div>
              <span className="qc-xp">+500 XP</span>
           </div>
           <h3 className="qc-title">Sell your first 3 items</h3>
           <p className="qc-desc">Get 3 confirmed purchases from viewers during any live session.</p>
           <div className="qc-footer">
             <div className="qc-progress-row">
               <span>Progress</span>
               <span className="qc-val">1 / 3 items</span>
             </div>
             <div className="qc-bar-bg">
               <div className="qc-bar-fill" style={{ width: '33%' }}></div>
             </div>
           </div>
        </div>
      </div>
    </div>
    
  </div>
  );
}
