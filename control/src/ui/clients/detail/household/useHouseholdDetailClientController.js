import { useState } from 'react';

/**
 * Detail Client Controller
 */
export const useHouseholdDetailClientController = (spreadsheetId, action, position) => {
  const [householdDataState, setHouseholdDataState] = useState({
    households: []
  });

  //const { getByIdService, appendService, updateService } = useClientsRepository(spreadsheetId);

  function onUpdateHouseholdState(value) {
    setHouseholdDataState({
      ...householdDataState,
      households: value
    });
  }

  return {
    householdDataState,
    onUpdateHouseholdState
  };
}