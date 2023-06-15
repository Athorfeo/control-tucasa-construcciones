import { networkConfig, fetchExecutor } from "./network-util";

export async function fetchAllProjects() {
  const url = networkConfig.url + networkConfig.project;
  return fetchExecutor(url, {method: "GET",});
}