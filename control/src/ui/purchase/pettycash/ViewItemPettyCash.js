import React from 'react';
import { Link } from "react-router-dom";
import { staticData } from "data/static-data";
import { isAdminRol, isSuperAdminRol, isAccountantRol, isAssistantRol } from "util/session-util";

function ViewItemPettyCash({ spreadsheetId, userRol, data }) {
  return data.map((item, index) => {
    return (
      <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary' key={item.id}>
        <div className='container-fluid p-0 d-flex flex-column'>
          <div className='d-flex flex-row'>
            <div className='fw-bold'>#{item.id}</div>
            <div className='fw-light ms-2'>{item.date}</div>
          </div>

          <div className='fw-bold mt-2'>Banco</div>
          <div className='fw-light'>{item.bank}</div>

          <div className='fw-bold mt-2'>Monto</div>
          <div className='fw-light'>{item.amount}</div>
        </div>

        <div className='d-flex flex-row justify-content-end border-top mt-3'>
          <div>
            {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
              <Link className="gap-2 text-light text-decoration-none" to={'/purchase/pettycash/' + spreadsheetId + '/' + staticData.uiActions.update + '/position/' + item.position}>
                <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
              </Link>
            ) : (null)}
            {(isAccountantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
              <Link className="gap-2 text-light text-decoration-none" to={'/purchase/pettycash/' + spreadsheetId + '/' + staticData.uiActions.accountingSupport + '/position/' + item.position}>
                <button type="button" className="btn btn-outline-light mt-3">Agregar documento contable</button>
              </Link>
            ) : (null)}
            <Link className="gap-2 text-light text-decoration-none" to={'/purchase/pettycash/' + spreadsheetId + '/detail/position/' + item.position}>
              <button type="button" className="btn btn-outline-light mt-3 ms-3">Ver detalle</button>
            </Link>
          </div>
        </div>
      </div>
    );
  });
};

export default ViewItemPettyCash;
