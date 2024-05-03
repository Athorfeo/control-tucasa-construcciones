import { useState, useEffect, useRef } from 'react';
import { staticData, getBanks } from "data/static-data";
import { useFinishModal } from 'ui/components/modal/finish/useFinishModal';
import { useErrorModal } from 'ui/components/modal/error/useErrorModal';
import { getFileData } from "util/fileUtil";
import { useClientsRepository } from "data/repository/useClientsRepository";

/**
 * Detail Client Controller
 */
export const useHouseholdDetailClientController = (spreadsheetId, action, position) => {
  const [householdDataState, setHouseholdDataState] = useState({
    households: []
  });

  //const { getByIdService, appendService, updateService } = useClientsRepository(spreadsheetId);

  function onUpdateHouseholds(value) {
    setHouseholdDataState({
      ...householdDataState,
      households: value
    });
  }

  return {
    householdDataState,
    onUpdateHouseholds
  };
}