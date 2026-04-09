import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth is null. Skipping authentication listeners.");
      setLoading(false);
      return;
    }

    let userUnsub = null;

    try {
      const authUnsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          try {
            const userDocRef = doc(db, 'users', user.uid);
            
            // Listen to document changes so role upgrades (buyer -> seller) happen instantly
            userUnsub = onSnapshot(userDocRef, (docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserRole(userData.role);
                setCurrentUser({ ...user, ...userData });
              } else {
                setCurrentUser(user);
                setUserRole('buyer');
              }
              setLoading(false);
            }, (error) => {
              console.error("Error listening to user data:", error);
              setCurrentUser(user);
              setUserRole('buyer');
              setLoading(false);
            });
            
          } catch (error) {
             console.error("Error setting up user listener:", error);
             setCurrentUser(user);
             setUserRole('buyer');
             setLoading(false);
          }
        } else {
          if (userUnsub) userUnsub();
          setCurrentUser(null);
          setUserRole(null);
          setLoading(false);
        }
      });

      return () => {
        authUnsub();
        if (userUnsub) userUnsub();
      };
    } catch(err) {
      console.error("Auth initialization failed:", err);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
