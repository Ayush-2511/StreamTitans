import React, { createContext, useContext, useState } from 'react';

const StreamContext = createContext(null);

export function StreamProvider({ children }) {
  const [streamData, setStreamData] = useState(null);
  const [isStreamLoading, setIsStreamLoading] = useState(false);

  const openStream = (data) => {
    setIsStreamLoading(true);
    setStreamData(data || {
      title: 'Live Stream',
      seller: '@seller_handle',
      sellerName: 'Seller Name',
      viewers: '1.2K',
      category: 'Category'
    });

    setTimeout(() => {
      setIsStreamLoading(false);
    }, 3000);
  };

  const closeStream = () => {
    setStreamData(null);
    setIsStreamLoading(false);
  };

  return (
    <StreamContext.Provider value={{ streamData, isStreamLoading, openStream, closeStream }}>
      {children}
    </StreamContext.Provider>
  );
}

export function useStream() {
  return useContext(StreamContext);
}
