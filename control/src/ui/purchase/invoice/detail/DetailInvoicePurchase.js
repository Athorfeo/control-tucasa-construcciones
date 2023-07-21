import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageConfig, getJsonItem } from "util/storage-util"
import { staticData, getTypeInvoices } from "data/static-data";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";
import ViewSuppliersSelect from "ui/components/suppliers/ViewSuppliersSelect";
import ViewContractorsSelect from "ui/components/contractors/ViewContractorsSelect";

import { useDetailInvoicePurchaseController } from "./useDetailInvoicePurchaseController";
import ViewTypeInvoice from "./ViewTypeInvoice";

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
    onUpdateObservations,
    onSelectTypeInvoice,
    onSelectSupplier,
    onSelectContactor,
    handleSubmit
  } = useDetailInvoicePurchaseController(spreadsheetId, action, start, end);

  function typeProviderView() {
    var typeProvider = null;
    
    switch (dataState.typeInvoices[formState.positionSelectedTypeInvoice].id) {
      case staticData.typeInvoice.suppliers.id:
        typeProvider = (<ViewSuppliersSelect data={dataState.suppliers} positionSelected={formState.positionSelectedSupplier} setPositionSelected={onSelectSupplier} />);
        break;
      case staticData.typeInvoice.contractors.id:
        typeProvider = (<ViewContractorsSelect data={dataState.contractors} positionSelected={formState.positionSelectedContractor} setPositionSelected={onSelectContactor} />);
        break;
      default:
        break;
    }

    return typeProvider;
  }

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
                  <label htmlFor="labelDescription" className="form-label">Observaciones</label>
                  <textarea className="form-control" id="inputDescription" rows="3" value={formState.observations} onChange={(e) => onUpdateObservations(e.target.value)} required disabled={uiState.isFormDisable}></textarea>
                </div>

                <ViewTypeInvoice data={dataState.typeInvoices} positionSelected={formState.positionSelectedTypeInvoice} setPositionSelected={onSelectTypeInvoice} />

                {typeProviderView()}

              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3" disabled={formState.isSubmitButtonDisabled}>{uiState.labelSubmitButton}</button>
              </div>

            </div>
          </form>
        </div>
      );
    }

    return content;
  }

  return (
    <div>
      <Navbar />
      {contentView()}
    </div>
  );
}