import { useState } from 'react';
import { fetchAllSuppliers } from "network/api/data-api";

export const useSuppliersRepository = ({spreadsheetId}) => {
  const [suppliers, setSuppliers] = useState([]);

  async function fetchSuppliers() {
    console.log("Fetching suppliers...");
    return fetchAllSuppliers(spreadsheetId).then((response) => {
      console.log("Suppliers | SuppliersRepository");
      console.log(response);
      setSuppliers(response.data.suppliers);
    });
  }

  return {
    suppliers,
    fetchSuppliers
  };
}