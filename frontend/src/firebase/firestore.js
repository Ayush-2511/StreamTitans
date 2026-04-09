import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, onSnapshot, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

// ----------------- PRODUCTS ----------------- 
export const addProduct = async (productData) => {
  if (!db) throw new Error("Firebase DB not initialized.");
  return await addDoc(collection(db, 'products'), {
    ...productData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToProducts = (callback, userRole, userId, filterType = null) => {
  if (!db) {
    console.warn("DB not initialized - skipping products subscription");
    callback([]);
    return () => {};
  }
  let q = collection(db, 'products');
  
  const conditions = [];
  if (userRole === 'seller' && userId) {
    conditions.push(where('sellerId', '==', userId));
  }
  if (filterType) {
    conditions.push(where('type', '==', filterType));
  }

  if (conditions.length > 0) {
    q = query(collection(db, 'products'), ...conditions, orderBy('createdAt', 'desc'));
  } else {
    q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }

  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(products);
  });
};

// ----------------- STREAMS ----------------- 
export const createStream = async (streamData) => {
  if (!db) throw new Error("Firebase DB not initialized.");
  return await addDoc(collection(db, 'streams'), {
    ...streamData,
    viewers: 0,
    createdAt: serverTimestamp(),
  });
};

export const updateStreamState = async (streamId, isLive) => {
  if (!db) return;
  const streamRef = doc(db, 'streams', streamId);
  await updateDoc(streamRef, { isLive });
};

export const subscribeToLiveStreams = (callback) => {
  if (!db) {
    console.warn("DB not initialized - skipping stream subscription");
    callback([]);
    return () => {};
  }
  const q = query(collection(db, 'streams'), where('isLive', '==', true), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const streams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(streams);
  });
};

// ----------------- TRANSACTIONS (Orders/Claims) ----------------- 
export const claimThriftProduct = async (productId, userId) => {
  if (!db) throw new Error("Firebase DB not initialized.");
  const productRef = doc(db, 'products', productId);
  const claimRef = doc(db, 'claims', productId); 

  try {
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);
      if (!productDoc.exists()) throw new Error("Product does not exist!");
      if (productDoc.data().stock <= 0) throw new Error("Product is out of stock!");

      const claimDoc = await transaction.get(claimRef);
      if (claimDoc.exists()) throw new Error("Product is already claimed!");

      transaction.update(productRef, { stock: 0 });
      transaction.set(claimRef, {
        productId,
        claimedBy: userId,
        timestamp: serverTimestamp()
      });

      const orderRef = doc(collection(db, 'orders'));
      transaction.set(orderRef, {
        userId,
        productId,
        quantity: 1,
        status: 'completed',
        timestamp: serverTimestamp()
      });
    });
    return true;
  } catch (error) {
    console.error("Claim failed: ", error);
    throw error;
  }
};

export const buyRegularProduct = async (productId, userId, quantity = 1) => {
  if (!db) throw new Error("Firebase DB not initialized.");
  const productRef = doc(db, 'products', productId);

  try {
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);
      if (!productDoc.exists()) throw new Error("Product does not exist!");
      
      const newStock = productDoc.data().stock - quantity;
      if (newStock < 0) throw new Error("Not enough stock!");

      transaction.update(productRef, { stock: newStock });

      const orderRef = doc(collection(db, 'orders'));
      transaction.set(orderRef, {
        userId,
        productId,
        quantity,
        status: 'completed',
        timestamp: serverTimestamp()
      });
    });
    return true;
  } catch (error) {
    console.error("Buy failed: ", error);
    throw error;
  }
};

// ----------------- CHAT ----------------- 
export const sendMessage = async (streamId, userId, userName, text) => {
  if (!db) throw new Error("Firebase DB not initialized.");
  return await addDoc(collection(db, `chats/${streamId}/messages`), {
    userId,
    userName,
    text,
    timestamp: serverTimestamp()
  });
};

export const subscribeToChat = (streamId, callback) => {
  if (!db) {
    console.warn("DB not initialized - skipping chat subscription");
    callback([]);
    return () => {};
  }
  const q = query(collection(db, `chats/${streamId}/messages`), orderBy('timestamp', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};
