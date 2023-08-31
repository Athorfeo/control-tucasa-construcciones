export const networkConfig = {
  data: {
    suppliers: {
      getAll: "/data/suppliers",
    },
    contractors: {
      getAll: "/data/contractors",
    },
  },
  user: "/user",
  project: "/project",
  purchase: {
    order: {
      root: "/purchase/order",
      getByRange: "/purchase/order/range",
      update: "/purchase/order/update",
      approve: "/purchase/order/approve",
    },
    invoice: {
      root: "/purchase/invoice",
      getByRange: "/purchase/invoice/range",
      accountingSupport: "/purchase/invoice/accountingsupport",
    },
    pettyCash: {
      root: "/purchase/pettycash",
      getByRange: "/purchase/pettycash/range",
    }
  },
  service: {
    minute: {
      root: "/service/minute",
      getByRange: "/service/minute/range",
      update: "/service/minute/update",
      approve: "/service/minute/approve",
    }
  }
};

export function getUrlBase() {
  return process.env.REACT_APP_URL_BASE;
}

export async function fetchExecutor(url, options) {
  return fetch(url, options)
    .then((response) => {
      //console.log(response);
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