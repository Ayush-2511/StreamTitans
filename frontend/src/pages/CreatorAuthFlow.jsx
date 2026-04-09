import React, { useState } from 'react';
import { Camera, Shield, FileText, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { logIn, logInWithGoogle } from '../firebase/auth';
import toast from 'react-hot-toast';
import './CreatorAuthFlow.css';

export default function CreatorAuthFlow({ onComplete, onBack }) {
  const [authStep, setAuthStep] = useState('login'); // 'login' | 'signup-1' | 'signup-2'

  return (
    <div className="ca-container">
      {authStep === 'login' && (
        <CreatorLogin 
          onLogin={onComplete} 
          onSignup={() => setAuthStep('signup-1')} 
          onSkip={onComplete}
          onBack={onBack}
        />
      )}
      {authStep === 'signup-1' && (
        <CreatorSignupStep1 
          onNext={() => setAuthStep('signup-2')}
          onLogin={() => setAuthStep('login')}
          onBack={onBack}
        />
      )}
      {authStep === 'signup-2' && (
        <CreatorSignupStep2 
          onSubmit={onComplete}
          onBack={onBack}
        />
      )}
    </div>
  );
}

function CreatorLogin({ onLogin, onSignup, onSkip, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password, 'seller');
      toast.success("Welcome back, Creator!");
      onLogin(); 
    } catch (err) {
      if (err.code === 'auth/configuration-not-found' || err.code === 'auth/invalid-api-key') {
        toast.error("Firebase keys are missing or invalid. Check your .env file!");
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await logInWithGoogle('seller');
      toast.success("Authenticated with Google as a Creator!", { icon: '✨' });
      onLogin();
    } catch (err) {
      if (err.code === 'auth/unauthorized-domain') {
        toast.error("This domain/IP is not authorized in Firebase Console.", { duration: 6000 });
      } else if (err.code === 'auth/operation-not-allowed') {
        toast.error("Google login is not enabled in Firebase.", { duration: 6000 });
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="ca-login-card">
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#888', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1.5rem', padding: 0,
          }}
        >
          <ArrowLeft size={15} /> Back to Home
        </button>
      )}
      <h1 className="ca-login-title">Welcome back.</h1>
      <p className="ca-login-subtitle">SIGN IN TO CONTINUE TO LUMINA.</p>
      
      <form className="ca-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="ca-input-pill" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="ca-input-pill" required />
        
        <button type="submit" className="ca-btn-primary pill">
          Log In <ArrowRight size={18} />
        </button>
      </form>

      <button onClick={handleGoogleAuth} className="ca-btn-primary pill" style={{ marginTop: '1rem', backgroundColor: '#f0f0f0', color: '#111', width: '100%', display: 'flex', justifyContent: 'center', border: '2px solid transparent' }}>
        Continue with Google
      </button>
      
      <p className="ca-bottom-link">
        New user? <button onClick={onSignup} className="ca-link-orange">Sign up</button>
      </p>
      
      <button onClick={onSkip} className="ca-btn-skip">
        SKIP FOR NOW <ArrowRight size={16} />
      </button>
    </div>
  );
}

function CreatorSignupStep1({ onNext, onLogin, onBack }) {
  return (
    <div className="ca-signup-card">
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#888', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1rem', padding: 0,
          }}
        >
          <ArrowLeft size={15} /> Back to Home
        </button>
      )}
      <div className="ca-stepper">
        <div className="ca-step active">
          <span className="ca-step-num">1</span> BASIC INFO
        </div>
        <div className="ca-stepper-line"></div>
        <div className="ca-step inactive">
          <span className="ca-step-num">2</span> SELLER VERIFICATION
        </div>
      </div>
      
      <div className="ca-signup-header">
        <div className="ca-logo-wrap">
          <span className="ca-logo">LUMINA</span>
          <span className="ca-badge">CREATOR</span>
        </div>
        <h2>Join as a seller.</h2>
        <p>Create your account to start selling live. <br />
        <button onClick={onLogin} className="ca-link-orange">Already selling?</button> Log in instead.</p>
        <div className="ca-progress-bar"><div className="ca-progress-fill step-1"></div></div>
      </div>
      
      <form className="ca-form-stack" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="ca-form-group">
          <label>FULL NAME</label>
          <input type="text" placeholder="Your full name" required className="ca-input-rect" />
        </div>
        
        <div className="ca-form-group">
          <label>MOBILE NUMBER</label>
          <input type="tel" placeholder="+91 98765 43210" required className="ca-input-rect" />
          <span className="ca-sub-label">OTP verification will be sent to this number</span>
        </div>
        
        <div className="ca-form-group">
          <label>EMAIL ADDRESS</label>
          <input type="email" placeholder="you@email.com" required className="ca-input-rect" />
        </div>
        
        <div className="ca-form-group">
          <label>CREATE PASSWORD</label>
          <input type="password" placeholder="Minimum 8 characters" required className="ca-input-rect" />
        </div>
        
        <button type="submit" className="ca-btn-continue">
          Continue <ArrowRight size={16} />
        </button>
      </form>
      
      <div className="ca-footer-link">
        Already have an account? <button onClick={onLogin} className="ca-link-orange">Log in</button>
      </div>
    </div>
  );
}

