import React from 'react';
import { Link } from "react-router-dom";
import { staticData } from "data/static-data";
import { isAdminRol, isSuperAdminRol, isAccountantRol, isAssistantRol } from "util/session-util";
import { setCurrencyFormat } from "util/currencyUtil";

function HouseholdDetailClientItemView({ spreadsheetId, userRol, data }) {
  return data.map((item, index) => {
    return (
      <div className='d-flex flex-column p-3 mb-2 bg-body-tertiary' key={item.id}>
        <div className='container-fluid p-0 d-flex flex-column'>
        <div className='w-100 d-flex flex-row justify-content-between'>
            <div className='d-flex flex-column'>
              <div className='fw-bold mt-2'>#</div>
              <div className='fw-bold'>{item.id}</div>
            </div>

            <div className='d-flex flex-column'>
              <div className='fw-bold mt-2'>Documento</div>
              <div className='fw-light'>{item.document}</div>
            </div>
          </div>

          <div className='w-100 d-flex flex-row justify-content-between'>
            <div className='d-flex flex-column me-5'>
              <div className='fw-bold mt-2'>Apartamento</div>
              <div className='fw-light'>{item.numberHousehold}</div>
            </div>

            <div className='d-flex flex-column ms-5'>
              <div className='fw-bold mt-2'>Valor</div>
              <div className='fw-light'>${setCurrencyFormat(item.value)}</div>
            </div>
          </div>

          <div className='w-100 d-flex flex-row justify-content-between'>
            <div className='d-flex flex-column'>
              <div className='fw-bold mt-2'>Pago Inicial</div>
              <div className='fw-light'>${setCurrencyFormat(item.initialFee)}</div>
            </div>
            <div className='d-flex flex-column'>
              <div className='fw-bold mt-2'>Deuda</div>
              <div className='fw-light'>${setCurrencyFormat(item.value)}</div>
            </div>
          </div>
          
          <div className='fw-light'>
            {item.invoiceFileUrl != "" ? (<a href={item.invoiceFileUrl} target="_blank" type="button" className="w-100 btn btn-dark mt-3 text-start" >Ver Factura de Venta</a>) : (null)}
          </div>
          <div className='fw-light'>
            {item.promiseFileUrl != "" ? (<a href={item.promiseFileUrl} target="_blank" type="button" className="w-100 btn btn-dark mt-3 text-start" >Ver Promesa de Compraventa</a>) : (null)}
          </div>
          <div className='fw-light'>
            {item.certificateFileUrl != "" ? (<a href={item.certificateFileUrl} target="_blank" type="button" className="w-100 btn btn-dark mt-3 text-start" >Ver Certificado</a>) : (null)}
          </div>

        </div>

        <div className='d-flex flex-row flex-sm-row align-items-end justify-content-end border-top mt-3'>
          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <Link className="gap-2 text-light text-decoration-none" to={'/clients/' + spreadsheetId + '/' + staticData.uiActions.update + '/position/' + item.position}>
              <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
            </Link>
          ) : (null)}
          <Link className="gap-2 text-light text-decoration-none" to={'/clients/' + spreadsheetId + '/' + staticData.uiActions.detail + '/position/' + item.position}>
            <button type="button" className="btn btn-outline-light mt-3 ms-3">Eliminar</button>
          </Link>
        </div>
      </div>
    );
  });
};

export default HouseholdDetailClientItemView;
