import { useState, useEffect } from 'react';
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import { usePettyCashPurchaseRepository as useRepository } from "data/repository/usePettyCashPurchaseRepository";

/**
 * Dashboard Invoice Purchase Controller
 */
export const useDashboardPettyCashPurchaseController = (spreadsheetId, navigateUp) => {
  const { errorModalData, showErrorModal } = useErrorModal(navigateUp);
  const { fetchAllService } = useRepository(spreadsheetId);

  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });
  
  const [dataState, setDataState] = useState({
    pettyCash: [],
  });

  function setIsLoading(value) {
    setUiLogicState({
      ...uiLogicState,
      isLoading: value
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAllService().then((response) => {
      setDataState({
        ...dataState,
        pettyCash: response.data
      })
      setIsLoading(false);
    })
    .catch((error) => {
      showErrorModal({
        error: error,
        onDismissAction: () => { navigateUp(); }
      });
    });
  }, []);

  return {
    errorModalData,
    uiLogicState,
    dataState,
  };
}