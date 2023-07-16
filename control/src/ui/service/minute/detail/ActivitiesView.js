import React from 'react';
import { isDefaultRol, isAdminRol, isSuperAdminRol } from "util/session-util"

function ActivitiesView({ data, onRemoveProduct, isFormDisable, userRol, onSelectActivityForExecutedQuantity }) {
  const items = data.map((item, index) => {
    return <div className='container-fluid d-flex flex-column p-3 mb-2 bg-secondary-subtle' key={index + 1}>
      <div className='container-fluid p-0 d-flex flex-column'>
        <div className='d-flex flex-row d-flex justify-content-between'>
          <div className='fw-bold'>Actividad</div>
          <div className='fw-bold'>#{index + 1}</div>
        </div>
        <div className='fw-light'>{item.activity}</div>


        <div className='fw-bold mt-2'>Unidad</div>
        <div className='fw-light'>{item.unit}</div>

        <div className='fw-bold mt-2'>Capitulo</div>
        <div className='fw-light'>{item.chapterName}</div>

        {(isAdminRol(userRol)) ? (
          <div>
            <div className='fw-bold mt-2'>Cantidad Ejecutada</div>
            <div className='fw-light'>{item.executedQuantity}</div>
          </div>
        ) : (null)}
      </div>

      <div className='d-flex flex-row justify-content-end border-top mt-3'>
        {!isFormDisable ? (
          <div>
            {(isDefaultRol(userRol) || isSuperAdminRol(userRol)) ? (
              <button type="button" className="btn btn-outline-light mt-3" onClick={(e) => onRemoveProduct(index)}><i className="bi bi-x-lg"></i> Eliminar</button>
            ) : (null)}
          </div>
        ) : (
          <div>
            {(isAdminRol(userRol)) ? (
              <button type="button" className="btn btn-outline-light mt-4" data-bs-toggle="modal" data-bs-target="#setExecutedQuantityModal" onClick={(e) => onSelectActivityForExecutedQuantity(index)}>Establecer cantidad ejecutada</button>
            ) : (null)}
          </div>
        )}

      </div>
    </div>
  });

  const view = (
    data.length > 0 ? (
      items
    ) : (
      <div>No hay actividades añadidas</div>
    )
  );

  return view;
};

export default ActivitiesView;
