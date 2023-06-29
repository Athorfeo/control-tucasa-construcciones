import { useState } from 'react';

export const useProductsOrderPurchase = () => {
  const [products, setProducts] = useState([]);

  const onRemoveProduct = (index) => {
    const temp = [...products];
    temp.splice(index, 1);
    setProducts(temp);
  }

  const onAddProduct = (product) => {
    const temp = [...products];
    temp.push(product);
    setProducts(temp);
  };

  return {
    products,
    setProducts,
    onRemoveProduct,
    onAddProduct
  };
}