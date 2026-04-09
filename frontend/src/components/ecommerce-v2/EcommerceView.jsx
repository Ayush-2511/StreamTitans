import React from 'react';
import PromoHero from './PromoHero';
import LiveStreamsGrid from './LiveStreamsGrid';
import TrendingBar from './TrendingBar';
import DealOfTheHour from './DealOfTheHour';
import CategorySection from './CategorySection';
import HotRightNow from './HotRightNow';
import CuratedPicks from './CuratedPicks';
import './EcommerceView.css';

export default function EcommerceView() {
  return (
    <div className="ecommerce-v2-container">
      <PromoHero />
      <div className="ecommerce-v2-content">
        <LiveStreamsGrid />
        <TrendingBar />
        <DealOfTheHour />
        <CategorySection />
        <HotRightNow />
        <CuratedPicks />
      </div>
    </div>
  );
}
