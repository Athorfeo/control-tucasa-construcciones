import { networkConfig, fetchExecutor } from "./network-util";

export async function fetchUserById(email) {
  const url = networkConfig.url + networkConfig.user + "/" + email;
  return fetchExecutor(url, {method: "GET",});
}