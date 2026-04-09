import React from 'react';
import { ChevronRight } from 'lucide-react';
import { THRIFT_POLAROIDS } from '../data/mockData';
import { useStream } from '../context/StreamContext';
import './ThriftBand.css';

export default function ThriftBand({ subtitle = "Live Thrift Drops", title = "Fast Moving Pieces", data = THRIFT_POLAROIDS, onNavigate }) {
  const { openStream } = useStream();

  return (
    <section className="thrift-section animate-fade-in-up" style={{ animationDelay: '600ms' }}>
      <div className="thrift-header">
         <div>
           <div className="thrift-subtitle">{subtitle}</div>
           <h3 className="thrift-title">{title}</h3>
         </div>
          <button className="thrift-see-all" onClick={onNavigate}>
           View All <ChevronRight className="see-all-icon" />
         </button>
      </div>

      <div className="thrift-carousel">
         {data.map((item) => (
            <div 
              key={item.id} 
              className="thrift-polaroid"
              onClick={() => openStream({
                title: item.title,
                seller: '@thrift_seller',
                sellerName: 'Thrift Seller',
                viewers: '2.4K',
                category: 'Thrift'
              })}
              style={{ cursor: 'pointer' }}
            >
              <div className="thrift-img" style={{ backgroundImage: `url(${item.img})` }}></div>
              <div className="thrift-content">
                <h4 className="thrift-item-title">{item.title}</h4>
                <p className="thrift-item-price">{item.price}</p>
              </div>
            </div>
         ))}
         <div className="thrift-more-btn">
           <ChevronRight className="icon-large" />
         </div>
      </div>
    </section>
  );
}
