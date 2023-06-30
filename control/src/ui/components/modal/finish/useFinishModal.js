import { useState } from 'react';
import * as bootstrap from 'bootstrap';

export const useFinishModal = () => {
  const [finishModalData, setFinishModalData] = useState({
    title: '',
    message: '',
    labelButton: '',
    onDismissAction: null
  });

  function showModal() {
    const id = "noCancelableModal";
    let modal = new bootstrap.Modal('#' + id);
    modal.show();
  }

  const showFinishDialog = (modalData) => {
    setFinishModalData(modalData);
    showModal();
  }

  return {
    finishModalData,
    showFinishDialog
  };
}