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
    case staticData.uiActions.accountingSupport:
      _titleAction = "Soporte Contable";
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
    invoiceDate: getCurrentDateFormatted(),
    observations: "",
    positionSelectedTypeInvoice: 0,
    positionSelectedPaymentType: 0,
    positionSelectedSupplier: 0,
    positionSelectedContractor: 0,
    invoiceNumber: "",
    withholdingTax: "",
    iva: "",
    items: [],
    id: 0,
    date: "",
    photoInvoiceFileId: "",
    photoAccountingSupportFileId: "",
  });

  const { suppliers, fetchSuppliers } = useSuppliersRepository(spreadsheetId);
  const { contractors, fetchContractors } = useContractorsRepository(spreadsheetId);
  const { appendInvoiceService, getByIdInvoiceService, updateInvoiceService } = useInvoicePurchaseRepository(spreadsheetId);

  const { finishModalData, showFinishDialog } = useFinishModal();
  const { errorModalData, showErrorModal } = useErrorModal();

  useEffect(() => {
    switch (action) {
      case staticData.uiActions.add:
        updateUiLabels("Nuevo", "Agregar Factura");
        onSelectTypeInvoice(0);
        break;
      case staticData.uiActions.update:
        setIsLoading(true);
        updateUiLabels("Modificar", "Modificar Factura");

        getByIdInvoiceService(start, end).then((response) => {
          console.log("getByIdInvoiceService");
          console.log(response);
          loadInvoiceFromService(response, false);
        })
          .catch((error) => {
            showErrorModal({
              error: error,
              onDismissAction: () => { navigateUp(); }
            });
          });
        break;
      case staticData.uiActions.accountingSupport:
        setIsLoading(true);
        updateUiLabels("Soporte Contable", "Modificar Factura");

        getByIdInvoiceService(start, end).then((response) => {
          console.log("getByIdInvoiceService");
          console.log(response);
          loadInvoiceFromService(response, true);
        })
          .catch((error) => {
            showErrorModal({
              error: error,
              onDismissAction: () => { navigateUp(); }
            });
          });
        break;
      default:
    }
  }, []);

  useEffect(() => {
    switch (dataState.typeInvoices[formState.positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        setUiState({
          ...uiState,
          activityMaterialLabel: "Material",
        });
        break;

      case staticData.typeInvoice.contractors.id:
        setUiState({
          ...uiState,
          activityMaterialLabel: "Actividad",
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
              showErrorModal({
                error: error
              });
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
              showErrorModal({
                error: error
              });
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

  async function loadInvoiceFromService(service, isFormDisable) {
    const payload = service.data;

    var _positionSelectedTypeInvoice = -1;
    var _positionSelectedPaymentType = -1;
    var _positionSelectedSupplier = 0;
    var _positionSelectedContractor = 0;
    var _isInvoiceNumberRequired = false;

    dataState.typeInvoices.forEach((item, index) => {
      if (item.name === payload.typeInvoice) {
        _positionSelectedTypeInvoice = index;
      }
    });

    dataState.paymentType.forEach((item, index) => {
      if (item.name === payload.paymentType) {
        _positionSelectedPaymentType = index;
      }
    });

    onSelectTypeInvoice(_positionSelectedTypeInvoice);
    switch (dataState.typeInvoices[_positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        _isInvoiceNumberRequired = true;
        break;

      case staticData.typeInvoice.contractors.id:
        _isInvoiceNumberRequired = false;
        break;
      default:
        break;
    }

    const suppliers = await fetchSuppliers();
    const contractors = await fetchContractors();

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

    setFormState({
      ...formState,
      isFormDisable: isFormDisable,
      id: payload.id,
      date: payload.date,
      invoiceDate: payload.invoiceDate,
      observations: payload.observations,
      invoiceNumber: payload.invoiceNumber,
      withholdingTax: payload.withholdingTax,
      iva: payload.iva,
      photoInvoiceFileId: payload.photoInvoice.fileId,
      photoAccountingSupportFileId: payload.photoAccountingSupport.fileId,
      items: payload.items,
      positionSelectedTypeInvoice: _positionSelectedTypeInvoice,
      positionSelectedPaymentType: _positionSelectedPaymentType,
      positionSelectedSupplier: _positionSelectedSupplier,
      positionSelectedContractor: _positionSelectedContractor,
      isInvoiceNumberRequired: _isInvoiceNumberRequired
    });

    setIsLoading(false);
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
      photoAccountingSupport: {
        fileId: formState.photoAccountingSupportFileId
      },
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
        },
        photoAccountingSupport: {
          fileId: formState.photoAccountingSupportFileId
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
    onAddItem,
    onRemoveItem,
    handleSubmit,
    handleAccountingSupportSubmit
  };
}