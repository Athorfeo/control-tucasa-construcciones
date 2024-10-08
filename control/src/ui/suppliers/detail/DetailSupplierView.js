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
import TextInput from "ui/components/input/TextInput";
import ViewBanksSelect from "ui/components/banks/ViewBanksSelect";
import AccountTypeSelectView from "ui/components/accountType/AccountTypeSelectView";
import DocumentTypeSelectView from "ui/components/documentType/DocumentTypeSelectView";

import { useDetailSupplierController } from "./useDetailSupplierController";

function DetailSupplierView() {
  let { action, position } = useParams();
  const userRol = parseInt(getJsonItem(storageConfig.userDataKey).rol);
  const navigate = useNavigate();

  // Error
  function navigateUp() {
    navigate('/suppliers');
  }

  //UI
  const [labelSubmitButton, setLabelSubmitButton] = useState('');
  const [titleAction, setTitleAction] = useState('');

  const {
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
  } = useDetailSupplierController(action, position, navigateUp);

  // Load inital data
  useEffect(() => {
    switch (action) {
      case staticData.uiActions.add:
        setTitleAction('Nueva');
        setLabelSubmitButton("Agregar Proveedor");
        break;
      case staticData.uiActions.update:
        setTitleAction('Modificar');
        setLabelSubmitButton("Modificar Proveedor")
        break;
      case staticData.uiActions.detail:
        setTitleAction('Detalle');
        setLabelSubmitButton("Modificar Proveedor");
        break;
      default:
    }
  }, []);

  return (
    <div>
      <Navbar />
      <ErrorModal data={errorModalData} />
      <FinishModal data={finishModalData} />

      {uiLogicState.isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo={'/suppliers'} isRootView={true}/>

          <div className='d-flex flex-row border-bottom fs-4 mb-2 mt-4'>
            <div className='p-3 mb-2 border-end'>{titleAction}</div>
            <div className='p-3'>Proveedor</div>
          </div>

          <p>Modulo dedicado a la creacion, modificacion o aprobacion de Proveedores.</p>
          <p>Verifica que todos los campos esten correctos antes de enviar el formulario.</p>

          <form onSubmit={handleSubmit}>
            <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary'>
              <div className='container-fluid p-0 d-flex flex-column'>

                <TextInput id="inputFirstName" label="Nombre" value={formState.firstName} onUpdateValue={onUpdateFirstName} isDisabled={formState.isFormDisable} isRequired={true}/>
                
                <TextInput id="inputLastName" label="Apellido" value={formState.lastName} onUpdateValue={onUpdateLastName} isDisabled={formState.isFormDisable} isRequired={false}/>
                
                <DocumentTypeSelectView data={documentTypesData} positionSelected={formState.positionSelectedDocumentType} setPositionSelected={onSelectDocumentType} isDisabled={formState.isFormDisable} isRequired={true}/>

                <TextInput id="inputDocument" label="Documento" value={formState.document} onUpdateValue={onUpdateDocument} isDisabled={formState.isFormDisable} isRequired={true}/>
                
                <TextInput id="inputPhone" label="Telefono" value={formState.phone} onUpdateValue={onUpdatePhone} isDisabled={formState.isFormDisable} isRequired={false}/>
                
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Correo electronico</label>
                  <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={formState.email} onChange={(e) => {onUpdateEmail(e.target.value)}} disabled={formState.isFormDisable}></input>
                  <div id="inputEmailHelp" className="form-text">Ingresa el correo electronico del proveedor.</div>
                </div>

                <ViewBanksSelect data={getBanks} positionSelected={formState.positionSelectedBank} setPositionSelected={onSelectBank} isRequired={false}/>

                <AccountTypeSelectView data={accountTypesData} positionSelected={formState.positionSelectedAccountType} setPositionSelected={onSelectAccountType} isRequired={false}/>
                
                <TextInput id="inputAccountNumber" label="Numero de cuenta" value={formState.accountNumber} onUpdateValue={onUpdateAccountNumber} isDisabled={formState.isFormDisable} isRequired={false}/>
                
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
        </div>
      )}
    </div>
  );
}

export default DetailSupplierView;