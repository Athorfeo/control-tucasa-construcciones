import { useState } from 'react';
import { staticData } from "data/static-data";

export const useHouseholdViewModalController = ({onAddCallback}) => {
  const [formState, setFormState] = useState({
    position: -1,
    id: "",
    createdDate: "",
    document: "",
    numberHousehold: "",
    value: "",
    initialFee: "",
    balance: "",
    promiseFile: File,
    promiseFileUrl: "",
    invoiceFile: File,
    invoiceFileUrl: "",
    certificateFile: File,
    certificateFileUrl: "",
  });

  function onUpdateDocument(value) {
    setFormState({
      ...formState,
      document: value
    });
  }

  function onUpdateNumberHousehold(value) {
    setFormState({
      ...formState,
      numberHousehold: value
    });
  }

  function onUpdateValue(value) {
    setFormState({
      ...formState,
      value: value
    });
  }

  function onUpdateInitialFee(value) {
    setFormState({
      ...formState,
      initialFee: value
    });
  }

  function onUpdateBalance(value) {
    setFormState({
      ...formState,
      balance: value
    });
  }

  const isSubmitDisabled = () => {
    if (
      formState.document !== '' && 
      formState.numberHousehold !== '' &&
      formState.value !== '' &&
      formState.initialFee !== '' &&
      formState.balance !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      document: formState.document,
      numberHousehold: formState.numberHousehold,
      value: formState.value,
      initialFee: formState.initialFee,
      balance: formState.balance
    }

    onAddCallback(data);

    setFormState({
      position: -1,
      id: "",
      createdDate: "",
      document: "",
      numberHousehold: "",
      value: "",
      initialFee: "",
      balance: "",
      promiseFile: File,
      promiseFileUrl: "",
      invoiceFile: File,
      invoiceFileUrl: "",
      certificateFile: File,
      certificateFileUrl: "",
    });
  };


  return {
    formState,
    onUpdateDocument,
    onUpdateNumberHousehold,
    onUpdateValue,
    onUpdateInitialFee,
    isSubmitDisabled,
    onUpdateBalance,
    handleSubmitForm
  };
}