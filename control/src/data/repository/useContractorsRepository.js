import { useState } from 'react';
import { fetchAllContractors } from "network/api/data-api";

export const useContractorsRepository = ({spreadsheetId}) => {
  const [contractors, setContractors] = useState([]);

  async function fetchContractors() {
    console.log("Fetching contractors...");
    return fetchAllContractors(spreadsheetId).then((response) => {
      console.log("Contractors | ContractorsRepository");
      console.log(response);
      setContractors(response.data.contractors);
      return response.data.contractors;
    });
  }

  async function fetchContractorsAsData() {
    console.log("Fetching contractors...");
    return fetchAllContractors(spreadsheetId).then((response) => {
      console.log("Contractors | ContractorsRepository");
      console.log(response);
      return response.data.contractors;
    });
  }

  return {
    contractors,
    fetchContractors,
    fetchContractorsAsData
  };
}