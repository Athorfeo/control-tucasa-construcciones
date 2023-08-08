import { useState, useEffect } from 'react';
import { staticData, getTypeInvoices, getPaymentType } from "data/static-data";
import { useInvoicePurchaseRepository } from "data/repository/useInvoicePurchaseRepository";

/**
 * Detail Invoice Purchase Controller
 */
export const useDashboardInvoicePurchaseController = (spreadsheetId) => {
  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  const [dataState, setDataState] = useState({
    invoices: [],
  });

  const { invoices, fetchAll } = useInvoicePurchaseRepository(spreadsheetId);

  function setIsLoading(value) {
    setUiLogicState({
      ...uiLogicState,
      isLoading: value
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    })
    .catch((error) => {
    });
  }, []);

  // Set UI action
  useEffect(() => {
    setDataState({
      ...dataState,
      invoices: invoices
    })
  }, [invoices]);

  return {
    uiLogicState,
    dataState,
  };
}