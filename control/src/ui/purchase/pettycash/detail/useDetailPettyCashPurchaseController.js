import { useState, useEffect } from 'react';
import { staticData, getBanks } from "data/static-data";
import { getCurrentDateFormatted } from "util/dateUtil";
import { getFile } from "util/fileUtil";
import { usePettyCashPurchaseRepository } from "data/repository/usePettyCashPurchaseRepository";
import { useFinishModal } from 'ui/components/modal/finish/useFinishModal';
import { useErrorModal } from 'ui/components/modal/error/useErrorModal';

/**
 * Detail Invoice Purchase Controller
 */
export const useDetailPettyCashPurchaseController = (spreadsheetId, action, position, navigateUp) => {
  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  const [dataState, setDataState] = useState({
    banks: getBanks,
  });

  const [formState, setFormState] = useState({
    isFormDisable: false,
    id: "",
    createdDate: "",
    date: getCurrentDateFormatted(),
    positionSelectedBank: 0,
    amount: "0",
    fileUrl: "",
    accountingDocument: "",
  });

  const { getByIdService, appendService, updateService, updateAccountingDocumentService } = usePettyCashPurchaseRepository(spreadsheetId);

  const { finishModalData, showFinishDialog } = useFinishModal();
  const { errorModalData, showErrorModal } = useErrorModal();

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setIsLoading(true);

    try {
      switch (action) {
        case staticData.uiActions.add:
          setIsLoading(false);
          break;
        case staticData.uiActions.detail:
          loadInvoiceFromService(true);
          break;
        case staticData.uiActions.update:
          loadInvoiceFromService(false);
          break;
        case staticData.uiActions.accountingSupport:
          loadInvoiceFromService(true);
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

  function loadInvoiceFromService(isFormDisable) {
    var _positionSelectedBank = -1;

    getByIdService(position).then((response) => {
      const payload = response.data;

      // Load Bank
      dataState.banks.forEach((item, index) => {
        if (item.name === payload.bank) {
          _positionSelectedBank = index;
        }
      });

      // Update State
      setFormState({
        ...formState,
        isFormDisable: isFormDisable,
        id: payload.id,
        createdDate: payload.createdDate,
        date: payload.date,
        positionSelectedBank: _positionSelectedBank,
        amount: payload.amount,
        fileUrl: payload.fileUrl,
        accountingDocument: payload.accountingDocument,
      });

      setIsLoading(false);
    }).catch((error) => {
      showErrorModal({
        error: error,
        onDismissAction: () => { navigateUp(); }
      });
    });
  }

  function setIsLoading(value) {
    setUiLogicState({
      ...uiLogicState,
      isLoading: value
    });
  }

  function onUpdateDate(value) {
    setFormState({
      ...formState,
      date: value
    });
  }

  function onSelectBank(value) {
    setFormState({
      ...formState,
      positionSelectedBank: value
    });
  }

  function onUpdateAmount(value) {
    setFormState({
      ...formState,
      amount: value
    });
  }

  function onUpdateAccountingDocument(value) {
    setFormState({
      ...formState,
      accountingDocument: value
    });
  }

  function getFormData() {
    const selectedBank = dataState.banks[formState.positionSelectedBank];

    const data = {
      id: formState.id,
      createdDate: formState.createdDate,
      date: formState.date,
      bank: selectedBank.name,
      amount: formState.amount,
      accountingDocument: formState.accountingDocument,
    };

    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    switch (action) {
      case staticData.uiActions.add:
        append();
        break;
      case staticData.uiActions.update:
        update();
        break;
      default:
    }
  };

  async function handleAccountingDocumentSubmit(e) {
    e.preventDefault();
    updateAccountingDocument();
  };

  async function append() {
    setIsLoading(true);
    const file = await getFile("#inputFile");

    if (file === null) {
      showFinishDialog({
        title: 'Archivo faltante',
        message: 'Debe seleccionar la archivo de la factura.',
        labelButton: 'Cerrar',
        onDismissAction: () => { setIsLoading(false); }
      });
    } else {
      const payload = {
        ...getFormData(),
        photo: file
      }

      appendService(payload)
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

  async function update() {
    setIsLoading(true);
    const file = await getFile("#inputFile");

    const payload = {
      ...getFormData(),
      position: position,
      photo: {
        ...file,
        fileUrl: formState.fileUrl
      }
    }

    updateService(payload)
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

  async function updateAccountingDocument() {
    setIsLoading(true);

    const payload = {
      position: position,
      id: formState.id,
      accountingDocument: formState.accountingDocument
    }

    updateAccountingDocumentService(payload)
      .then(() => {
        setIsLoading(false);

        showFinishDialog({
          title: 'Documento contable actualizado',
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

  return {
    uiLogicState,
    dataState,
    formState,
    finishModalData,
    errorModalData,
    onUpdateDate,
    onSelectBank,
    onUpdateAmount,
    onUpdateAccountingDocument,
    handleSubmit,
    handleAccountingDocumentSubmit,
  };
}