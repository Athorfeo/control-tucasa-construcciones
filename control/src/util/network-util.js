export const networkConfig = {
  url: "http://127.0.0.1:5001/tcc-control-system/us-central1/api",
  data: {
    suppliers: {
      getAll: "/data/suppliers",
    }
  },
  user: "/user",
  project: "/project",
  purchase: {
    order: {
      root: "/purchase/order",
      getByRange: "/purchase/order/range",
      update: "/purchase/order/update",
      approve: "/purchase/order/approve",
    }
  }
};

export async function fetchExecutor(url, options) {
  return fetch(url, options)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      if (response.body != null) {
        return response.json();
      } else {
        return null;
      }
    });
}