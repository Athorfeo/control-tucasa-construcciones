import { useState, useEffect, useRef } from 'react';
import { staticData, getBanks } from "data/static-data";
import { useFinishModal } from 'ui/components/modal/finish/useFinishModal';
import { useErrorModal } from 'ui/components/modal/error/useErrorModal';
import { getFileData } from "util/fileUtil";
import { useClientsRepository } from "data/repository/useClientsRepository";

/**
 * Detail Client Controller
 */
export const useDetailClientController = (spreadsheetId, action, position, navigateUp) => {
  const [uiLogicState, setUiLogicState] = useState({
    isLoading: false,
    error: null
  });

  const { finishModalData, showFinishDialog } = useFinishModal();
  const { errorModalData, showErrorModal } = useErrorModal();

  const [formState, setFormState] = useState({
    isFormDisable: false,
    id: "",
    createdDate: "",
    name: "",
    document: "",
    address: "",
    email: "",
    documentFile: File,
    documentFileUrl: "",
    rutFile: File,
    rutFileUrl: "",
  });

  const { getByIdService, appendService, updateService, updateAccountingDocumentService } = useClientsRepository(spreadsheetId);

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

  function showErrorInputFileDialog() {
    showFinishDialog({
      title: 'Archivo faltante',
      message: 'Debe seleccionar la archivo.',
      labelButton: 'Cerrar',
      onDismissAction: () => { setIsLoading(false); }
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
    getByIdService(position).then((response) => {
      const payload = response.data;

      // Update State
      setFormState({
        ...formState,
        isFormDisable: isFormDisable,
        id: payload.id,
        createdDate: payload.createdDate,
        name: payload.name,
        document: payload.document,
        address: payload.address,
        email: payload.email,
        documentFileUrl: payload.documentFileUrl,
        rutFileUrl: payload.rutFileUrl,
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

  function onUpdateName(value) {
    setFormState({
      ...formState,
      name: value
    });
  }

  function onUpdateDocument(value) {
    setFormState({
      ...formState,
      document: value
    });
  }

  function onUpdateAddress(value) {
    setFormState({
      ...formState,
      address: value
    });
  }

  function onUpdateEmail(value) {
    setFormState({
      ...formState,
      email: value
    });
  }

  function onUpdateDocumentFile(value) {
    setFormState({
      ...formState,
      documentFile: value.files[0]
    });
  }

  function onUpdateRutFile(value) {
    setFormState({
      ...formState,
      rutFile: value.files[0]
    });
  }

  function getFormData() {
    const data = {
      id: formState.id,
      createdDate: formState.createdDate,
      name: formState.name,
      document: formState.document,
      address: formState.address,
      email: formState.email,
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
    const documentFile = await getFileData(formState.documentFile);
    const rutFile = await getFileData(formState.rutFile);

    if (documentFile === null && rutFile === null) {
      showErrorInputFileDialog();
    } else {
      const payload = {
        ...getFormData(),
        documentFile: documentFile,
        rutFile: rutFile,
      }

      appendService(payload)
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
  }

  async function update() {
    setIsLoading(true);
    const documentFile = await getFileData(formState.documentFile);
    const rutFile = await getFileData(formState.rutFile);

    const payload = {
      ...getFormData(),
      position: position,
      documentFile: {
        ...documentFile,
        fileUrl: formState.documentFileUrl
      },
      rutFile: {
        ...rutFile,
        fileUrl: formState.rutFileUrl
      }
    }

    updateService(payload)
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
    onUpdateName,
    onUpdateDocument,
    onUpdateAddress,
    onUpdateEmail,
    onUpdateDocumentFile,
    onUpdateRutFile,
    handleSubmit,
  };
}