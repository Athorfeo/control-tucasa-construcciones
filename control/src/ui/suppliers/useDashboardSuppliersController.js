import { useState, useEffect } from 'react';
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import { useSuppliersRepository as useRepository } from "data/repository/useSuppliersRepository";

/**
 * Dashboard Suppliers Controller
 */
export const useDashboardSuppliersController = (navigateUp) => {
  const { errorModalData, showErrorModal } = useErrorModal(navigateUp);
  const { fetchAllSuppliersService } = useRepository();

  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });
  
  const [dataState, setDataState] = useState({
    suppliers: [],
  });

  function setIsLoading(value) {
    setUiLogicState({
      ...uiLogicState,
      isLoading: value
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAllSuppliersService().then((response) => {
      setDataState({
        ...dataState,
        suppliers: response.data
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