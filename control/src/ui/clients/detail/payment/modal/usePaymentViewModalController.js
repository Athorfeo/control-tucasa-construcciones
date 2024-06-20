import { useState } from 'react';
import { getFileData } from "util/fileUtil";
import { getPaymentType, getBanks } from "data/static-data";

export const usePaymentViewModalController = ({
  onAddCallback,
  onUpdateCallback
}) => {
  const [formStatePayment, setFormState] = useState({
    isUpdating: false,
    titleLabel: "",
    position: -1,
    id: "",
    createdDate: "",
    paymentDate: "",
    document: "",
    amount: "",
    positionSelectedPaymentType: 0,
    positionSelectedBank: 0,
    observations: "",
    paymentFile: null,
    paymentFileUrl: ""
  });

  function resetFormState() {
    return {
      isUpdating: false,
      titleLabel: "Agregar",
      position: -1,
      id: "",
      createdDate: "",
      paymentDate: "",
      document: "",
      amount: "",
      positionSelectedPaymentType: 0,
      positionSelectedBank: 0,
      observations: "",
      paymentFile: null,
      paymentFileUrl: ""
    };
  }

  function onUpdatePaymentDatePayment(value) {
    setFormState({
      ...formStatePayment,
      paymentDate: value
    });
  }

  function onUpdateDocumentPayment(value) {
    setFormState({
      ...formStatePayment,
      document: value
    });
  }

  function onUpdateAmountPayment(value) {
    setFormState({
      ...formStatePayment,
      amount: value
    });
  }

  function onSelectPaymentTypePayment(value) {
    setFormState({
      ...formStatePayment,
      positionSelectedPaymentType: value
    });
  }

  function onSelectBankPayment(value) {
    setFormState({
      ...formStatePayment,
      positionSelectedBank: value
    });
  }

  function onUpdateObservationsPayment(value) {
    setFormState({
      ...formStatePayment,
      observations: value
    });
  }

  function onUpdatePaymentFile(value) {
    setFormState({
      ...formStatePayment,
      paymentFile: value.files[0]
    });
  }

  function onInitAddPayment(document) {
    setFormState({
      ...resetFormState(),
      isUpdating: false,
      document: document
    });
  }

  function onInitUpdatePayment(item) {
    var _positionSelectedPaymentType = -1;
    // Load PaymentType
    getPaymentType.forEach((row, index) => {
      if (row.name === item.paymentType) {
        _positionSelectedPaymentType = index;
      }
    });

    var _positionSelectedBank = -1;
    // Load Bank
    getBanks.forEach((row, index) => {
      if (row.name === item.bank) {
        _positionSelectedBank = index;
      }
    });

    setFormState({
      isUpdating: true,
      titleLabel: "Modificar",
      position: item.position,
      id: item.id,
      createdDate: item.createdDate,
      paymentDate: item.paymentDate,
      document: item.document,
      amount: item.amount,
      positionSelectedPaymentType: _positionSelectedPaymentType,
      positionSelectedBank: _positionSelectedBank,
      observations: item.observations,
      paymentFile: null,
      paymentFileUrl: item.paymentFileUrl
    });
  }

  const isSubmitDisabledPayment = () => {
    var isPaymentFileValid = false;
    if(formStatePayment.paymentFile != null || formStatePayment.paymentFileUrl !== "") {
      isPaymentFileValid = true;
    }

    if (
      formStatePayment.paymentDate !== '' && 
      formStatePayment.document !== '' && 
      formStatePayment.amount !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitFormPayment = async (e) => {
    e.preventDefault();

    const paymentFile = await getFileData(formStatePayment.paymentFile);
    const selectedPaymentType = getPaymentType[formStatePayment.positionSelectedPaymentType];
    const selectedBank = getBanks[formStatePayment.positionSelectedBank];

    const data = {
      position: formStatePayment.position,
      id: formStatePayment.id,
      createdDate: formStatePayment.createdDate,
      paymentDate: formStatePayment.paymentDate,
      document: formStatePayment.document,
      amount: formStatePayment.amount,
      paymentType: selectedPaymentType.name,
      bank: selectedBank.name,
      observations: formStatePayment.observations,
      paymentFile: {
        ...paymentFile,
        fileUrl: formStatePayment.paymentFileUrl
      }
    }

    if(!formStatePayment.isUpdating){
      onAddCallback(data);
    } else {
      onUpdateCallback(data);
    }
    setFormState({
      ...resetFormState()
    });
  };


  return {
    formStatePayment,
    onUpdatePaymentDatePayment,
    onUpdateDocumentPayment,
    onUpdateAmountPayment,
    onSelectPaymentTypePayment,
    onSelectBankPayment,
    onUpdateObservationsPayment,
    onUpdatePaymentFile,
    isSubmitDisabledPayment,
    handleSubmitFormPayment,
    onInitAddPayment,
    onInitUpdatePayment
  };
}