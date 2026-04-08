import React from 'react';
import { Sparkles } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer animate-fade-in-up" style={{ animationDelay: '700ms' }}>
      <div className="footer-grid">
        <div className="footer-brand-col">
          <h2 className="footer-brand">
            <Sparkles className="footer-brand-icon" />
            LUMINA
          </h2>
          <p className="footer-desc">
            The next generation of fashion & thrift live commerce. Support independent sellers and sustainable fashion.
          </p>
        </div>
        <div>
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Start Selling</a></li>
            <li><a href="#" className="footer-link">Find Drops</a></li>
            <li><a href="#" className="footer-link">Live Schedule</a></li>
            <li><a href="#" className="footer-link">Download App</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Help Center</a></li>
            <li><a href="#" className="footer-link">Trust & Safety</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copyright">© 2026 Lumina Inc.</span>
        <div className="footer-socials">
            <div className="social-bubble brutal-border">X</div>
            <div className="social-bubble brutal-border">IG</div>
            <div className="social-bubble brutal-border">TT</div>
        </div>
      </div>
    </footer>
  );
}
