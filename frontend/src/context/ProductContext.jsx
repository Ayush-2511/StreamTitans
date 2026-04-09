import React, { createContext, useContext, useState } from 'react';
import { useUserActivity } from './UserActivityContext';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [productData, setProductData] = useState(null);
  const { logActivity } = useUserActivity();

  const openProduct = (data) => {
    const product = data || {
      title: 'Product Name Goes Here — Full Title',
      seller: '@seller_handle',
      sellerName: 'Seller Name',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'CATEGORY',
      subcategory: 'SUBCATEGORY',
      viewers: 284,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    };
    setProductData(product);
    if (product.title) {
      logActivity(product.title, 1);
    }
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
