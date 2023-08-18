import React from 'react';
import { Link } from "react-router-dom";
import { isAdminRol, isSuperAdminRol, isAccountantRol, isAssistantRol } from "util/session-util";

function ViewItemInvoice({ spreadsheetId, userRol, invoices }) {
  return invoices.map((item, index) => {
    return (
      <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary' key={item.id}>
        <div className='container-fluid p-0 d-flex flex-column'>
          <div className='d-flex flex-row'>
            <div className='fw-bold'>#{item.id}</div>
            <div className='fw-light ms-2'>{item.invoiceDate}</div>
          </div>
          <div className='fw-light mt-2'>{item.provider}  | {item.invoiceNumber}</div>
          <div className='fw-light mt-2'>{item.observations}</div>
        </div>

        <div className='d-flex flex-row justify-content-end border-top mt-3'>
          <div>
            {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
              <Link className="gap-2 text-light text-decoration-none" to={'/purchase/invoice/' + spreadsheetId + '/update/start/' + item.startPosition + '/end/' + item.endPosition}>
                <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
              </Link>
            ) : (null)}
            {(isAccountantRol(userRol)  || isSuperAdminRol(userRol)) ? (
              <Link className="gap-2 text-light text-decoration-none" to={'/purchase/invoice/' + spreadsheetId + '/accountingsupport/start/' + item.startPosition + '/end/' + item.endPosition}>
                <button type="button" className="btn btn-outline-light mt-3 ms-3">Agregar soporte contable</button>
              </Link>
            ) : (null)}
          </div>
        </div>
      </div>
    );
  });
};

export default ViewItemInvoice;
