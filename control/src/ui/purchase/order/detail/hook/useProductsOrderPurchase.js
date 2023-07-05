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

  const loadProducts = (products) => {
    const temp = products.map((item) => {
      return {
        productName: item[4],
        productQuantity: item[5],
        chapterName: item[6]
      }
    });
    setProducts(temp);
  }

  return {
    products,
    onRemoveProduct,
    onAddProduct,
    loadProducts
  };
}