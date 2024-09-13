import React from 'react';
import { Link } from "react-router-dom";
import { staticData } from "data/static-data";
import { isAdminRol, isSuperAdminRol, isAccountantRol, isAssistantRol } from "util/session-util";

function ItemDashboardSuppliersView({userRol, data}) {
  return data.map((item, index) => {
    return (
      <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary' key={item.id}>
        <div className='container-fluid p-0 d-flex flex-column'>
          <div className='d-flex flex-row'>
            <div className='fw-bold'>#{item.id}</div>
            <div className='fw-light ms-2'></div>
          </div>

          <div className='fw-bold mt-2'>Nombre</div>
          <div className='fw-light'>{item.firstName} {item.lastName}</div>

          <div className='fw-bold mt-2'>Documento</div>
          <div className='fw-light'>{item.document}</div>
        </div>

        <div className='d-flex flex-row flex-sm-row align-items-end justify-content-end border-top mt-3'>
          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <Link className="gap-2 text-light text-decoration-none" to={'/suppliers/' + staticData.uiActions.update + '/position/' + item.position}>
              <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
            </Link>
          ) : (null)}
          <Link className="gap-2 text-light text-decoration-none" to={'/suppliers/' + staticData.uiActions.detail + '/position/' + item.position}>
            <button type="button" className="btn btn-outline-light mt-3 ms-3">Ver detalle</button>
          </Link>
        </div>
      </div>
    );
  });
};

export default ItemDashboardSuppliersView;
