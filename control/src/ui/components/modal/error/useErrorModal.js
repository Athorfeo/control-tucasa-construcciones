import { useState } from 'react';
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export const useErrorModal = (defaultDismissAction) => {
  const [errorModalData, setErrorModalData] = useState({
    exception: null,
    onDismissAction: defaultDismissAction
  });

  function showModal() {
    const id = "errorModal";
    let modal = new bootstrap.Modal('#' + id);
    document
      .getElementById(id)
      .addEventListener('hidden.bs.modal', event => {
        setErrorModalData({
          exception: null,
          onDismissAction: defaultDismissAction
        });
      })
    modal.show();
  }

  function showErrorModal({ error, onDismissAction }) {
    console.error("Error:", error);
    let _onDismissAction = defaultDismissAction

    if (onDismissAction !== undefined || onDismissAction !== null) {
      _onDismissAction = onDismissAction
    }

    setErrorModalData({
      exception: error,
      onDismissAction: _onDismissAction
    });
    
    showModal();
  }

  return {
    errorModalData,
    showErrorModal
  };
}