import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export const signUp = async (email, password, role, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    try {
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        name: name || email.split('@')[0],
        email: user.email,
        role: role || 'buyer',
        verified: false,
        createdAt: new Date().toISOString()
      });
    } catch (dbError) {
      console.error("Firestore user creation failed (check database rules):", dbError);
      // We still return the user so they can log in
    }

    return user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const logInWithGoogle = async (role = 'buyer') => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          userId: user.uid,
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          role: role,
          verified: false,
          createdAt: new Date().toISOString()
        });
      }
    } catch (dbError) {
      console.error("Firestore user creation failed (check database rules):", dbError);
    }

    return user;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};
