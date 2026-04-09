import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { logOut } from '../../firebase/auth';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import './ProfileInfo.css';

export default function ProfileInfo() {
  const { currentUser } = useAuth();
  
  // Split name into First and Last
  const fullName = currentUser?.name || '';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="profile-info-container">
      <div className="profile-main-header">
        <h2 className="profile-greeting">
          Good morning, {firstName || currentUser?.displayName?.split(' ')[0] || 'there'}
        </h2>
        <p className="profile-subtitle">Manage your vintage identity & preferences</p>
      </div>

      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-card-title-area">
            <span className="badge-pill">PERSONAL INFO</span>
            <h3 className="card-title">Your Profile</h3>
          </div>
          <button className="edit-btn">Edit Profile</button>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label>FIRST NAME</label>
              <input type="text" defaultValue={firstName} className="dark-input" placeholder="Your first name" />
            </div>
            <div className="form-group flex-1">
              <label>LAST NAME</label>
              <input type="text" defaultValue={lastName} className="dark-input" placeholder="Your last name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>EMAIL</label>
              <input type="email" defaultValue={currentUser?.email || ''} className="dark-input" placeholder="your@email.com" />
            </div>
            <div className="form-group flex-1">
              <label>CONTACT NUMBER</label>
              <input type="tel" defaultValue="" className="dark-input" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          <div className="form-group">
            <label>BIRTHDATE</label>
            <div className="form-row birthdate-row">
              <input type="text" defaultValue="" className="dark-input" placeholder="DD" />
              <input type="text" defaultValue="" className="dark-input" placeholder="MM" />
              <input type="text" defaultValue="" className="dark-input flex-2" placeholder="YYYY" />
            </div>
          </div>

          <div className="form-group">
            <label>GENDER</label>
            <div className="gender-options">
              <label className="radio-label">
                <input type="radio" name="gender" />
                <span className="radio-custom"></span> MALE
              </label>
              <label className="radio-label">
                <input type="radio" name="gender" />
                <span className="radio-custom"></span> FEMALE
              </label>
              <label className="radio-label">
                <input type="radio" name="gender" />
                <span className="radio-custom"></span> OTHER / PREFER NOT TO SAY
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>STYLE PREFERENCES</label>
            <div className="style-pills">
              <button className="style-pill">Vintage 70s</button>
              <button className="style-pill">Grunge</button>
              <button className="style-pill">Y2K</button>
              <button className="style-pill">Cottagecore</button>
              <button className="style-pill">Streetwear</button>
              <button className="style-pill">Academia</button>
              <button className="style-pill">Boho</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FF5B22',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '99px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            fontFamily: 'inherit'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
}
