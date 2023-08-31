import { networkConfig, getUrlBase, fetchExecutor } from "network/network-util";

export async function fetchAllPettyCashApi(spreadsheetId) {
  const url = getUrlBase() + networkConfig.purchase.pettyCash.root;
  return fetchExecutor(
    url,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "Spreadsheet-Id": spreadsheetId,
      },
    }
  );
}

export async function fetchGetByRangePettyCashApi(spreadsheetId, position) {
  const url = getUrlBase() + networkConfig.purchase.pettyCash.getByRange + "?position=" + position;
  return fetchExecutor(
    url,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "Spreadsheet-Id": spreadsheetId,
      }
    }
  );
}

export async function fetchAppendPettyCashApi(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.purchase.pettyCash.root;
  const body = JSON.stringify({data: payload});
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

export async function fetchUpdatePettyCashApi(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.purchase.invoice.root;
  const body = JSON.stringify({data: payload});
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