import { useState, useEffect } from 'react';
import { staticData } from "data/static-data";
import { useFinishModal } from 'ui/components/modal/finish/useFinishModal';
import { useErrorModal } from 'ui/components/modal/error/useErrorModal';
import { getFileData } from "util/fileUtil";
import { useSuppliersRepository } from "data/repository/useSuppliersRepository";
import { getBanks, documentTypesData, accountTypesData } from "data/static-data";

/**
 * Detail Supplier Controller
 */
export const useDetailSupplierController = (action, position, navigateUp) => {
  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  const { finishModalData, showFinishDialog } = useFinishModal();
  const { errorModalData, showErrorModal } = useErrorModal();

  const [formState, setFormState] = useState({
    isFormDisable: false,
    id: "",
    firstName: "",
    lastName: "",
    positionSelectedDocumentType: 0,
    document: "",
    phone: "",
    email: "",
    positionSelectedBank: 0,
    positionSelectedAccountType: 0,
    accountNumber: "",
    rutFile: File,
    rutFileUrl: ""
  });

  const { 
    getByIdSuppliersService, 
    appendSuppliersService, 
    updateSuppliersService
  } = useSuppliersRepository();

  function showSuccessAppendDialog() {
    showFinishDialog({
      title: 'Agregado correctamente',
      message: 'Se ha agregado exitosamente. Pulse el boton para finalizar.',
      labelButton: 'Finalizar',
      onDismissAction: () => navigateUp()
    });
  }

  function showSuccessUpdateDialog() {
    showFinishDialog({
      title: 'Actualizado correctamente',
      message: 'Se ha actualizado exitosamente. Pulse el boton para finalizar.',
      labelButton: 'Finalizar',
      onDismissAction: () => navigateUp()
    });
  }

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
        case staticData.uiActions.update:
          loadRowFromService(false);
          break;
        case staticData.uiActions.detail:
          loadRowFromService(true);
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

  function loadRowFromService(isFormDisable) {
    getByIdSuppliersService(position).then((response) => {
      const payload = response.data;

      var _positionSelectedBank = -1;
      // Load Bank
      getBanks.forEach((row, index) => {
        if (row.id === parseInt(payload.bankType)) {
          _positionSelectedBank = index;
        }
      });

      var _positionSelectedDocumentType = -1;
      // Load Document Type
      documentTypesData.forEach((row, index) => {
        if (row.id === parseInt(payload.documentType)) {
          _positionSelectedDocumentType = index;
        }
      });

      var _positionSelectedAccountType = -1;
      // Load Account Type
      accountTypesData.forEach((row, index) => {
        if (row.id === parseInt(payload.accountType)) {
          _positionSelectedAccountType = index;
        }
      });

      // Update State
      setFormState({
        ...formState,
        isFormDisable: isFormDisable,
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        positionSelectedDocumentType: _positionSelectedDocumentType,
        document: payload.document,
        phone: payload.phone,
        email: payload.email,
        positionSelectedBank: _positionSelectedBank,
        positionSelectedAccountType: _positionSelectedAccountType,
        accountNumber: payload.accountNumber,
        rutFileUrl: payload.rutFileUrl
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

  function onUpdateFirstName(value) {
    setFormState({
      ...formState,
      firstName: value
    });
  }

  function onUpdateLastName(value) {
    setFormState({
      ...formState,
      lastName: value
    });
  }

  function onSelectDocumentType(value) {
    setFormState({
      ...formState,
      positionSelectedDocumentType: value
    });
  }

  function onUpdateDocument(value) {
    setFormState({
      ...formState,
      document: value
    });
  }

  function onUpdatePhone(value) {
    setFormState({
      ...formState,
      phone: value
    });
  }

  function onUpdateEmail(value) {
    setFormState({
      ...formState,
      email: value
    });
  }

  function onSelectBank(value) {
    setFormState({
      ...formState,
      positionSelectedBank: value
    });
  }

  function onSelectAccountType(value) {
    setFormState({
      ...formState,
      positionSelectedAccountType: value
    });
  }

  function onUpdateAccountNumber(value) {
    setFormState({
      ...formState,
      accountNumber: value
    });
  }

  function onUpdateRutFile(value) {
    setFormState({
      ...formState,
      rutFile: value.files[0]
    });
  }

  function getFormData() {
    const selectedDocumentType = documentTypesData[formState.positionSelectedDocumentType];
    const selectedBank = getBanks[formState.positionSelectedBank];
    const selectedAccountType = accountTypesData[formState.positionSelectedAccountType];

    const data = {
      id: formState.id,
      firstName: formState.firstName,
      lastName: formState.lastName,
      documentType: selectedDocumentType.id,
      document: formState.document,
      phone: formState.phone,
      email: formState.email,
      bankType: selectedBank.id,
      accountType: selectedAccountType.id,
      accountNumber: formState.accountNumber
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

  async function append() {
    setIsLoading(true);
    const rutFile = await getFileData(formState.rutFile);

    const payload = {
      ...getFormData(),
      rutFile: rutFile,
    }

    appendSuppliersService(payload)
      .then(() => {
        setIsLoading(false);

        showSuccessAppendDialog();
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorModal({
          error: error
        });
      });
  }

  async function update() {
    setIsLoading(true);
    const rutFile = await getFileData(formState.rutFile);

    const payload = {
      ...getFormData(),
      position: position,
      rutFile: {
        ...rutFile,
        fileUrl: formState.rutFileUrl
      }
    }

    updateSuppliersService(payload)
      .then(() => {
        setIsLoading(false);

        showSuccessUpdateDialog();
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
    finishModalData,
    errorModalData,
    formState,
    getBanks,
    documentTypesData,
    accountTypesData,
    onUpdateFirstName,
    onUpdateLastName,
    onSelectDocumentType,
    onUpdateDocument,
    onUpdatePhone,
    onUpdateEmail,
    onSelectBank,
    onSelectAccountType,
    onUpdateAccountNumber,
    onUpdateRutFile,
    handleSubmit
  };
}