import { useState } from 'react';
import { getFileData } from "util/fileUtil";

export const useHouseholdViewModalController = ({
  onAddCallback,
  onUpdateCallback
}) => {
  const [formStateHousehold, setFormState] = useState({
    isUpdating: false,
    titleLabel: "",
    position: -1,
    id: "",
    createdDate: "",
    document: "",
    numberHousehold: "",
    value: "",
    initialFee: "",
    balance: "",
    promiseFile: null,
    promiseFileUrl: "",
    invoiceFile: null,
    invoiceFileUrl: "",
    certificateFile: null,
    certificateFileUrl: "",
  });

  function resetFormState() {
    return {
      isUpdating: false,
      titleLabel: "Agregar",
      position: -1,
      id: "",
      createdDate: "",
      document: "",
      numberHousehold: "",
      value: "",
      initialFee: "",
      balance: "",
      promiseFile: null,
      promiseFileUrl: "",
      invoiceFile: null,
      invoiceFileUrl: "",
      certificateFile: null,
      certificateFileUrl: "",
    };
  }

  function onUpdateDocumentHousehold(value) {
    setFormState({
      ...formStateHousehold,
      document: value
    });
  }

  function onUpdateNumberHousehold(value) {
    setFormState({
      ...formStateHousehold,
      numberHousehold: value
    });
  }

  function onUpdateValueHousehold(value) {
    setFormState({
      ...formStateHousehold,
      value: value
    });
  }

  function onUpdateInitialFeeHousehold(value) {
    setFormState({
      ...formStateHousehold,
      initialFee: value
    });
  }

  function onUpdateBalanceHousehold(value) {
    setFormState({
      ...formStateHousehold,
      balance: value
    });
  }

  function onUpdatePromiseFile(value) {
    setFormState({
      ...formStateHousehold,
      promiseFile: value.files[0]
    });
  }

  function onUpdateInvoiceFile(value) {
    setFormState({
      ...formStateHousehold,
      invoiceFile: value.files[0]
    });
  }

  function onUpdateCertificateFile(value) {
    setFormState({
      ...formStateHousehold,
      certificateFile: value.files[0]
    });
  }

  function onInitAddHousehold(document) {
    setFormState({
      ...resetFormState(),
      isUpdating: false,
      document: document
    });
  }

  function onInitUpdateHousehold(item) {
    setFormState({
      isUpdating: true,
      titleLabel: "Modificar",
      position: item.position,
      id: item.id,
      createdDate: item.createdDate,
      document: item.document,
      numberHousehold: item.numberHousehold,
      value: item.value,
      initialFee: item.initialFee,
      balance: item.balance,
      promiseFile: null,
      promiseFileUrl: item.promiseFileUrl,
      invoiceFile: null,
      invoiceFileUrl: item.invoiceFileUrl,
      certificateFile: null,
      certificateFileUrl: item.certificateFileUrl
    });
  }

  const isSubmitDisabledHousehold = () => {
    var isPromiseFileValid = false;
    if(formStateHousehold.promiseFile != null || formStateHousehold.promiseFileUrl !== "") {
      isPromiseFileValid = true;
    }

    var isInvoiceFileValid = false;
    if(formStateHousehold.invoiceFile != null || formStateHousehold.invoiceFileUrl !== "") {
      isInvoiceFileValid = true;
    }

    var isCertificateFileValid = false;
    if(formStateHousehold.certificateFile != null || formStateHousehold.certificateFileUrl !== "") {
      isCertificateFileValid = true;
    }

    if (
      formStateHousehold.document !== '' && 
      formStateHousehold.numberHousehold !== '' &&
      formStateHousehold.value !== '' &&
      formStateHousehold.initialFee !== '' &&
      formStateHousehold.balance !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitFormHousehold = async (e) => {
    e.preventDefault();

    const promiseFile = await getFileData(formStateHousehold.promiseFile);
    const invoiceFile = await getFileData(formStateHousehold.invoiceFile);
    const certificateFile = await getFileData(formStateHousehold.certificateFile);

    const data = {
      position: formStateHousehold.position,
      id: formStateHousehold.id,
      createdDate: formStateHousehold.createdDate,
      document: formStateHousehold.document,
      numberHousehold: formStateHousehold.numberHousehold,
      value: formStateHousehold.value,
      initialFee: formStateHousehold.initialFee,
      balance: formStateHousehold.balance,
      promiseFile: {
        ...promiseFile,
        fileUrl: formStateHousehold.promiseFileUrl
      },
      invoiceFile: {
        ...invoiceFile,
        fileUrl: formStateHousehold.invoiceFileUrl
      },
      certificateFile: {
        ...certificateFile,
        fileUrl: formStateHousehold.certificateFileUrl
      }
    }

    if (!formStateHousehold.isUpdating) {
      onAddCallback(data);
    } else {
      onUpdateCallback(data);
    }
    setFormState({
      ...resetFormState()
    });
  };


  return {
    formStateHousehold,
    onUpdateDocumentHousehold,
    onUpdateNumberHousehold,
    onUpdateValueHousehold,
    onUpdateInitialFeeHousehold,
    onUpdateBalanceHousehold,
    onUpdatePromiseFile,
    onUpdateInvoiceFile,
    onUpdateCertificateFile,
    isSubmitDisabledHousehold,
    handleSubmitFormHousehold,
    onInitAddHousehold,
    onInitUpdateHousehold,
  };
}