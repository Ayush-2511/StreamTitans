import React, { useState } from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import './WalletView.css';

export default function WalletView() {
  const [amount, setAmount] = useState('250.00');

  const handleTopUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wallet-view-dark animate-fade-in-up">
      <div className="wallet-layout-dark">
        
        {/* Left Column */}
        <div className="wallet-left-column">
          {/* Balance Card */}
          <div className="wallet-card-dark">
            <div className="balance-header-dark">
              <ShoppingBag size={16} />
              <span>AVAILABLE BALANCE</span>
            </div>
            <h2 className="balance-amount-dark">$0.00</h2>
            
            <div className="balance-stats-dark">
              <div className="stat-box-dark">
                <span className="stat-label-dark">Spent this month</span>
                <span className="stat-value-dark">$124.50</span>
              </div>
              <div className="stat-box-dark">
                <span className="stat-label-dark">Thrift savings</span>
                <span className="stat-value-dark text-green-dark">$38.20 saved</span>
              </div>
            </div>
          </div>

          {/* Lumina Card */}
          <div className="wallet-card-dark lumina-card-box">
            <div className="lumina-card-top">
              <span className="lumina-card-title">Lumina Card</span>
              <div className="lumina-card-chip"></div>
            </div>
            <div className="lumina-card-number">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span>3463</span>
            </div>
            <div className="lumina-card-bottom">
              <div className="lumina-card-info">
                <span className="info-label-dark">CARD HOLDER</span>
                <span className="info-value-dark">Alex Collector</span>
              </div>
              <div className="lumina-card-info text-right">
                <span className="info-label-dark">EXPIRES</span>
                <span className="info-value-dark">05/26</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="wallet-card-dark">
            <div className="activity-header">
              <h3 className="card-title-dark">Recent activity</h3>
              <button className="text-btn-dark">See all</button>
            </div>
            
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon-box bg-green-light">
                  <Plus size={16} className="text-green-icon" />
                </div>
                <div className="activity-details">
                  <span className="activity-name">Wallet top-up</span>
                  <span className="activity-date">Mar 28</span>
                </div>
                <span className="activity-amount text-green-dark">+$100.00</span>
              </div>

              <div className="activity-item">
                <div className="activity-icon-box bg-red-light">
                  <ShoppingBag size={16} className="text-red-icon" />
                </div>
                <div className="activity-details">
                  <span className="activity-name">Vintage denim jacket</span>
                  <span className="activity-date">Mar 25 • Thrift</span>
                </div>
                <span className="activity-amount text-red-dark">-$42.00</span>
              </div>

              <div className="activity-item">
                <div className="activity-icon-box bg-red-light">
                  <ShoppingBag size={16} className="text-red-icon" />
                </div>
                <div className="activity-details">
                  <span className="activity-name">Ceramic bowl set</span>
                  <span className="activity-date">Mar 22 • E-commerce</span>
                </div>
                <span className="activity-amount text-red-dark">-$18.50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Top up wallet) */}
        <div className="wallet-right-column">
          <div className="wallet-card-dark form-card">
            <h3 className="card-title-dark mb-lg">Top up wallet</h3>
            
            <form onSubmit={handleTopUp} className="dark-form">
              <div className="form-group-dark">
                <label>Amount to add</label>
                <div className="amount-input-box">
                  <span className="currency-symbol-dark">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1" 
                    step="0.01" 
                  />
                </div>
                <div className="quick-amounts">
                  <button type="button" className={`quick-amount-btn ${amount === '25.00' ? 'active' : ''}`} onClick={() => setAmount('25.00')}>$25</button>
                  <button type="button" className={`quick-amount-btn ${amount === '50.00' ? 'active' : ''}`} onClick={() => setAmount('50.00')}>$50</button>
                  <button type="button" className={`quick-amount-btn ${amount === '100.00' ? 'active' : ''}`} onClick={() => setAmount('100.00')}>$100</button>
                  <button type="button" className={`quick-amount-btn ${amount === '250.00' ? 'active' : ''}`} onClick={() => setAmount('250.00')}>$250</button>
                </div>
              </div>

              <div className="form-separator-dark">
                <span>PAYMENT METHOD</span>
              </div>

              <div className="form-group-dark">
                <label>Card number</label>
                <input type="text" className="dark-input" defaultValue="1234 5678 9101 3463" />
              </div>

              <div className="form-row-dark">
                <div className="form-group-dark">
                  <label>Valid until</label>
                  <input type="text" className="dark-input" defaultValue="05/26" />
                </div>
                <div className="form-group-dark">
                  <label>CVV</label>
                  <div className="password-input-wrapper">
                     <span className="mock-dots">•••</span>
                  </div>
                </div>
              </div>

              <div className="form-group-dark">
                <label>Card holder</label>
                <input type="text" className="dark-input" defaultValue="Alex Collector" />
              </div>

              <button type="submit" className="place-order-btn">
                <span>Place order</span>
                <div className="btn-icon-circle">
                  <Plus size={14} />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
