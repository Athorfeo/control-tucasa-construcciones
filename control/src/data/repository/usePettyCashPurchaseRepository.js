import { 
  fetchAllPettyCashApi,
  fetchGetByRangePettyCashApi,
  fetchAppendPettyCashApi,
  fetchUpdatePettyCashApi,
  fetchAccountingDocumentPettyCashApi
 } from "network/api/purchase/PettyCashPurchaseApi";

export const usePettyCashPurchaseRepository = (spreadsheetId) => {
  async function fetchAllService(payload) {
    return fetchAllPettyCashApi(spreadsheetId, payload).then((response) => {
      console.log("Fetch all | Petty Cash");
      console.log(response);
      return response;
    });
  }

  async function getByIdService(position) {
    return fetchGetByRangePettyCashApi(spreadsheetId, position).then((response) => {
      console.log("Get by id service | Petty Cash");
      console.log(response);
      return response;
    });
  }

  async function appendService(payload) {
    return fetchAppendPettyCashApi(spreadsheetId, payload).then((response) => {
      console.log("Append service | Petty Cash");
      console.log(response);
      return response;
    });
  }

  async function updateService(payload) {
    return fetchUpdatePettyCashApi(spreadsheetId, payload).then((response) => {
      console.log("Update service | Petty Cash");
      console.log(response);
      return response;
    });
  }

  async function updateAccountingDocumentService(payload) {
    return fetchAccountingDocumentPettyCashApi(spreadsheetId, payload).then((response) => {
      console.log("Update accounting document service | Petty Cash");
      console.log(response);
      return response;
    });
  }

  return {
    fetchAllService,
    getByIdService,
    appendService,
    updateService,
    updateAccountingDocumentService
  };
}