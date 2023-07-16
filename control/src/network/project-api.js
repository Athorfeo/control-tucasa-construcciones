import { networkConfig, getUrlBase, fetchExecutor } from "../util/network-util";

export async function fetchAllProjects() {
  const url = getUrlBase() + networkConfig.project;
  return fetchExecutor(url, {method: "GET",});
}