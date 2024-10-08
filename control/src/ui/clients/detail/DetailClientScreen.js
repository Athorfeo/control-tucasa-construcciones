import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageConfig, getJsonItem } from "util/storage-util";
import { staticData } from "data/static-data";

import ErrorModal from "ui/components/modal/error/ErrorModal";
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import FinishModal from "ui/components/modal/finish/FinishModal";
import { useFinishModal } from "ui/components/modal/finish/useFinishModal";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";

import { useDetailClientController } from "./useDetailClientController";

import HouseholdDetailClientItemView from "./household/HouseholdDetailClientItemView";
import HouseholdViewModal from "./household/modal/HouseholdViewModal";
import { useHouseholdViewModalController } from "./household/modal/useHouseholdViewModalController";

import PaymentDetailClientItemView from "./payment/PaymentDetailClientItemView";
import PaymentViewModal from "./payment/modal/PaymentViewModal";
import { usePaymentViewModalController } from "./payment/modal/usePaymentViewModalController";

function DetailClientScreen() {
  let { spreadsheetId, action, position } = useParams();
  const userRol = parseInt(getJsonItem(storageConfig.userDataKey).rol);
  const navigate = useNavigate();

  // Error
  function navigateUp() {
    navigate('/clients/' + spreadsheetId);
  }

  //UI
  const [labelSubmitButton, setLabelSubmitButton] = useState('');
  const [titleAction, setTitleAction] = useState('');

  const {
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
    householdDataState,
    onAppendHousehold,
    onUpdateHousehold,
    onDeleteHousehold,
    paymentsDataState,
    onAppendPayment,
    onUpdatePayment,
    onDeletePayment
  } = useDetailClientController(spreadsheetId, action, position, navigateUp);

  const {
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
    onInitUpdateHousehold
  } = useHouseholdViewModalController({
    onAddCallback: (data) => {
      console.log("onAddCallbackHousehold");
      console.log(data);
      onAppendHousehold(data);
    },
    onUpdateCallback: (data) => {
      console.log("onUpdateCallbackHousehold");
      console.log(data);
      onUpdateHousehold(data);
    }
  });

  const {
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
  } = usePaymentViewModalController({
    onAddCallback: (data) => {
      console.log("onAddCallbackPayment");
      console.log(data);
      onAppendPayment(data);
    },
    onUpdateCallback: (data) => {
      console.log("onUpdateCallbackPayment");
      console.log(data);
      onUpdatePayment(data);
    }
  });

  // Load Order Purchase
  useEffect(() => {
    switch (action) {
      case staticData.uiActions.add:
        setTitleAction('Nueva');
        setLabelSubmitButton("Agregar Cliente");
        break;
      case staticData.uiActions.update:
        setTitleAction('Modificar');
        setLabelSubmitButton("Modificar Cliente")
        break;
      case staticData.uiActions.detail:
        setTitleAction('Detalle');
        setLabelSubmitButton("Modificar Cliente");
        break;
      default:
    }
  }, []);

  let householdsSection = null;
  let paymentsSection = null;
  switch (action) {
    case staticData.uiActions.update:
    case staticData.uiActions.detail:
      householdsSection = (
        <div className='mt-4'>
            <p className='fw-bold text-uppercase mt-4 mb-2'>Lista de viviendas</p>
            <div className="d-flex flex-wrap justify-content-around justify-content-md-between">
              <HouseholdDetailClientItemView 
                spreadsheetId={spreadsheetId} 
                userRol={userRol} 
                data={householdDataState.households} 
                onUpdateHousehold={(item) => {
                  console.log("onUpdateHousehold");
                  console.log(item);
                  onInitUpdateHousehold(item);
                }}
                onDeleteHousehold={(payload) => {
                  console.log("onDeleteHousehold");
                  console.log(payload);
                  onDeleteHousehold(payload);
                }}
                isDisabled={formState.isFormDisable}
              />
            </div>

            <div className='d-flex flex-row justify-content-end border-top mt-3'>
              <button 
                type="button" 
                className="btn btn-light mt-3" 
                data-bs-toggle="modal" 
                data-bs-target="#householdViewModal"
                disabled={formState.isFormDisable}
                onClick={() => { onInitAddHousehold(formState.document) }}
              >
                Agregar vivienda
              </button>
            </div>
          </div>
      );

      paymentsSection = (
        <div className='mt-4 mb-4'>
            <p className='fw-bold text-uppercase mt-4 mb-2'>Lista de Pagos</p>
            <div className="d-flex flex-wrap justify-content-around justify-content-md-between">
              <PaymentDetailClientItemView 
                spreadsheetId={spreadsheetId} 
                userRol={userRol} 
                data={paymentsDataState.payments} 
                onUpdatePayment={(item) => {
                  console.log("onUpdatePayment");
                  console.log(item);
                  onInitUpdatePayment(item);
                }}
                onDeletePayment={(payload) => {
                  console.log("onDeletePayment");
                  console.log(payload);
                  onDeletePayment(payload);
                }}
                isDisabled={formState.isFormDisable}
              />
            </div>

            <div className='d-flex flex-row justify-content-end border-top mt-3'>
              <button 
                type="button" 
                className="btn btn-light mt-3" 
                data-bs-toggle="modal" 
                data-bs-target="#paymentViewModal"
                disabled={formState.isFormDisable}
                onClick={() => { onInitAddPayment(formState.document) }}
              >
                Agregar Pago
              </button>
            </div>
          </div>
      );
      break;
    default:
  }

  return (
    <div>
      <Navbar />
      <ErrorModal data={errorModalData} />
      <FinishModal data={finishModalData} />
      <HouseholdViewModal 
        formStateHousehold={formStateHousehold}
        onUpdateDocumentHousehold={onUpdateDocumentHousehold}
        onUpdateNumberHousehold={onUpdateNumberHousehold}
        onUpdateValueHousehold={onUpdateValueHousehold}
        onUpdateInitialFeeHousehold={onUpdateInitialFeeHousehold}
        onUpdateBalanceHousehold={onUpdateBalanceHousehold}
        onUpdatePromiseFile={onUpdatePromiseFile}
        onUpdateInvoiceFile={onUpdateInvoiceFile}
        onUpdateCertificateFile={onUpdateCertificateFile}
        isSubmitDisabledHousehold={isSubmitDisabledHousehold}
        handleSubmitFormHousehold={handleSubmitFormHousehold}
      />

      <PaymentViewModal 
        formStatePayment={formStatePayment}
        onUpdatePaymentDatePayment={onUpdatePaymentDatePayment}
        onUpdateDocumentPayment={onUpdateDocumentPayment}
        onUpdateAmountPayment={onUpdateAmountPayment}
        onSelectPaymentTypePayment={onSelectPaymentTypePayment}
        onSelectBankPayment={onSelectBankPayment}
        onUpdateObservationsPayment={onUpdateObservationsPayment}
        onUpdatePaymentFile={onUpdatePaymentFile}
        isSubmitDisabledPayment={isSubmitDisabledPayment}
        handleSubmitFormPayment={handleSubmitFormPayment}
      />

      {uiLogicState.isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo={'/clients/' + spreadsheetId} />

          <div className='d-flex flex-row border-bottom fs-4 mb-2 mt-4'>
            <div className='p-3 mb-2 border-end'>{titleAction}</div>
            <div className='p-3'>Cliente</div>
          </div>

          <p>Modulo dedicado a la creacion, modificacion o aprobacion de Clientes.</p>
          <p>Verifica que todos los campos esten correctos antes de enviar el formulario.</p>

          <form onSubmit={handleSubmit}>
            <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary'>
              <div className='container-fluid p-0 d-flex flex-column'>

              <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Nombre completo</label>
                  <input type="text" className="form-control" id="inputName" aria-describedby="inputNameHelp" required value={formState.name} onChange={(e) => {onUpdateName(e.target.value)}} disabled={formState.isFormDisable}></input>
                  <div id="inputNameHelp" className="form-text">Ingresa el nombre del cliente.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputDocument" className="form-label">Documento</label>
                  <input type="text" className="form-control" id="inputDocument" aria-describedby="inputDocumentHelp" required value={formState.document} onChange={(e) => {onUpdateDocument(e.target.value)}} disabled={formState.isFormDisable}></input>
                  <div id="inputDocumentHelp" className="form-text">Ingresa el documento del cliente.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputAddress" className="form-label">Direccion</label>
                  <input type="text" className="form-control" id="inputAddress" aria-describedby="inputAddressHelp" required value={formState.address} onChange={(e) => {onUpdateAddress(e.target.value)}} disabled={formState.isFormDisable}></input>
                  <div id="inputAddressHelp" className="form-text">Ingresa la direccion del cliente.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Correo electronico</label>
                  <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" required value={formState.email} onChange={(e) => {onUpdateEmail(e.target.value)}} disabled={formState.isFormDisable}></input>
                  <div id="inputEmailHelp" className="form-text">Ingresa el correo electronico del cliente.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputDocumentFile" className="form-label">Archivo Documento</label>
                  <input type="file" className="form-control" id="inputDocumentFile" accept=".pdf,image/*" onChange={(e) => {onUpdateDocumentFile(e.target)}} disabled={formState.isFormDisable}></input>
                  {formState.documentFileUrl !== "" ? (<a href={formState.documentFileUrl} target="_blank" rel="noreferrer" type="button" className="btn btn-outline-light mt-2" >Ver archivo</a>) : (null)}
                </div>

                <div className="mb-3">
                  <label htmlFor="inputRutFile" className="form-label">Archivo RUT</label>
                  <input type="file" className="form-control" id="inputRutFile" accept=".pdf,image/*" onChange={(e) => {onUpdateRutFile(e.target)}} disabled={formState.isFormDisable}></input>
                  {formState.rutFileUrl !== "" ? (<a href={formState.rutFileUrl} target="_blank" rel="noreferrer" type="button" className="btn btn-outline-light mt-2" >Ver archivo</a>) : (null)}
                </div>

              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3" disabled={formState.isFormDisable}>{labelSubmitButton}</button>
              </div>
            </div>

          </form>

          {householdsSection}
          {paymentsSection}
        </div>
      )}
    </div>
  );
}

export default DetailClientScreen;