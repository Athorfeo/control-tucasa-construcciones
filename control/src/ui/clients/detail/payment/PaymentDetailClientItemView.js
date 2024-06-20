import React from 'react';
import { isAdminRol, isSuperAdminRol, isAccountantRol, isAssistantRol } from "util/session-util";
import { setCurrencyFormat } from "util/currencyUtil";

function PaymentDetailClientItemView({ spreadsheetId, userRol, data, onUpdatePayment, onDeletePayment, isDisabled }) {
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
              <div className='fw-bold mt-2'>Fecha del Pago</div>
              <div className='fw-light'>{item.paymentDate}</div>
            </div>

            <div className='d-flex flex-column ms-5'>
              <div className='fw-bold mt-2'>Valor</div>
              <div className='fw-light'>${setCurrencyFormat(item.amount)}</div>
            </div>
          </div>

          <div className='w-100 d-flex flex-row justify-content-between'>
            <div className='d-flex flex-column'>
              <div className='fw-bold mt-2'>Tipo de pago</div>
              <div className='fw-light'>{item.paymentType}</div>
            </div>
            <div className='d-flex flex-column'>
              <div className='fw-bold mt-2'>Banco</div>
              <div className='fw-light'>{item.bank}</div>
            </div>
          </div>
          
          <div className='fw-light'>
            {item.paymentFileUrl != "" ? (<a href={item.paymentFileUrl} target="_blank" type="button" className="w-100 btn btn-dark mt-3 text-start" >Ver Factura de Pago</a>) : (null)}
          </div>

        </div>

        <div className='d-flex flex-row flex-sm-row align-items-end justify-content-end border-top mt-3'>
          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <button type="button" className="btn btn-outline-light mt-3" data-bs-toggle="modal" data-bs-target="#paymentViewModal" onClick={() => { onUpdatePayment(item) }} disabled={isDisabled}>Modificar</button>
          ) : (null)}
          {(isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <button 
              type="button" 
              className="btn btn-outline-light mt-3 ms-3"
              onClick={() => {
                const payload = {
                  position: item.position,
                  paymentFileUrl: item.paymentFileUrl
                };
                onDeletePayment(payload);
               }}
               disabled={isDisabled}
            >Eliminar</button>
          ) : (null)}
          
        </div>
      </div>
    );
  });
};

export default PaymentDetailClientItemView;
