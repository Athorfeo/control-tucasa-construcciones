import { networkConfig, fetchExecutor } from "../util/network-util";

export async function fetchAllOrderPurchase(spreadsheetId) {
  const url = networkConfig.url + networkConfig.purchase.order.root;
  return fetchExecutor(
    url,
    {
      method: "GET",
      headers: {
        "Spreadsheet-Id": spreadsheetId,
      },
    }
  );
}

export async function fetchOrderPurchaseByRange(spreadsheetId, startPosition, endPosition) {
  const url = networkConfig.url + networkConfig.purchase.order.getByRange + '?start=' + startPosition + '&end=' + endPosition;
  return fetchExecutor(
    url,
    {
      method: "GET",
      headers: {
        "Spreadsheet-Id": spreadsheetId,
      },
    }
  );
}

export async function fetchAppendOrderPurchase(spreadsheetId, orderPurchase) {
  const url = networkConfig.url + networkConfig.purchase.order.root;
  const body = JSON.stringify({data: orderPurchase});
  console.log('Body: ' + body);
  return fetchExecutor(
    url,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "Spreadsheet-Id": spreadsheetId,
      },
      body: body
    }
  );
}

export function fetchUpdateOrderPurchase(spreadsheetId, payload) {
  const url = networkConfig.url + networkConfig.purchase.order.update;
  const body = JSON.stringify({data: payload});
  console.log('Body: ' + body);
  return fetchExecutor(
    url,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "Spreadsheet-Id": spreadsheetId,
      },
      body: body
    }
  );
}

export function fetchApproveOrderPurchase(spreadsheetId, payload) {
  const url = networkConfig.url + networkConfig.purchase.order.approve;
  const body = JSON.stringify({data: payload});
  console.log('Body: ' + body);
  return fetchExecutor(
    url,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "Spreadsheet-Id": spreadsheetId,
      },
      body: body
    }
  );
}