function CreatorSignupStep2({ onSubmit, onBack }) {
  return (
    <div className="ca-signup-card">
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#888', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1rem', padding: 0,
          }}
        >
          <ArrowLeft size={15} /> Back to Home
        </button>
      )}
      <div className="ca-stepper">
        <div className="ca-step past">
          <span className="ca-step-num">1</span> BASIC INFO
        </div>
        <div className="ca-stepper-line filled"></div>
        <div className="ca-step active orange">
          <span className="ca-step-num">2</span> SELLER VERIFICATION
        </div>
      </div>
      
      <div className="ca-signup-header">
        <div className="ca-logo-wrap">
          <span className="ca-logo">LUMINA</span>
          <span className="ca-badge">CREATOR</span>
        </div>
        <h2>Verify your seller identity.</h2>
        <p>Required by Indian regulations to receive payments and list products for sale.</p>
        <div className="ca-progress-bar"><div className="ca-progress-fill step-2"></div></div>
      </div>
      
      <form className="ca-form-stack dense" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        
        {/* Section 1 */}
        <div className="ca-section-pill dark">
          <span className="pill-icon"><FileText size={14} /></span> IDENTITY DOCUMENTS
        </div>
        <div className="ca-row">
          <div className="ca-form-group half">
            <label>AADHAAR NUMBER</label>
            <input type="text" placeholder="XXXX XXXX XXXX" className="ca-input-rect" />
          </div>
          <div className="ca-form-group half">
            <label>PAN NUMBER</label>
            <input type="text" placeholder="ABCDE1234F" className="ca-input-rect" />
          </div>
        </div>
        <div className="ca-form-group">
          <label>UPLOAD AADHAAR CARD</label>
          <div className="ca-upload-box">
            <div className="ca-upload-icon"><Upload size={18} /></div>
            <p>Front & back · JPG, PNG or PDF</p>
            <span>Max 5 MB per file</span>
          </div>
        </div>
        
        {/* Section 2 */}
        <div className="ca-section-pill orange">
          <span className="pill-icon">🛡️</span> BANK & BUSINESS DETAILS
        </div>
        <div className="ca-form-group">
          <label>SELLER TYPE</label>
          <select className="ca-input-rect">
            <option>Select your seller type</option>
            <option>Individual</option>
            <option>Registered Business</option>
          </select>
        </div>
        <div className="ca-form-group">
          <label>GST NUMBER <span className="ca-opt-label">(optional for individuals)</span></label>
          <input type="text" placeholder="22AAAAA0000A1Z5" className="ca-input-rect" />
        </div>
        <div className="ca-row">
          <div className="ca-form-group half">
            <label>BANK ACCOUNT NO.</label>
            <input type="text" placeholder="Account number" className="ca-input-rect" />
          </div>
          <div className="ca-form-group half">
            <label>IFSC CODE</label>
            <input type="text" placeholder="SBIN0001234" className="ca-input-rect" />
          </div>
        </div>
        <p className="ca-sub-label-bottom">Earnings will be credited to this account after each stream</p>
        
        {/* Section 3 */}
        <div className="ca-section-pill dark">
          <span className="pill-icon">ℹ️</span> SELLER PROFILE SETUP
        </div>
        <div className="ca-form-group">
          <label>STORE NAME</label>
          <input type="text" placeholder="e.g. Priya Finds, The Thrift Room..." className="ca-input-rect" />
          <span className="ca-sub-label">This is what buyers will see on your profile</span>
        </div>
        <div className="ca-form-group">
          <label>PRIMARY SELLING CATEGORY</label>
          <select className="ca-input-rect">
            <option>What will you mainly sell?</option>
            <option>Vintage Clothing</option>
            <option>Electronics</option>
            <option>Handmade Crafts</option>
          </select>
        </div>
        <div className="ca-form-group">
          <label>CITY / LOCATION</label>
          <input type="text" placeholder="Mumbai, Delhi, Bengaluru..." className="ca-input-rect" />
        </div>
        
        <label className="ca-checkbox-row">
          <input type="checkbox" required />
          <span>
            I confirm that all details provided are accurate. I agree to Lumina's <span className="ca-link-orange">Seller Terms</span>, <span className="ca-link-orange">Privacy Policy</span>, and <span className="ca-link-orange">Community Standards</span>.
          </span>
        </label>
        
        <button type="submit" className="ca-btn-continue success">
          Submit for review <Check size={16} />
        </button>
      </form>
    </div>
  );
}
