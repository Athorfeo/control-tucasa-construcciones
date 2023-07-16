import { useState } from 'react';
import { staticData } from "data/static-data";

export const useAddProductDetailOrderPurchase = ({onAddProductCallback}) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [positionSelectedChapter, setPositionSelectedChapter] = useState(0);

  const isSubmitDisabled = () => {
    if (
      productName !== '' && 
      quantity !== '' &&
      quantity.length <= 4 &&
      positionSelectedChapter !== '') {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const selectedChapter = staticData.chapters[positionSelectedChapter];

    const product = {
      productName: productName,
      productQuantity: quantity,
      chapterName: selectedChapter.name
    }

    onAddProductCallback(product);

    setProductName('');
    setQuantity('');
    setPositionSelectedChapter('');
  };

  return {
    productName,
    setProductName,
    quantity,
    setQuantity,
    positionSelectedChapter,
    setPositionSelectedChapter,
    isSubmitDisabled,
    handleSubmitForm
  };
}