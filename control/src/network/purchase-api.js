import { networkConfig, fetchExecutor } from "../util/network-util";

export async function fetchAllOrderPurchase(spreadsheetId) {
  const url = networkConfig.url + networkConfig.purchase.order;
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
  const url = networkConfig.url + networkConfig.purchase.orderByRange + '?start=' + startPosition + '&end=' + endPosition;
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