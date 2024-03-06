import { useState, useEffect } from 'react';
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import { useClientsRepository as useRepository } from "data/repository/useClientsRepository";

/**
 * Dashboard Clients Controller
 */
export const useDashboardClientsController = (spreadsheetId, navigateUp) => {
  const { errorModalData, showErrorModal } = useErrorModal(navigateUp);
  const { fetchAllService } = useRepository(spreadsheetId);

  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });
  
  const [dataState, setDataState] = useState({
    clients: [],
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
        clients: response.data
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