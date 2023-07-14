import React from 'react';
import { Link } from "react-router-dom";
import { formatDate } from "util/dateUtil"
import { isDefaultRol, isAdminRol, isSuperAdminRol } from "util/session-util"

export default function ItemView({ spreadsheetId, ordersPurchase, userRol }) {
  return ordersPurchase.map((purchase, index) => {
    return (
      <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary' key={purchase.items[0][0]}>
          <div className='container-fluid p-0 d-flex flex-column'>
            <div className='d-flex flex-row'>
              <div className='fw-bold'>#{purchase.items[0][0]}</div>
              <div className='fw-light ms-2'>{formatDate(purchase.items[0][3])} a {formatDate(purchase.items[0][4])}</div>
            </div>
  
            <div className='fw-light mt-2'>{purchase.items[0][2]}</div>
          </div>
  
          <div className='d-flex flex-row justify-content-end border-top mt-3'>
            {purchase.isPending ? (
              <div>
                {(isDefaultRol(userRol) || isSuperAdminRol(userRol)) ? (
                  <Link className="gap-2 text-light text-decoration-none" to={'/service/minute/' + spreadsheetId +'/update/start/' + purchase.startPosition + '/end/' + purchase.endPosition}>
                    <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
                  </Link>
                ) : (null)}
                {(isAdminRol(userRol)) ? (
                  <Link className="gap-2 text-light text-decoration-none" to={'/service/minute/' + spreadsheetId +'/approve/start/' + purchase.startPosition + '/end/' + purchase.endPosition}>
                    <button type="button" className="btn btn-outline-light mt-3 ms-3">Aprobar</button>
                  </Link>
                ) : (null)}
              </div>
            ) : (
              null
            )}
          </div>
        </div>
    );
  });
};