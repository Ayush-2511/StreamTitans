import React, { useRef } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { LIVE_DECK } from '../data/mockData';
import { useStream } from '../context/StreamContext';
import './LiveDeck.css';

export default function LiveDeck({ activeCategory = 'ALL', isLiveOnly = false, onSeeAll }) {
  const { openStream } = useStream();
  const sectionRef = useRef(null);

  const filteredCards = LIVE_DECK.filter(card =>
    activeCategory === 'ALL' || card.category === activeCategory
  );

  const handleSeeAll = () => {
    if (onSeeAll) return onSeeAll();
    document.getElementById('past-streams-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="live-deck-section" className="live-deck animate-fade-in-up" style={{ animationDelay: '400ms' }} ref={sectionRef}>
      <div className="live-deck-header">
         <div className="live-deck-title-group">
            <h3 className="live-deck-title">
              <Play className="live-deck-icon" />
              LIVE STREAMS
            </h3>
            <p className="live-deck-subtitle">Ongoing Streams &amp; Try-ons</p>
         </div>
         <button className="live-deck-see-all" onClick={handleSeeAll}>
           See All 14 <ChevronRight className="see-all-icon" />
         </button>
      </div>

      <div className="live-carousel">
         {filteredCards.length === 0 ? (
           <p style={{ color: 'var(--text-secondary, #888)', padding: '1rem 0', fontSize: '0.9rem' }}>
             No live streams in this category right now.
           </p>
         ) : (
           filteredCards.map((card) => (
             <div
               key={card.id}
               className={`live-card brutal-border ${card.variantClass}`}
               onClick={() => openStream({
                 title: card.title,
                 seller: card.seller,
                 sellerName: card.seller.replace('@', ''),
                 viewers: card.viewers,
                 category: card.category || 'Discover'
               })}
               style={{ cursor: 'pointer' }}
             >
               <div className="live-card-bg" style={{ backgroundImage: `url(${card.image})` }}></div>
               <div className="live-card-overlay"></div>

               <div className="live-card-content">
                 <div className="live-card-badge">
                   <span className="live-card-dot"></span>
                   {card.viewers} Viewers
                 </div>
                 <h4 className="live-card-title">{card.title}</h4>
                 <p className="live-card-seller">{card.seller}</p>
               </div>
             </div>
           ))
         )}
      </div>
    </section>
  );
}
