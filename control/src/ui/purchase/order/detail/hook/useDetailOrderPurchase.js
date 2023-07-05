import { useState } from 'react';
import {
  fetchOrderPurchaseByRange,
  fetchAppendOrderPurchase,
  fetchUpdateOrderPurchase,
  fetchApproveOrderPurchase
} from "network/purchase-api";
import { storageConfig, getJsonItem } from "util/storage-util"

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

  function approveOrderPurchase(start, end) {
    const userSession = getJsonItem(storageConfig.userDataKey);

    const payload = {
      startPosition: start,
      endPosition: end,
      email: userSession.email
    }
    return fetchApproveOrderPurchase(spreadsheetId, payload);
  }

  return {
    description,
    setDescription,
    appendOrderPurchase,
    getOrderPurchaseByRange,
    updateOrderPurchase,
    approveOrderPurchase
  };
}