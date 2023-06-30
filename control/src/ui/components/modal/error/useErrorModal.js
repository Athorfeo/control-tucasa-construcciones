import React, { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';

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

  const tryExecute = ({ block, onDismissAction }) => {
    try {
      if (onDismissAction != undefined || onDismissAction != null) {
        setErrorModalData({
          exception: null,
          onDismissAction: onDismissAction
        });
      }
      block();
    } catch (error) {
      console.error("tryExecute!");
      console.error("Error:", error);
      setErrorModalData({
        exception: error,
        onDismissAction: errorModalData.onDismissAction
      });
      showModal();
    }
  }

  return {
    errorModalData,
    tryExecute,
  };
}