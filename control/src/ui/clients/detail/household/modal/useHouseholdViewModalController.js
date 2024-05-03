import { useState } from 'react';
import { getFileData } from "util/fileUtil";

export const useHouseholdViewModalController = ({
  onAddCallback
}) => {
  const [formStateHousehold, setFormState] = useState({
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
    setFormState({
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

  function onLoadDataHousehold(data) {

  }

  const isSubmitDisabledHousehold = () => {
    if (
      formStateHousehold.document !== '' && 
      formStateHousehold.numberHousehold !== '' &&
      formStateHousehold.value !== '' &&
      formStateHousehold.initialFee !== '' &&
      formStateHousehold.balance !== '' &&
      formStateHousehold.promiseFile != null &&
      formStateHousehold.invoiceFile != null &&
      formStateHousehold.certificateFile != null
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
      promiseFile: promiseFile,
      promiseFileUrl: formStateHousehold.promiseFileUrl,
      invoiceFile: invoiceFile,
      invoiceFileUrl: formStateHousehold.invoiceFileUrl,
      certificateFile: certificateFile,
      certificateFileUrl: formStateHousehold.certificateFileUrl
    }

    onAddCallback(data);

    resetFormState();
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
    onLoadDataHousehold,
    isSubmitDisabledHousehold,
    handleSubmitFormHousehold
  };
}