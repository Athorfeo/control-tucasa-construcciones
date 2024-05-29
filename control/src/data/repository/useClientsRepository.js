import { 
  fetchAllClientsApi,
  fetchGetByRangeClientsApi,
  fetchAppendClientsApi,
  fetchUpdateClientsApi,
  fetchAppendHouseholdClientsApi,
  fetchUpdateHouseholdClientsApi,
  fetchDeleteHouseholdClientsApi,
  fetchAppendPaymentClientsApi,
  fetchUpdatePaymentClientsApi,
  fetchDeletePaymentClientsApi
 } from "network/api/ClientsApi";

export const useClientsRepository = (spreadsheetId) => {
  async function fetchAllService(payload) {
    return fetchAllClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Fetch all | Clients");
      console.log(response);
      return response;
    });
  }

  async function getByIdService(position) {
    return fetchGetByRangeClientsApi(spreadsheetId, position).then((response) => {
      console.log("Get by id service | Clients");
      console.log(response);
      return response;
    });
  }

  async function appendService(payload) {
    return fetchAppendClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Append service | Clients");
      console.log(response);
      return response;
    });
  }

  async function updateService(payload) {
    return fetchUpdateClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Update service | Clients");
      console.log(response);
      return response;
    });
  }

  async function appendHouseholdService(payload) {
    return fetchAppendHouseholdClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Append household service | Clients");
      console.log(response);
      return response;
    });
  }

  async function updateHouseholdService(payload) {
    return fetchUpdateHouseholdClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Update household service | Clients");
      console.log(response);
      return response;
    });
  }

  async function deleteHouseholdService(payload) {
    return fetchDeleteHouseholdClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Delete household service | Clients");
      console.log(response);
      return response;
    });
  }

  // Payments

  async function appendPaymentService(payload) {
    return fetchAppendPaymentClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Append payments service | Clients");
      console.log(response);
      return response;
    });
  }

  async function updatePaymentService(payload) {
    return fetchUpdatePaymentClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Update payment service | Clients");
      console.log(response);
      return response;
    });
  }

  async function deletePaymentService(payload) {
    return fetchDeletePaymentClientsApi(spreadsheetId, payload).then((response) => {
      console.log("Delete payment service | Clients");
      console.log(response);
      return response;
    });
  }

  return {
    fetchAllService,
    getByIdService,
    appendService,
    updateService,
    appendHouseholdService,
    updateHouseholdService,
    deleteHouseholdService,
    appendPaymentService,
    updatePaymentService,
    deletePaymentService,
  };
}