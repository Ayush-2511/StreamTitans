import React, { useState } from 'react';
import { CreditCard, Wallet, Plus, CheckCircle2 } from 'lucide-react';
import './WalletView.css';

export default function WalletView() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [balance, setBalance] = useState(0.00);
  const [amount, setAmount] = useState('250.00');

  const handleTopUp = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setBalance(prev => prev + parseFloat(amount || 0));
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="wallet-view animate-fade-in-up">
      <div className="wallet-layout">
        {/* Left Column: Balance & Card Preview */}
        <div className="wallet-column">
          <div className="wallet-balance-card brutal-border">
            <div className="balance-header">
              <Wallet size={20} />
              <span>Available Balance</span>
            </div>
            <h2 className="balance-amount">${balance.toFixed(2)}</h2>
          </div>

          <div className="credit-card-preview brutal-border">
            <div className="card-top">
              <span className="card-brand">Lumina Card</span>
              <CreditCard size={24} />
            </div>
            <div className="card-chip"></div>
            <div className="card-number">**** **** **** 3463</div>
            <div className="card-bottom">
              <div className="card-info">
                <span className="info-label">Card Holder</span>
                <span className="info-value">Alex Collector</span>
              </div>
              <div className="card-info">
                <span className="info-label">Expires</span>
                <span className="info-value">05/26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Top Up Form */}
        <div className="wallet-column form-column">
          <div className="top-up-container brutal-border">
            <h3 className="form-title">Top Up Wallet</h3>
            {isSuccess ? (
              <div className="success-state animate-fade-in-up">
                <CheckCircle2 size={64} className="success-icon" />
                <h4 className="success-title">Payment Successful</h4>
                <p className="success-desc">
                  Your top-up of ${parseFloat(amount).toFixed(2)} has been successfully added to your wallet.
                </p>
              </div>
            ) : (
              <form className="top-up-form" onSubmit={handleTopUp}>
                <div className="form-group">
                  <label>Amount to Add</label>
                  <div className="amount-input-wrapper brutal-border">
                    <span className="currency-symbol">$</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1" 
                      step="0.01" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-separator">Payment Method</div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" className="brutal-input brutal-border" defaultValue="1234 5678 9101 3463" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Valid Until</label>
                    <input type="text" className="brutal-input brutal-border" placeholder="MM/YY" defaultValue="05/26" required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="password" className="brutal-input brutal-border" placeholder="***" defaultValue="123" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Card Holder</label>
                  <input type="text" className="brutal-input brutal-border" placeholder="Name on card" defaultValue="Alex Collector" required />
                </div>

                <button type="submit" className="btn-primary-large brutal-border mt-4" style={{ width: '100%', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Place Order</span>
                  <Plus size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
