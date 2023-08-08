import { useState } from 'react';
import { fetchAllInvoicePurchase, fetchAppendApi, fetchGetByRangeApi, fetchUpdateApi } from "network/api/purchase/InvoicePurchaseApi";

export const useInvoicePurchaseRepository = (spreadsheetId) => {
  const [invoices, setInvoices] = useState([]);

  async function fetchAll() {
    return fetchAllInvoicePurchase(spreadsheetId).then((response) => {
      console.log("Invoices | InvoiceRepository");
      console.log(response);

      const rangeSplited = response.data.range.split(':');
      const rangeStartPosition = parseInt(rangeSplited[0].split('!')[1].split(/[^\d]+/).join(""));

      //const rangeEndPosition = rangeSplited[1].split(/[^\d]+/).join("");

      if (response.data.values != undefined) {
        var values = response.data.values;

        // Convert array to data model
        var _invoices = [];
        var _invoiceTemp = null;

        var lastId = -1;
        var startPositionInSheet = rangeStartPosition;

        values.forEach((item, index) => {
          const itemId = item[0];

          if (lastId !== itemId) {
            // Add invoice to array
            if (_invoiceTemp != null) {
              _invoiceTemp.endPosition = rangeStartPosition + (index - 1);
              _invoices.push(_invoiceTemp);
            }

            lastId = itemId;
            startPositionInSheet = rangeStartPosition + index;

            _invoiceTemp = {
              startPosition: startPositionInSheet,
              endPosition: startPositionInSheet,
              id: item[0],
              date: item[1],
              invoiceDate: item[2],
              observations: item[3],
              typeInvoice: item[4],
              provider: item[5],
              paymentType: item[6],
              invoiceNumber: item[7],
            };
          }

          if (index + 1 === values.length) {
            _invoiceTemp.endPosition = rangeStartPosition + index;
            _invoices.push(_invoiceTemp);
          }
        });

        setInvoices(_invoices.sort((a, b) => parseInt(b.id) - parseInt(a.id)));
      }
    });
  }

  async function appendInvoiceService(payload) {
    return fetchAppendApi(spreadsheetId, payload);
  }

  async function getByIdInvoiceService(start, end) {
    return fetchGetByRangeApi(spreadsheetId, start, end);
  }

  async function updateInvoiceService(payload) {
    return fetchUpdateApi(spreadsheetId, payload);
  }

  return {
    invoices,
    fetchAll,
    appendInvoiceService,
    getByIdInvoiceService,
    updateInvoiceService
  };
}