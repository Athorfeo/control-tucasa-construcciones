import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageConfig, getJsonItem } from "util/storage-util";
import { staticData } from "data/static-data";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";
import ErrorModal from "ui/components/modal/error/ErrorModal";
import FinishModal from "ui/components/modal/finish/FinishModal";
import ViewBanksSelect from "ui/components/banks/ViewBanksSelect";
import AccountingDocument from "ui/components/accountingdocument/AccountingDocument";
import CurrencyInput from "ui/components/input/CurrencyInput";

import { useDetailPettyCashPurchaseController } from "./useDetailPettyCashPurchaseController";

export default function DetailPettyCashPurchase() {
  const navigate = useNavigate();
  let { spreadsheetId, action, position } = useParams();
  const userRol = parseInt(getJsonItem(storageConfig.userDataKey).rol);

  function navigateUp() {
    navigate('/purchase/pettycash/' + spreadsheetId);
  }

  let titleAction = "";
  let labelSubmitButton = "";

  switch (action) {
    case staticData.uiActions.add:
      titleAction = "Nuevo";
      labelSubmitButton = "Agregar Caja Menor";
      break;
    case staticData.uiActions.update:
    case staticData.uiActions.accountingSupport:
      titleAction = "Modificar";
      labelSubmitButton = "Modificar Caja Menor";
      break;
    case staticData.uiActions.detail:
      titleAction = "Detalle";
      labelSubmitButton = "Modificar Caja Menor";
      break;
    default:
  }

  //UI
  const {
    uiLogicState,
    dataState,
    formState,
    finishModalData,
    errorModalData,
    onUpdateDate,
    onSelectBank,
    onUpdateAmount,
    onUpdateAccountingDocument,
    handleSubmit,
    handleAccountingDocumentSubmit
  } = useDetailPettyCashPurchaseController(spreadsheetId, action, position, navigateUp);

  // Content
  function contentView() {
    var content = null;

    if (uiLogicState.isLoading) {
      content = <Loading />;
    } else {
      content = (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo={'/purchase/pettycash/' + spreadsheetId} />

          <div className='d-flex flex-row border-bottom fs-4 mb-2 mt-4'>
            <div className='p-3 mb-2 border-end'>{titleAction}</div>
            <div className='p-3'>Caja Menor</div>
          </div>

          <p>Modulo dedicado a la creacion, modificacion o aprobacion de Caja Menor.</p>
          <p>Verifica que todos los campos esten correctos antes de enviar la Caja Menor.</p>

          <form onSubmit={handleSubmit}>
            <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary'>
              <div className='container-fluid p-0 d-flex flex-column'>

                <div className="mb-3">
                  <label htmlFor="labelDescription" className="form-label">Fecha Factura</label>
                  <input className="form-control" id="inputStartDate" type="date" required value={formState.date} onChange={(e) => onUpdateDate(e.target.value)} disabled={formState.isFormDisable} />
                </div>

                <ViewBanksSelect data={dataState.banks} positionSelected={formState.positionSelectedBank} setPositionSelected={onSelectBank} isFormDisable={formState.isFormDisable} />

                <CurrencyInput id="inputAmount" label="Monto" value={formState.amount} onUpdateValue={onUpdateAmount} isDisabled={formState.isFormDisable}/>

                <div className="mb-3">
                  <label htmlFor="inputFile" className="form-label">Foto factura</label>
                  <input type="file" className="form-control" id="inputFile" accept=".pdf,image/*" disabled={formState.isFormDisable}></input>
                  {formState.fileUrl !== "" ? (<a href={formState.fileUrl} target="_blank" rel="noreferrer" type="button" className="btn btn-outline-light mt-2" >Ver archivo</a>) : (null)}
                </div>
                
              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3" disabled={formState.isFormDisable}>{labelSubmitButton}</button>
              </div>
            </div>
          </form>

          <AccountingDocument action={action} userRol={userRol} handleSubmit={handleAccountingDocumentSubmit} value={formState.accountingDocument} onUpdateValue={onUpdateAccountingDocument} />
        </div>
      );
    }

    return content;
  }

  return (
    <div>
      <ErrorModal data={errorModalData} />
      <FinishModal data={finishModalData} />
      <Navbar />
      {contentView()}
    </div>
  );
}