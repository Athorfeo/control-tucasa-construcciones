import { networkConfig, fetchExecutor } from "../util/network-util";

export async function fetchAllSuppliers() {
  const url = networkConfig.url + networkConfig.data.suppliers.getAll;
  return fetchExecutor(
    url, 
    {
      method: "GET"
    }
    );
}