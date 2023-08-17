import { useState, useEffect } from 'react';
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import { useInvoicePurchaseRepository } from "data/repository/useInvoicePurchaseRepository";

/**
 * Dashboard Invoice Purchase Controller
 */
export const useDashboardInvoicePurchaseController = (spreadsheetId, navigateUp) => {
  const { errorModalData, showErrorModal } = useErrorModal(navigateUp);
  const { invoices, fetchAll } = useInvoicePurchaseRepository(spreadsheetId);

  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  
  const [dataState, setDataState] = useState({
    invoices: [],
  });

  
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
      showErrorModal({
        error: error,
        onDismissAction: () => { navigateUp(); }
      });
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
    errorModalData,
    uiLogicState,
    dataState,
  };
}