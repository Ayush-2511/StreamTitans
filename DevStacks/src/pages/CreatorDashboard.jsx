import React, { useState } from 'react';
import CreatorNavbar from '../components/creator/CreatorNavbar';
import CreatorWelcome from '../components/creator/CreatorWelcome';
import CreatorPerformance from '../components/creator/CreatorPerformance';
import CreatorStreams from '../components/creator/CreatorStreams';
import CreatorListingsTab from '../components/creator/tabs/CreatorListingsTab';
import CreatorOrdersTab from '../components/creator/tabs/CreatorOrdersTab';
import CreatorAnalyticsTab from '../components/creator/tabs/CreatorAnalyticsTab';
import CreatorStreamsTab from '../components/creator/tabs/CreatorStreamsTab';
import Footer from '../components/Footer';
import './CreatorDashboard.css';

export default function CreatorDashboard({ isDark, toggleDark }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderTab = () => {
    switch (activeTab) {
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
