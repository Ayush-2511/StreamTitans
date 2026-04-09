import React from 'react';
import './ProfileInfo.css';

export default function ProfileInfo() {
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
              <input type="text" defaultValue="R" className="dark-input" />
            </div>
            <div className="form-group flex-1">
              <label>LAST NAME</label>
              <input type="text" defaultValue="S" className="dark-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>EMAIL</label>
              <input type="email" defaultValue="your@email.com" className="dark-input" />
            </div>
            <div className="form-group flex-1">
              <label>CONTACT NUMBER</label>
              <input type="tel" defaultValue="+91 XXXXX XXXXX" className="dark-input" />
            </div>
          </div>

          <div className="form-group">
            <label>BIRTHDATE</label>
            <div className="form-row birthdate-row">
              <input type="text" defaultValue="DD" className="dark-input" />
              <input type="text" defaultValue="MM" className="dark-input" />
              <input type="text" defaultValue="YYYY" className="dark-input flex-2" />
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
              <button className="style-pill active">Vintage 70s</button>
              <button className="style-pill active">Grunge</button>
              <button className="style-pill">Y2K</button>
              <button className="style-pill">Cottagecore</button>
              <button className="style-pill active">Streetwear</button>
              <button className="style-pill">Academia</button>
              <button className="style-pill">Boho</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
