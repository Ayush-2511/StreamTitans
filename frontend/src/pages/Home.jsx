import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EcommerceHero from '../components/EcommerceHero';
import BrandTicker from '../components/BrandTicker';
import CategoryBrowser from '../components/CategoryBrowser';
import FeaturedDrops from '../components/FeaturedDrops';
import WatermarkBanner from '../components/WatermarkBanner';
import FilterBar from '../components/FilterBar';
import LiveDeck from '../components/LiveDeck';
import MasonryGrid from '../components/MasonryGrid';
import ThriftBand from '../components/ThriftBand';
import PastStreams from '../components/PastStreams';
import Footer from '../components/Footer';
import { THRIFT_POLAROIDS } from '../data/mockData';
import './Home.css';

export default function Home({ isDark, toggleDark, isAuthenticated, onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('Discover');

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <Navbar
          isDark={isDark}
          toggleDark={toggleDark}
          isAuthenticated={isAuthenticated}
          onOpenAuth={onOpenAuth}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {activeTab !== 'Thrift' && <Hero isAuthenticated={isAuthenticated} />}
        
        {activeTab === 'Discover' && (
          <>
            <FilterBar />
            <LiveDeck />
            <PastStreams />
            <MasonryGrid />
            <ThriftBand />
            <ThriftBand subtitle="Curated Archives" title="Vintage Grails" data={[...THRIFT_POLAROIDS].reverse()} />
            <ThriftBand subtitle="Eco-Conscious Finds" title="Sustainable Staples" data={[...THRIFT_POLAROIDS].sort(() => Math.random() - 0.5)} />
          </>
        )}

        {activeTab === 'Thrift' && (
          <div className="ecommerce-page-vibe" style={{ display: 'flex', flexDirection: 'column' }}>
            <EcommerceHero />
            <BrandTicker />
            <CategoryBrowser />
            <FeaturedDrops />
            <WatermarkBanner />
          </div>
        )}

        {activeTab === 'E-commerce' && (
          <>
            <FilterBar />
            <LiveDeck />
            <PastStreams />
            <MasonryGrid />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
