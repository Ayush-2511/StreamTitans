import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [productData, setProductData] = useState(null);

  const openProduct = (data) => {
    setProductData(data || {
      title: 'Product Name Goes Here — Full Title',
      seller: '@seller_handle',
      sellerName: 'Seller Name',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'CATEGORY',
      subcategory: 'SUBCATEGORY',
      viewers: 284,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    });
  };

  const closeProduct = () => {
    setProductData(null);
  };

  return (
    <ProductContext.Provider value={{ productData, openProduct, closeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
