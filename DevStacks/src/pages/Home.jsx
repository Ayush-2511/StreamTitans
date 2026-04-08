import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import LiveDeck from '../components/LiveDeck';
import MasonryGrid from '../components/MasonryGrid';
import ThriftBand from '../components/ThriftBand';
import Footer from '../components/Footer';
import './Home.css';

export default function Home({ isDark, toggleDark }) {
  return (
    <div className="home-container">
      <div className="home-wrapper">
        <Navbar isDark={isDark} toggleDark={toggleDark} />
        <Hero />
        <FilterBar />
        <LiveDeck />
        <MasonryGrid />
        <ThriftBand />
        <Footer />
      </div>
    </div>
  );
}
