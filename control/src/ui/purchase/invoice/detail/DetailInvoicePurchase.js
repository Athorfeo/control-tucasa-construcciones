import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageConfig, getJsonItem } from "util/storage-util"
import { staticData } from "data/static-data";
import { isDefaultRol, isSuperAdminRol } from "util/session-util";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";
import ErrorModal from "ui/components/modal/error/ErrorModal";
import FinishModal from "ui/components/modal/finish/FinishModal";
import ViewSuppliersSelect from "ui/components/suppliers/ViewSuppliersSelect";
import ViewContractorsSelect from "ui/components/contractors/ViewContractorsSelect";
import ViewPaymentTypeSelect from "ui/components/paymentType/ViewPaymentTypeSelect";

import { useDetailInvoicePurchaseController } from "./useDetailInvoicePurchaseController";
import ViewTypeInvoice from "./ViewTypeInvoice";
import ViewAddItem from "./ViewAddItem";
import ViewItems from "./ViewItems";

export default function DetailInvoicePurchase() {
  const navigate = useNavigate();
  let { spreadsheetId, action, start, end } = useParams();
  const userRol = parseInt(getJsonItem(storageConfig.userDataKey).rol);

  function navigateUp() {
    navigate('/purchase/invoice/' + spreadsheetId);
  }

  //UI
  const {
    uiLogicState,
    uiState,
    dataState,
    formState,
    finishModalData,
    errorModalData,
    onUpdateInvoiceDate,
    onUpdateObservations,
    onSelectTypeInvoice,
    onSelectPaymentType,
    onSelectSupplier,
    onSelectContactor,
    onUpdateInvoiceNumber,
    onUpdateWithholdingTax,
    onUpdateIva,
    onAddItem,
    onRemoveItem,
    handleSubmit,
    handleAccountingSupportSubmit
  } = useDetailInvoicePurchaseController(spreadsheetId, action, start, end, navigateUp);

  // Type Provider
  function typeProviderView() {
    var typeProvider = null;

    switch (dataState.typeInvoices[formState.positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        typeProvider = (<ViewSuppliersSelect data={dataState.suppliers} positionSelected={formState.positionSelectedSupplier} setPositionSelected={onSelectSupplier} isFormDisable={formState.isFormDisable} />);
        break;
      case staticData.typeInvoice.contractors.id:
        typeProvider = (<ViewContractorsSelect data={dataState.contractors} positionSelected={formState.positionSelectedContractor} setPositionSelected={onSelectContactor} isFormDisable={formState.isFormDisable} />);
        break;
      default:
        break;
    }

    return typeProvider;
  }

  // Type Provider
  function accountingSupportView() {
    var view = null;

    switch (action) {
      case staticData.uiActions.accountingSupport:
        if (isDefaultRol(userRol) || isSuperAdminRol(userRol)) {
          view = (
            <form onSubmit={handleAccountingSupportSubmit}>
              <div className='container-fluid d-flex flex-column p-3 mb-2 mt-4 bg-body-tertiary'>
                <div className='container-fluid p-0 d-flex flex-column'>
                  <div className="mb-3">
                    <label htmlFor="inputPhotoAccountingSupport" className="form-label">Foto Soporte Contable</label>
                    <input type="file" className="form-control" id="inputPhotoAccountingSupport" required></input>
                  </div>

                </div>

                <div className='d-flex flex-row justify-content-end border-top mt-3'>
                  <button type="submit" className="btn btn-light mt-3">Añadir soporte contable</button>
                </div>
              </div>
            </form>
          );
        }
        break;
    }

    return view;
  }

  // Content
  function contentView() {
    var content = null;

    if (uiLogicState.isLoading) {
      content = <Loading />;
    } else {
      content = (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo={'/purchase/invoice/' + spreadsheetId} />

          <div className='d-flex flex-row border-bottom fs-4 mb-2 mt-4'>
            <div className='p-3 mb-2 border-end'>{uiState.titleAction}</div>
            <div className='p-3'>Factura</div>
          </div>

          <p>Modulo dedicado a la creacion, modificacion o aprobacion de Facturas.</p>
          <p>Verifica que todos los campos esten correctos antes de enviar la Factura.</p>

          <form onSubmit={handleSubmit}>
            <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary'>
              <div className='container-fluid p-0 d-flex flex-column'>

                <div className="mb-3">
                  <label htmlFor="labelDescription" className="form-label">Fecha Factura</label>
                  <input className="form-control" id="inputStartDate" type="date" value={formState.invoiceDate} onChange={(e) => onUpdateInvoiceDate(e.target.value)} required disabled={formState.isFormDisable} />
                </div>

                <ViewTypeInvoice data={dataState.typeInvoices} positionSelected={formState.positionSelectedTypeInvoice} setPositionSelected={onSelectTypeInvoice} isFormDisable={formState.isFormDisable} />

                {typeProviderView()}

                <ViewPaymentTypeSelect data={dataState.paymentType} positionSelected={formState.positionSelectedPaymentType} setPositionSelected={onSelectPaymentType} isFormDisable={formState.isFormDisable} />

                <div className="mb-3">
                  <label htmlFor="inputInvoiceNumber" className="form-label">Numero de factura</label>
                  <input type="text" className="form-control" id="inputInvoiceNumber" aria-describedby="invoiceNumberHelp" required={formState.isInvoiceNumberRequired} value={formState.invoiceNumber} onChange={(e) => onUpdateInvoiceNumber(e.target.value)} disabled={formState.isFormDisable}></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputInvoicePhoto" className="form-label">Foto factura</label>
                  <input type="file" className="form-control" id="inputInvoicePhoto" accept=".pdf,image/*" disabled={formState.isFormDisable}></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputWithholdingTax" className="form-label">Retencion</label>
                  <input type="number" min="0" max="999999999" step="any" className="form-control" id="inputWithholdingTax" aria-describedby="withholdingTaxHelp" required value={formState.withholdingTax} onChange={(e) => onUpdateWithholdingTax(e.target.value)} disabled={formState.isFormDisable}></input>
                  <div id="withholdingTaxHelp" className="form-text">Los decimales deben ir con punto (26.39).</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputIva" className="form-label">IVA</label>
                  <input type="number" min="0" max="999999999" step="any" className="form-control" id="inputIva" aria-describedby="ivaHelp" required value={formState.iva} onChange={(e) => onUpdateIva(e.target.value)} disabled={formState.isFormDisable}></input>
                  <div id="ivaHelp" className="form-text">Los decimales deben ir con punto (26.39).</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="labelDescription" className="form-label">Observaciones</label>
                  <textarea className="form-control" id="inputDescription" rows="3" value={formState.observations} onChange={(e) => onUpdateObservations(e.target.value)} disabled={formState.isFormDisable}></textarea>
                </div>

                <div className='d-flex flex-column'>
                  <p className='mt-2 mb-2'>Materiales / Actividades</p>

                  <button type="button" className="btn btn-outline-light mb-4 mt-2" data-bs-toggle="modal" data-bs-target="#addItemModal" disabled={formState.isFormDisable}>Agregar {uiState.activityMaterialLabel}</button>

                  <ViewItems data={formState.items} isFormDisable={formState.isFormDisable} onRemoveItem={onRemoveItem} />
                </div>

              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3" disabled={formState.isFormDisable}>{uiState.labelSubmitButton}</button>
              </div>

            </div>
          </form>

          {accountingSupportView()}
        </div>
      );
    }

    return content;
  }

  return (
    <div>
      <ErrorModal data={errorModalData} />
      <FinishModal data={finishModalData} />
      <ViewAddItem
        activityMaterialLabel={uiState.activityMaterialLabel}
        chapters={staticData.chapters}
        isSubmitDisabled={formState.isFormDisable}
        onAddItem={onAddItem} />
      <Navbar />
      {contentView()}
    </div>
  );
}