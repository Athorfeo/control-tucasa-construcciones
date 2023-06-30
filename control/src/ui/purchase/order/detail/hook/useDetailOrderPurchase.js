import { useState } from 'react';
import { fetchAppendOrderPurchase } from "network/purchase-api";

export const useDetailOrderPurchase = (spreadsheetId) => {
  const [description, setDescription] = useState('');

  async function appendOrderPurchase(orderPurchase) {
    return await fetchAppendOrderPurchase(spreadsheetId, orderPurchase);
  }

  return {
    description,
    setDescription,
    appendOrderPurchase
  };
}