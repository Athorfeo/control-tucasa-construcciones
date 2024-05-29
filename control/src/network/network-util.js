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
      accountingDocument: "/purchase/invoice/accountingdocument",
    },
    pettyCash: {
      root: "/purchase/pettycash",
      getByRange: "/purchase/pettycash/range",
      accountingDocument: "/purchase/pettycash/accountingdocument",
    }
  },
  service: {
    minute: {
      root: "/service/minute",
      getByRange: "/service/minute/range",
      update: "/service/minute/update",
      approve: "/service/minute/approve",
    }
  },
  clients: {
    root: "/clients",
    getByRange: "/clients/range",
    update: "/clients/update",
    approve: "/clients/approve",
    household: {
      root: "/clients/households"
    },
    payment: {
      root: "/clients/payments"
    }
  },
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