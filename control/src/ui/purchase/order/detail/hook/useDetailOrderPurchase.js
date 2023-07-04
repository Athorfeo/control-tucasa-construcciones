import { useState } from 'react';
import { fetchOrderPurchaseByRange, fetchAppendOrderPurchase, fetchUpdateOrderPurchase } from "network/purchase-api";

export const useDetailOrderPurchase = (spreadsheetId) => {
  const [description, setDescription] = useState('');

  async function appendOrderPurchase(orderPurchase) {
    return await fetchAppendOrderPurchase(spreadsheetId, orderPurchase);
  }

  function getOrderPurchaseByRange(startPosition, endPosition) {
    return fetchOrderPurchaseByRange(spreadsheetId, startPosition, endPosition);
  }

  function updateOrderPurchase(start, end, orderPurchase) {
    const payload = {
      startPosition: start,
      endPosition: end,
      orderPurchase: orderPurchase
    }
    return fetchUpdateOrderPurchase(spreadsheetId, payload);
  }

  return {
    description,
    setDescription,
    appendOrderPurchase,
    getOrderPurchaseByRange,
    updateOrderPurchase
  };
}