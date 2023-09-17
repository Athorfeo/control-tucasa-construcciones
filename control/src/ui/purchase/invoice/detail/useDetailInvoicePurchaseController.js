import { useState, useEffect } from 'react';
import { staticData, getTypeInvoices, getPaymentType } from "data/static-data";
import { getCurrentDateFormatted } from "util/dateUtil";
import { useSuppliersRepository } from "data/repository/useSuppliersRepository";
import { useContractorsRepository } from "data/repository/useContractorsRepository";
import { useInvoicePurchaseRepository } from "data/repository/useInvoicePurchaseRepository";
import { useFinishModal } from 'ui/components/modal/finish/useFinishModal';
import { useErrorModal } from 'ui/components/modal/error/useErrorModal';

/**
 * Detail Invoice Purchase Controller
 */
export const useDetailInvoicePurchaseController = (spreadsheetId, action, start, end, navigateUp) => {
  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  const [uiState, setUiState] = useState({
    activityMaterialLabel: "",
    isInvoiceNumberRequired: true,
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
    id: "",
    date: "",
    invoiceDate: getCurrentDateFormatted(),
    observations: "",
    positionSelectedTypeInvoice: 0,
    positionSelectedSupplier: 0,
    positionSelectedContractor: 0,
    positionSelectedPaymentType: 0,
    photoInvoiceFileId: "",
    invoiceNumber: "",
    withholdingTax: "0",
    iva: "0",
    items: [],
    accountingSupport: "",
  });

  const { fetchSuppliersData } = useSuppliersRepository(spreadsheetId);
  const { fetchContractorsAsData } = useContractorsRepository(spreadsheetId);
  const { appendInvoiceService, getByIdInvoiceService, updateInvoiceService, addAccountingDocumentInvoiceService } = useInvoicePurchaseRepository(spreadsheetId);

  const { finishModalData, showFinishDialog } = useFinishModal();
  const { errorModalData, showErrorModal } = useErrorModal();

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setIsLoading(true);

    try {
      const suppliers = await fetchSuppliersData();
      const contractors = await fetchContractorsAsData();

      setDataState({
        ...dataState,
        suppliers: suppliers,
        contractors: contractors
      })

      switch (action) {
        case staticData.uiActions.add:
          onSelectTypeInvoice(0);
          setIsLoading(false);
          break;
        case staticData.uiActions.update:
          loadInvoiceFromService(suppliers, contractors, false);
          break;
        case staticData.uiActions.accountingSupport:
          loadInvoiceFromService(suppliers, contractors, true);
          break;
        default:
      }
    } catch (error) {
      console.error(error);
      showErrorModal({
        error: error,
        onDismissAction: () => { navigateUp(); }
      });
    }
  }

  async function loadInvoiceFromService(suppliers, contractors, isFormDisable) {
    var _positionSelectedTypeInvoice = -1;
    var _positionSelectedPaymentType = -1;
    var _positionSelectedSupplier = 0;
    var _positionSelectedContractor = 0;

    getByIdInvoiceService(start, end).then((response) => {
      console.log("getByIdInvoiceService");
      console.log(response);

      const payload = response.data;

      // Load TypeInvoice
      dataState.typeInvoices.forEach((item, index) => {
        if (item.name === payload.typeInvoice) {
          _positionSelectedTypeInvoice = index;
        }
      });

      // Load PaymentType
      dataState.paymentType.forEach((item, index) => {
        if (item.name === payload.paymentType) {
          _positionSelectedPaymentType = index;
        }
      });

      // Load Supplier or Contractor
      suppliers.forEach((item, index) => {
        if (item[4] === payload.provider) {
          _positionSelectedSupplier = index;
        }
      });

      contractors.forEach((item, index) => {
        if (item[4] === payload.provider) {
          _positionSelectedContractor = index;
        }
      });

      // Update State
      setFormState({
        ...formState,
        isFormDisable: isFormDisable,
        id: payload.id,
        date: payload.date,
        invoiceDate: payload.invoiceDate,
        observations: payload.observations,
        positionSelectedTypeInvoice: _positionSelectedTypeInvoice,
        positionSelectedSupplier: _positionSelectedSupplier,
        positionSelectedContractor: _positionSelectedContractor,
        positionSelectedPaymentType: _positionSelectedPaymentType,
        photoInvoiceFileId: payload.photoInvoice.fileId,
        invoiceNumber: payload.invoiceNumber,
        withholdingTax: payload.withholdingTax,
        iva: payload.iva,
        items: payload.items,
        accountingSupport: payload.accountingSupport,
      });

      setIsLoading(false);
    }).catch((error) => {
      showErrorModal({
        error: error,
        onDismissAction: () => { navigateUp(); }
      });
    });
  }

  useEffect(() => {
    let _isInvoiceNumberRequired = false;
    let _activityMaterialLabel = "";

    switch (dataState.typeInvoices[formState.positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        _activityMaterialLabel = "Material";
        _isInvoiceNumberRequired = true;
        break;

      case staticData.typeInvoice.contractors.id:
        _activityMaterialLabel = "Actividad";
        _isInvoiceNumberRequired = false;
        break;
      default:
        break;
    }

    setUiState({
      ...uiState,
      activityMaterialLabel: _activityMaterialLabel,
      isInvoiceNumberRequired: _isInvoiceNumberRequired,
    });
  }, [formState]);

  // Set UI action

  function setIsLoading(value) {
    setUiLogicState({
      ...uiLogicState,
      isLoading: value
    });
  }

  function onUpdateInvoiceDate(value) {
    setFormState({
      ...formState,
      invoiceDate: value
    });
  }

  function onUpdateObservations(value) {
    setFormState({
      ...formState,
      observations: value
    });
  }

  function onSelectTypeInvoice(value) {
    setFormState({
      ...formState,
      positionSelectedTypeInvoice: value
    });
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

  function onUpdateWithholdingTax(value) {
    setFormState({
      ...formState,
      withholdingTax: value
    });
  }

  function onUpdateIva(value) {
    setFormState({
      ...formState,
      iva: value
    });
  }

  function onUpdateAccountingSupport(value) {
    setFormState({
      ...formState,
      accountingSupport: value
    });
  }

  function onAddItem(item) {
    const _temp = [...formState.items];
    _temp.push(item);
    setFormState({
      ...formState,
      items: _temp
    });
  }

  function onRemoveItem(index) {
    const _temp = [...formState.items];
    _temp.splice(index, 1);
    setFormState({
      ...formState,
      items: _temp
    });
  }

  function getFormData() {
    const selectedTypeInvoice = dataState.typeInvoices[formState.positionSelectedTypeInvoice];
    const selectedPaymentType = dataState.paymentType[formState.positionSelectedPaymentType];

    var typeProvider = null;
    switch (dataState.typeInvoices[formState.positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        typeProvider = dataState.suppliers[formState.positionSelectedSupplier];
        break;

      case staticData.typeInvoice.contractors.id:
        typeProvider = dataState.contractors[formState.positionSelectedContractor];
        break;
      default:
        break;
    }

    const data = {
      invoiceDate: formState.invoiceDate,
      observations: formState.observations,
      typeInvoice: selectedTypeInvoice.name,
      provider: (typeProvider[4]),
      paymentType: selectedPaymentType.name,
      invoiceNumber: formState.invoiceNumber,
      withholdingTax: formState.withholdingTax,
      iva: formState.iva,
      items: formState.items,
      accountingSupport: formState.accountingSupport,
    };

    return data;
  }

  const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  async function getInvoiceFile() {
    var data = null;

    try {
      const file = document.querySelector("#inputInvoicePhoto").files[0];
      const rawData = await fileToBase64(file);
      data = {
        mimeType: file.type,
        rawData: rawData,
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    switch (action) {
      case staticData.uiActions.add:
        appendInvoice();
        break;
      case staticData.uiActions.update:
        updateInvoice();
        break;
      default:
    }
  };

  function handleAccountingSupportSubmit(e) {
    e.preventDefault();
    addAccountingSupportInvoice();
  };

  async function appendInvoice() {
    setIsLoading(true);
    const photoFile = await getInvoiceFile();

    if (photoFile === null) {
      showFinishDialog({
        title: 'Foto faltante',
        message: 'Debe seleccionar la foto de la factura.',
        labelButton: 'Cerrar',
        onDismissAction: () => { setIsLoading(false); }
      });
    } else if (formState.items.length === 0) {
      showFinishDialog({
        title: 'No hay materiales/activiades agregadas',
        message: 'Debe agregar al menos 1 actividad/material.',
        labelButton: 'Cerrar',
        onDismissAction: () => { setIsLoading(false); }
      });
    } else {
      const payload = {
        ...getFormData(),
        photoInvoice: photoFile
      }

      appendInvoiceService(payload)
        .then(() => {
          setIsLoading(false);

          showFinishDialog({
            title: 'Agregado correctamente',
            message: 'Se ha agregado exitosamente. Pulse el boton para finalizar.',
            labelButton: 'Finalizar',
            onDismissAction: () => navigateUp()
          });
        })
        .catch((error) => {
          setIsLoading(false);
          showErrorModal({
            error: error
          });
        });
    }
  }

  async function updateInvoice() {
    setIsLoading(true);
    const photoFile = await getInvoiceFile();

    if (formState.items.length === 0) {
      showFinishDialog({
        title: 'No hay materiales/activiades agregadas',
        message: 'Debe agregar al menos 1 actividad/material.',
        labelButton: 'Cerrar',
        onDismissAction: () => { setIsLoading(false); }
      });
    } else {
      const payload = {
        ...getFormData(),
        startPosition: start,
        endPosition: end,
        photoInvoice: {
          ...photoFile,
          fileId: formState.photoInvoiceFileId
        }
      }

      console.log("Update invoice payload");
      console.log(payload);

      updateInvoiceService(payload)
        .then(() => {
          setIsLoading(false);

          showFinishDialog({
            title: 'Actualizado correctamente',
            message: 'Se ha actualizado exitosamente. Pulse el boton para finalizar.',
            labelButton: 'Finalizar',
            onDismissAction: () => navigateUp()
          });
        })
        .catch((error) => {
          setIsLoading(false);
          showErrorModal({
            error: error
          });
        });
    }
  }

  async function addAccountingSupportInvoice() {
    setIsLoading(true);
    const formData = getFormData();

    const payload = {
      startPosition: start,
      endPosition: end,
      id: formState.id,
      accountingDocument: formData.accountingSupport
    }

    console.log("Add accounting support invoice payload");
    console.log(payload);

    addAccountingDocumentInvoiceService(payload)
      .then(() => {
        setIsLoading(false);

        showFinishDialog({
          title: 'Soporte contable agregado',
          message: 'Se ha agregado el soporte contable exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => navigateUp()
        });
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorModal({
          error: error
        });
      });
  }

  return {
    uiLogicState,
    uiState,
    dataState,
    formState,
    finishModalData,
    errorModalData,
    onUpdateInvoiceDate,
    onUpdateObservations,
    onSelectTypeInvoice,
    onSelectPaymentType,
    onSelectContactor,
    onSelectSupplier,
    onUpdateInvoiceNumber,
    onUpdateWithholdingTax,
    onUpdateIva,
    onUpdateAccountingSupport,
    onAddItem,
    onRemoveItem,
    handleSubmit,
    handleAccountingSupportSubmit
  };
}