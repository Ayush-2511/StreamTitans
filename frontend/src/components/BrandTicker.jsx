import React from 'react';
import { BRANDS_LIST } from '../data/mockData';
import { Diamond } from 'lucide-react';
import './BrandTicker.css';

export default function BrandTicker() {
  const introText = "AUTHENTICATED PIECES FROM BELOVED LABELS";
  
  // We duplicate the items a few times to create a seamless infinite scroll loop
  const tickerItems = [...BRANDS_LIST, ...BRANDS_LIST, ...BRANDS_LIST];

  return (
    <div className="brand-ticker-container brutal-border">
      <div className="brand-ticker-intro">
        <span>{introText}</span>
      </div>
      <div className="brand-ticker-scroll">
        <div className="brand-ticker-track">
          {tickerItems.map((brand, idx) => (
            <React.Fragment key={idx}>
              <Diamond size={12} className="brand-ticker-separator" />
              <span className="brand-name">{brand}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
