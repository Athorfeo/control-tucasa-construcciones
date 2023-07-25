import { useState, useEffect } from 'react';
import { staticData, getTypeInvoices, getPaymentType } from "data/static-data";
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

  var _titleAction = "";
  var _labelSubmitButton = "";

  switch (action) {
    case staticData.uiActions.add:
      _titleAction = "Nuevo";
      _labelSubmitButton = "Agregar Factura";
      break;
    case staticData.uiActions.update:
      _titleAction = "Modificar";
      _labelSubmitButton = "Modificar Factura";
      break;
    default:
  }

  const [uiState, setUiState] = useState({
    titleAction: _titleAction,
    labelSubmitButton: _labelSubmitButton,
    activityMaterialLabel: "",
  });

  const [dataState, setDataState] = useState({
    typeInvoices: getTypeInvoices,
    paymentType: getPaymentType,
    suppliers: [],
    contractors: [],
    chapters: staticData.chapters,
  });

  const [formState, setFormState] = useState({
    isFormDisable: false,
    observations: "",
    positionSelectedTypeInvoice: 0,
    positionSelectedPaymentType: 0,
    positionSelectedContractor: 0,
    invoiceNumber: "",
    activityMaterial: "",
    price: "",
    quantity: "",
    positionSelectedChapter: 0,
    withholdingTax: "",
    iva: "",
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

  function onSelectPaymentType(value) {
    setFormState({
      ...formState,
      positionSelectedPaymentType: value
    });
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

  function onUpdateInvoiceNumber(value) {
    setFormState({
      ...formState,
      invoiceNumber: value
    });
  }

  function onUpdateActivityMaterial(value) {
    setFormState({
      ...formState,
      activityMaterial: value
    });
  }

  function onUpdatePrice(value) {
    setFormState({
      ...formState,
      price: value
    });
  }

  function onUpdateQuantity(value) {
    setFormState({
      ...formState,
      quantity: value
    });
  }

  function onSelectChapter(value) {
    setFormState({
      ...formState,
      positionSelectedChapter: value
    });
  }

  function onUpdateWithholdingTax(value) {
    setFormState({
      ...formState,
      withholdingTax: value
    });
  }

  function onUpdateIva(value) {
    setFormState({
      ...formState,
      withholdingTax: value
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

  useEffect(() => {
    switch (dataState.typeInvoices[formState.positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        setUiState({
          ...uiState,
          activityMaterialLabel: "Actividad",
        });
        break;

      case staticData.typeInvoice.contractors.id:
        setUiState({
          ...uiState,
          activityMaterialLabel: "Material",
        });
        break;
      default:
        break;
    }
  }, [formState]);

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
    onSelectPaymentType,
    onSelectSupplier,
    onSelectContactor,
    onUpdateInvoiceNumber,
    onUpdateActivityMaterial,
    onUpdatePrice,
    onUpdateQuantity,
    onSelectChapter,
    onUpdateWithholdingTax,
    onUpdateIva,
    handleSubmit
  };
}