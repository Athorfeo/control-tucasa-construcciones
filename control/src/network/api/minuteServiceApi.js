import { networkConfig, getUrlBase, fetchExecutor } from "network/network-util";

export async function fetchAll(spreadsheetId) {
  const url = getUrlBase() + networkConfig.service.minute.root;
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

export async function fetchByRange(spreadsheetId, startPosition, endPosition) {
  const url = getUrlBase() + networkConfig.service.minute.getByRange + '?start=' + startPosition + '&end=' + endPosition;
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

export async function fetchAppend(spreadsheetId, orderPurchase) {
  const url = getUrlBase() + networkConfig.service.minute.root;
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

export function fetchUpdate(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.service.minute.update;
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

export function fetchApprove(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.service.minute.approve;
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