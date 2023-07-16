import { networkConfig, getUrlBase, fetchExecutor } from "../util/network-util";

export async function fetchUserById(email) {
  const url = getUrlBase() + networkConfig.user + "/" + email;
  return fetchExecutor(url, {method: "GET",});
}