import { useState, useEffect } from 'react';
import { staticData, getTypeInvoices } from "data/static-data";
import { useSuppliersRepository } from "data/repository/useSuppliersRepository";
import { useContractorsRepository } from "data/repository/useContractorsRepository";

/**
 * Detail Invoice Purchase Controller
 */
export const useDetailInvoicePurchaseController = (spreadsheetId, action, start, end) => {
  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  const [uiState, setUiState] = useState({
    titleAction: "",
    labelSubmitButton: ""
  });

  const [dataState, setDataState] = useState({
    typeInvoices: getTypeInvoices,
    suppliers: [],
    contractors: [],
  });

  const [formState, setFormState] = useState({
    isFormDisable: false,
    observations: "",
    positionSelectedTypeInvoice: 0,
    positionSelectedContractor: 0,
  });

  const { suppliers, fetchSuppliers } = useSuppliersRepository(spreadsheetId);
  const { contractors, fetchContractors } = useContractorsRepository(spreadsheetId);

  function updateUiLabels(titleAction, labelSubmitButton) {
    setUiState({
      ...uiState,
      titleAction: titleAction,
      labelSubmitButton: labelSubmitButton,
    });
  }

  function setIsLoading(value) {
    setUiLogicState({
      ...uiLogicState,
      isLoading: value
    });
  }

  function onUpdateObservations(value) {
    setFormState({
      ...formState,
      observations: value
    });
  }

  function onSelectTypeInvoice(value) {
    setIsLoading(true);
    setFormState({
      ...formState,
      positionSelectedTypeInvoice: value
    });

    switch (dataState.typeInvoices[value].id) {
      case staticData.typeInvoice.suppliers.id:
        if (dataState.suppliers.length > 0) {
          setIsLoading(false);
        } else {
          fetchSuppliers()
            .then(() => {
              setIsLoading(false);
            })
            .catch((error) => {
            });
        }
        break;

      case staticData.typeInvoice.contractors.id:
        if (dataState.contractors.length > 0) {
          setIsLoading(false);
        } else {
          fetchContractors()
            .then(() => {
              setIsLoading(false);
            })
            .catch((error) => {
            });
        }
        break;
      default:
        break;
    }
  }

  function onSelectSupplier(value) {
    setFormState({
      ...formState,
      positionSelectedSupplier: value
    });
  }

  function onSelectContactor(value) {
    setFormState({
      ...formState,
      positionSelectedContractor: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  };

  useEffect(() => {
    switch (action) {
      case staticData.uiActions.add:
        updateUiLabels("Nuevo", "Agregar Factura");
        onSelectTypeInvoice(0);
        break;
      case staticData.uiActions.update:
        updateUiLabels("Modificar", "Modificar Factura");
        break;
      default:
    }
  }, []);

  // Set UI action
  useEffect(() => {
    setDataState({
      ...dataState,
      suppliers: suppliers,
      contractors: contractors
    })
  }, [suppliers, contractors]);

  return {
    uiLogicState,
    uiState,
    dataState,
    formState,
    onUpdateObservations,
    onSelectTypeInvoice,
    onSelectSupplier,
    onSelectContactor,
    handleSubmit
  };
}