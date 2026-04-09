import React, { useState, useEffect } from 'react';
import CreatorNavbar from '../components/creator/CreatorNavbar';
import CreatorWelcome from '../components/creator/CreatorWelcome';
import CreatorPerformance from '../components/creator/CreatorPerformance';
import CreatorStreams from '../components/creator/CreatorStreams';
import CreatorListingsTab from '../components/creator/tabs/CreatorListingsTab';
import CreatorOrdersTab from '../components/creator/tabs/CreatorOrdersTab';
import CreatorAnalyticsTab from '../components/creator/tabs/CreatorAnalyticsTab';
import CreatorStreamsTab from '../components/creator/tabs/CreatorStreamsTab';
import CreatorProfileView from '../components/creator/CreatorProfileView';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './CreatorDashboard.css';

const TAB_TO_HASH = {
  'Dashboard': '#/dashboard',
  'My Streams': '#/dashboard/streams',
  'Listings': '#/dashboard/listings',
  'Orders': '#/dashboard/orders',
  'Analytics': '#/dashboard/analytics',
  'Profile': '#/dashboard/profile',
};

const HASH_TO_TAB = Object.fromEntries(
  Object.entries(TAB_TO_HASH).map(([tab, hash]) => [hash, tab])
);

export default function CreatorDashboard({ isDark, toggleDark }) {
  const [activeTab, setActiveTab] = useState(() => {
    return HASH_TO_TAB[window.location.hash] || 'Dashboard';
  });

  // Sync activeTab -> URL hash
  useEffect(() => {
    const hash = TAB_TO_HASH[activeTab];
    if (hash && window.location.hash !== hash) {
      window.history.pushState({ creatorTab: activeTab }, '', hash);
    }
  }, [activeTab]);

  // Browser back/forward -> sync activeTab from hash
  useEffect(() => {
    const handlePopState = () => {
      const tab = HASH_TO_TAB[window.location.hash];
      if (tab && tab !== activeTab) {
        setActiveTab(tab);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 'Profile': return <CreatorProfileView />;
      case 'My Streams': return <CreatorStreamsTab />;
      case 'Listings': return <CreatorListingsTab />;
      case 'Orders': return <CreatorOrdersTab />;
      case 'Analytics': return <CreatorAnalyticsTab />;
      default: 
        return (
          <>
            <CreatorWelcome />
            <CreatorPerformance />
            <CreatorStreams />
          </>
        );
    }
  };

  return (
    <div className="creator-container">
      <div className="creator-wrapper">
        <CreatorNavbar isDark={isDark} toggleDark={toggleDark} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="creator-main-content">
          {renderTab()}
        </div>
        <Footer />
      </div>
    </div>
  );
}
