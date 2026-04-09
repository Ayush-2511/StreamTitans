import React, { useState } from 'react';
import { Play, Calendar, Flame, Target, MessageCircle, ArrowRight } from 'lucide-react';
import { PAST_STREAMS, UPCOMING_DROPS } from '../../data/creatorMockData';
import './CreatorStreams.css';

export default function CreatorStreams({ storeMode = 'Thrifting' }) {
  const [activeTab, setActiveTab] = useState('replays');

  return (
    <div className="streams-section animate-slide-up" style={{ animationDelay: '0.2s', marginTop: '1rem' }}>
      
      {/* Your Streams Carousel Area */}
      <div className="streams-at-glance brutal-border bg-cream">
        <div className="glance-header">
          <p className="glance-label text-orange">● YOUR {storeMode.toUpperCase()} CONTENT</p>
          <h2 className="glance-title text-ink">Your {storeMode === 'Thrifting' ? 'thrift drops' : 'retail streams'}, <span className="text-orange italic">at a glance</span></h2>
          
          <div className="glance-tabs">
            <button 
              className={`glance-tab brutal-border ${activeTab === 'replays' ? 'bg-ink text-cream' : 'bg-surface text-ink'}`}
              onClick={() => setActiveTab('replays')}
            >
              🎬 Past Replays
            </button>
            <button 
              className={`glance-tab brutal-border ${activeTab === 'scheduled' ? 'bg-ink text-cream' : 'bg-surface text-ink'}`}
              onClick={() => setActiveTab('scheduled')}
            >
              📅 Scheduled
            </button>
            <button 
              className={`glance-tab brutal-border ${activeTab === 'top' ? 'bg-ink text-cream' : 'bg-surface text-ink'}`}
              onClick={() => setActiveTab('top')}
            >
              🛍️ Top Products
            </button>
          </div>
        </div>

        <div className="glance-carousel">
          {PAST_STREAMS.map((stream, idx) => (
            <div 
              key={stream.id} 
              className={`glance-card brutal-border glance-card-v${(idx % 5) + 1}`}
            >
              <div className="glance-card-bg" style={{ backgroundImage: `url(${stream.img})` }}></div>
              <div className="glance-card-overlay"></div>
              
              <div className="glance-card-content">
                <div className="card-top-badges">
                  <span className="badge brutal-border bg-orange text-cream">👁 {stream.viewers}</span>
                  <span className="badge brutal-border bg-cream text-ink">{stream.earnings}</span>
                </div>
                <h3 className="glance-card-title">{stream.title}</h3>
                <p className="glance-card-time">{stream.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="glance-footer">
          <h3 className="text-ink whitespace-nowrap">Your store, <span className="text-orange italic">your way</span></h3>
          <button className="new-listing-btn brutal-border bg-ink text-cream font-bold px-6 py-2 rounded-full">+ NEW LISTING</button>
        </div>
      </div>

      {/* Plan Ahead Section */}
      <div className="plan-ahead-section">
        <p className="glance-label text-orange">✦ UPCOMING & INSIGHTS</p>
        <h2 className="glance-title text-ink mb-6">Plan ahead, <span className="text-orange italic">sell smarter</span></h2>
        
        <div className="plan-grid">
          {/* Upcoming drops cards */}
          {UPCOMING_DROPS.map((drop, idx) => (
            <div key={drop.id} className="upcoming-card brutal-border bg-surface" style={{ transform: `rotate(${idx === 0 ? '-2deg' : '2deg'})` }}>
              <div className="tape-top bg-orange"></div>
              <img src={drop.img} alt={drop.title} className="upcoming-img brutal-border" />
              <div className="upcoming-info">
                <h4>{drop.title}</h4>
                <p className="flex items-center gap-1 opacity-70"><Calendar size={14}/> {drop.date}</p>
                <div className="upcoming-bottom">
                  <span className="est-viewers text-orange font-bold">↑ Est. {drop.estViewers} viewers</span>
                  <button className="edit-btn brutal-border bg-cream">Edit →</button>
                </div>
              </div>
            </div>
          ))}

          {/* Schedule Next Stream */}
          <div className="schedule-card brutal-border bg-ink text-cream flex flex-col justify-center items-center">
            <div className="calendar-icon brutal-border bg-cream text-ink mb-4 p-2 rounded-lg font-bold text-center">
              <div className="text-xs text-orange border-b border-ink pb-1 mb-1">JUL</div>
              <div className="text-xl">17</div>
            </div>
            <h4 className="font-bold mb-4">Schedule your next stream</h4>
            <button className="action-btn brutal-border bg-orange text-cream font-bold px-6 py-2 rounded-full">+ Schedule</button>
          </div>
        </div>

        {/* Insights */}
        <div className="insights-row mt-6 grid grid-cols-3 gap-6">
          <div className="insight-card brutal-border bg-ink text-cream p-6 rounded-2xl">
            <Flame className="text-orange mb-3" size={24} />
            <h4 className="font-bold text-lg mb-2">Peak time is 7–9 PM</h4>
            <p className="opacity-80 text-sm mb-4 leading-relaxed">Your last 5 streams showed 40% more viewers during evening slots. Try scheduling your next drop then.</p>
            <a href="#" className="text-orange font-bold text-sm">Set reminder →</a>
          </div>
          <div className="insight-card brutal-border bg-ink text-cream p-6 rounded-2xl">
            <Target className="text-green-400 mb-3" size={24} />
            <h4 className="font-bold text-lg mb-2">Thrift items claim 3x faster</h4>
            <p className="opacity-80 text-sm mb-4 leading-relaxed">Your thrift products sell out in under 8 seconds on average. Stock up before your next stream.</p>
            <a href="#" className="text-orange font-bold text-sm">Add thrift listings →</a>
          </div>
          <div className="insight-card brutal-border bg-ink text-cream p-6 rounded-2xl">
            <MessageCircle className="text-white mb-3" size={24} />
            <h4 className="font-bold text-lg mb-2">Chat drives purchases</h4>
            <p className="opacity-80 text-sm mb-4 leading-relaxed">Streams where you answered 10+ questions had 2x higher conversion. Keep the chat active!</p>
            <a href="#" className="text-orange font-bold text-sm">See full analytics →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
