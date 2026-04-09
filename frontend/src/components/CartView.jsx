import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, CreditCard, Wallet } from 'lucide-react';
import './CartView.css';

export default function CartView({ onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="cart-view animate-fade-in-up">
      <div className="cart-header brutal-border">
        <h2 className="cart-title">Your Cart</h2>
        <span className="cart-count">0 items</span>
      </div>

      <div className="cart-body brutal-border">
        <div className="cart-empty-state">
          <div className="cart-empty-icon-container brutal-border">
            <ShoppingBag className="cart-empty-icon" />
          </div>
          <h3 className="cart-empty-title">It's awfully quiet in here</h3>
          <p className="cart-empty-desc">
            You haven't added any vintage finds or grails yet.
            Explore the archives and start claiming drops.
          </p>
          <button className="action-btn brutal-border cart-explore-btn" onClick={onBack}>
            Return to Gallery
          </button>
        </div>
      </div>

      <div className="cart-footer brutal-border">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Subtotal</span>
          <span className="cart-summary-value">$0.00</span>
        </div>
        <div className="cart-summary-row cart-total-row">
          <span className="cart-summary-label">Total</span>
          <span className="cart-summary-value">$0.00</span>
        </div>
        
        <div className="cart-payment-methods">
          <h4 className="payment-heading">Make payment with</h4>
          <div className="payment-options">
            <label className={`payment-method-option brutal-border ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              <div className="payment-method-details">
                <CreditCard size={20} />
                <span className="payment-method-title">Credit / Debit Card</span>
              </div>
            </label>
            <label className={`payment-method-option brutal-border ${paymentMethod === 'wallet' ? 'active' : ''}`}>
              <input type="radio" name="paymentMethod" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} />
              <div className="payment-method-details">
                <Wallet size={20} />
                <div className="payment-method-text">
                  <span className="payment-method-title">Lumina Wallet</span>
                  <span className="payment-method-subtitle">Balance: $250.00</span>
                </div>
              </div>
            </label>
          </div>
        </div>
        
        <button className="btn-primary-large cart-checkout-btn brutal-border focus-visible" disabled>
          Checkout <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
