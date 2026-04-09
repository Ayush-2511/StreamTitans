import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EcommerceHero from '../components/EcommerceHero';
import ThriftLiveDrops from '../components/thrift-v2/ThriftLiveDrops';
import ThriftTopSellers from '../components/thrift-v2/ThriftTopSellers';
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
import EcommerceView from '../components/ecommerce-v2/EcommerceView';
import CartView from '../components/CartView';
import WalletView from '../components/WalletView';
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
        
        <div key={activeTab} className="animate-fade-in-up tab-transition-wrapper">
          {activeTab === 'Discover' && <Hero isAuthenticated={isAuthenticated} />}
          
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
              <ThriftLiveDrops />
              <CategoryBrowser />
              <FeaturedDrops />
              <WatermarkBanner />
              <ThriftTopSellers />
            </div>
          )}

          {activeTab === 'E-commerce' && (
            <EcommerceView />
          )}

          {activeTab === 'Cart' && (
            <CartView onBack={() => setActiveTab('Discover')} />
          )}

          {activeTab === 'Wallet' && (
            <WalletView />
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
