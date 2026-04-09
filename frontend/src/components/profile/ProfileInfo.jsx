import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfileInfo.css';

export default function ProfileInfo() {
  const { currentUser } = useAuth();
  
  // Split name into First and Last
  const fullName = currentUser?.name || '';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  return (
    <div className="profile-info-container">
      <div className="profile-main-header">
        <h2 className="profile-greeting">
          Good morning
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
    </div>
  );
}
