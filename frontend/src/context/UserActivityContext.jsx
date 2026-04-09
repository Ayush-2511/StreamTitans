import React, { createContext, useContext, useState, useEffect } from 'react';

const UserActivityContext = createContext(null);

export function UserActivityProvider({ children }) {
  // activityProfile shape: { 'categoryOrTag': weight }
  const [activityProfile, setActivityProfile] = useState({});

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('streamtitans_activity_profile');
    if (saved) {
      try {
        setActivityProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse activity profile", e);
      }
    }
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    if (Object.keys(activityProfile).length > 0) {
      localStorage.setItem('streamtitans_activity_profile', JSON.stringify(activityProfile));
    }
  }, [activityProfile]);

  const logActivity = (textStr, weight = 1) => {
    if (!textStr || typeof textStr !== 'string') return;
    
    // tokenize text into words
    const words = textStr.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);

    setActivityProfile(prev => {
      const newProfile = { ...prev };
      words.forEach(w => {
        if (newProfile[w]) {
          newProfile[w] += weight;
        } else {
          newProfile[w] = weight;
        }
      });
      return newProfile;
    });
  };

  // Helper to score a string (like a product title) against the user's profile
  const scoreItem = (textStr) => {
    if (!textStr || typeof textStr !== 'string' || Object.keys(activityProfile).length === 0) return 0;
    
    const words = textStr.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    
    let totalScore = 0;
    words.forEach(w => {
      if (activityProfile[w]) {
        totalScore += activityProfile[w];
      }
    });
    return totalScore;
  };

  return (
    <UserActivityContext.Provider value={{ activityProfile, logActivity, scoreItem }}>
      {children}
    </UserActivityContext.Provider>
  );
}

export function useUserActivity() {
  return useContext(UserActivityContext);
}
