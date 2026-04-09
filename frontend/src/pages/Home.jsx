import React, { useState, useEffect } from 'react';
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
import { useUserActivity } from '../context/UserActivityContext';
import { ArrowLeft, Sparkles } from 'lucide-react';
import './Home.css';

export default function Home({ isDark, toggleDark, isAuthenticated, onOpenAuth, onBackParent, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'Discover');
  const [tabHistory, setTabHistory] = useState([initialTab || 'Discover']);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const { scoreItem } = useUserActivity();

  const TAB_FROM_HASH = {
    '#/discover': 'Discover',
    '#/ecommerce': 'E-commerce',
    '#/thrift': 'Thrift',
    '#/cart': 'Cart',
    '#/wallet': 'Wallet',
    '#/profile': 'Profile',
    '#/settings': 'Settings',
  };

  // Sync activeTab → URL hash (push only, doesn't trigger popstate)
  useEffect(() => {
    const tabToHash = {
      'Discover': '#/discover',
      'E-commerce': '#/ecommerce',
      'Thrift': '#/thrift',
      'Cart': '#/cart',
      'Wallet': '#/wallet',
      'Profile': '#/profile',
      'Settings': '#/settings',
    };
    const hash = tabToHash[activeTab];
    // Only push if the target hash is NOT already in the address bar
    if (hash && window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  }, [activeTab]);

  // Browser back/forward → sync activeTab from hash
  useEffect(() => {
    const handlePopState = () => {
      const tab = TAB_FROM_HASH[window.location.hash];
      if (tab && tab !== activeTab) {
        setActiveTab(tab);
        // trim tabHistory so the back button (floating arrow) also works correctly
        setTabHistory(prev => {
          const idx = prev.lastIndexOf(tab);
          return idx >= 0 ? prev.slice(0, idx + 1) : [tab];
        });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab]);


  const personalizedFeed = [...THRIFT_POLAROIDS].sort((a, b) => {
    const scoreA = scoreItem(a.title);
    const scoreB = scoreItem(b.title);
    if (scoreA !== scoreB) return scoreB - scoreA;
    return Math.random() - 0.5;
  });

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

        <div className="tab-transition-wrapper">
          {activeTab === 'Discover' && <Hero isAuthenticated={isAuthenticated} />}

          {activeTab === 'Discover' && (
            <>
              <FilterBar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                isLiveOnly={isLiveOnly}
                onLiveOnlyChange={setIsLiveOnly}
              />
              <LiveDeck
                activeCategory={activeCategory}
                isLiveOnly={isLiveOnly}
                onSeeAll={() => navigateToTab('E-commerce')}
              />
              {!isLiveOnly && <PastStreams onSeeAll={() => navigateToTab('Thrift')} />}
              <MasonryGrid activeCategory={activeCategory} />
              <ThriftBand onNavigate={() => navigateToTab('Thrift')} />
              <ThriftBand subtitle="For You" title="Personalized Feed" data={personalizedFeed} onNavigate={() => navigateToTab('Thrift')} />
              <ThriftBand subtitle="Curated Archives" title="Vintage Grails" data={[...THRIFT_POLAROIDS].reverse()} onNavigate={() => navigateToTab('Thrift')} />
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

          {activeTab === 'E-commerce' && <EcommerceView />}

          {activeTab === 'Cart' && <CartView onBack={handleBack} />}

          {activeTab === 'Wallet' && (
            isAuthenticated ? (
              <WalletView />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', gap: '1rem', textAlign: 'center' }}>
                <Sparkles size={40} style={{ color: 'var(--color-orange)' }} />
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Sign in to view your Wallet</h2>
                <p style={{ color: 'var(--color-gray-dark)', maxWidth: '300px' }}>Track your earnings, manage payouts, and unlock exclusive buyer rewards.</p>
                <button
                  onClick={() => onOpenAuth('login')}
                  style={{ background: 'var(--color-ink)', color: 'var(--color-cream)', border: 'none', padding: '12px 28px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem', boxShadow: '3px 3px 0 0 var(--color-orange)' }}
                >
                  Sign In / Sign Up
                </button>
              </div>
            )
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
              position: 'fixed', bottom: '30px', left: '30px', zIndex: 9998,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#1a1a1a', color: '#fff',
              border: '1.5px solid #1a1a1a', width: '48px', height: '48px',
              borderRadius: '50%', boxShadow: '4px 4px 0 0 #FF5B22',
              cursor: 'pointer', transition: 'transform 0.2s ease'
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
