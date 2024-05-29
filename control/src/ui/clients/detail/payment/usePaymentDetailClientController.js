import { useState } from 'react';

/**
 * Payment Detail Client Controller
 */
export const usePaymentDetailClientController = (spreadsheetId, action, position) => {
  const [paymentsDataState, setPaymentsDataState] = useState({
    payments: []
  });

  //const { getByIdService, appendService, updateService } = useClientsRepository(spreadsheetId);

  function onUpdatePaymentsState(value) {
    setPaymentsDataState({
      ...paymentsDataState,
      payments: value
    });
  }

  return {
    paymentsDataState,
    onUpdatePaymentsState
  };
}