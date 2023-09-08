import { networkConfig, getUrlBase, fetchExecutor } from "network/network-util";

export async function fetchAllInvoicePurchase(spreadsheetId) {
  const url = getUrlBase() + networkConfig.purchase.invoice.root;
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

export async function fetchAppendApi(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.purchase.invoice.root;
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

export async function fetchGetByRangeApi(spreadsheetId, start, end) {
  const url = getUrlBase() + networkConfig.purchase.invoice.getByRange + "?start=" + start + "&end=" + end;
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

export async function fetchUpdateApi(spreadsheetId, payload) {
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

export async function fetchAddAccountingDocumentApi(spreadsheetId, payload) {
  const url = getUrlBase() + networkConfig.purchase.invoice.accountingDocument;
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
