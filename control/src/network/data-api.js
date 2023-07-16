import { networkConfig, getUrlBase, fetchExecutor } from "../util/network-util";

export async function fetchAllSuppliers() {
  const url = getUrlBase() + networkConfig.data.suppliers.getAll;
  return fetchExecutor(
    url, 
    {
      method: "GET"
    }
    );
}