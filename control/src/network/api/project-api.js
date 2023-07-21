import { networkConfig, getUrlBase, fetchExecutor } from "./network-util";

export async function fetchAllProjects() {
  const url = getUrlBase() + networkConfig.project;
  return fetchExecutor(url, {method: "GET",});
}