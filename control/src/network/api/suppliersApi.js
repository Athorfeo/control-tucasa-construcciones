import { networkConfig, getUrlBase, fetchExecutor } from "network/network-util";

export async function fetchAllSuppliersApi() {
  const url = getUrlBase() + networkConfig.data.suppliers.root;
  return fetchExecutor(
    url,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    }
  );
}

export async function fetchGetByRangeSuppliersApi( position) {
  const url = getUrlBase() + networkConfig.data.suppliers.getByRange + "?position=" + position;
  return fetchExecutor(
    url,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  );
}

export async function fetchAppendSuppliersApi(payload) {
  const url = getUrlBase() + networkConfig.data.suppliers.root;
  const body = JSON.stringify({data: payload});
  return fetchExecutor(
    url,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: body
    }
  );
}

export async function fetchUpdateSuppliersApi(payload) {
  const url = getUrlBase() + networkConfig.data.suppliers.root;
  const body = JSON.stringify({data: payload});
  return fetchExecutor(
    url,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: body
    }
  );
}
