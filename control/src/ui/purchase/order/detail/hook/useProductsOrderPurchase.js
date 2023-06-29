import { useState } from 'react';

export const useProductsOrderPurchase = () => {
  const [products, setProducts] = useState([]);

  const onRemoveProduct = (index) => {
    const position = products.indexOf(index);

    if (position > -1) {
      products.splice(position, 1);
    }

    setProducts(products);
  }

  const onAddProduct = (product) => {
    setProducts(products.concat([product]));
  };

  return {
    products,
    setProducts,
    onRemoveProduct,
    onAddProduct
  };
}