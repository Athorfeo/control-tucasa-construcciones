import { useState } from 'react';
import { 
  fetchAllSuppliersApi, 
  fetchGetByRangeSuppliersApi, 
  fetchAppendSuppliersApi, 
  fetchUpdateSuppliersApi
 } from "network/api/suppliersApi";

export const useSuppliersRepository = () => {
  /*const [suppliers, setSuppliers] = useState([]);

  async function fetchSuppliers() {
    console.log("Fetching suppliers...");
    return fetchAllSuppliers(spreadsheetId).then((response) => {
      console.log("Suppliers | SuppliersRepository");
      console.log(response);
      setSuppliers(response.data.suppliers);
      return response.data.suppliers;
    });
  }

  async function fetchSuppliersData() {
    console.log("Fetching suppliers...");
    return fetchAllSuppliers(spreadsheetId).then((response) => {
      console.log("Suppliers | SuppliersRepository");
      console.log(response);
      return response.data.suppliers;
    });
  }*/

  async function fetchAllSuppliersService(payload) {
    return fetchAllSuppliersApi(payload).then((response) => {
      console.log("Fetch all service | Suppliers");
      console.log(response);
      return response;
    });
  }

  async function getByIdSuppliersService(position) {
    return fetchGetByRangeSuppliersApi(position).then((response) => {
      console.log("Get by id service | Suppliers");
      console.log(response);
      return response;
    });
  }

  async function appendSuppliersService(payload) {
    return fetchAppendSuppliersApi(payload).then((response) => {
      console.log("Append service | Suppliers");
      console.log(response);
      return response;
    });
  }

  async function updateSuppliersService(payload) {
    return fetchUpdateSuppliersApi(payload).then((response) => {
      console.log("Update service | Suppliers");
      console.log(response);
      return response;
    });
  }

  return {
    fetchAllSuppliersService,
    getByIdSuppliersService,
    appendSuppliersService,
    updateSuppliersService
  };
}