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
import ProfileLayout from '../components/profile/ProfileLayout';
import { THRIFT_POLAROIDS } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';
import './Home.css';

export default function Home({ isDark, toggleDark, isAuthenticated, onOpenAuth, onBackParent }) {
  const [activeTab, setActiveTab] = useState('Discover');
  const [tabHistory, setTabHistory] = useState(['Discover']);

  const navigateToTab = (tab) => {
    if (tab !== activeTab) {
      setTabHistory(prev => [...prev, tab]);
      setActiveTab(tab);
    }
  };

  const handleBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop();
      setTabHistory(newHistory);
      setActiveTab(newHistory[newHistory.length - 1]);
    } else if (onBackParent) {
      onBackParent();
    }
  };

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <Navbar
          isDark={isDark}
          toggleDark={toggleDark}
          isAuthenticated={isAuthenticated}
          onOpenAuth={onOpenAuth}
          activeTab={activeTab}
          setActiveTab={navigateToTab}
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
            <CartView onBack={handleBack} />
          )}

          {activeTab === 'Wallet' && (
            <WalletView />
          )}

          {(activeTab === 'Profile' || activeTab === 'Settings') && (
            <ProfileLayout activeSubTab={activeTab === 'Settings' ? 'settings' : 'profile'} onChange={navigateToTab} />
          )}
        </div>

        {tabHistory.length > 1 && (
          <button 
            onClick={handleBack}
            className="animate-fade-in-up"
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '30px',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1a1a1a',
              color: '#fff',
              border: '1.5px solid #1a1a1a',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              boxShadow: '4px 4px 0 0 #FF5B22',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <Footer />
      </div>
    </div>
  );
}
