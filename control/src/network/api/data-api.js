import { networkConfig, getUrlBase, fetchExecutor } from "../network-util";

export async function fetchAllSuppliers() {
  const url = getUrlBase() + networkConfig.data.suppliers.getAll;
  return fetchExecutor(
    url, 
    {
      method: "GET"
    }
    );
}

export async function fetchAllContractors() {
  const url = getUrlBase() + networkConfig.data.contractors.getAll;
  return fetchExecutor(
    url, 
    {
      method: "GET"
    }
    );
}