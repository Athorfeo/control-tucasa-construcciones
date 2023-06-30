import { useState } from 'react';
import { fetchOrderPurchaseByRange, fetchAppendOrderPurchase } from "network/purchase-api";

export const useDetailOrderPurchase = (spreadsheetId) => {
  const [description, setDescription] = useState('');

  async function appendOrderPurchase(orderPurchase) {
    return await fetchAppendOrderPurchase(spreadsheetId, orderPurchase);
  }

  async function getOrderPurchaseByRange(startPosition, endPosition) {
    return await fetchOrderPurchaseByRange(spreadsheetId, startPosition, endPosition);
  }

  return {
    description,
    setDescription,
    appendOrderPurchase,
    getOrderPurchaseByRange
  };
}