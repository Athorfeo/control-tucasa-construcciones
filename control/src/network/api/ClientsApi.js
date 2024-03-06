import { networkConfig, getUrlBase, fetchExecutor } from "network/network-util";

export async function fetchAllClientsApi(spreadsheetId) {
  const url = getUrlBase() + networkConfig.clients.root;
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

export async function fetchGetByRangeClientsApi(spreadsheetId, position) {
  const url = getUrlBase() + networkConfig.clients.getByRange + "?position=" + position;
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

export async function fetchAppendClientsApi(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.clients.root;
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

export async function fetchUpdateClientsApi(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.clients.root;
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